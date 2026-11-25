import { ArrowDownRight } from 'lucide-react';
import { ClassroomScene } from '../components/ClassroomScene';
import { Layout } from '../components/Layout';
import { DownloadButtons } from '../components/DownloadButtons';
import { FlickDemo } from '../components/FlickDemo';
import { DownloadCallout } from '../components/DownloadCallout';
import { RivalShowcase } from '../components/RivalShowcase';
import { PlayModes } from '../components/PlayModes';
import { PenShowcase } from '../components/PenShowcase';
import { GameplayShowcase } from '../components/GameplayShowcase';
import BlurText from '../components/react-bits/BlurText';

export function HomePage() {
  return (
    <Layout meta={{
      title: 'Pen Fight Aura Wars — Official Android Game',
      description: 'Flick your pen and knock rivals off the desk. Climb the Tournament ladder, upgrade your pens, or play Ranked 1v1 on Android.',
    }}>
      <section className="illustrated-hero textile-section overflow-clip">
        <div className="site-editorial-width relative grid items-center gap-7 py-10 sm:py-14 lg:min-h-[590px] lg:grid-cols-[0.93fr_1.07fr] lg:gap-0 lg:py-14">
          <div className="hero-lettering relative z-10 lg:py-12">
            <h1 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--site-accent)] sm:text-sm">Pen Fight Aura Wars</h1>
            <BlurText text="Flick your pen. Knock theirs off the desk."
              className="mt-3 max-w-2xl font-display text-[clamp(2.9rem,6.9vw,6.25rem)] font-extrabold leading-[0.88] tracking-tight text-[var(--site-text)]"
              delay={22} direction="bottom" stepDuration={0.16}
              animationFrom={{ filter: 'blur(1.5px)', opacity: 0.72, y: 6 }}
              animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]} />
            <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-[var(--site-muted)] sm:text-lg">
              A school-desk game of aim, timing, and one good flick. Play solo, face a ranked rival, or pass the phone to a friend.
            </p>
            <div className="mt-6"><DownloadButtons /></div>
          </div>
          <ClassroomScene />
        </div>
      </section>

      <section id="practice" aria-labelledby="practice-heading" className="game-section textile-section practice-section">
        <div className="site-editorial-width grid items-center gap-7 lg:grid-cols-[0.74fr_1.26fr] lg:gap-14">
          <div>
            <h2 id="practice-heading" className="editorial-heading">Take one shot</h2>
            <p className="mt-4 max-w-[35ch] text-base leading-relaxed text-[var(--site-muted)]">
              Pull the blue pen away from your rival, aim with the dotted line, and release.
            </p>
            <a href="#features" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--site-accent)] hover:text-white">
              Explore the game modes <ArrowDownRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <FlickDemo />
        </div>
      </section>

      <PlayModes />
      <RivalShowcase />
      <GameplayShowcase />
      <PenShowcase />
      <DownloadCallout />
    </Layout>
  );
}
