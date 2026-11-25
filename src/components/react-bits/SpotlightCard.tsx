import { type MouseEvent, type PropsWithChildren } from 'react';

// Adapted from React Bits SpotlightCard, revision 4320598. See LICENSE.md.
interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export default function SpotlightCard({ children, className, spotlightColor }: SpotlightCardProps) {
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  }

  return (
    <article onMouseMove={handleMouseMove} className={`group relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="spotlight-card-light pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 250px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent)`,
        }}
      />
      {children}
    </article>
  );
}
