import { useRef, type PointerEvent } from 'react';
import { domAnimation, LazyMotion, m, useReducedMotion, useSpring } from 'motion/react';

// Adapted from React Bits TiltedCard, revision 4320598. See LICENSE.md.
export default function TiltedCard({ src, alt }: { src: string; alt: string }) {
  const figure = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { damping: 25, stiffness: 140 });
  const rotateY = useSpring(0, { damping: 25, stiffness: 140 });

  function move(event: PointerEvent<HTMLElement>) {
    if (!figure.current || reduced || event.pointerType !== 'mouse') return;
    const box = figure.current.getBoundingClientRect();
    rotateX.set((0.5 - (event.clientY - box.top) / box.height) * 14);
    rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 14);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure ref={figure} onPointerMove={move} onPointerLeave={reset} className="mx-auto w-full max-w-[590px] [perspective:650px]">
      <LazyMotion features={domAnimation}>
        <m.img src={src} alt={alt} width={600} height={174} draggable={false} loading="lazy"
          className="mx-auto h-auto w-full drop-shadow-[0_13px_9px_#0009]" style={reduced ? undefined : { rotateX, rotateY }} />
      </LazyMotion>
    </figure>
  );
}
