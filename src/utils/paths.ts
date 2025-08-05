// Utility function to handle base paths for both development and production
export function getBasePath(path: string): string {
  // In development, BASE_URL is '/', in production it's '/workers.github.io/'
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
} 