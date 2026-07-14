import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServicesService, ServiceItem } from '../../shared/services/services.service';
import { ProjectsService, Project } from '../../shared/services/projects.service';
import { TECH_MASTER_LIST } from '../../shared/constants/tech-list';

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

  // Tech list from constants
  techMasterList = TECH_MASTER_LIST;
  selectedTechnologies: string[] = [];
  customTechName = '';

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
    extendedInfoStr: ''
  };

  projectForm = {
    id: '',
    title: '',
    description: '',
    image: '',
    status: 'completado' as 'completado' | 'en-progreso' | 'planificado',
    githubUrl: '',
    webUrl: '',
    backendUrl: '',
    apkUrl: ''
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

  // IMAGE UPLOAD WITH COMPRESSION
  onImageSelected(event: any, type: 'service' | 'project'): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Compress image resolution to safe size (max 800px width/height)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 0.75 quality factor
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
          if (type === 'service') {
            this.serviceForm.imageUrl = compressedBase64;
          } else {
            this.projectForm.image = compressedBase64;
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // TECH MULTISELECT ACTIONS
  toggleTechnology(techName: string): void {
    const idx = this.selectedTechnologies.indexOf(techName);
    if (idx > -1) {
      this.selectedTechnologies.splice(idx, 1);
    } else {
      this.selectedTechnologies.push(techName);
    }
  }

  isTechSelected(techName: string): boolean {
    return this.selectedTechnologies.includes(techName);
  }

  addCustomTechnology(): void {
    const trimmed = this.customTechName.trim();
    if (trimmed && !this.selectedTechnologies.includes(trimmed)) {
      this.selectedTechnologies.push(trimmed);
      this.customTechName = '';
    }
  }

  // SERVICES CRUD
  openAddService(): void {
    this.isEditingService = false;
    this.selectedTechnologies = [];
    this.serviceForm = {
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      extendedInfoStr: ''
    };
    this.showServiceModal = true;
  }

  openEditService(service: ServiceItem): void {
    this.isEditingService = true;
    this.selectedTechnologies = [...(service.technologies || [])];
    this.serviceForm = {
      id: service.id,
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl,
      imageAlt: service.imageAlt,
      extendedInfoStr: (service.extendedInfo || []).join('\n')
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
      technologies: this.selectedTechnologies
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
    this.selectedTechnologies = [];
    this.projectForm = {
      id: '',
      title: '',
      description: '',
      image: '',
      status: 'completado',
      githubUrl: '',
      webUrl: '',
      backendUrl: '',
      apkUrl: ''
    };
    this.showProjectModal = true;
  }

  openEditProject(project: Project): void {
    this.isEditingProject = true;
    this.selectedTechnologies = [...(project.technologies || [])];
    this.projectForm = {
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      status: project.status,
      githubUrl: project.githubUrl || '',
      webUrl: project.webUrl || '',
      backendUrl: project.backendUrl || '',
      apkUrl: project.apkUrl || ''
    };
    this.showProjectModal = true;
  }

  saveProject(): void {
    const projectData = {
      title: this.projectForm.title,
      description: this.projectForm.description,
      image: this.projectForm.image,
      technologies: this.selectedTechnologies,
      status: this.projectForm.status,
      githubUrl: this.projectForm.githubUrl || null,
      webUrl: this.projectForm.webUrl || null,
      backendUrl: this.projectForm.backendUrl || null,
      apkUrl: this.projectForm.apkUrl || null
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
