export const getImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  const base = import.meta.env.BASE_URL ?? '';
  if (base !== '/' && path.startsWith(base)) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}${cleanPath}`;
};
