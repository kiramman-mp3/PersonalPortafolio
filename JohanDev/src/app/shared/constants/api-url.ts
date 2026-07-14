export function getBaseApiUrl(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      return `https://personalportafolio-production.up.railway.app`;
    }
  }
  return 'https://personalportafolio-production.up.railway.app';
}
