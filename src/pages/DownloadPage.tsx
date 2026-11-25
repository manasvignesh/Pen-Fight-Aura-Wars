import { useState } from 'react';
import { ArrowDownToLine, Copy, ExternalLink, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import StarBorder from '../components/react-bits/StarBorder';
import { siteConfig } from '../config/siteConfig';

export function DownloadPage() {
  const { playStore, apk } = siteConfig;
  const [copyStatus, setCopyStatus] = useState('');

  async function copyChecksum() {
    if (!apk.sha256) return;
    try {
      await navigator.clipboard.writeText(apk.sha256);
      setCopyStatus('Checksum copied.');
    } catch {
      setCopyStatus('Select and copy the checksum below.');
    }
  }

  return (
    <Layout meta={{
      title: 'Download Pen Fight Aura Wars for Android',
      description: 'Get the official Pen Fight Aura Wars Android release, check the APK checksum, and find installation help.',
    }}>
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="download-page-heading textile-section game-frame px-5 sm:px-8">
          <h1 className="max-w-[17ch] font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Download Pen Fight Aura Wars</h1>
          <p className="mt-3 max-w-[48ch] text-base text-slate-300">
            {playStore.isLive ? 'Use Google Play for automatic updates. The official APK is also available for direct installation.' : 'Get the signed Android APK directly from the official website.'}
          </p>
        </header>

        <section id="google-play" aria-labelledby="google-play-heading" className={playStore.isLive ? 'mt-7 scroll-mt-20 rounded-xl border border-[var(--site-rule)] bg-[var(--site-panel)] p-5' : 'sr-only'}>
          <h2 id="google-play-heading" className="font-display text-xl font-bold text-white">Google Play</h2>
          {playStore.isLive && playStore.href ? (
            <a href={playStore.href} data-download-spark target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-lg bg-amber-300 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-amber-200">
              Get it on Google Play <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : <p>Public Google Play availability has not been confirmed.</p>}
        </section>

        <section id="apk" aria-labelledby="apk-heading" className="mt-7 scroll-mt-20 rounded-xl border border-[var(--site-rule)] bg-[var(--site-panel)] p-5 sm:p-7">
          <h2 id="apk-heading" className="font-display text-2xl font-bold text-white">Official Android APK</h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
            {apk.version && <span>Version {apk.version}</span>}
            {apk.fileSize && <span>{apk.fileSize}</span>}
            {apk.minAndroidVersion && <span>{apk.minAndroidVersion} or newer</span>}
          </div>
          {apk.isAvailable && apk.url ? (
            <div className="mt-5">
              <StarBorder>
              <a href={apk.url} download data-download-spark
              className={playStore.isLive ? 'site-secondary-action' : 'site-primary-action'}>
              <ArrowDownToLine className="size-4" aria-hidden="true" /> Download signed APK
              </a>
              </StarBorder>
            </div>
          ) : <p className="mt-5 text-sm text-slate-300">The direct download is temporarily unavailable.</p>}
          {apk.isAvailable && apk.sha256Valid && apk.sha256 && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-1 text-sm text-slate-200">
                <h3 className="font-semibold">SHA-256 checksum</h3>
                <button type="button" onClick={() => void copyChecksum()}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-[var(--site-accent)] hover:bg-white/5">
                  <Copy className="size-4" aria-hidden="true" /> Copy checksum
                </button>
              </div>
              <code className="block break-all font-mono text-xs leading-relaxed text-slate-300">{apk.sha256}</code>
              <p role="status" className="mt-1 text-xs text-[var(--site-accent)]">{copyStatus}</p>
            </div>
          )}
        </section>

        <section id="install-guide" aria-labelledby="install-heading" className="mt-7 scroll-mt-20">
          <h2 id="install-heading" className="font-display text-2xl font-bold text-white">Install the APK</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
            <li>Download the file on your Android phone and compare its SHA-256 checksum with the one above.</li>
            <li>Open the APK. If prompted, allow installation from the browser or file manager you used. Keep Google Play Protect enabled.</li>
            <li>Complete installation, then turn the install permission back off if you enabled it.</li>
          </ol>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">If Android rejects an update to a Google Play installation, use Google Play to update that copy. Before switching install sources, check that your progress is backed up.</p>
        </section>

        {apk.version === '1.2.7' && <section aria-labelledby="release-notes-heading" className="mt-7 border-t border-white/10 pt-6">
          <h2 id="release-notes-heading" className="font-display text-2xl font-bold text-white">What’s new in 1.2.7</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Stronger flick, hit, and ring-out vibrations, with an on/off toggle and a vibration test in Settings.</p>
        </section>}

        <Link to="/support" data-download-spark className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-[var(--site-accent)] hover:underline">
          <LifeBuoy className="size-4" aria-hidden="true" /> Get installation help
        </Link>
      </div>
    </Layout>
  );
}
