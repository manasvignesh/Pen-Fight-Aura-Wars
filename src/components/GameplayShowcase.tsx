import { useState } from 'react';
import { CalendarDays, ChartNoAxesColumnIncreasing, ChevronRight, Wrench } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const captures = [
  {
    id: 'weekly', icon: CalendarDays, title: 'Weekly Tournament',
    headline: 'Go for a Clean Sweep.',
    description: 'Fight through the opener, semifinal, and final. A 2–0 score in every match earns the Clean Sweep bonus.',
    alt: 'Weekly Tournament bracket with three rivals and the Clean Sweep bonus',
    frame: 'from-amber-400/15', focus: 'object-[50%_76%]',
  },
  {
    id: 'garage', icon: Wrench, title: 'Pen Garage',
    headline: 'Tune your pen for Tournament.',
    description: 'Spend Aura Points on grip and nib upgrades. The Workbench shows what each upgrade changes before you buy it.',
    alt: 'Pen Garage Workbench with the Classic Ballpoint and its grip and nib upgrade options',
    frame: 'from-sky-400/15', focus: 'object-bottom',
  },
  {
    id: 'progress', icon: ChartNoAxesColumnIncreasing, title: 'Your Progress',
    headline: 'See what it takes to unlock your next pen.',
    description: 'Check your rivals defeated, Aura Points, and unlock requirements. Sign in with Google to back up your Tournament progress.',
    alt: 'Progress screen showing the equipped pen, rivals defeated, and requirements for the next pen',
    frame: 'from-emerald-400/15', focus: 'object-[50%_71%]',
  },
];

export function GameplayShowcase() {
  const [active, setActive] = useState(captures[0]);
  const trailerUrl = siteConfig.media.trailerUrl;

  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="scroll-mt-20 bg-[#0B1019] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1136px]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="showcase-heading" className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">Inside the game</h2>
          {trailerUrl && <a href={trailerUrl} target="_blank" rel="noopener noreferrer"
            className="py-2 text-sm font-semibold text-sky-200 hover:underline">Watch the trailer</a>}
        </div>
        <div className="mt-7 grid overflow-hidden rounded-2xl border border-white/10 bg-[#101620] lg:grid-cols-2 lg:grid-rows-2">
          <div className="min-w-0 p-4 sm:p-7 lg:flex lg:flex-col lg:justify-end lg:p-10">
            <div role="group" aria-label="Choose a game screen" className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5">
              {captures.map((capture) => {
                const { icon: Icon, id, title } = capture;
                const selected = active.id === id;
                return (
                  <button key={id} type="button" aria-pressed={selected} aria-controls="gameplay-preview"
                    onClick={() => setActive(capture)}
                    className={`flex min-h-12 items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors sm:px-4 ${selected
                      ? 'border-amber-300/45 bg-amber-300/10 text-amber-200'
                      : 'border-white/10 bg-[#0D121C] text-slate-300 hover:border-white/30 hover:text-white'}`}>
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {title}
                    <ChevronRight className="ml-auto hidden size-4 shrink-0 lg:block" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
          <div id="gameplay-preview" className="contents">
            <div aria-live="polite" className="px-4 pb-6 sm:px-7 lg:col-start-1 lg:row-start-2 lg:px-10 lg:pb-10">
              <h3 className="max-w-md font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{active.headline}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">{active.description}</p>
            </div>
            <figure className={`grid place-items-center border-t border-white/10 bg-linear-to-b ${active.frame} to-[#0A101A] px-4 py-6 sm:py-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-t-0 lg:border-l lg:py-10`}>
              <img src={`/media/${active.id}.jpg`} alt={active.alt} width={390} height={844}
                loading="lazy" decoding="async"
                className={`aspect-[5/9] h-auto w-full max-w-[270px] rounded-xl border border-white/15 bg-[#0A101A] object-cover shadow-2xl sm:max-w-[295px] ${active.focus}`} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
