import http from './http';

export const authApi = {
  login: (credentials: any) => http.post('/auth/login', credentials),
  register: (data: any) => http.post('/auth/register', data),
  logout: () => http.post('/auth/logout'),
  refresh: () => http.post('/auth/refresh'),
  getProfile: () => http.get('/auth/profile'),
};
