import prisma from "../src/infrastructure/repository/prisma.ts";

async function main() {
  console.log("Seeding database...");

  // Limpiar base de datos
  await prisma.services.deleteMany();
  await prisma.projects.deleteMany();

  // Seed Services
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

  // Seed Projects
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

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
