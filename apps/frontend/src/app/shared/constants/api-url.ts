/**
 * URL base del backend para llamadas a la API.
 * 
 * Modos soportados:
 * 1. Despliegue unificado en Vercel (Monorepo): detecta vercel.app o mismo origen y usa `${window.location.origin}/api`.
 * 2. Despliegue separado en Vercel/Railway: usa DEFAULT_REMOTE_API o variable configurable.
 * 3. Desarrollo local: soporta backend local (http://localhost:4000) o fallback remoto.
 */

// Si tu backend está alojado de forma separada en Vercel, coloca aquí su URL (ej: 'https://mi-backend.vercel.app')
export const DEFAULT_REMOTE_API = 'https://personalportafolio-production.up.railway.app';

export function getBaseApiUrl(): string {
  if (typeof window !== 'undefined') {
    // 1. Configuración dinámica en runtime (si se define en window o localStorage)
    const customApi = (window as any).__API_URL__ || localStorage.getItem('api_url');
    if (customApi) {
      return customApi.replace(/\/$/, '');
    }

    const hostname = window.location.hostname;

    // 2. Si está alojado en Vercel (monorepo unificado con backend en /api)
    if (hostname.endsWith('.vercel.app')) {
      return `${window.location.origin}/api`;
    }

    // 3. Desarrollo local (localhost / 127.0.0.1)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      // Si prefieres usar el backend local en puerto 4000, descomenta la siguiente línea o guarda 'local' en localStorage:
      if (localStorage.getItem('use_local_backend') === 'true') {
        return 'http://localhost:4000';
      }
      return DEFAULT_REMOTE_API;
    }
  }

  // Fallback para SSR o producción externa
  return DEFAULT_REMOTE_API;
}
