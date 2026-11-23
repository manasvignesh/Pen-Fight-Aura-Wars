import { useState } from 'react';
import { Camera, Film } from 'lucide-react';
import { GAMEPLAY_PLACEHOLDER_SLOTS, type GameplayPlaceholderSlot } from '../data/gameContent';
import { siteConfig } from '../config/siteConfig';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Captures' },
  { id: 'core', label: 'Gameplay & Physics' },
  { id: 'competitive', label: 'Competitive & Progression' },
] as const;

type FilterId = (typeof FILTER_OPTIONS)[number]['id'];

function GameplayShowcaseCard({ slot }: { slot: GameplayPlaceholderSlot; key?: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11151F]">
      {/* Clearly Marked Placeholder Surface */}
      <div className="relative flex aspect-video flex-col items-center justify-center border-b border-white/[0.08] bg-[#0C1018] p-6 text-center">
        <div
          className="pointer-events-none absolute inset-3 rounded-lg border border-dashed border-white/15"
          aria-hidden="true"
        />
        <Camera className="h-7 w-7 text-[#64748B]" aria-hidden="true" />
        <p className="mt-3 text-xs font-semibold text-[#CBD5E1]">
          Gameplay Screenshot Placeholder
        </p>
        <p className="mt-1 break-all font-mono text-[11px] text-[#64748B]">
          {slot.recommendedFilename}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs text-[#94A3B8]">
            {slot.category} · {slot.aspect} Capture Slot
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-white">{slot.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{slot.captureBrief}</p>
        </div>
      </div>
    </article>
  );
}

export function GameplayShowcase() {
  const [filter, setFilter] = useState<FilterId>('all');

  const visibleSlots = GAMEPLAY_PLACEHOLDER_SLOTS.filter((slot) => {
    if (filter === 'all') return true;
    if (filter === 'core') {
      return ['tournament-gameplay', 'pen-collision-effects', 'victory-animations'].includes(
        slot.id
      );
    }
    return ['pen-collection-upgrades', 'online-multiplayer', 'leaderboards-aura'].includes(
      slot.id
    );
  });

  const trailerUrl = siteConfig.media.trailerUrl;
  const isDirectVideo = trailerUrl ? /\.(mp4|webm)(\?.*)?$/i.test(trailerUrl) : false;

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="border-t border-white/[0.08] bg-[#0B0E15] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#60A5FA]">Gameplay Media</p>
            <h2
              id="showcase-heading"
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              In-Game Showcase &amp; Trailer
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#B4BCCE]">
              We do not present AI renders as fake mobile screenshots. Each slot below is a structured placeholder ready to be swapped with genuine Android gameplay captures and the official launch trailer.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div
            role="group"
            aria-label="Filter gameplay showcase slots"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#11151F] p-1 sm:inline-flex sm:w-fit"
          >
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={filter === option.id}
                className={`min-h-[38px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === option.id
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Future Gameplay Trailer Container */}
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#11151F]">
          {trailerUrl ? (
            isDirectVideo ? (
              <video
                src={trailerUrl}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black"
              >
                Your browser does not support embedded video playback.
              </video>
            ) : (
              <iframe
                src={trailerUrl}
                title="Pen Fight Aura Wars Official Gameplay Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full border-0 bg-black"
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center sm:py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#161C29]">
                <Film className="h-6 w-6 text-[#EAB308]" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-[#EAB308]">
                Trailer Placeholder · Coming Soon
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                Official Gameplay Trailer Container
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#94A3B8]">
                Set <code className="font-mono text-xs text-[#CBD5E1]">VITE_TRAILER_URL</code> to a verified HTTPS MP4 recording or YouTube embed URL once real Android gameplay footage is ready.
              </p>
            </div>
          )}
        </div>

        {/* Reusable Screenshot Placeholder Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleSlots.map((slot) => (
            <GameplayShowcaseCard key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
}
