import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pageNames = ['company', 'works', 'people', 'interview', 'career', 'environment', 'recruit'];
const htmlEntries = {
  index: resolve(__dirname, 'index.html'),
  ...Object.fromEntries(
    pageNames.map((pageName) => [`${pageName}/index`, resolve(__dirname, pageName, 'index.html')])
  )
};

export default defineConfig({
  plugins: [],
  root: './',
  publicDir: false, // publicディレクトリを使わない
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: htmlEntries,
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          // CSSファイルを css/styles.css に出力
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name].css';
          }
          // 画像ファイルはimagesフォルダに
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'images/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Sassのグローバル設定があればここに追加
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
