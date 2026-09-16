// Thin fetch wrapper. In local dev, Vite proxies /api to the Express backend
// (see vite.config.js). In production (Netlify), set VITE_API_URL to your
// deployed backend's URL (e.g. https://your-app.onrender.com) as an
// environment variable in Netlify's site settings.
const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api`;

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = localStorage.getItem('admin_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.error || 'Request failed.');
    error.status = res.status;
    error.details = data.details;
    throw error;
  }

  return data;
}

export const api = {
  // Public reads
  getProfile: () => request('/profile'),
  getSkills: () => request('/skills'),
  getCertifications: () => request('/certifications'),
  getEducation: () => request('/education'),
  getProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  getExperience: () => request('/experience'),
  getAchievements: () => request('/achievements'),
  getSocialLinks: () => request('/social-links'),
  sendContactMessage: (payload) => request('/contact', { method: 'POST', body: payload }),

  // Auth
  login: (username, password) => request('/auth/login', { method: 'POST', body: { username, password } }),
  me: () => request('/auth/me', { auth: true }),

  // Admin writes (generic per-resource helpers)
  create: (resource, payload) => request(`/${resource}`, { method: 'POST', body: payload, auth: true }),
  update: (resource, id, payload) => request(`/${resource}/${id}`, { method: 'PUT', body: payload, auth: true }),
  remove: (resource, id) => request(`/${resource}/${id}`, { method: 'DELETE', auth: true }),
  updateProfile: (payload) => request('/profile', { method: 'PUT', body: payload, auth: true }),

  getContactMessages: () => request('/contact', { auth: true }),
  markMessageRead: (id) => request(`/contact/${id}/read`, { method: 'PUT', auth: true }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: 'DELETE', auth: true }),
};
