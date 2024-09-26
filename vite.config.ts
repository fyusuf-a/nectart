import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
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
      'node-fetch': 'isomorphic-fetch'
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
