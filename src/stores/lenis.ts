import type Lenis from '@studio-freight/lenis';
import { writable } from 'svelte/store';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

function createLenis() {
  const { subscribe, set } = writable(null as Lenis | null);

  return {
    subscribe,
    initialize: (newLenis: Lenis) => {
      subscribe((lenis) => {
        if (lenis) {
          return;
        }
        set(newLenis);
        newLenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          newLenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      });
    },
    destroy: () => {
      subscribe((lenis) => {
        if (lenis) {
          lenis.destroy();
        }
      });
    },
    start: () => {
      subscribe((lenis) => {
        if (lenis) {
          lenis.start();
        }
      });
    },
    stop: () => {
      subscribe((lenis) => {
        if (lenis) {
          lenis.stop();
        }
      });
    }
  };
}
export const lenis = createLenis();
