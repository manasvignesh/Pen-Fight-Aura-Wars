import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const NAV_ITEMS = [
  { label: 'Features', to: '/#features' },
  { label: 'Gameplay', to: '/#showcase' },
  { label: 'Pens', to: '/#pens' },
  { label: 'Download', to: '/download' },
  { label: 'Support', to: '/support' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isRouteActive = (to: string) => {
    if (to.startsWith('/#')) {
      return location.pathname === '/' && location.hash === to.slice(1);
    }
    return location.pathname === to;
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[var(--site-rule)] bg-[#1c1b29]/95 backdrop-blur-md">
      <div className="site-editorial-width flex h-full items-center justify-between gap-5">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tight text-[var(--site-text)] transition-colors hover:text-[var(--site-accent)] whitespace-nowrap shrink-0"
        >
          {siteConfig.appName}
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#CBD5E1]"
        >
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[var(--site-accent)]'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/download"
            className="site-primary-action nav-download hidden sm:inline-flex whitespace-nowrap shrink-0"
          >
            Get the Game
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-[#E2E8F0] transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="border-b border-[var(--site-rule)] bg-[var(--site-panel)] px-4 pb-5 pt-3 lg:hidden"
        >
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-white/[0.07] text-white'
                      : 'text-[#CBD5E1] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/download"
                className="site-primary-action w-full"
              >
                Get the Game
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
