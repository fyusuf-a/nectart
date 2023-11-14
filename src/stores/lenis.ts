import type Lenis from '@studio-freight/lenis';
import { writable } from 'svelte/store';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

function createLenis() {
  const { subscribe, set } = writable(null as Lenis | null);

  let currentLenis: Lenis | null = null;
  let stopped = false;

  return {
    subscribe,
    initialize: (newLenis: Lenis) => {
      if (currentLenis) {
        return;
      }
      currentLenis = newLenis;
      set(newLenis);
      newLenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        if (stopped) {
          return;
        }
        newLenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    },
    destroy: () => {
      if (currentLenis) {
        currentLenis.destroy();
      }
      set(null);
    },
    start: () => {
      if (currentLenis) {
        currentLenis.start();
        stopped = false;
      }
    },
    stop: () => {
      if (currentLenis) {
        currentLenis.stop();
        stopped = true;
      }
    }
  };
}
export const lenis = createLenis();
