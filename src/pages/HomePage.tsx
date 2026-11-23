import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { DownloadButtons } from '../components/DownloadButtons';
import { MediaFrame } from '../components/MediaFrame';
import { PenShowcase } from '../components/PenShowcase';
import { GameplayShowcase } from '../components/GameplayShowcase';
import { siteConfig } from '../config/siteConfig';
import { DESK_MECHANICS_ART, HERO_KEY_ART } from '../data/gameContent';

export function HomePage() {
  const { onlineMultiplayerLive } = siteConfig.features;

  return (
    <Layout
      meta={{
        title: 'Pen Fight Aura Wars — Official Android Game Website',
        description:
          'Every flick counts. Every victory builds your aura. Competitive classroom desk pen battles on Android with physics flicks, Tournament ladders, collectible pens, and official downloads.',
      }}
    >
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#090B10]">
        {/* Full-bleed Key Art Backdrop with Measured Contrast Scrim */}
        <div className="absolute inset-0">
          <img
            src={HERO_KEY_ART}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-55"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#090B10] via-[#090B10]/85 to-[#090B10]/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-transparent to-[#090B10]/55"
            aria-hidden="true"
          />
        </div>

        {/* Subtle Reduced-Motion-Safe Ambient Dust Motes (Desktop Periphery Only) */}
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
          <span className="aura-particle absolute right-[8%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
          <span
            className="aura-particle absolute right-[4%] top-[68%] h-1 w-1 rounded-full bg-[#60A5FA]"
            style={{ animationDelay: '2.1s' }}
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Hero Copy & Downloads */}
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#EAB308]">
                Official Android Game · Competitive Desk Arcade
              </p>
              <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
                PEN FIGHT AURA WARS
              </h1>
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-[#E2E8F0] sm:text-xl">
                {siteConfig.tagline}
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#B4BCCE]">
                The classic classroom desk duel rebuilt with crisp collision physics, deliberate flick momentum, tournament ladders, and six collectible pens.
              </p>

              <div className="mt-8">
                <DownloadButtons />
              </div>
            </div>

            {/* Hero Secondary Visual Frame */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#10141E]/90">
                <MediaFrame
                  src={HERO_KEY_ART}
                  alt="Two glossy collectible pens—an electric-blue gel pen and a brushed gold fountain pen—preparing to collide on a wooden classroom desk"
                  fallbackTitle="Pen Fight Aura Wars Clash Key Art"
                  aspectClassName="aspect-[16/10]"
                  priority
                />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-4 py-3 text-xs text-[#94A3B8]">
                  <span>Wooden Desk Arena · Physics Duels</span>
                  <span className="font-mono text-[#CBD5E1]">{siteConfig.packageName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE GAME FEATURES (ASYMMETRIC EDITORIAL GRID) */}
      <section id="features" aria-labelledby="features-heading" className="desk-grain-surface py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#60A5FA]">Core Gameplay</p>
            <h2
              id="features-heading"
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Built Around Skill, Angles &amp; Knockouts
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#B4BCCE]">
              Every match plays out across a wooden classroom desk where flick power, spin angle, and center-of-mass impact decide who stays on the table.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* 01. Realistic Pen Battles (Wide Featured Block) */}
            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-medium text-[#94A3B8]">01 · Physics Engine</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">
                Realistic Pen Battles
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#CBD5E1]">
                Drag, aim, and release with tactile physics-based flick controls. Off-center hits send rival pens spinning across the grain, while square strikes transfer full linear momentum for clean edge knockouts.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-5 text-sm text-[#B4BCCE] sm:grid-cols-2">
                <li>Physics-driven flick velocity and desk friction</li>
                <li>Collision spin, torque, and momentum transfer</li>
                <li>Strategic aiming for defensive blocks and knockouts</li>
                <li>Matches decided by positioning and timing</li>
              </ul>
            </article>

            {/* 02. Tournament Mode */}
            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8 lg:col-span-5">
              <p className="text-xs font-medium text-[#EAB308]">02 · Single-Player Ladder</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">
                Tournament Mode
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                Climb through a competitive bracket against increasingly tactical AI opponents. Win matches to earn coins, build momentum across rounds, and unlock new pens in your collection.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-white/[0.08] pt-5 text-sm text-[#B4BCCE]">
                <li>Escalating AI precision and defensive angles</li>
                <li>Coin rewards and progression milestones</li>
                <li>Collectible pen unlocks through gameplay</li>
              </ul>
            </article>

            {/* 03. Online 1v1 */}
            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8 lg:col-span-5">
              <p className="text-xs font-medium text-[#A78BFA]">
                03 · Competitive Multiplayer ·{' '}
                {onlineMultiplayerLive ? 'Live on Production Server' : 'Coming Soon'}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">
                Online 1v1
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
                {onlineMultiplayerLive
                  ? 'Challenge real opponents in server-authoritative 1v1 duels with competitive Aura Rating, player profiles, and global leaderboards.'
                  : 'Designed for real-player duels backed by a server-authoritative multiplayer backend, Aura Rating, player profiles, and competitive leaderboards. Online matchmaking and ranked queues will unlock once production server verification is complete.'}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-white/[0.08] pt-5 text-sm text-[#B4BCCE]">
                <li>Server-authoritative physics validation</li>
                <li>Competitive Aura Rating and rankings</li>
                <li>Player profiles and leaderboard standings</li>
              </ul>
            </article>

            {/* 04. Local Pass & Play */}
            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-medium text-[#60A5FA]">04 · Same-Device Multiplayer</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">
                Local Pass &amp; Play
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#CBD5E1]">
                Bring back desk rivalries anywhere—no internet connection required. Two players pick their pens and take alternating flicks on the same Android phone, turning any break table into an instant 1v1 match.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-5 text-sm text-[#B4BCCE] sm:grid-cols-2">
                <li>Two-player head-to-head turns on one device</li>
                <li>Offline ready for commutes, breaks, and hangouts</li>
                <li>Full physics arena rules and pen selection</li>
                <li>Fast rematches with zero matchmaking wait</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 3. ARCADE MECHANICS SPOTLIGHT (POWER SURGE & TURBO FLICK) */}
      <section aria-labelledby="mechanics-heading" className="border-t border-white/[0.08] bg-[#090B10] py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-sm font-medium text-[#A78BFA]">Arcade Mechanics</p>
              <h2
                id="mechanics-heading"
                className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Power Surge &amp; Turbo Flick
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#B4BCCE]">
                Classic pen fights reward careful positioning, while Pen Fight Aura Wars layers focused arcade timing mechanics on top of core desk physics.
              </p>

              <div className="mt-8 space-y-6">
                <div className="border-t border-white/[0.08] pt-5">
                  <h3 className="text-lg font-semibold text-white">Power Surge</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B4BCCE]">
                    Landing consecutive strikes and clean desk plays builds your surge energy. Trigger Power Surge at the right moment to amplify collision force and punish opponents hovering near the table edge.
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-5">
                  <h3 className="text-lg font-semibold text-white">Turbo Flick</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B4BCCE]">
                    Time a high-speed release for a decisive Turbo Flick—trading margin for error in exchange for blistering launch velocity capable of breaking heavy defensive setups like Chunky Marker.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11151F]">
                <MediaFrame
                  src={DESK_MECHANICS_ART}
                  alt="Low-angle view of a glossy metallic gel pen striking a chunky marker near the edge of a wooden desk with kinetic shockwave rings"
                  fallbackTitle="Power Surge & Turbo Flick Impact"
                  aspectClassName="aspect-[4/3] lg:h-full lg:aspect-auto"
                />
                <div className="border-t border-white/[0.08] px-5 py-3 text-xs text-[#94A3B8]">
                  High-velocity impact concept · Kinetic force transfer near the desk knockout boundary
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COLLECTIBLE PENS SHOWCASE */}
      <PenShowcase />

      {/* 5. GAMEPLAY SHOWCASE & TRAILER PLACEHOLDER */}
      <GameplayShowcase />

      {/* 6. BOTTOM CONVERSION & PUBLISHER TRUST BAND */}
      <section aria-labelledby="cta-heading" className="border-t border-white/[0.08] bg-[#090B10] py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-[#11151F] p-8 sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-sm font-medium text-[#EAB308]">Official Release Center</p>
                <h2
                  id="cta-heading"
                  className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  Ready to Step Up to the Desk?
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-[#B4BCCE]">
                  Check official Google Play availability, download verified release APKs with SHA-256 verification hashes, or review our transparent player privacy and account deletion policies.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <Link
                  to="/download"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap"
                >
                  <span>Go to Downloads</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/support"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08] whitespace-nowrap"
                >
                  Player Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
