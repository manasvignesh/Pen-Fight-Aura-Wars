import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090D]">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-tight text-white hover:text-[#60A5FA] transition-colors"
            >
              {siteConfig.appName}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              {siteConfig.tagline} Official publisher website for the Android mobile game built for competitive desk pen battles.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8]">
              <span className="font-mono text-[#CBD5E1]">{siteConfig.packageName}</span>
              <span aria-hidden="true">·</span>
              <span>Android</span>
              <span aria-hidden="true">·</span>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-[#CBD5E1] underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/60 transition-colors"
              >
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>

          {/* Game Links */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold text-white">Game</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link to="/#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pens" className="hover:text-white transition-colors">
                  Collectible Pens
                </Link>
              </li>
              <li>
                <Link to="/#showcase" className="hover:text-white transition-colors">
                  Gameplay Showcase
                </Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-white transition-colors">
                  Downloads &amp; APK
                </Link>
              </li>
            </ul>
          </div>

          {/* Player Support */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-semibold text-white">Support</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support#bug-report" className="hover:text-white transition-colors">
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link to="/download#install-guide" className="hover:text-white transition-colors">
                  APK Install Guide
                </Link>
              </li>
              <li>
                <Link to="/delete-account" className="hover:text-white transition-colors">
                  Delete Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Publisher */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold text-white">Legal &amp; Publisher</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/delete-account" className="hover:text-white transition-colors">
                  Account &amp; Data Deletion
                </Link>
              </li>
              <li>
                <a
                  href="/app-ads.txt"
                  className="font-mono text-xs text-[#94A3B8] hover:text-white transition-colors"
                >
                  /app-ads.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.publisherName}. All rights reserved.
          </p>
          <p>
            Google Play and the Android logo are trademarks of Google LLC. This website is operated independently by the game publisher.
          </p>
        </div>
      </div>
    </footer>
  );
}
