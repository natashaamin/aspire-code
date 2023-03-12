import { createPinia } from 'pinia';

export const install = (app: any) => {
  app.use(createPinia());
};