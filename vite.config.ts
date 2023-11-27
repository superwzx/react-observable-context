const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import VitePluginStyleInject from 'vite-plugin-style-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    react(),
    VitePluginStyleInject(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ReactObservableContext',
      formats: ['es', 'umd'],
      fileName: 'index'
    },
    minify: 'terser',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'monaco-editor'
      ],
      output: {
        inlineDynamicImports: true,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'react': 'React',
          'react-dom': 'ReactDom',
          'monaco-editor': 'monaco'
        }
      }
    }
  }
});