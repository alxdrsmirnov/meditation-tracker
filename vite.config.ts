import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Исключаем SVG-элементы из компиляции как компоненты
          isCustomElement: (tag) => tag === 'effect' || tag === 'filter'
        }
      }
    })
  ],
})
