import { useEffect, useRef } from 'react';
import ClickSpark from './react-bits/ClickSpark';

export function DownloadSparks() {
  const sparks = useRef<{ spark: (x?: number, y?: number) => void }>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function onClick(event: MouseEvent) {
      if (reducedMotion.matches || event.button !== 0 || !(event.target instanceof Element)) return;
      const action = event.target.closest('[data-download-spark], .card-nav__cta');
      if (!action) return;

      if (event.detail === 0) {
        const bounds = action.getBoundingClientRect();
        sparks.current?.spark(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
      } else {
        sparks.current?.spark(event.clientX, event.clientY);
      }
    }

    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <ClickSpark
      ref={sparks}
      className="download-sparks"
      style={{ position: 'fixed', inset: 0 }}
      sparkColor={['#f3ca81', '#fff0cf']}
      sparkCount={8}
      sparkSize={8}
      sparkWidth={1.5}
      sparkRadius={24}
      duration={360}
    />
  );
}
