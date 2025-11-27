import http from './http';

export const calendarApi = {
  getRange: (start: string, end: string) => http.get('/calendar', { params: { start, end } }),
  create: (data: any) => http.post('/calendar', data),
  update: (id: string, data: any) => http.put(`/calendar/${id}`, data),
  delete: (id: string) => http.delete(`/calendar/${id}`),
};
