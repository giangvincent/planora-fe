import http from './http';

export const worldApi = {
  getState: () => http.get('/world/state'),
  placeItem: (data: { itemId: string; x: number; y: number }) => http.post('/world/place', data),
  unlockItem: (itemId: string) => http.post('/world/unlock', { itemId }),
};
