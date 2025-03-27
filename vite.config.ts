import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    port: process.env.FRONT_PORT as unknown as number,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/modules/MissionControl/index.html'),
      },
    },
  },
});