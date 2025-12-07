import http from './http';

export const roleApi = {
  getAll: () => http.get('/roles'),
  getById: (id: string) => http.get(`/roles/${id}`),
  create: (data: any) => http.post('/roles', data),
  update: (id: string, data: any) => http.put(`/roles/${id}`, data),
  delete: (id: string) => http.delete(`/roles/${id}`),
};
