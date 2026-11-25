import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Swords, Trophy, UsersRound } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const modes = [
  {
    id: 'tournament', title: 'Tournament', icon: Trophy, format: 'Solo · Offline',
    headline: 'Take on all 24 rivals.',
    detail: 'Win rematches, earn Aura Points, and unlock the pens you’ll need for the toughest desks.',
    pens: ['classic-ballpoint', 'chunky-marker'],
    link: { href: '#pens', label: 'Meet the pens' },
  },
  {
    id: 'ranked', title: 'Ranked 1v1', icon: Swords, format: 'Online · Head to head',
    headline: 'Put your rating on the line.',
    detail: siteConfig.features.onlineMultiplayerLive
      ? 'Bring a pen you own and challenge another player. Every pen follows the same ranked physics.'
      : 'Ranked matchmaking is currently unavailable. You can still play Tournament or Pass & Play offline.',
    pens: ['hyper-gel-pro', 'vortex-spinner'],
  },
  {
    id: 'weekly', title: 'Weekly Tournament', icon: CalendarDays, format: 'Solo · Resets weekly',
    headline: 'Go for a clean sweep.',
    detail: 'Beat three rivals to earn 2,500 Aura Points. Win all three 2–0 to claim a 750-point bonus.',
    pens: ['gold-fountain', 'neon-highlighter'],
    link: { href: '#showcase', label: 'See the game in action' },
  },
  {
    id: 'pass', title: 'Pass & Play', icon: UsersRound, format: 'Two players · One phone',
    headline: 'Hand it to a friend.',
    detail: 'Take turns on the same phone and settle it at the desk. Play anywhere, even offline.',
    pens: ['classic-ballpoint', 'neon-highlighter'],
  },
];

export function PlayModes() {
  const [active, setActive] = useState(modes[0]);

  return (
    <section id="features" aria-labelledby="features-heading" className="game-section textile-section poster-modes">
      <div className="site-editorial-width">
        <h2 id="features-heading" className="editorial-heading">Pick your fight</h2>
        <div className="mt-7 grid gap-5 sm:mt-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-9">
          <div role="group" aria-label="Game modes" className="grid grid-cols-2 gap-1.5 lg:grid-cols-1 lg:content-start lg:gap-0">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button key={mode.id} type="button" aria-pressed={active.id === mode.id} aria-controls="mode-feature"
                  onClick={() => setActive(mode)} className="game-selector mode-selector group flex min-h-14 items-center gap-2 px-2.5 py-2 text-left sm:px-4 lg:min-h-[76px] lg:gap-3">
                  <Icon className="size-4 shrink-0 sm:size-5" strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-bold sm:text-sm">{mode.title}</span>
                    <span className="mt-1 hidden text-xs font-medium text-[var(--site-muted)] lg:block">{mode.format}</span>
                  </span>
                  <ArrowUpRight className="ml-auto hidden size-4 shrink-0 opacity-0 group-aria-pressed:opacity-100 lg:block" aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div id="mode-feature" className="game-frame overflow-hidden">
            <div className="mode-composition relative isolate aspect-[2/1] min-h-36 overflow-hidden">
              <div key={active.id} className="mode-art-layers editorial-reveal absolute inset-0" aria-hidden="true">
                <img src={`/pens/${active.pens[0]}.webp`} alt="" width={600} height={174} loading="lazy"
                  className="mode-pen-left absolute left-[8%] top-[47%] w-[57%] -rotate-[14deg] drop-shadow-xl" />
                <img src={`/pens/${active.pens[1]}.webp`} alt="" width={600} height={174} loading="lazy"
                  className="mode-pen-right absolute right-[6%] top-[26%] w-[45%] rotate-[24deg] drop-shadow-xl" />
              </div>
            </div>
            <div aria-live="polite" className="border-t border-[var(--site-rule)] px-4 py-5 sm:px-7 sm:py-6">
              <p className="text-xs font-bold text-[var(--site-accent)] lg:hidden">{active.format}</p>
              <h3 className="font-display text-3xl font-bold leading-none sm:text-5xl">{active.headline}</h3>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[var(--site-muted)]">{active.detail}</p>
              {active.link && <Link to={active.link.href} className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--site-accent)] hover:text-white">
                {active.link.label}<ArrowDownRight className="size-4" aria-hidden="true" />
              </Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
