import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const groups = [
  {
    title: 'Explore', links: [
      ['/#features', 'Game modes'], ['/#showcase', 'Gameplay'], ['/#pens', 'Pen Garage'], ['/download', 'Get the game'],
    ],
  },
  {
    title: 'Player support', links: [
      ['/support', 'Help center'], ['/support#bug-report', 'Report a bug'], ['/download#install-guide', 'Installation guide'],
    ],
  },
  {
    title: 'Legal', links: [
      ['/privacy', 'Privacy policy'], ['/terms', 'Terms of service'], ['/delete-account', 'Delete account'],
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer textile-section border-t border-[var(--site-rule)] bg-[var(--site-ink)] text-[var(--site-text)]">
      <div className="site-editorial-width py-12 sm:py-16">
        <div className="grid gap-x-8 gap-y-9 md:grid-cols-[1.1fr_1.9fr]">
          <div>
            <Link to="/" className="inline-block font-display text-4xl font-extrabold leading-none tracking-tight hover:text-[var(--site-accent)] sm:text-5xl">
              {siteConfig.appName}
            </Link>
            <p className="mt-3 text-sm text-[#b9bdc6]">The official Android game.</p>
            <a href={`mailto:${siteConfig.supportEmail}`} className="mt-4 inline-flex min-h-9 items-center text-sm font-semibold text-[#d8d9dc] underline decoration-white/30 underline-offset-4 hover:text-white">
              Contact support
            </a>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
            {groups.map(({ title, links }) => (
              <div key={title}>
                <h2 className="text-sm font-bold">{title}</h2>
                <ul className="mt-2 text-sm text-[#b9bdc6]">
                  {links.map(([path, label]) => (
                    <li key={path}><Link to={path} className="inline-flex min-h-9 items-center hover:text-[var(--site-accent)]">{label}</Link></li>
                  ))}
                  {title === 'Legal' && <li><a href="/app-ads.txt" className="inline-flex min-h-9 items-center hover:text-[var(--site-accent)]">App ads file</a></li>}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs leading-relaxed text-[#a8acb6]">
          <p>© {year} {siteConfig.publisherName}.</p>
          <p>Google Play and the Android logo are trademarks of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
}
