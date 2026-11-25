import { useState, type CSSProperties } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { COLLECTIBLE_PENS } from '../data/gameContent';
import TiltedCard from './react-bits/TiltedCard';

const starter = COLLECTIBLE_PENS[0];

export function PenShowcase() {
  const [activePen, setActivePen] = useState(starter);
  const [test, setTest] = useState(0);
  const slideDirection = activePen.impactResistance > starter.impactResistance ? "less" : "farther";

  return (
    <section id="pens" aria-labelledby="pens-heading" className="scroll-mt-20 border-t border-white/10 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 id="pens-heading" className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">Pen Garage</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-slate-300">Choose a pen to see how it handles and what you’ll need to unlock it in Tournament.</p>
        <div className="mt-7 grid items-start gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-7">
          <div role="group" aria-label="Choose a pen" className="grid min-w-0 grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
            {COLLECTIBLE_PENS.map((pen) => (
              <button key={pen.id} type="button" aria-pressed={pen.id === activePen.id} aria-controls="garage-profile"
                onClick={() => { setActivePen(pen); setTest(0); }}
                className={`min-w-0 rounded-xl border px-2 py-2.5 text-left transition-colors sm:px-3 ${pen.id === activePen.id
                  ? 'border-sky-300/55 bg-sky-400/10 text-sky-100'
                  : 'border-white/10 bg-[#11151F] text-slate-200 hover:border-white/30'}`}>
                <img alt="" src={`/pens/${pen.id}.webp`} width={600} height={174} loading="lazy" className="h-auto w-full" />
                <span className="mt-0.5 block text-xs font-semibold sm:text-sm">{pen.name}</span>
              </button>
            ))}
          </div>
          <div id="garage-profile" className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11151F]"
            style={{ '--pen-accent': activePen.accentHex } as CSSProperties}>
            <div className="garage-stage grid min-h-44 place-items-center border-b border-white/10 px-5 py-3 sm:min-h-56">
              <TiltedCard src={`/pens/${activePen.id}.webp`} alt={activePen.name} />
            </div>
            <div className="p-4 sm:p-6">
              <div aria-live="polite">
                <p className="text-xs font-semibold text-slate-300">{activePen.archetype}</p>
                <h3 className="mt-1 font-display text-4xl font-bold leading-none text-white">{activePen.name}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">{activePen.handlingSummary}</p>
                <p className="mt-4 flex items-start gap-2 text-sm text-amber-100">
                  <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{activePen.unlockPath}
                </p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4" aria-label="Illustrative handling ratings">
                {([
                  ['Stability', activePen.attributes.weight],
                  ['Control', activePen.attributes.control],
                  ['Impact', activePen.attributes.impact],
                ] as const).map(([label, value]) => (
                  <div key={label}>
                    <div className="flex flex-wrap items-end justify-between gap-x-1 text-xs text-slate-300">
                      <span>{label}</span><span className="font-mono">{value}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                      <div className="h-full rounded-full bg-[var(--pen-accent)] motion-safe:transition-[width]" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-[#0B111B] p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Same hit, different slide</h4>
                    <p className="mt-1 text-xs text-slate-300">Illustrative stability comparison with the starter.</p>
                  </div>
                  <button type="button" onClick={() => setTest(test + 1)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-sky-200/25 px-3 text-xs font-semibold text-sky-100 hover:bg-sky-300/10">
                    {test ? 'Replay hit' : 'Test the hit'}<ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
                <div key={test} className="mt-3 space-y-2" aria-hidden="true">
                  {[starter, activePen].map((pen, index) => {
                    const slide = 44 / pen.impactResistance;
                    return (
                      <div key={index} className="relative h-6 overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
                        <span className="absolute inset-y-0 left-2 flex items-center text-[10px] text-slate-300">{index === 0 ? 'Starter' : 'Selected'}</span>
                        <span className={`garage-test-pen absolute left-[27%] top-[calc(50%-3px)] h-1.5 w-[14%] rounded-full ${test ? 'garage-test-slide' : ''}`}
                          style={{ backgroundColor: pen.accentHex, '--slide-distance': `${slide / 0.14}%` } as CSSProperties} />
                      </div>
                    );
                  })}
                </div>
                <p role="status" className="mt-2 min-h-4 text-xs text-slate-300">
                  {test > 0 && (activePen.id === starter.id ? 'Both runs show the same starter pen. Select another pen to compare.' : `${activePen.name} slides ${slideDirection} under the same hit.`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
