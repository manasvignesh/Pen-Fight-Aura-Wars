import { type PointerEvent } from 'react';

// Adapted from React Bits Bounce Cards, revision 4320598. See LICENSE.md.
interface BounceCardsProps {
  activeId: string;
  cards: { id: string; label: string; src: string }[];
  onSelect: (id: string) => void;
}

export default function BounceCards({ activeId, cards, onSelect }: BounceCardsProps) {
  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--rival-yaw', `${((event.clientX - box.left) / box.width - 0.5) * 16}deg`);
    card.style.setProperty('--rival-pitch', `${(0.5 - (event.clientY - box.top) / box.height) * 14}deg`);
  }

  function reset(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.removeProperty('--rival-yaw');
    event.currentTarget.style.removeProperty('--rival-pitch');
  }

  return (
    <div role="group" aria-label="Tournament rivals" className="rival-fan">
      {cards.map(({ id, label, src }) => (
        <button type="button" key={id} aria-pressed={activeId === id} aria-controls="rival-profile" onClick={() => onSelect(id)}
          onPointerMove={tilt} onPointerLeave={reset} className="rival-portrait">
          <img src={src} alt="" loading="lazy" width={600} height={900} className="w-full object-cover" />
          <span className="rival-name block px-1.5 py-2 text-center font-display text-base font-bold leading-none sm:py-3 sm:text-2xl">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
