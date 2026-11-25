import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BounceCards from './react-bits/BounceCards';

const rivals = [
  { id: 'aarav', name: 'Aarav', title: 'Last-Row Newcomer', matchup: 'Rival 1 of 24', pen: 'Classic Ballpoint' },
  { id: 'meera', name: 'Meera “Sniper”', title: 'Class Monitor Boss', matchup: 'Rival 8 of 24', pen: 'Neon Highlighter' },
  { id: 'ira', name: 'Ira “Aura Prime”', title: 'Grand Champion Boss', matchup: 'Rival 24 of 24', pen: 'Gold Fountain' },
];

export function RivalShowcase() {
  const [active, setActive] = useState(rivals[1]);

  return (
    <section aria-labelledby="rivals-heading" className="game-section textile-section rival-section">
      <div className="site-editorial-width grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <div>
          <h2 id="rivals-heading" className="editorial-heading">Meet your rivals</h2>
          <div id="rival-profile" aria-live="polite" className="mt-5 border-l-2 border-[var(--site-accent)] pl-4 lg:mt-8">
            <p className="text-xs font-bold text-[var(--site-accent)]">{active.matchup}</p>
            <h3 className="mt-1 font-display text-3xl font-bold leading-none sm:text-4xl">{active.name}</h3>
            <p className="mt-2 text-sm text-[var(--site-muted)]">{active.title} <span aria-hidden="true">·</span> {active.pen}</p>
          </div>
          <Link to="#showcase" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--site-accent)] hover:text-white">
            Watch a Tournament round <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <BounceCards
          activeId={active.id}
          cards={rivals.map((rival) => ({
            id: rival.id, label: rival.name, src: `/media/portraits/${rival.id}.webp`,
          }))}
          onSelect={(id) => {
            const next = rivals.find((rival) => rival.id === id);
            if (next) setActive(next);
          }}
        />
      </div>
    </section>
  );
}
