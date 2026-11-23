import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  ExternalLink,
  Clock,
  ShieldCheck,
  Check,
  Copy,
  FileCheck2,
  LifeBuoy,
  Lock,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { ConfirmationNotice } from '../components/ConfirmationNotice';
import { siteConfig } from '../config/siteConfig';

export function DownloadPage() {
  const [copiedHash, setCopiedHash] = useState(false);
  const { playStore, apk } = siteConfig;

  const handleCopySha = async () => {
    if (!apk.sha256) return;
    try {
      await navigator.clipboard.writeText(apk.sha256);
      setCopiedHash(true);
      window.setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      setCopiedHash(false);
    }
  };

  const buildSpecs = [
    { label: 'Android Package ID', value: playStore.packageName, mono: true },
    {
      label: 'Current Release Version',
      value: apk.version ? `v${apk.version}` : 'Pending verified release build',
      mono: true,
    },
    {
      label: 'Release Date',
      value: apk.releaseDate ?? 'To be confirmed upon release publication',
      mono: false,
    },
    {
      label: 'Approximate File Size',
      value: apk.fileSize ?? 'To be confirmed from signed release APK',
      mono: true,
    },
    {
      label: 'Minimum Android Version',
      value: apk.minAndroidVersion ?? 'To be confirmed from release build minSdk',
      mono: false,
    },
    {
      label: 'Direct Download Format',
      value: 'Signed Production APK (.apk only — never .aab or debug builds)',
      mono: false,
    },
  ];

  return (
    <Layout
      meta={{
        title: 'Download Pen Fight Aura Wars — Google Play & Official Android APK',
        description:
          'Official download page for Pen Fight Aura Wars (com.penfightroyale.game) on Android. Get Google Play availability, signed release APK verification hash, and safe installation instructions.',
      }}
    >
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-[#60A5FA]">Official Release Distribution</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Download Pen Fight Aura Wars
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#B4BCCE]">
            Download only from the official Google Play Store listing or the verified signed release APK published on this page. We never distribute unsigned builds, debug APKs, or Android App Bundles (.aab) for direct installation.
          </p>
        </header>

        {/* Pre-release Configuration Transparency Banner (only shown if Play Store or APK not yet configured) */}
        {(!playStore.isLive || !apk.isAvailable) && (
          <div className="mt-8">
            <ConfirmationNotice title="Release Configuration Notice">
              <p>
                Official distribution metadata is driven by environment variables so unverified URLs, versions, or hashes are never invented.{' '}
                {!playStore.isLive &&
                  'The Google Play listing is currently marked Coming Soon (VITE_PLAY_STORE_LIVE is not enabled). '}
                {!apk.isAvailable &&
                  'No signed production APK URL is currently configured (VITE_APK_URL is empty or unverified).'}
              </p>
            </ConfirmationNotice>
          </div>
        )}

        {/* Two Distribution Channels */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Google Play Card */}
          <section
            id="google-play"
            aria-labelledby="google-play-heading"
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
          >
            <div>
              <p className="text-xs font-medium text-[#60A5FA]">
                Recommended Channel · {playStore.isLive ? 'Available Now' : 'Coming Soon'}
              </p>
              <h2
                id="google-play-heading"
                className="mt-2 font-display text-3xl font-bold text-white"
              >
                Google Play Store
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                Install through Google Play for automatic updates, Play Protect verification, and seamless Google Sign-In support on supported Android devices.
              </p>
              <p className="mt-4 text-xs text-[#94A3B8]">
                Package ID:{' '}
                <code className="font-mono text-[#E2E8F0]">{playStore.packageName}</code>
              </p>
            </div>

            <div className="mt-8">
              {playStore.isLive && playStore.href ? (
                <a
                  href={playStore.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
                >
                  <span>Get it on Google Play</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <div className="rounded-lg border border-white/10 bg-[#0B0E15] px-4 py-3.5 text-sm text-[#CBD5E1]">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <Clock className="h-4 w-4 text-[#EAB308]" aria-hidden="true" />
                    <span>Coming Soon on Google Play</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                    The Play Store listing for <code className="font-mono">{playStore.packageName}</code> is not live yet. This button will link directly to Google Play once published.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Direct Signed APK Card */}
          <section
            id="apk"
            aria-labelledby="apk-heading"
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
          >
            <div>
              <p className="text-xs font-medium text-[#EAB308]">
                Direct Android Package · {apk.isAvailable ? 'Signed Release Ready' : 'Pending Signed Build'}
              </p>
              <h2 id="apk-heading" className="mt-2 font-display text-3xl font-bold text-white">
                Official Signed APK
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                Download the final, tested, release-signed Android APK directly from our HTTPS distribution host. Always verify the SHA-256 hash below before installing.
              </p>
              <p className="mt-4 text-xs text-[#94A3B8]">
                Version:{' '}
                <span className="font-mono tabular-nums text-[#E2E8F0]">
                  {apk.version ? `v${apk.version}` : 'Pending release'}
                </span>
                {' · '}
                Size:{' '}
                <span className="font-mono tabular-nums text-[#E2E8F0]">
                  {apk.fileSize ?? 'Pending release'}
                </span>
              </p>
            </div>

            <div className="mt-8">
              {apk.isAvailable && apk.url ? (
                <a
                  href={apk.url}
                  download
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#EAB308] px-5 py-3 text-sm font-semibold text-[#090B10] transition-colors hover:bg-[#FACC15]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Download Signed APK{apk.version ? ` (v${apk.version})` : ''}
                  </span>
                </a>
              ) : (
                <div className="rounded-lg border border-white/10 bg-[#0B0E15] px-4 py-3.5 text-sm text-[#CBD5E1]">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <FileCheck2 className="h-4 w-4 text-[#EAB308]" aria-hidden="true" />
                    <span>Signed Release APK Pending Upload</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                    {apk.rejectionReason ??
                      'A verified signed release APK will appear here once uploaded and verified with its SHA-256 checksum.'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Build Metadata & SHA-256 Verification */}
        <section
          aria-labelledby="build-specs-heading"
          className="mt-10 rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
        >
          <h2 id="build-specs-heading" className="font-display text-3xl font-bold text-white">
            Build Specifications &amp; Checksum Verification
          </h2>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
            {buildSpecs.map((spec) => (
              <div key={spec.label} className="space-y-1">
                <dt className="text-xs font-medium text-[#94A3B8]">{spec.label}</dt>
                <dd
                  className={`text-sm text-white ${
                    spec.mono ? 'font-mono tabular-nums' : 'font-medium'
                  }`}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* SHA-256 Box */}
          <div className="mt-6 rounded-lg border border-white/10 bg-[#0B0E15] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E2E8F0]">
                <ShieldCheck className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
                <span>SHA-256 Verification Hash</span>
              </div>

              {apk.sha256 && (
                <button
                  type="button"
                  onClick={handleCopySha}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-white/15 px-3 py-1 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-white/30 hover:text-white"
                >
                  {copiedHash ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#3B82F6]" aria-hidden="true" />
                      <span>Copied Hash</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy SHA-256</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <p className="mt-2.5 break-all font-mono text-xs leading-relaxed text-[#CBD5E1]">
              {apk.sha256 ??
                'Pending verified signed release APK — publish the exact 64-character SHA-256 digest via VITE_APK_SHA256.'}
            </p>
            {apk.sha256 && !apk.sha256Valid && (
              <p className="mt-2 text-xs text-[#FACC15]">
                Warning: Configured SHA-256 value does not match standard 64-character hexadecimal format. Re-generate with shasum -a 256 before launch.
              </p>
            )}
          </div>
        </section>

        {/* Safe Installation Guidance */}
        <section
          id="install-guide"
          aria-labelledby="install-guide-heading"
          className="mt-10 rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
        >
          <h2 id="install-guide-heading" className="font-display text-3xl font-bold text-white">
            Safe Android APK Installation Guidance
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B4BCCE]">
            Installing an APK outside Google Play requires extra care. Follow these steps without disabling your device&apos;s built-in Android security protections.
          </p>

          <ol className="mt-6 space-y-4 text-sm leading-relaxed text-[#CBD5E1]">
            <li className="border-t border-white/[0.08] pt-4">
              <span className="font-semibold text-white">1. Download exclusively from this official domain.</span>{' '}
              Confirm the URL starts with <code className="font-mono text-xs">https://</code> and avoid third-party APK mirror sites that may repackage or tamper with the app.
            </li>
            <li className="border-t border-white/[0.08] pt-4">
              <span className="font-semibold text-white">2. Verify the SHA-256 checksum.</span>{' '}
              Compare the downloaded file&apos;s SHA-256 digest (using a file-hash utility on Android or <code className="font-mono text-xs">sha256sum</code> on desktop) against the hash published above. Do not install the file if the hashes differ.
            </li>
            <li className="border-t border-white/[0.08] pt-4">
              <span className="font-semibold text-white">3. Keep Google Play Protect enabled.</span>{' '}
              Never disable Google Play Protect or system security checks. Android will prompt you to grant temporary &ldquo;Install unknown apps&rdquo; permission strictly to your browser or Files app—you can revoke that permission immediately after installation completes.
            </li>
            <li className="border-t border-white/[0.08] pt-4">
              <span className="font-semibold text-white">4. Switch to Google Play when available.</span>{' '}
              Because both channels use the same signed release key and package ID (<code className="font-mono text-xs">{playStore.packageName}</code>), Google Play can manage future updates once the store listing is live.
            </li>
          </ol>
        </section>

        {/* Release Notes */}
        <section
          aria-labelledby="release-notes-heading"
          className="mt-10 rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
        >
          <h2 id="release-notes-heading" className="font-display text-3xl font-bold text-white">
            Release Notes
          </h2>
          <div className="mt-5 border-t border-white/[0.08] pt-5 text-sm leading-relaxed text-[#CBD5E1]">
            <p className="font-semibold text-white">
              {apk.version
                ? `Version ${apk.version}${apk.releaseDate ? ` · ${apk.releaseDate}` : ''}`
                : 'Initial Public Release · Changelog Pending Final Build Tag'}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#B4BCCE]">
              <li>Physics-based desk pen battles with flick power, rotation, and collision momentum.</li>
              <li>Tournament ladder against escalating AI opponents with coin rewards and progression.</li>
              <li>Local Pass &amp; Play mode for two players sharing one Android phone.</li>
              <li>Six collectible pens: Classic Ballpoint, Hyper Gel Pro, Neon Highlighter, Chunky Marker, Vortex Spinner, and Gold Fountain.</li>
              <li>Power Surge and Turbo Flick arcade mechanics.</li>
              <li>
                Online 1v1 multiplayer status:{' '}
                {siteConfig.features.onlineMultiplayerLive
                  ? 'Active on production multiplayer server.'
                  : 'Coming soon pending final production server verification.'}
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom Helpful Links */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/privacy"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#11151F] p-5 transition-colors hover:border-white/25 hover:bg-[#151A26]"
          >
            <div>
              <p className="text-sm font-semibold text-white">Privacy Policy</p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Review data handling, Google Sign-In, Supabase, and AdMob disclosures.
              </p>
            </div>
            <Lock className="h-5 w-5 shrink-0 text-[#60A5FA]" aria-hidden="true" />
          </Link>

          <Link
            to="/support"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#11151F] p-5 transition-colors hover:border-white/25 hover:bg-[#151A26]"
          >
            <div>
              <p className="text-sm font-semibold text-white">Installation &amp; Player Support</p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Need help installing the APK or signing in? Visit the Support Center.
              </p>
            </div>
            <LifeBuoy className="h-5 w-5 shrink-0 text-[#EAB308]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
