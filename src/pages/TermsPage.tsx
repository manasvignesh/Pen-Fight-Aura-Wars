import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { siteConfig } from '../config/siteConfig';

export function TermsPage() {
  const effectiveDate = siteConfig.legal.effectiveDate ?? 'November 23, 2026';
  const lastUpdated = siteConfig.legal.lastUpdated ?? 'November 23, 2026';

  return (
    <Layout
      meta={{
        title: 'Terms of Service — Pen Fight Aura Wars',
        description:
          'Official Terms of Service for Pen Fight Aura Wars on Android covering game license, user accounts, fair play, virtual collectibles, advertising, and support.',
      }}
    >
      <div className="mx-auto max-w-[960px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="border-b border-white/[0.08] pb-8">
          <p className="text-sm font-medium text-[#60A5FA]">Legal Terms</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#B4BCCE]">
            These Terms of Service govern your access to and use of{' '}
            <strong className="text-white">{siteConfig.appName}</strong> (Android package{' '}
            <code className="font-mono text-sm text-[#E2E8F0]">{siteConfig.packageName}</code>) and this official website operated by{' '}
            <strong className="text-white">{siteConfig.publisherName}</strong>.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94A3B8]">
            <span>
              Effective Date: <span className="text-[#E2E8F0]">{effectiveDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Last Updated: <span className="text-[#E2E8F0]">{lastUpdated}</span>
            </span>
          </div>
        </header>

        <article className="mt-10 space-y-9 text-[15px] leading-relaxed text-[#CBD5E1]">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              1. Acceptance &amp; Use of the Game
            </h2>
            <p>
              By downloading, installing, or playing {siteConfig.appName}, you agree to these Terms of Service and our{' '}
              <Link to="/privacy" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">
                Privacy Policy
              </Link>
              . We grant you a limited, non-exclusive, non-transferable, revocable license to install and play the official Android game for personal, non-commercial entertainment on compatible devices you own or control.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              2. Player Accounts
            </h2>
            <p>
              Some features—such as cloud save synchronization, leaderboards, and online 1v1 matchmaking—require signing in through Google Sign-In and Supabase Authentication. You are responsible for maintaining the security of your Google account and choosing an appropriate in-game display name that does not impersonate others or contain offensive, hateful, or unlawful language.
            </p>
            <p>
              You may request permanent deletion of your game account at any time on our{' '}
              <Link
                to="/delete-account"
                className="text-[#60A5FA] underline underline-offset-4 hover:text-white"
              >
                Account Deletion page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              3. Fair Play &amp; Anti-Cheat Rules
            </h2>
            <p>
              Competitive pen battles depend on fair physics and honest skill. You agree not to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-[#B4BCCE]">
              <li>Modify, decompile, reverse engineer, or distribute tampered APKs of {siteConfig.appName}.</li>
              <li>Use cheats, memory editors, automated scripts, bots, or exploits to manipulate physics, coins, Aura Rating, or match outcomes.</li>
              <li>Attempt to disrupt, overload, or bypass our server-authoritative multiplayer validation on Render or our Supabase database security rules.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              4. Online Multiplayer Conduct
            </h2>
            <p>
              When participating in online 1v1 matches or public leaderboards, you agree to play fairly and refrain from intentional match manipulation, win-trading, harassment, or using abusive display names. We reserve the right to reset manipulated leaderboard entries or restrict multiplayer access to protect fair competition.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              5. Virtual Coins &amp; Collectible Pens
            </h2>
            <p>
              In-game coins, Aura Rating, achievements, and collectible pens (including Classic Ballpoint, Hyper Gel Pro, Neon Highlighter, Chunky Marker, Vortex Spinner, and Gold Fountain) are virtual in-game items earned through gameplay progression. They have no real-world monetary value, cannot be redeemed for cash, and may not be sold, traded, or transferred outside the game. We may rebalance pen physics, progression costs, or virtual rewards to maintain fair gameplay.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              6. Advertising
            </h2>
            <p>
              {siteConfig.appName} is supported by in-game advertising served via Google AdMob. Third-party advertisers are responsible for the content of their ads and linked external sites. Your interaction with advertisements is governed by the respective advertiser&apos;s terms and privacy policy, as well as the ad-data disclosures in our{' '}
              <Link to="/privacy" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              7. Availability, Updates &amp; Service Changes
            </h2>
            <p>
              We work to keep the game and its online services reliable, but we cannot guarantee uninterrupted or error-free uptime—especially for online matchmaking servers undergoing maintenance or updates. We may release game updates, adjust features, or retire online features with reasonable notice where practicable.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              8. Intellectual Property
            </h2>
            <p>
              All game code, visual artwork, audio assets, pen designs, branding, and website content associated with {siteConfig.appName} are owned by or licensed to {siteConfig.publisherName} and protected by applicable intellectual property laws. Nothing in these terms transfers ownership of any intellectual property to you.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              9. Account Suspension or Termination
            </h2>
            <p>
              We may suspend or terminate access to online features or player accounts if we reasonably determine that an account violated our Fair Play rules, tampered with the game client or servers, or engaged in abusive conduct. You may stop using the game or request account deletion at any time.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              10. Disclaimers &amp; Limitations of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, {siteConfig.appName} and this website are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of uninterrupted availability or fitness for a particular purpose. To the extent permitted by applicable law, {siteConfig.publisherName} is not liable for indirect, incidental, or consequential damages arising from your use of the game or temporary service interruptions. Nothing in these terms excludes or limits any mandatory consumer rights that cannot lawfully be excluded in your jurisdiction.
            </p>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-7">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              11. Support &amp; Contact Information
            </h2>
            <p>
              Questions regarding these Terms of Service can be directed to{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-[#60A5FA] underline underline-offset-4 hover:text-white"
              >
                {siteConfig.supportEmail}
              </a>{' '}
              or via our{' '}
              <Link to="/support" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">
                Support page
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}
