import axios from 'axios';
import { Job, TimelineEntry } from '@/types/job';

const API_BASE_URL = 'https://www.nexdev-job-tracker-api.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const jobsApi = {
  getAll: () => api.get<Job[]>('/jobs'),
  getById: (id: string) => api.get<Job>(`/jobs/${id}`),
  create: (data: Partial<Job>) => api.post<Job>('/jobs', data),
  update: (id: string, data: Partial<Job>) => api.patch<Job>(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  archive: (id: string) => api.patch<Job>(`/jobs/${id}`, { isArchived: true }),
  scheduleFollowUp: (id: string, date: string) => 
    api.post<TimelineEntry>(`/jobs/${id}/follow-up`, { date }),
};

export const authApi = {
  login: (email: string, password: string) => 
    api.post<{ token: string; user: { id: string; email: string; name: string; username?: string } }>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, username: string) => 
    api.post<{ token: string; user: { id: string; email: string; name: string; username: string } }>('/auth/register', { name, email, password, username }),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  getHealth: () => api.get('/health'),
};
