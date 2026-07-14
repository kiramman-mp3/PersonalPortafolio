import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Project {
  id: any;
  title: string;
  description: string;
  technologies: string[];
  status: 'completado' | 'en-progreso' | 'planificado';
  image: string;
  githubUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'https://personalportafolio-production.up.railway.app/projects';

  private fallbackProjects: Project[] = [
    {
      id: 1,
      title: 'Proyecto Final Web',
      description: 'Plataforma web full stack para gestión de reservas hoteleras con panel administrativo y autenticación basada en roles.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
      status: 'completado',
      image: '/img/Web.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Web'
    },
    {
      id: 2,
      title: 'Proyecto Final Distribuidas',
      description: 'Marketplace digital con arquitectura de microservicios, incluyendo sistema de pagos integrado y gateway API.',
      technologies: ['C#', '.NET Core', 'JavaScript', 'React', 'Docker'],
      status: 'en-progreso',
      image: '/img/Distribuidas.png',
      githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas'
    },
    {
      id: 3,
      title: 'Proyecto GPIS',
      description: 'Sistema de gestión e información con arquitectura escalable y base de datos optimizada para grandes volúmenes de datos.',
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
