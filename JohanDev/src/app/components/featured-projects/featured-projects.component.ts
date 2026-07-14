import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsService, Project } from '../../shared/services/projects.service';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss'
})
export class FeaturedProjectsComponent implements OnInit {
  featuredProjects: Project[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe(projects => {
      this.featuredProjects = projects;
    });
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
}

