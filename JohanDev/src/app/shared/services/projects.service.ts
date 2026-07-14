import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getBaseApiUrl } from '../constants/api-url';

export interface Project {
  id: any;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  status: 'completado' | 'en-progreso' | 'planificado';
  image: string;
  githubUrl?: string;
  webUrl?: string;
  backendUrl?: string;
  apkUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = `${getBaseApiUrl()}/projects`;

  private fallbackProjects: Project[] = [
    {
      id: 1,
      title: 'Proyecto Final Web',
      shortDescription: 'Plataforma web full stack para gestión de reservas hoteleras con panel administrativo.',
      description: '# Proyecto Final Web 🏨\n\nEste es un proyecto completo desarrollado para la materia de Programación Web. Permite la gestión de reservas de habitaciones de hotel con control de roles.\n\n### Características Clave\n* Autenticación basada en roles (Admin/User).\n* Pasarela de pagos simulada.\n* Reportes avanzados.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
      status: 'completado',
      image: '/img/Web.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Web'
    },
    {
      id: 2,
      title: 'Proyecto Final Distribuidas',
      shortDescription: 'Marketplace digital con arquitectura de microservicios y pasarela de pagos integrada.',
      description: '# Marketplace de Microservicios 🛒\n\nSolución distribuida para la compra y venta de artículos digitales con soporte para alta concurrencia.\n\n### Arquitectura\n* Microservicios con .NET Core.\n* Base de datos independiente por servicio.\n* Docker Compose para levantar el stack.',
      technologies: ['C#', '.NET Core', 'JavaScript', 'React', 'Docker'],
      status: 'en-progreso',
      image: '/img/Distribuidas.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas'
    },
    {
      id: 3,
      title: 'Proyecto GPIS',
      shortDescription: 'Sistema de gestión de información con base de datos optimizada para gran escala.',
      description: '# Sistema GPIS 📊\n\nSoftware empresarial para la optimización de procesos de logística y reportes contables.\n\n### Tecnologías\n* Frontend responsivo en React.\n* Backend robusto en Node.js.\n* PostgreSQL con índices optimizados.',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'AWS'],
      status: 'completado',
      image: '/img/GPIS.png',
      githubUrl: 'https://github.com/ArielParedesLozada/ProyectoGPIS'
    }
  ];

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('Failed to fetch projects from backend, using local fallbacks');
        return of(this.fallbackProjects);
      })
    );
  }

  getProjectById(id: string | number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        console.warn(`Failed to fetch project ${id} from backend, searching in local fallbacks`);
        const local = this.fallbackProjects.find(p => String(p.id) === String(id));
        if (local) return of(local);
        throw new Error('Project not found');
      })
    );
  }

  createProject(project: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, project, {
      headers: { 'x-api-key': token }
    });
  }

  updateProject(id: string, project: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project, {
      headers: { 'x-api-key': token }
    });
  }

  deleteProject(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'x-api-key': token }
    });
  }
}
