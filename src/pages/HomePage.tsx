import { ArrowRight, Swords, Trophy, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DownloadButtons } from '../components/DownloadButtons';
import { PenShowcase } from '../components/PenShowcase';
import { GameplayShowcase } from '../components/GameplayShowcase';
import { siteConfig } from '../config/siteConfig';
import { HERO_KEY_ART } from '../data/gameContent';

const modes = [
  { icon: Trophy, title: 'Tournament', description: 'Climb a 24-opponent ladder. Earn Aura Points, unlock six pens, and upgrade their grip and nib in the Garage.' },
  { icon: Swords, title: 'Ranked 1v1', description: siteConfig.features.onlineMultiplayerLive
    ? 'Pick a pen you own and face another player online. Rated wins improve your Aura Rating, and every pen uses equal physics.'
    : 'Online ranked matchmaking is currently unavailable. You can play Tournament or Pass & Play offline.' },
  { icon: Wrench, title: 'Weekly Tournament', description: 'Beat three rivals for 2,500 Aura Points. Win all three 2–0 to earn 750 more with Clean Sweep.' },
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

      <section id="features" aria-labelledby="features-heading" className="desk-grain-surface scroll-mt-16 py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <h2 id="features-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Pick your fight</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {modes.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-white/10 bg-[#11151F] p-5">
                <Icon className="size-5 text-amber-300" aria-hidden="true" />
                <h3 className="mt-3 font-display text-xl font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300"><strong className="text-white">On the same phone?</strong> Play offline with a friend in Pass &amp; Play.</p>
        </div>
      </section>

      <GameplayShowcase />
      <PenShowcase />

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
