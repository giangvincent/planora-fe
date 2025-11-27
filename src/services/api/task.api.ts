import http from './http';

export const taskApi = {
  getAll: () => http.get('/tasks'),
  create: (data: any) => http.post('/tasks', data),
  update: (id: number, data: any) => http.put(`/tasks/${id}`, data),
  delete: (id: number) => http.delete(`/tasks/${id}`),
};
