import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getBaseApiUrl } from '../constants/api-url';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerIcon?: string;
  date: string;
  category: 'web' | 'backend' | 'cloud' | 'database' | 'mobile' | string;
  credentialId: string;
  credentialUrl?: string | null;
  description: string;
  skills: string[];
  hours: number;
  image?: string | null;
  featured?: boolean;
}

export interface CertificateStats {
  totalCertificates: number;
  totalHours: number;
  verifiedPercentage: number;
  specialtiesCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = `${getBaseApiUrl()}/certificates`;

  private fallbackCertificates: Certificate[] = [
    {
      id: 'cert-web-fullstack',
      title: 'Desarrollo de Aplicaciones Web Full Stack',
      issuer: 'Universidad Técnica de Ambato',
      issuerIcon: 'fas fa-university',
      date: '2025',
      category: 'web',
      credentialId: 'UTA-FSW-2025-0891',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Especialización intensiva en desarrollo web moderno de extremo a extremo. Cobertura completa de arquitecturas SPA reactivas, Server-Side Rendering (SSR), integración con APIs RESTful, seguridad HTTP y patrones de diseño limpios.',
      skills: ['Angular', 'TypeScript', 'Node.js', 'CSS3', 'HTML5', 'Sass'],
      hours: 120,
      image: null,
      featured: true
    },
    {
      id: 'cert-arch-microservices',
      title: 'Arquitectura de Software & Microservicios',
      issuer: 'Cisco Networking Academy',
      issuerIcon: 'fas fa-network-wired',
      date: '2024',
      category: 'backend',
      credentialId: 'CSCO-ARCH-98234-EC',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Diseño de sistemas distribuidos, microservicios autónomos, contenedores Docker, gestión de eventos y patrones de comunicación asíncrona orientados a alta disponibilidad y escalabilidad.',
      skills: ['.NET', 'C#', 'Docker', 'REST API', 'Microservicios'],
      hours: 80,
      image: null,
      featured: true
    },
    {
      id: 'cert-sql-databases',
      title: 'Bases de Datos Relacionales & SQL Avanzado',
      issuer: 'Oracle Academy',
      issuerIcon: 'fas fa-database',
      date: '2024',
      category: 'database',
      credentialId: 'ORA-DB-44120-SQL',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Diseño, normalización, optimización y administración de bases de datos relacionales robustas. Consultas complejas, procedimientos almacenados, índices avanzados y garantía de integridad referencial ACID.',
      skills: ['PostgreSQL', 'MySQL', 'SQL', 'Prisma', 'Database Tuning'],
      hours: 60,
      image: null,
      featured: false
    },
    {
      id: 'cert-cloud-devops',
      title: 'Cloud Computing & DevOps Fundamentals',
      issuer: 'AWS Academy Partner',
      issuerIcon: 'fab fa-aws',
      date: '2025',
      category: 'cloud',
      credentialId: 'AWS-CP-77412-DEV',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Fundamentos de infraestructura en la nube, computación sin servidor (Serverless), canalizaciones de despliegue continuo (CI/CD), almacenamiento distribuido y buenas prácticas de seguridad en la nube.',
      skills: ['AWS', 'Docker', 'CI/CD', 'Git', 'Linux'],
      hours: 75,
      image: null,
      featured: true
    },
    {
      id: 'cert-node-backend',
      title: 'Backend API Engineering con Node.js & Express',
      issuer: 'Platzi Certified Academy',
      issuerIcon: 'fab fa-node-js',
      date: '2024',
      category: 'backend',
      credentialId: 'PLTZ-ND-2024-5182',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Construcción de arquitecturas backend modulares, autenticación y autorización segura con JWT, validación de esquemas con Zod, manejo de middleware y persistencia eficiente.',
      skills: ['Node.js', 'Express', 'TypeScript', 'JavaScript', 'JWT'],
      hours: 55,
      image: null,
      featured: false
    },
    {
      id: 'cert-mobile-crossplatform',
      title: 'Desarrollo de Soluciones Móviles Multiplataforma',
      issuer: 'Google Developer Student Clubs',
      issuerIcon: 'fab fa-google',
      date: '2024',
      category: 'mobile',
      credentialId: 'GDSC-MOB-11902-DEV',
      credentialUrl: 'https://github.com/kiramman-mp3',
      description: 'Creación de aplicaciones móviles interactivas, consumo eficiente de servicios en segundo plano, principios de diseño Mobile-First y optimización del rendimiento en dispositivos móviles.',
      skills: ['React Native', 'Android', 'Mobile UI', 'APIs'],
      hours: 70,
      image: null,
      featured: false
    }
  ];

  constructor(private http: HttpClient) {}

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl).pipe(
      map((backendCerts) => {
        if (backendCerts && backendCerts.length > 0) {
          return backendCerts;
        }
        return this.fallbackCertificates;
      }),
      catchError(() => {
        console.warn('Failed to fetch certificates from backend, using local fallbacks');
        return of(this.fallbackCertificates);
      })
    );
  }

  getCertificateById(id: string): Observable<Certificate | undefined> {
    return this.http.get<Certificate>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const local = this.fallbackCertificates.find((c) => c.id === id);
        return of(local);
      })
    );
  }

  createCertificate(certificate: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, certificate, {
      headers: { 'x-api-key': token }
    });
  }

  updateCertificate(id: string, certificate: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, certificate, {
      headers: { 'x-api-key': token }
    });
  }

  deleteCertificate(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'x-api-key': token }
    });
  }

  getStats(certificatesList?: Certificate[]): Observable<CertificateStats> {
    const list = certificatesList || this.fallbackCertificates;
    const totalHours = list.reduce((acc, c) => acc + (c.hours || 0), 0);
    const uniqueCategories = new Set(list.map((c) => c.category));

    return of({
      totalCertificates: list.length,
      totalHours,
      verifiedPercentage: 100,
      specialtiesCount: uniqueCategories.size
    });
  }
}
