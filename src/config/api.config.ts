export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://goldenmeraki-mt.onrender.com')
).replace(/\/$/, '');

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
};
