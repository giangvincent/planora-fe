import http from './http';

export const gamificationApi = {
  getState: () => http.get('/gamification/state'),
  sync: (data: any) => http.post('/gamification/sync', data),
};
