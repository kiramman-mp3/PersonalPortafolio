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
  category: 'web' | 'backend' | 'cloud' | 'database' | 'mobile' | 'security' | 'network' | 'support' | 'iot' | string;
  credentialId: string;
  credentialUrl?: string | null;
  description: string;
  skills: string[];
  hours: number;
  image?: string | null;
  expirationDate?: string | null;
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
    },
    {
      id: 'cert-cisco-network-security',
      title: 'Network Support and Security',
      issuer: 'Cisco',
      issuerIcon: 'fas fa-network-wired',
      date: '2024',
      category: 'security',
      credentialId: '08191023-fb78-4796-b528-6858ca75b9f6',
      credentialUrl: 'https://www.credly.com/earner/earned/badge/08191023-fb78-4796-b528-6858ca75b9f6',
      description: 'Acreditación oficial emitida por Cisco que certifica competencias para dar soporte integral a endpoints, redes y usuarios finales mediante diagnóstico y documentación técnica, resolución de problemas de conectividad (Network Troubleshooting) tanto de forma local como remota, y configuración de accesos seguros.',
      skills: ['Network Troubleshooting', 'Documentation', 'Endpoint Devices', 'Help Desk', 'Support', 'User Support'],
      hours: 12,
      image: 'https://images.credly.com/size/340x340/images/a4dd891f-7bf5-4938-8241-50dc81e8cc00/image.png',
      expirationDate: 'This credential does not expire',
      featured: true
    },
    {
      id: 'cert-ibm-frontend',
      title: 'Front-End Web Development',
      issuer: 'IBM SkillsBuild',
      issuerIcon: 'fab fa-ibm',
      date: '2026',
      category: 'web',
      credentialId: '64e4f618-357d-43a6-b62c-9e996a1620c5',
      credentialUrl: 'https://www.credly.com/earner/earned/badge/64e4f618-357d-43a6-b62c-9e996a1620c5',
      description: 'This credential earner has advanced web development skills and the ability to craft interactive web pages using HTML, CSS, and JavaScript. The earner can identify software engineering principles and can handle errors within JavaScript. The individual has practical Command Line Interface skills for development environments and has practiced essential workplace skills.',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Web Development',
        'Web Applications',
        'Interactive Web Pages',
        'Problem Solving',
        'Critical Thinking',
        'Analytical Thinking',
        'Communication',
        'Attention To Detail',
        'Learning Agility',
        'Requirement Analysis',
        'Research'
      ],
      hours: 18,
      image: 'https://images.credly.com/images/99ea023d-3d8f-4b17-b527-7a084c021bd3/Front_20end_20Web_20Development.png',
      expirationDate: 'This credential does not expire',
      featured: true
    },
    {
      id: 'cert-ibm-backend',
      title: 'Back-End Development',
      issuer: 'IBM SkillsBuild',
      issuerIcon: 'fab fa-ibm',
      date: '2026',
      category: 'backend',
      credentialId: 'a077be6c-5ec7-42fd-8e51-1846d1e6f33a',
      credentialUrl: 'https://www.credly.com/earner/earned/badge/a077be6c-5ec7-42fd-8e51-1846d1e6f33a',
      description: 'This credential earner has the advanced skills and ability to set up an environment for web development and create web pages using basic HTML, CSS, and JavaScript. The individual can use Node.js for server-side programming and make HTTP calls to APIs and can apply the Model View Controller (MVC) framework for structured application development. The earner has practiced essential workplace skills.',
      skills: [
        'Node.js',
        'REST API',
        'API Development',
        'JavaScript',
        'HTML',
        'CSS',
        'Web Development',
        'Problem Solving',
        'Critical Thinking',
        'Research',
        'Requirement Analysis',
        'Career Management'
      ],
      hours: 12,
      image: 'https://images.credly.com/images/141a4f09-49ed-4526-9c5b-5894b47f2e07/Back_20End_20Development.png',
      expirationDate: 'This credential does not expire',
      featured: true
    },
    {
      id: 'cert-ibm-responsive-web',
      title: 'Responsive Web Page Development',
      issuer: 'IBM SkillsBuild',
      issuerIcon: 'fab fa-ibm',
      date: '2026',
      category: 'web',
      credentialId: '234b3e97-9db7-4af9-95e1-7339621ad33f',
      credentialUrl: 'https://www.credly.com/earner/earned/badge/234b3e97-9db7-4af9-95e1-7339621ad33f',
      description: 'This credential earner has the advanced skills and ability to create responsive web pages using CSS flex box and grid layouts. The individual can program responsive images and typography using CSS media queries in Bootstrap and can write efficient and readable codes using ES6 and modern JavaScript features. The earner has practiced essential workplace skills.',
      skills: [
        'Bootstrap',
        'CSS',
        'JavaScript',
        'Client-side programming',
        'Interactive Web Pages',
        'Problem Solving',
        'Critical Thinking',
        'Analytical Thinking',
        'Attention To Detail',
        'Career Management'
      ],
      hours: 18,
      image: 'https://images.credly.com/images/f5909ca5-9e85-47c2-88e7-b068b84adb77/AdvancedBadgeEmblem_ResponsiveWebPageDevelopment.png',
      expirationDate: 'This credential does not expire',
      featured: true
    },
    {
      id: 'cert-cisco-intro-iot',
      title: 'Introduction to IoT',
      issuer: 'Cisco',
      issuerIcon: 'fas fa-network-wired',
      date: '2024',
      category: 'iot',
      credentialId: 'f1d502d1-1f9d-4d6b-929d-b81938500bd2',
      credentialUrl: 'https://www.credly.com/earner/earned/badge/f1d502d1-1f9d-4d6b-929d-b81938500bd2',
      description: 'Cisco verifies the earner of this badge successfully completed the Introduction to Internet of Things course. The holder of this student-level credential has introductory knowledge of IoT and has an understanding how it enables the Digital Transformation along with emerging technologies such as data analytics, AI/ML and the increased attention on cybersecurity. They understand the importance of Intent Based Networking to be able to connect and secure tens of billions of new devices with ease.',
      skills: ['IoT', 'Internet Of Things', 'Digital Transformation', 'Cybersecurity', 'Networking', 'AI/ML'],
      hours: 6,
      image: 'https://images.credly.com/images/fce226c2-0f13-4e17-b60c-24fa6ffd88cb/Intro2IoT.png',
      expirationDate: 'This credential does not expire',
      featured: true
    },
    {
      id: 'cert-uta-suficiencia-ingles',
      title: 'Suficiencia en Lengua Inglesa',
      issuer: 'Universidad Técnica de Ambato (UTA)',
      issuerIcon: 'fas fa-university',
      date: '2024',
      category: 'idiomas',
      credentialId: 'UTA-IDIOMAS-SUF-DEV',
      credentialUrl: 'https://fcs.uta.edu.ec/',
      description: 'Certificado oficial de Suficiencia en Lengua Inglesa otorgado por el Centro de Idiomas de la Universidad Técnica de Ambato (UTA). Acredita competencias avanzadas en comprensión lectora, redacción técnica, listening y comunicación oral para entornos académicos y de ingeniería.',
      skills: ['Inglés Técnico', 'Comprensión Auditiva (Listening)', 'Lectura Académica (Reading)', 'Comunicación Profesional', 'Redacción Técnica', 'English Proficiency'],
      hours: 360,
      image: null,
      expirationDate: 'No expira',
      featured: true
    },
    {
      id: 'cert-ets-toefl-proficiency',
      title: 'TOEFL - Test of English as a Foreign Language',
      issuer: 'ETS (Educational Testing Service)',
      issuerIcon: 'fas fa-award',
      date: '2024',
      category: 'idiomas',
      credentialId: 'ETS-TOEFL-CERT',
      credentialUrl: 'https://www.ets.org/toefl.html',
      description: 'Certificación estandarizada internacional de dominio del idioma inglés desarrollada por ETS (Educational Testing Service). Valida habilidades avanzadas de comunicación, comprensión de lectura y escucha en contextos técnicos y profesionales globales.',
      skills: ['English Proficiency', 'Academic English', 'Listening Comprehension', 'Reading Comprehension', 'Structure and Written Expression', 'Global Communication'],
      hours: 120,
      image: null,
      expirationDate: 'Vigencia oficial ETS',
      featured: true
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
