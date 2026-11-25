import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const captures = [
  {
    id: 'replay', title: 'Tournament Replay',
    headline: 'One flick changes the round.',
    description: 'Watch the follow-up flick catch the rival and send it off the desk.',
    alt: 'Pen Fight Aura Wars Tournament gameplay replay',
  },
  {
    id: 'weekly', title: 'Weekly Bracket',
    headline: 'Three rivals. One clean sweep.',
    description: 'Fight through the opener, semifinal, and final. Go 2–0 in every match for the Clean Sweep bonus.',
    alt: 'Weekly Tournament bracket with three rivals and the Clean Sweep challenge',
  },
  {
    id: 'garage', title: 'Upgrades',
    headline: 'Find the right upgrade.',
    description: 'Improve the grip or nib of a pen you own. The Workbench shows what each upgrade changes before you spend Aura Points.',
    alt: 'Pen Garage Workbench with the Classic Ballpoint and grip and nib upgrades',
  },
  {
    id: 'progress', title: 'Progress',
    headline: 'See your next unlock.',
    description: 'Check the rivals you’ve defeated, your Aura Points, and what it takes to earn the next pen.',
    alt: 'Progress screen showing Aura Points, rivals defeated, and the next pen unlock',
  },
];

export function GameplayShowcase() {
  const [active, setActive] = useState(captures[0]);
  const trailerUrl = siteConfig.media.trailerUrl;
  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="game-section textile-section poster-screenings">
      <div className="site-editorial-width grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <h2 id="showcase-heading" className="editorial-heading">Inside the game</h2>
          <div role="group" aria-label="Choose a game screen" className="mt-6 grid grid-cols-2 gap-1.5 lg:grid-cols-1 lg:gap-2">
            {captures.map((capture) => (
              <button key={capture.id} type="button" aria-pressed={active.id === capture.id} aria-controls="gameplay-preview"
                onClick={() => setActive(capture)}
                className="game-selector group flex min-h-13 w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-bold sm:text-sm">
                <span className="flex items-center gap-3">
                  {capture.id === 'replay' && <Play className="size-4 shrink-0" aria-hidden="true" />}
                  {capture.title}
                </span>
                <ArrowRight className="hidden size-4 shrink-0 opacity-0 lg:block motion-safe:transition-opacity group-aria-pressed:opacity-100 group-hover:opacity-100" aria-hidden="true" />
              </button>
            ))}
          </div>
          {trailerUrl && <a href={trailerUrl} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--site-accent)] hover:underline">Watch the trailer</a>}
        </div>
        <div id="gameplay-preview" className="game-frame min-w-0 overflow-hidden lg:col-start-1 lg:row-start-1">
          <figure className="replay-stage relative grid min-h-0 place-items-center overflow-hidden px-4 py-6 sm:py-8">
            <div key={active.id} className="editorial-reveal relative w-full max-w-[270px] overflow-hidden rounded-[1.9rem] border border-white/25 bg-[#06080b] p-1.5 shadow-[0_28px_70px_#000b] sm:max-w-[265px]">
              {active.id === 'replay' ? (
                <video className="block aspect-[9/16] w-full rounded-[1.5rem] object-contain" controls playsInline muted
                  preload="none" poster="/media/arena-poster.jpg" aria-label={active.alt}>
                  <source src="/media/arena.webm" type="video/webm" />
                  <source src="/media/arena.mp4" type="video/mp4" />
                </video>
              ) : (
                <img src={`/media/${active.id}.jpg`} alt={active.alt} width={390} height={844} loading="lazy"
                  className="block aspect-[9/16] h-auto w-full rounded-[1.5rem] object-cover object-center" />
              )}
            </div>
          </figure>
          <div aria-live="polite" className="grid gap-2 border-t border-[var(--site-rule)] px-4 py-5 sm:px-6">
            <h3 className="font-display text-3xl font-bold leading-none sm:text-4xl">{active.headline}</h3>
            <p className="text-sm leading-relaxed text-[var(--site-muted)]">{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
