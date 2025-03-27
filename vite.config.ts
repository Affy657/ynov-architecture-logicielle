import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: Number(process.env.SERVER_PORT),
  },
});
