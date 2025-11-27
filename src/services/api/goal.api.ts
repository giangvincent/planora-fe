import http from './http';

export const goalApi = {
  getAll: () => http.get('/goals'),
  create: (data: any) => http.post('/goals', data),
  update: (id: number, data: any) => http.put(`/goals/${id}`, data),
  delete: (id: number) => http.delete(`/goals/${id}`),
};
