import { ArrowDownToLine, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import StarBorder from './react-bits/StarBorder';

export function DownloadCallout() {
  const { apk, playStore } = siteConfig;

  return (
    <section aria-labelledby="download-heading" className="game-section textile-section download-finale">
      <img src="/media/illustrations/release-cover.webp" alt="" width={1440} height={960} loading="lazy"
        className="download-finale-art" />
      <div className="site-editorial-width relative">
        <div className="download-finale-content">
          <h2 id="download-heading" className="editorial-heading">Your turn.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--site-muted)] sm:text-lg">
            Bring the classroom pen fight to your Android phone.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <StarBorder>
              {playStore.isLive && playStore.href ? (
                <a href={playStore.href} target="_blank" rel="noopener noreferrer" className="site-primary-action">
                  Get it on Google Play <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : (
                <Link to="/download#apk" className="site-primary-action">
                  <ArrowDownToLine className="size-4" aria-hidden="true" />
                  {apk.isAvailable ? 'Get the Android APK' : 'Check Android availability'}
                </Link>
              )}
            </StarBorder>
            <Link to="/download#install-guide" className="site-secondary-action">
              Installation guide <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          {apk.isAvailable && (apk.version || apk.minAndroidVersion) && (
            <p className="mt-5 text-sm text-[var(--site-muted)]">
              {[apk.version && `Version ${apk.version}`, apk.minAndroidVersion && `${apk.minAndroidVersion} or newer`].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
