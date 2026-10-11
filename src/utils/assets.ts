// Helper to resolve public assets correctly in development, GitHub Pages, or subpath deployments
export function assetUrl(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
