import http from './http';

export const pixelWorldApi = {
  getWorld: () => http.get('/world'),
  saveWorld: (data: any) => http.post('/world', data),
};
