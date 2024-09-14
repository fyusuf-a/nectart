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
        autoprefixer(),
        tailwindcss(),
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;'
      }
    }
  },
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
