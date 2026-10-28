import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  root: './',
  publicDir: false, // publicディレクトリを使わない
  server: {
    open: true,
    port: 3000
  }
});
