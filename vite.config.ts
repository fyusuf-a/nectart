import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { resolve } from 'path';

export default defineConfig({
  server: {
    fs: {
      allow: ['./tailwind.config.ts']
    }
  },
  ssr: {
    noExternal: ['gsap', '@gsap/ScrollTrigger']
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;'
      }
    }
  },
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'node-fetch': 'isomorphic-fetch'
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
