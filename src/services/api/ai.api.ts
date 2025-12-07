import http from './http';

export const aiApi = {
  generateRoadmap: (prompt: string, context?: string) => http.post('/ai/generate-roadmap', { prompt, context }),
};
