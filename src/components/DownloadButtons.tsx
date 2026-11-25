import { Link } from 'react-router-dom';
import { ArrowDownToLine, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function DownloadButtons() {
  const { playStore, apk } = siteConfig;
  const primaryClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#FACC15] px-5 py-3 text-sm font-bold text-[#090B10] transition-colors hover:bg-amber-200';

  return (
    <div className="flex flex-wrap items-center gap-4">
      {playStore.isLive && playStore.href ? (
        <a href={playStore.href} className={primaryClass} target="_blank" rel="noopener noreferrer">
          Get it on Google Play <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      ) : (
        <Link to="/download#apk" className={primaryClass}>
          <ArrowDownToLine className="size-4" aria-hidden="true" /> {apk.isAvailable ? 'Get the Android APK' : 'Check release availability'}
        </Link>
      )}
      <a href="#showcase" className="text-sm font-semibold text-sky-200 underline-offset-4 hover:underline">
        See gameplay
      </a>
    </div>
  );
}
