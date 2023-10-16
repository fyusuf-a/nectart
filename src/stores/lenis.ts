import type Lenis from '@studio-freight/lenis';
import { writable } from 'svelte/store';

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
        function raf(time: number) {
          newLenis.raf(time);
          requestAnimationFrame(raf);
        }
        window.requestAnimationFrame(raf);
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
