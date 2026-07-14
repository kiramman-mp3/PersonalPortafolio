import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  extendedInfo: string[];
  technologies?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'https://personalportafolio-production.up.railway.app/services';

  private fallbackServices: ServiceItem[] = [
    {
      id: 'web-dev',
      title: 'Desarrollo Web Integrado',
      description: 'Creamos plataformas web modernas, rápidas y escalables con las últimas tecnologías.',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Desarrollo Web',
      extendedInfo: [
        'Desarrollamos plataformas de alto rendimiento centradas en la escalabilidad y seguridad de tu negocio.'
      ],
      technologies: [
        'React / Angular / Vue',
        'APIs RESTful & GraphQL',
        'Bases de Datos Escalables',
        'Performance Web Vitals'
      ]
    },
    {
      id: 'ui-ux',
      title: 'Diseño UX/UI Premium',
      description: 'Interfaces intuitivas y atractivas que capturan la atención y mejoran la conversión.',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Diseño UI/UX',
      extendedInfo: [
        'Nuestras interfaces nacen de una investigación de usuario profunda combinada con sistemas de diseño de nivel mundial.'
      ],
      technologies: [
        'Figma / Adobe XD',
        'Sistemas de Diseño',
        'Investigación de Usuarios',
        'Prototipado Interactivo'
      ]
    },
    {
      id: 'ai-solutions',
      title: 'Soluciones con Inteligencia Artificial',
      description: 'Automatiza procesos y toma decisiones basadas en datos utilizando modelos de IA generativa y Machine Learning.',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      imageAlt: 'Inteligencia Artificial',
      extendedInfo: [
        'Volvemos a tu negocio dramáticamente competitivo y veloz inyectando IA generativa.'
      ],
      technologies: [
        'Modelos LLM (GPT, Gemini)',
        'Machine Learning',
        'Agentes Autónomos',
        'Análisis Predictivo'
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('Failed to fetch services from backend, using local fallbacks');
        return of(this.fallbackServices);
      })
    );
  }

  createService(service: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, service, {
      headers: { 'x-api-key': token }
    });
  }

  updateService(id: string, service: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service, {
      headers: { 'x-api-key': token }
    });
  }

  deleteService(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'x-api-key': token }
    });
  }
}
