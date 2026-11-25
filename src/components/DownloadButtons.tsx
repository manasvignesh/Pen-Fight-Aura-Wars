import { Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowDownRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import StarBorder from './react-bits/StarBorder';

export function DownloadButtons() {
  const { playStore, apk } = siteConfig;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <StarBorder>
        {playStore.isLive && playStore.href ? (
          <a href={playStore.href} className="site-primary-action" target="_blank" rel="noopener noreferrer">
            Get it on Google Play <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : (
          <Link to="/download#apk" className="site-primary-action">
            <ArrowDownToLine className="size-4" aria-hidden="true" />{apk.isAvailable ? 'Get the Android APK' : 'Check release availability'}
          </Link>
        )}
      </StarBorder>
      <a href="#practice" className="site-secondary-action">Try a flick <ArrowDownRight className="size-4" aria-hidden="true" /></a>
    </div>
  );
}
