import axios from 'axios';

let authToken = typeof window !== 'undefined'
  ? window.localStorage.getItem('planora_token')
  : null;

export const setAuthToken = (token) => {
  authToken = token;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
