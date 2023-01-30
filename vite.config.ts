import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/scss/utils/variables.scss" as *;`
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '~/',
        replacement: `/src/`
      }
    ]
  }
})
