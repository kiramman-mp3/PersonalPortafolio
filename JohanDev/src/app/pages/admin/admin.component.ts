import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServicesService, ServiceItem } from '../../shared/services/services.service';
import { ProjectsService, Project } from '../../shared/services/projects.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  password = '';
  loginError = '';

  activeTab: 'services' | 'projects' = 'services';
  
  services: ServiceItem[] = [];
  projects: Project[] = [];
  
  token = '';

  // Form states
  showServiceModal = false;
  showProjectModal = false;
  isEditingService = false;
  isEditingProject = false;

  serviceForm = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    extendedInfoStr: '',
    technologiesStr: ''
  };

  projectForm = {
    id: '',
    title: '',
    description: '',
    image: '',
    technologiesStr: '',
    status: 'completado' as 'completado' | 'en-progreso' | 'planificado',
    githubUrl: ''
  };

  constructor(
    private servicesService: ServicesService,
    private projectsService: ProjectsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('admin_token');
      if (savedToken) {
        this.token = savedToken;
        this.isLoggedIn = true;
        this.loadData();
      }
    }
  }

  onLogin(): void {
    this.loginError = '';
    this.http.post<any>('https://personalportafolio-production.up.railway.app/admin/login', { password: this.password })
      .subscribe({
        next: (res) => {
          if (res && res.success && res.token) {
            this.token = res.token;
            if (typeof window !== 'undefined') {
              localStorage.setItem('admin_token', res.token);
            }
            this.isLoggedIn = true;
            this.loadData();
          }
        },
        error: (err) => {
          console.error(err);
          this.loginError = 'Contraseña incorrecta';
        }
      });
  }

  onLogout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
    this.token = '';
    this.isLoggedIn = false;
    this.services = [];
    this.projects = [];
  }

  loadData(): void {
    this.servicesService.getServices().subscribe(data => this.services = data);
    this.projectsService.getProjects().subscribe(data => this.projects = data);
  }

  // SERVICES CRUD
  openAddService(): void {
    this.isEditingService = false;
    this.serviceForm = {
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      extendedInfoStr: '',
      technologiesStr: ''
    };
    this.showServiceModal = true;
  }

  openEditService(service: ServiceItem): void {
    this.isEditingService = true;
    this.serviceForm = {
      id: service.id,
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
      imageAlt: service.imageAlt,
      extendedInfoStr: (service.extendedInfo || []).join('\n'),
      technologiesStr: (service.technologies || []).join(', ')
    };
    this.showServiceModal = true;
  }

  saveService(): void {
    const serviceData = {
      title: this.serviceForm.title,
      description: this.serviceForm.description,
      imageUrl: this.serviceForm.imageUrl,
      imageAlt: this.serviceForm.imageAlt || this.serviceForm.title,
      extendedInfo: this.serviceForm.extendedInfoStr.split('\n').map(x => x.trim()).filter(x => x.length > 0),
      technologies: this.serviceForm.technologiesStr.split(',').map(x => x.trim()).filter(x => x.length > 0)
    };

    if (this.isEditingService) {
      this.servicesService.updateService(this.serviceForm.id, serviceData, this.token).subscribe({
        next: () => {
          this.showServiceModal = false;
          this.loadData();
        },
        error: (err) => alert('Error al actualizar servicio: ' + (err.error?.message || err.message))
      });
    } else {
      this.servicesService.createService(serviceData, this.token).subscribe({
        next: () => {
          this.showServiceModal = false;
          this.loadData();
        },
        error: (err) => alert('Error al crear servicio: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteService(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicesService.deleteService(id, this.token).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Error al eliminar servicio')
      });
    }
  }

  // PROJECTS CRUD
  openAddProject(): void {
    this.isEditingProject = false;
    this.projectForm = {
      id: '',
      title: '',
      description: '',
      image: '',
      technologiesStr: '',
      status: 'completado',
      githubUrl: ''
    };
    this.showProjectModal = true;
  }

  openEditProject(project: Project): void {
    this.isEditingProject = true;
    this.projectForm = {
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      technologiesStr: (project.technologies || []).join(', '),
      status: project.status,
      githubUrl: project.githubUrl
    };
    this.showProjectModal = true;
  }

  saveProject(): void {
    const projectData = {
      title: this.projectForm.title,
      description: this.projectForm.description,
      image: this.projectForm.image,
      technologies: this.projectForm.technologiesStr.split(',').map(x => x.trim()).filter(x => x.length > 0),
      status: this.projectForm.status,
      githubUrl: this.projectForm.githubUrl
    };

    if (this.isEditingProject) {
      this.projectsService.updateProject(this.projectForm.id, projectData, this.token).subscribe({
        next: () => {
          this.showProjectModal = false;
          this.loadData();
        },
        error: (err) => alert('Error al actualizar proyecto: ' + (err.error?.message || err.message))
      });
    } else {
      this.projectsService.createProject(projectData, this.token).subscribe({
        next: () => {
          this.showProjectModal = false;
          this.loadData();
        },
        error: (err) => alert('Error al crear proyecto: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteProject(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.projectsService.deleteProject(id, this.token).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Error al eliminar proyecto')
      });
    }
  }
}
