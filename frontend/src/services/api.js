import axios from 'axios';

// API Base URL Configuration:
// - Local Development: '/api/v1' (proxied via Vite server on localhost:3000 -> localhost:8000)
// - Production Cloud Deployment (e.g. Vercel/Render): Set import.meta.env.VITE_API_URL || '/api/v1'
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization Header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

export const resumeAPI = {
  uploadResume: (formData) => api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getLatest: () => api.get('/resumes/latest'),
  getHistory: () => api.get('/resumes/history'),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  optimizeBullet: (data) => api.post('/resumes/optimize-bullet', data),
};

export const atsAPI = {
  getReport: () => api.get('/ats/report'),
  getDashboardMetrics: () => api.get('/ats/dashboard-metrics'),
};

export const skillsAPI = {
  matchJobDescription: (data) => api.post('/skills/match-jd', data),
};

export const interviewAPI = {
  generateQuestions: (data) => api.post('/interviews/questions', data),
  evaluateAnswer: (data) => api.post('/interviews/evaluate', data),
  getHistory: () => api.get('/interviews/history'),
};

export const roadmapAPI = {
  generateRoadmap: (data) => api.post('/roadmaps/generate', data),
  getCurrent: () => api.get('/roadmaps/current'),
};

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
};

export default api;
