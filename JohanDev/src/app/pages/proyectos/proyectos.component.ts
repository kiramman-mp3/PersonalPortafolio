import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService, Project } from '../../shared/services/projects.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { getTechIcon, getTechColor } from '../../shared/constants/tech-list';

@Component({
  selector: 'app-proyectos-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  currentFilter = 'todos';
  isBrowser = false;
  isLoading = true;

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.projectsService.getProjects().subscribe({
        next: (data) => {
          this.projects = data;
          this.filteredProjects = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
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

  setFilter(filter: string): void {
    this.currentFilter = filter;
    if (filter === 'todos') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.status === filter);
    }
  }

  getStatusBadgeClass(status: string): string {
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

  getStatusText(status: string): string {
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

  getStatusIcon(status: string): string {
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

  getShortDescription(project: Project): string {
    if (project.shortDescription) return project.shortDescription;
    const clean = project.description
      .replace(/[#*`~_\-]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    return clean.length > 120 ? clean.slice(0, 120) + '...' : clean;
  }
}
