import { ArrowRight, CalendarDays, Swords, Trophy, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DownloadButtons } from '../components/DownloadButtons';
import { PenShowcase } from '../components/PenShowcase';
import { GameplayShowcase } from '../components/GameplayShowcase';
import { siteConfig } from '../config/siteConfig';
import { HERO_KEY_ART } from '../data/gameContent';

const modes = [
  {
    icon: Trophy, title: 'Tournament', label: 'Solo · Offline', accent: 'text-amber-300', glow: 'from-amber-400/15',
    detail: '24 rivals', description: 'Climb the ladder, earn Aura Points, and unlock pens for tougher matches.',
  },
  {
    icon: Swords, title: 'Ranked 1v1', label: 'Online', accent: 'text-sky-300', glow: 'from-sky-400/15',
    detail: siteConfig.features.onlineMultiplayerLive ? 'Aura Rating' : 'Currently unavailable',
    description: siteConfig.features.onlineMultiplayerLive
      ? 'Bring a pen you own and challenge another player. Both pens use equal physics.'
      : 'Play Tournament or Pass & Play while ranked matchmaking is unavailable.',
  },
  {
    icon: CalendarDays, title: 'Weekly Tournament', label: 'Solo · Weekly', accent: 'text-emerald-300', glow: 'from-emerald-400/15',
    detail: '2,500 Aura Points', description: 'Clear three rivals. Win all three matches 2–0 for a 750-point Clean Sweep bonus.',
  },
  {
    icon: UsersRound, title: 'Pass & Play', label: 'Local · Offline', accent: 'text-violet-300', glow: 'from-violet-400/15',
    detail: 'One phone', description: 'Take turns flicking against a friend on the same device.',
  },
];

export function HomePage() {
  return (
    <Layout meta={{
      title: 'Pen Fight Aura Wars — Official Android Game',
      description: 'Flick your pen and knock rivals off the desk. Climb the Tournament ladder, upgrade your pens, or play Ranked 1v1 on Android.',
    }}>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <img src={HERO_KEY_ART} alt="" aria-hidden="true" fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#090B10] via-[#090B10]/94 to-[#090B10]/65" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <h1 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Pen Fight Aura Wars</h1>
            <p className="mt-3 max-w-2xl font-display text-[clamp(2.65rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white">
              Flick your pen. Knock theirs off the desk.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
              The classroom desk duel, on Android. Pull back to aim, release to flick, and win the round by knocking your rival off the edge.
            </p>
            <div className="mt-6"><DownloadButtons /></div>
          </div>
          <figure className="mx-auto w-full max-w-[230px] sm:max-w-[270px]">
            <div className="overflow-hidden rounded-[1.6rem] border border-white/20 bg-[#10141E] p-1.5 shadow-2xl">
              <video className="aspect-[9/16] w-full rounded-[1.2rem] bg-slate-950 object-cover"
                controls playsInline muted preload="metadata" poster="/media/arena-poster.jpg"
                aria-label="Pen Fight Aura Wars gameplay preview">
                <source src="/media/arena.webm" type="video/webm" />
                <source src="/media/arena.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-2 text-center text-xs text-slate-300">Actual Tournament gameplay</figcaption>
          </figure>
        </div>
      </section>

      <div className="classroom-gutters">
        <section id="features" aria-labelledby="features-heading" className="desk-grain-surface scroll-mt-20 border-b border-white/10 py-14 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <h2 id="features-heading" className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">Pick your fight</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:gap-4">
              {modes.map(({ icon: Icon, title, label, accent, glow, detail, description }) => (
                <article key={title} className={`relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101620] px-5 py-5 sm:px-6 sm:py-6 ${accent}`}>
                  <div className={`pointer-events-none absolute inset-0 -z-10 bg-linear-to-bl ${glow} via-transparent to-transparent`} aria-hidden="true" />
                  <Icon className="pointer-events-none absolute -top-2 right-0 -z-10 size-28 rotate-12 opacity-[0.07] sm:size-36" strokeWidth={1.1} aria-hidden="true" />
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-wide">{label}</span>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold leading-none text-white sm:text-4xl">{title}</h3>
                  <p className="mb-4 mt-3 max-w-sm text-sm leading-relaxed text-slate-300">{description}</p>
                  <p className="mt-auto border-t border-white/10 pt-3 text-sm font-bold">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GameplayShowcase />
        <PenShowcase />
      </div>

      <section className="border-t border-white/10 bg-[#090B10] px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-white">Ready for your first flick?</h2>
          <Link to="/download" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200">
            Get the game <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
