import prisma from "../src/infrastructure/repository/prisma.ts";

async function main() {
  console.log("Checking database seeds...");

  // Seed Services if none exist
  const serviceCount = await prisma.services.count();
  if (serviceCount === 0) {
    console.log("Seeding services...");
    await prisma.services.createMany({
      data: [
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
      ]
    });
  }

  // Seed Projects if none exist
  const projectCount = await prisma.projects.count();
  if (projectCount === 0) {
    console.log("Seeding projects...");
    await prisma.projects.createMany({
      data: [
        {
          title: 'Proyecto Final Web',
          description: 'Plataforma web full stack para gestión de reservas hoteleras con panel administrativo y autenticación basada en roles.',
          technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript'],
          status: 'completado',
          image: '/img/Web.png',
          githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Web'
        },
        {
          title: 'Proyecto Final Distribuidas',
          description: 'Marketplace digital con arquitectura de microservicios, incluyendo sistema de pagos integrado y gateway API.',
          technologies: ['C#', '.NET Core', 'JavaScript', 'React', 'Docker'],
          status: 'en-progreso',
          image: '/img/Distribuidas.png',
          githubUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas'
        },
        {
          title: 'Proyecto GPIS',
          description: 'Sistema de gestión e información con arquitectura escalable y base de datos optimizada para grandes volúmenes de datos.',
          technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'AWS'],
          status: 'completado',
          image: '/img/GPIS.png',
          githubUrl: 'https://github.com/ArielParedesLozada/ProyectoGPIS'
        }
      ]
    });
  }

  // Seed Certificates if none exist
  const certCount = await prisma.certificates.count();
  if (certCount === 0) {
    console.log("Seeding initial certificates...");
    await prisma.certificates.createMany({
      data: [
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
          image: null
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
          image: null
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
          image: null
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
          image: null
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
          image: null
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
          image: null
        }
      ]
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
