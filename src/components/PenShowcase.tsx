import { useState, type CSSProperties } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { COLLECTIBLE_PENS } from '../data/gameContent';
import TiltedCard from './react-bits/TiltedCard';

const starter = COLLECTIBLE_PENS[0];

export function PenShowcase() {
  const [activePen, setActivePen] = useState(starter);
  const [test, setTest] = useState(0);
  const slideDirection = activePen.impactResistance > starter.impactResistance ? 'less' : 'farther';
  const scores = [
    ['Stability', activePen.attributes.weight],
    ['Control', activePen.attributes.control],
    ['Impact', activePen.attributes.impact],
  ] as const;

  return (
    <section id="pens" aria-labelledby="pens-heading" className="game-section textile-section poster-catalog">
      <div className="site-editorial-width">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="pens-heading" className="editorial-heading">Pen Garage</h2>
          <p className="max-w-[32ch] pb-1 text-sm leading-relaxed text-[var(--site-muted)] sm:text-base">
            Six pens, each with its own handling and Tournament unlock.
          </p>
        </div>
        <div role="group" aria-label="Choose a pen" className="mt-7 grid grid-cols-3 gap-2 sm:mt-9 lg:grid-cols-6">
          {COLLECTIBLE_PENS.map((pen) => (
            <button key={pen.id} type="button" aria-pressed={pen.id === activePen.id} aria-controls="garage-profile"
              onClick={() => { setActivePen(pen); setTest(0); }}
              className="game-selector min-w-0 px-2 pb-3 pt-2 text-center text-[11px] font-bold sm:px-3 sm:text-sm"
              style={{ '--pen-accent': pen.accentHex } as CSSProperties}>
              <img alt="" src={`/pens/${pen.id}.webp`} width={600} height={174} loading="lazy" className="mx-auto mb-1 h-auto w-full max-w-32" />
              {pen.name}
            </button>
          ))}
        </div>
        <div id="garage-profile" className="game-frame mt-3 grid min-w-0 overflow-hidden lg:grid-cols-[1.15fr_0.85fr]"
          style={{ '--pen-accent': activePen.accentHex } as CSSProperties}>
          <div className="garage-catalog-stage relative isolate grid min-h-52 place-items-center overflow-hidden px-6 py-10 sm:min-h-80 lg:min-h-[340px]">
            <div key={activePen.id} className="editorial-reveal w-full">
              <TiltedCard src={`/pens/${activePen.id}.webp`} alt={activePen.name} />
            </div>
          </div>
          <div className="min-w-0 p-5 sm:p-7 lg:border-l lg:border-[var(--site-rule)]">
            <div aria-live="polite">
              <p className="text-sm font-bold text-[var(--site-accent)]">{activePen.archetype}</p>
              <h3 className="mt-1 font-display text-[clamp(3rem,5vw,4.75rem)] font-extrabold leading-[0.9] tracking-tight">{activePen.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--site-muted)] sm:text-base">{activePen.handlingSummary}</p>
              <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-[var(--site-text)]">
                <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{activePen.unlockPath}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-3 border-y border-[var(--site-rule)]" aria-label="Illustrative handling ratings">
              {scores.map(([label, value]) => (
                <div key={label} className="border-r border-[var(--site-rule)] px-2 py-3 first:pl-0 last:border-r-0 sm:px-4">
                  <p className="font-display text-3xl font-bold leading-none sm:text-4xl">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--site-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-7 grid items-center gap-5 border-y border-[var(--site-rule)] py-5 lg:mt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-display text-2xl font-bold leading-none sm:text-3xl">Same hit, different slide.</h4>
              <p className="mt-1.5 text-xs text-[var(--site-muted)]">An illustrative comparison with the starter pen.</p>
            </div>
            <button type="button" onClick={() => setTest((previous) => previous + 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--site-rule)] px-3 text-xs font-bold hover:bg-white/10 hover:text-white">
              {test ? 'Replay hit' : 'Test the hit'}<ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <div>
            <div key={test} className="space-y-2" aria-hidden="true">
              {[starter, activePen].map((pen, index) => {
                const slide = 44 / pen.impactResistance;
                return (
                  <div key={index} className="relative h-6 overflow-hidden border-b border-[var(--site-rule)] bg-white/[0.05]">
                    <span className="absolute inset-y-0 left-2 flex items-center text-[10px] font-semibold text-[var(--site-muted)]">{index === 0 ? 'Starter' : 'Selected'}</span>
                    <span className={`absolute left-[28%] top-[calc(50%-3px)] h-1.5 w-[14%] rounded-full ${test ? 'garage-test-slide' : ''}`}
                      style={{ backgroundColor: pen.accentHex, '--slide-distance': `${slide / 0.14}%` } as CSSProperties} />
                  </div>
                );
              })}
            </div>
            <p role="status" className="mt-2 min-h-4 text-xs text-[var(--site-muted)]">
              {test > 0 && (activePen.id === starter.id ? 'Select another pen to compare it with the starter.' : `${activePen.name} slides ${slideDirection} under the same hit.`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
