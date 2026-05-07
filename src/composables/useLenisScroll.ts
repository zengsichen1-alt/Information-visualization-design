import { onBeforeUnmount, onMounted } from 'vue';
import Lenis from 'lenis';
import type { LenisInstance } from '../types/legacy';

declare global {
  interface Window {
    __lenis?: LenisInstance;
  }
}

export function useLenisScroll() {
  let lenis: Lenis | null = null;

  onMounted(() => {
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.05,
    });

    window.__lenis = lenis as unknown as LenisInstance;
  });

  onBeforeUnmount(() => {
    lenis?.destroy();
    lenis = null;
    delete window.__lenis;
  });
}
