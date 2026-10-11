# Guía de Despliegue en Vercel (Frontend + Backend Unificados)

Este proyecto está configurado para desplegarse como un **Monorepo Full-Stack unificado** en **[Vercel](https://vercel.com/)**.

---

## 🏗️ Arquitectura en Vercel

```text
Usuario / Navegador
        │
        ▼
   https://tu-proyecto.vercel.app
        ├── /api/*  ──────► Serverless Function (Express + Prisma via /api/index.ts)
        └── /*      ──────► Frontend Angular 22 (SPA estático / CDN de Vercel)
```

* **Dominio único**: Tanto el frontend como el backend viven bajo el mismo dominio de Vercel (ej: `https://mi-portafolio.vercel.app`).
* **Cero problemas de CORS**: Las peticiones del cliente van directamente a `/api/...` sobre el mismo origen (`${window.location.origin}/api`).
* **Serverless Functions**: Vercel detecta automáticamente `api/index.ts` y lo convierte en una función Serverless Node.js de alta disponibilidad.

---

## 📁 Estructura de Archivos del Proyecto

```text
JohanDev/
├── api/
│   └── index.ts                 # Punto de entrada Serverless para Vercel
├── apps/
│   ├── api/                     # Backend: Express, Prisma, PostgreSQL
│   │   ├── prisma/              # schema.prisma y migraciones
│   │   ├── src/                 # Rutas, controladores, modelos
│   │   ├── package.json         # Dependencias del API
│   │   └── tsconfig.json        # Configuración TypeScript del API
│   │
│   └── frontend/                # Frontend: Angular 22
│       ├── src/                 # Componentes, vistas y estilos
│       ├── angular.json         # Configuración Angular
│       ├── package.json         # Dependencias del Frontend
│       └── vercel.json          # Configuración independiente (opcional)
│
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore                   # Exclusiones de seguridad
├── package.json                 # Workspaces y scripts raíz
├── tsconfig.json                # Configuración TypeScript para Vercel
├── vercel.json                  # Enrutamiento unificado para Vercel
└── DEPLOYMENT_VERCEL.md         # Esta guía de despliegue
```

---

## 🚀 Pasos para Desplegar en Vercel

1. **Subir los cambios a GitHub**:
   ```bash
   git add .
   git commit -m "feat: configure unified vercel fullstack deployment"
   git push origin main
   ```

2. **Crear el Proyecto en Vercel**:
   - Entra a [Vercel Dashboard](https://vercel.com/dashboard).
   - Haz clic en **Add New...** -> **Project**.
   - Importa tu repositorio de GitHub (`PersonalPortafolio`).

3. **Configuración del Proyecto en Vercel**:
   - **Framework Preset**: *Other* (o detectará Angular).
   - **Root Directory**: `./` (Déjalo en la raíz para que Vercel gestione el monorepo y la carpeta `api/`).
   - **Build Command**: `npm run build` (detectado automáticamente desde `package.json`).
   - **Output Directory**: `apps/frontend/dist/JohanDev/browser` (configurado en `vercel.json`).

4. **Variables de Entorno (Environment Variables)**:
   En **Settings -> Environment Variables** de tu proyecto en Vercel, agrega:
   * `DATABASE_URL`: Tu cadena de conexión PostgreSQL (Recomendado: Neon, Supabase o Railway).
   * `API_KEY`: Tu clave secreta para la API (`x-api-key`).
   * `ADMIN_PASSWORD`: Tu contraseña de administrador para `/admin`.
   * `NODE_ENV`: `production`.

5. **Deploy**:
   - Haz clic en **Deploy**.
   - Vercel compilará la API (`prisma generate && tsc`), compilará Angular (`ng build`) y levantará el backend como Serverless Function bajo `/api`.

---

## 💻 Desarrollo Local

Para trabajar localmente en tu equipo:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar Backend Express en desarrollo (puerto 4000)
npm run dev:api

# 3. Iniciar Frontend Angular en desarrollo (puerto 4200)
npm run dev:frontend

# 4. Probar la compilación de ambos proyectos
npm run build

# 5. Abrir Prisma Studio
npm run prisma:studio
```
