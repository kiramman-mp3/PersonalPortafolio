import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectsService, Project } from '../../shared/services/projects.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { getTechIcon, getTechColor } from '../../shared/constants/tech-list';

@Component({
  selector: 'app-proyecto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, MarkdownPipe],
  templateUrl: './proyecto-detalle.component.html',
  styleUrl: './proyecto-detalle.component.scss'
})
export class ProyectoDetalleComponent implements OnInit {
  project?: Project;
  isLoading = true;
  isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.projectsService.getProjectById(id).subscribe({
          next: (data) => {
            this.project = data;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Failed to load project details', err);
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      } else {
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  getTechIcon(tech: string): string {
    return getTechIcon(tech);
  }

  getTechColor(tech: string): string {
    return getTechColor(tech);
  }

  getStatusBadgeClass(status?: string): string {
    if (!status) return '';
    switch (status) {
      case 'completado':
        return 'badge-completed';
      case 'en-progreso':
        return 'badge-progress';
      case 'planificado':
        return 'badge-planned';
      default:
        return '';
    }
  }

  getStatusText(status?: string): string {
    if (!status) return '';
    switch (status) {
      case 'completado':
        return 'Completado';
      case 'en-progreso':
        return 'En Progreso';
      case 'planificado':
        return 'Planificado';
      default:
        return '';
    }
  }

  getStatusIcon(status?: string): string {
    if (!status) return '';
    switch (status) {
      case 'completado':
        return 'fa-check';
      case 'en-progreso':
        return 'fa-clock';
      case 'planificado':
        return 'fa-calendar';
      default:
        return '';
    }
  }
}
