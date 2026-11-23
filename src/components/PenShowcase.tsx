import { useState } from 'react';
import { COLLECTIBLE_PENS, PEN_LINEUP_ART } from '../data/gameContent';
import { MediaFrame } from './MediaFrame';

export function PenShowcase() {
  const [selectedPenId, setSelectedPenId] = useState(COLLECTIBLE_PENS[0].id);
  const activePen =
    COLLECTIBLE_PENS.find((pen) => pen.id === selectedPenId) ?? COLLECTIBLE_PENS[0];

  return (
    <section id="pens" aria-labelledby="pens-heading" className="border-t border-white/[0.08] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#EAB308]">Collectible Arsenal</p>
          <h2
            id="pens-heading"
            className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Six Distinct Classroom Pens
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#B4BCCE]">
            Each pen brings its own mass, barrel geometry, and desk-handling character. Unlock pens through coins, gameplay progression, and supported in-game achievements as they roll out.
          </p>
        </div>

        {/* Studio Lineup Key Art */}
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#121620]">
          <MediaFrame
            src={PEN_LINEUP_ART}
            alt="Overhead studio lineup of the six collectible pens on a dark walnut wooden classroom desk: Classic Ballpoint, Hyper Gel Pro, Neon Highlighter, Chunky Marker, Vortex Spinner, and Gold Fountain"
            fallbackTitle="Collectible Pen Lineup"
            aspectClassName="aspect-[16/9]"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-5 py-3.5 text-xs text-[#94A3B8]">
            <span>Left to right: Classic Ballpoint · Hyper Gel Pro · Neon Highlighter · Chunky Marker · Vortex Spinner · Gold Fountain</span>
            <span>Studio concept render · Select a pen below to inspect profile</span>
          </div>
        </div>

        {/* Interactive Selector + Detail Split */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Pen Selector List */}
          <div
            role="tablist"
            aria-label="Collectible pens"
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1"
          >
            {COLLECTIBLE_PENS.map((pen, index) => {
              const isSelected = pen.id === activePen.id;
              return (
                <button
                  key={pen.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`pen-panel-${pen.id}`}
                  id={`pen-tab-${pen.id}`}
                  onClick={() => setSelectedPenId(pen.id)}
                  className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors duration-150 ${
                    isSelected
                      ? 'border-[#3B82F6] bg-[#141C2B] text-white'
                      : 'border-white/[0.08] bg-[#10141D] text-[#CBD5E1] hover:border-white/20 hover:bg-[#141925] hover:text-white'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{pen.name}</span>
                    <span className="block truncate text-xs text-[#94A3B8]">{pen.archetype}</span>
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[#64748B] shrink-0">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pen Profile Panel */}
          <div
            role="tabpanel"
            id={`pen-panel-${activePen.id}`}
            aria-labelledby={`pen-tab-${activePen.id}`}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">{activePen.archetype}</p>
                  <h3 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {activePen.name}
                  </h3>
                </div>
                <span
                  className="h-2.5 w-12 rounded-sm"
                  style={{ backgroundColor: activePen.accentHex }}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#CBD5E1]">
                {activePen.handlingSummary}
              </p>

              {/* Handling Profile Meters */}
              <div className="mt-7 space-y-4">
                <p className="text-xs font-medium text-[#94A3B8]">
                  Relative Handling Profile (Illustrative Gameplay Feel)
                </p>
                {(
                  [
                    { label: 'Desk Weight & Stability', value: activePen.attributes.weight },
                    { label: 'Aim & Spin Control', value: activePen.attributes.control },
                    { label: 'Collision Momentum', value: activePen.attributes.impact },
                  ] as const
                ).map((stat) => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#CBD5E1]">{stat.label}</span>
                      <span className="font-mono tabular-nums text-[#94A3B8]">{stat.value}/100</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{
                          width: `${stat.value}%`,
                          backgroundColor: activePen.accentHex,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5 text-sm text-[#94A3B8]">
              <span className="font-semibold text-[#E2E8F0]">How to unlock: </span>
              {activePen.unlockPath}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
