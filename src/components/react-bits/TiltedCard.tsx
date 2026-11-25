import { useRef, useState, type PointerEvent } from 'react';
import { domAnimation, LazyMotion, m, useReducedMotion, useSpring } from 'motion/react';

// Adapted from React Bits TiltedCard, revision 4320598. See LICENSE.md.
export default function TiltedCard({ src, alt }: { src: string; alt: string }) {
  const figure = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [angle, setAngle] = useState(0);
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
    <div className="mx-auto w-full max-w-[590px]">
      <figure ref={figure} onPointerMove={move} onPointerLeave={reset} className="[perspective:650px]">
        <div className="motion-safe:transition-transform motion-safe:duration-150" style={{ transform: `rotateY(${angle}deg)` }}>
          <LazyMotion features={domAnimation}>
            <m.img src={src} alt={alt} width={600} height={174} draggable={false} loading="lazy"
              className="mx-auto h-auto w-full drop-shadow-[0_13px_9px_#0009]" style={reduced ? undefined : { rotateX, rotateY }} />
          </LazyMotion>
        </div>
      </figure>
      <label className="mx-auto mt-3 flex min-h-11 max-w-64 flex-wrap items-center justify-between gap-x-3 text-xs font-semibold text-[var(--site-muted)]">
        <span>Tilt the pen</span>
        <input type="range" min={-45} max={45} value={angle} onChange={(event) => setAngle(Number(event.target.value))}
          className="pen-angle h-9 min-w-0 flex-1" />
      </label>
    </div>
  );
}
