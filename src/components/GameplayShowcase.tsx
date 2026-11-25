import { useEffect, useRef, useState } from 'react';
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
  const chapters = useRef<HTMLDivElement>(null);
  const manualUntil = useRef(0);
  const trailerUrl = siteConfig.media.trailerUrl;
  const [scrollStory, setScrollStory] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const media = window.matchMedia('(min-width: 64rem) and (min-height: 48rem) and (prefers-reduced-motion: no-preference)');
    let observer: IntersectionObserver | undefined;

    function observeChapters() {
      observer?.disconnect();
      setScrollStory(media.matches);
      if (!media.matches || !chapters.current) return;

      const top = Math.min(410, Math.round(window.innerHeight * 0.39));
      const bottom = window.innerHeight - top - 6;
      observer = new IntersectionObserver((entries) => {
        if (performance.now() < manualUntil.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        const capture = captures.find(({ id }) => id === visible?.target.getAttribute('data-capture'));
        if (capture) setActive(capture);
      }, { rootMargin: `-${top}px 0px -${bottom}px 0px` });

      for (const chapter of chapters.current.children) observer.observe(chapter);
    }

    observeChapters();
    media.addEventListener('change', observeChapters);
    window.addEventListener('resize', observeChapters);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', observeChapters);
      window.removeEventListener('resize', observeChapters);
    };
  }, []);

  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="game-section textile-section poster-screenings">
      <div className="site-editorial-width">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="showcase-heading" className="editorial-heading">Inside the game</h2>
          {scrollStory && <p className="text-sm font-semibold text-[var(--site-muted)]">Scroll through the match reel, or pick a scene.</p>}
        </div>
        <div className={`match-reel mt-7 ${scrollStory ? 'match-reel-scroll' : ''}`}>
          <div ref={chapters} role="group" aria-label="Choose a game screen" className="reel-chapters">
            {captures.map((capture, index) => (
              <button key={capture.id} data-capture={capture.id} type="button" aria-pressed={active.id === capture.id} aria-controls="gameplay-preview"
                onClick={() => {
                  manualUntil.current = performance.now() + 450;
                  setActive(capture);
                }}
                className="game-selector reel-chapter group text-left">
                <span className="flex items-center gap-2.5">
                  {scrollStory && <span className="reel-index font-mono text-xs" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
                  <span className="font-bold">{capture.title}</span>
                  {capture.id === 'replay' && <Play className="size-4 shrink-0" aria-hidden="true" />}
                </span>
                {scrollStory && <span className="reel-chapter-description">{capture.description}</span>}
                <ArrowRight className="reel-chapter-arrow size-4 opacity-0 motion-safe:transition-opacity group-aria-pressed:opacity-100 group-hover:opacity-100" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="gameplay-preview" className="reel-screen game-frame min-w-0 overflow-hidden">
            <figure className="replay-stage reel-stage relative isolate grid place-items-center overflow-hidden px-4 py-6">
              <div key={active.id} className="reel-device relative w-full overflow-hidden rounded-[1.65rem] border border-[#ffd7a56a] p-1.5">
                {active.id === 'replay' ? (
                  <video className="reel-replay block w-full rounded-[1.25rem]" controls playsInline muted
                    preload="none" poster="/media/arena-poster.jpg" aria-label={active.alt}>
                    <source src="/media/arena.webm" type="video/webm" />
                    <source src="/media/arena.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <img src={`/media/${active.id}.jpg`} alt={active.alt} width={390} height={844} loading="lazy"
                    className="block aspect-[9/16] h-auto w-full rounded-[1.25rem] object-cover object-center" />
                )}
              </div>
            </figure>
            <div aria-live={scrollStory ? 'off' : 'polite'} className="border-t border-[var(--site-rule)] px-4 py-4 sm:px-6">
              <h3 className="font-display text-3xl font-bold leading-none sm:text-4xl">{active.headline}</h3>
              {!scrollStory && <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">{active.description}</p>}
            </div>
          </div>
        </div>
        {trailerUrl && <a href={trailerUrl} target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--site-accent)] hover:underline">Watch the trailer</a>}
      </div>
    </section>
  );
}
