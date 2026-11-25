import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { siteConfig } from '../config/siteConfig';

const TOC_ITEMS = [
  { id: 'overview', label: '1. Overview & Publisher' },
  { id: 'information-collected', label: '2. Information We Collect' },
  { id: 'google-signin', label: '3. Google Sign-In & Accounts' },
  { id: 'gameplay-multiplayer', label: '4. Gameplay, Cloud Saves & Multiplayer' },
  { id: 'advertising', label: '5. Google AdMob & Advertising' },
  { id: 'third-party', label: '6. Third-Party Service Providers' },
  { id: 'storage-security', label: '7. Data Storage & Protection' },
  { id: 'retention', label: '8. Data Retention' },
  { id: 'account-deletion', label: '9. Account & Data Deletion' },
  { id: 'privacy-rights', label: '10. Your Privacy Rights' },
  { id: 'children', label: "11. Children's Privacy" },
  { id: 'international', label: '12. International Transfers' },
  { id: 'changes', label: '13. Changes to This Policy' },
  { id: 'contact', label: '14. Contact Us' },
];

export function PrivacyPage() {
  const effectiveDate = siteConfig.legal.effectiveDate ?? 'November 23, 2026';
  const lastUpdated = siteConfig.legal.lastUpdated ?? 'November 23, 2026';

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="page-masthead textile-section">
          <p className="text-sm font-medium text-[var(--site-accent)]">Google Play &amp; Player Privacy</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--site-muted)]">
            This Privacy Policy explains how <strong className="text-white">{siteConfig.appName}</strong> (Android package{' '}
            <code className="font-mono text-sm text-[#E2E8F0]">{siteConfig.packageName}</code>), published by{' '}
            <strong className="text-white">{siteConfig.publisherName}</strong>, collects, uses, processes, and protects information when you play our mobile game or visit this official website.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[var(--site-muted)]">
            <span>
              Effective Date: <span className="text-[#E2E8F0]">{effectiveDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Last Updated: <span className="text-[#E2E8F0]">{lastUpdated}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>No account required to read this policy</span>
          </div>
        </header>

        {/* Main Content + Desktop Sticky TOC */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Privacy policy sections" className="sticky top-24 space-y-1.5">
              <p className="mb-3 text-xs font-semibold text-white">On This Page</p>
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-2.5 py-1.5 text-xs text-[var(--site-muted)] transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-10 text-[15px] leading-relaxed text-[var(--site-muted)] lg:col-span-9">
            <section id="overview" className="scroll-mt-24 space-y-3">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                1. Overview &amp; Publisher Identity
              </h2>
              <p>
                <strong>{siteConfig.appName}</strong> is an Android physics arcade game developed and published by{' '}
                <strong>{siteConfig.publisherName}</strong>.
                This policy applies to the Android application (<code className="font-mono text-xs">{siteConfig.packageName}</code>), its connected online services, and this official website.
              </p>
              <p>
                We collect and process only the information needed to operate gameplay features, authenticate player accounts, synchronize progress, support online multiplayer and leaderboards, serve in-game advertising through Google AdMob, prevent cheating or abuse, and respond to support requests.
              </p>
            </section>

            <section id="information-collected" className="scroll-mt-24 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                2. Information We Collect &amp; Why
              </h2>
              <p>
                Depending on the features you use (offline play vs. signed-in cloud play and online multiplayer), the game and its integrated third-party SDKs may collect or process the following categories of data:
              </p>

              <div className="overflow-x-auto rounded-xl border border-[var(--site-rule)] bg-[var(--site-panel)]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="border-b border-white/10 bg-[#0D1119] text-xs font-semibold text-white">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Examples of Data</th>
                      <th className="px-4 py-3">Primary Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07] text-xs leading-relaxed text-[var(--site-muted)]">
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">Account &amp; Authentication</td>
                      <td className="px-4 py-3">
                        Google Sign-In / Supabase account identifier (User ID), email address (when signing in via Google/Supabase Auth), and chosen in-game display name.
                      </td>
                      <td className="px-4 py-3">
                        Account creation, login verification, cloud save restoration, leaderboard identity, and processing account deletion requests.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">Game Progress &amp; Stats</td>
                      <td className="px-4 py-3">
                        Unlocked pens, virtual coin balances, Tournament progress, match wins/losses, Aura Rating, achievements, and game settings.
                      </td>
                      <td className="px-4 py-3">
                        Saving gameplay progress locally and in cloud storage, matchmaking balance, and leaderboard rankings.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">Multiplayer Session Data</td>
                      <td className="px-4 py-3">
                        Player ID, match room state, turn inputs/physics actions, connection metadata, and IP address processed by our hosted multiplayer server.
                      </td>
                      <td className="px-4 py-3">
                        Running real-time 1v1 matches, server-authoritative anti-cheat validation, and network stability.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">Advertising &amp; Device Data (AdMob)</td>
                      <td className="px-4 py-3">
                        Advertising ID, App Set ID, IP address (for approximate location), app/ad interaction events, crash logs, and SDK diagnostics.
                      </td>
                      <td className="px-4 py-3">
                        Delivering and measuring ads, fraud prevention, frequency capping, and SDK performance diagnostics.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white">Support Communications</td>
                      <td className="px-4 py-3">
                        Your email address, device model, Android version, and issue description when you email support.
                      </td>
                      <td className="px-4 py-3">
                        Troubleshooting bugs, assisting with account access, and fulfilling privacy or deletion requests.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="google-signin" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                3. Google Sign-In &amp; Account Information
              </h2>
              <p>
                {siteConfig.appName} supports optional or account-based sign-in through <strong>Google Sign-In</strong> integrated with <strong>Supabase Authentication</strong>. When you choose to sign in with Google:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[var(--site-muted)]">
                <li>
                  Google authenticates your identity and provides an authentication credential to Supabase Auth so you do not need to create a separate game password. We never receive or store your Google password.
                </li>
                <li>
                  Supabase Authentication stores your unique account identifier (UUID) and the email address associated with your Google Sign-In account to manage your session and verify ownership if you contact support or request account deletion.
                </li>
                <li>
                  Your chosen in-game display name and basic player profile information are stored in our Supabase database to display on your player profile and competitive leaderboards. Public Google profile avatar images are not stored on our servers.
                </li>
                <li>
                  Your email address is never displayed publicly on leaderboards or shared with other players.
                </li>
              </ul>
            </section>

            <section id="gameplay-multiplayer" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                4. Local Storage, Cloud Saves, Multiplayer &amp; Leaderboards
              </h2>
              <p>
                <strong>Local Device Storage:</strong> Even when playing offline (such as Local Pass &amp; Play or local Tournament sessions), the app stores game preferences, audio settings, and local progress directly on your Android device. Uninstalling the app or clearing app storage removes local-only data.
              </p>
              <p>
                <strong>Supabase Database &amp; Cloud Saves:</strong> When signed in, your player profile, unlocked pens, virtual coin totals, achievement states, and competitive statistics are stored in our cloud database hosted by Supabase so your progress can persist across sessions.
              </p>
              <p>
                <strong>Online Multiplayer &amp; Leaderboards (Render):</strong> When online 1v1 matchmaking and ranked play are active, real-time match sessions connect to our hosted multiplayer server on Render. The server processes your account identifier, display name, Aura Rating, match flick inputs, and network connection data to run server-authoritative matches, detect tampering, and update leaderboard standings. Other players can view public leaderboard fields such as your in-game display name, Aura Rating, rank, and match record.
              </p>
            </section>

            <section id="advertising" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                5. Google AdMob Advertising &amp; Consent Choices
              </h2>
              <p>
                {siteConfig.appName} integrates the <strong>Google Mobile Ads (AdMob) SDK</strong> to display in-app advertisements. Consistent with Google&apos;s official Google Play Data Disclosure documentation for the Mobile Ads SDK, AdMob automatically collects and shares certain data over encrypted TLS connections for advertising, analytics, and fraud prevention:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[var(--site-muted)]">
                <li>
                  <strong>Approximate Location (via IP Address):</strong> Used to estimate general geographic region for ad relevance and compliance.
                </li>
                <li>
                  <strong>Device or Other Identifiers:</strong> Android Advertising ID, App Set ID, and related identifiers used for ad delivery, measurement, and fraud prevention.
                </li>
                <li>
                  <strong>App Interactions:</strong> Information about app launches, taps, ad impressions, and rewarded/interstitial video views.
                </li>
                <li>
                  <strong>Diagnostics &amp; Performance Logs:</strong> Crash logs and SDK performance metrics used to diagnose issues and maintain ad delivery reliability.
                </li>
              </ul>
              <p>
                <strong>Advertising Personalization &amp; Consent:</strong> Where required by law (such as in the European Economic Area, the United Kingdom, or applicable US states), consent choices apply to personalized versus non-personalized ads through Google&apos;s User Messaging Platform (UMP) or equivalent consent frameworks. You can also opt out of ad personalization or reset/delete your Advertising ID at any time in your Android device settings under <strong>Settings → Google → Ads</strong>.
              </p>
              <p className="text-sm text-[var(--site-muted)]">
                Learn how Google uses data from apps using AdMob at{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                .
              </p>
            </section>

            <section id="third-party" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                6. Third-Party Service Providers &amp; Data Sharing
              </h2>
              <p>
                We do not sell your personal information to data brokers. We share or transmit data only with the infrastructure and service providers required to operate the game, or where required by law:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[var(--site-muted)]">
                <li>
                  <strong>Google LLC (Google Sign-In &amp; Google Play Services):</strong> Authentication and Android platform services.
                </li>
                <li>
                  <strong>Google AdMob (Google Mobile Ads SDK):</strong> In-game advertising, ad measurement, and anti-fraud telemetry.
                </li>
                <li>
                  <strong>Supabase, Inc.:</strong> Player authentication, cloud database storage, and gameplay save synchronization.
                </li>
                <li>
                  <strong>Render Services, Inc.:</strong> Hosting for real-time online 1v1 matchmaking and server-authoritative match processing.
                </li>
                <li>
                  <strong>Cloudflare, Inc. (Cloudflare Pages):</strong> Static web hosting and network delivery for this official website (standard HTTP access logs may be processed by Cloudflare for security and DDoS mitigation).
                </li>
              </ul>
              <p>
                We may also disclose information if required to comply with a valid legal obligation, enforce our Terms of Service, or protect the safety and integrity of our players and servers.
              </p>
            </section>

            <section id="storage-security" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                7. How Information Is Stored &amp; Protected
              </h2>
              <p>
                Network communications between the Android app and our authentication, cloud database, multiplayer server, and Google AdMob endpoints use encrypted HTTPS/TLS connections in transit. Access to backend administrative consoles and databases is restricted to authorized developer accounts, and private backend keys are never embedded in the public website or Android client bundle.
              </p>
              <p>
                While we apply reasonable technical and organizational safeguards appropriate for an indie mobile game, no internet transmission or electronic storage system can be guaranteed 100% secure.
              </p>
            </section>

            <section id="retention" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                8. Data Retention Criteria
              </h2>
              <p>
                We retain account and gameplay data only for as long as necessary to provide your game account, preserve your cloud progress, maintain leaderboard integrity, prevent abuse, and satisfy legal obligations:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[var(--site-muted)]">
                <li>
                  <strong>Active Accounts &amp; Cloud Saves:</strong> Retained while your account remains active until you request deletion.
                </li>
                <li>
                  <strong>Multiplayer Match &amp; Operational Logs:</strong> Retained temporarily (typically up to 30 days) for server stability, troubleshooting, and anti-cheat review, after which they are automatically rotated and purged.
                </li>
                <li>
                  <strong>Support Emails:</strong> Retained as long as needed to resolve your request and maintain a record of completed privacy or deletion actions.
                </li>
                <li>
                  <strong>Third-Party SDK Data (AdMob):</strong> Retained by Google according to Google&apos;s own privacy and data retention policies.
                </li>
              </ul>
            </section>

            <section id="account-deletion" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                9. Account Deletion &amp; Associated Data Deletion
              </h2>
              <p>
                You may request permanent deletion of your {siteConfig.appName} account and associated personal data at any time—even if you have already uninstalled the Android app—without needing to reinstall it.
              </p>
              <p>
                Full step-by-step instructions, verification safeguards, and a breakdown of deleted versus retained records are published on our dedicated{' '}
                <Link
                  to="/delete-account"
                  className="font-semibold text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                >
                  Account &amp; Data Deletion page (/delete-account)
                </Link>
                . You can also initiate account deletion from inside the Android application&apos;s account settings menu once signed in.
              </p>
            </section>

            <section id="privacy-rights" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                10. Your Privacy Rights &amp; Choices
              </h2>
              <p>
                Depending on your country or state of residence (such as the EEA, UK, California, India, or other jurisdictions with data protection laws), you may have rights to:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-[var(--site-muted)]">
                <li>Request access to the personal information we hold about your game account.</li>
                <li>Request correction of inaccurate profile information (such as your display name).</li>
                <li>Request deletion of your account and associated cloud data.</li>
                <li>Manage or opt out of personalized advertising via your Android device settings or applicable in-app consent controls.</li>
                <li>Withdraw consent where processing relies on consent (note that withdrawing authentication consent may prevent use of cloud saves or online multiplayer).</li>
              </ul>
              <p>
                To exercise any privacy right, email{' '}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                >
                  {siteConfig.supportEmail}
                </a>
                . We may ask you to verify ownership of the linked email address before fulfilling requests.
              </p>
            </section>

            <section id="children" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                11. Children&apos;s Privacy &amp; Intended Audience
              </h2>
              <p>
                {siteConfig.appName} is a casual competitive arcade game inspired by school desk pen battles, intended for a general audience and not specifically designed to knowingly collect personal data from children below the digital consent age in their jurisdiction (such as under 13 in the United States under COPPA, or under 13–16 in the EEA/UK where applicable) without verifiable parental consent.
              </p>
              <p>
                If you are a parent or legal guardian and believe a child has created an account or provided personal information without appropriate consent, contact us at{' '}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                >
                  {siteConfig.supportEmail}
                </a>{' '}
                so we can promptly delete the account and associated data.
              </p>
            </section>

            <section id="international" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                12. International Data Processing
              </h2>
              <p>
                Because our infrastructure providers (Google, Supabase, Render, and Cloudflare) operate cloud servers globally, your information may be transferred to and processed in countries outside your country of residence, including the United States and European Union regions, where data protection laws may differ. Where required, our providers rely on standard contractual safeguards or equivalent legal mechanisms for cross-border transfers.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                13. Updates to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy whenever we add new game features, modify third-party SDKs, or respond to legal or Google Play policy updates. When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page and, where appropriate, notify players within the app or via release notes before the changes take effect.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24 space-y-3 border-t border-white/[0.08] pt-8">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                14. Contact Information
              </h2>
              <p>
                If you have questions about this Privacy Policy, Google Play Data Safety disclosures, or how your data is handled in {siteConfig.appName}:
              </p>
              <div className="rounded-xl border border-[var(--site-rule)] bg-[var(--site-panel)] p-5 text-sm">
                <p>
                  <strong className="text-white">Publisher:</strong> {siteConfig.publisherName}
                </p>
                <p className="mt-1.5">
                  <strong className="text-white">Application:</strong> {siteConfig.appName} (
                  <code className="font-mono text-xs">{siteConfig.packageName}</code>)
                </p>
                <p className="mt-1.5">
                  <strong className="text-white">Privacy &amp; Support Email:</strong>{' '}
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                  >
                    {siteConfig.supportEmail}
                  </a>
                </p>
                <p className="mt-1.5">
                  <strong className="text-white">Account Deletion Page:</strong>{' '}
                  <Link
                    to="/delete-account"
                    className="text-[var(--site-accent)] underline underline-offset-4 hover:text-white"
                  >
                    /delete-account
                  </Link>
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </Layout>
  );
}
