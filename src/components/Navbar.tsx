import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const NAV_ITEMS = [
  { label: 'Features', to: '/#features' },
  { label: 'Pens', to: '/#pens' },
  { label: 'Download', to: '/download' },
  { label: 'Support', to: '/support' },
  { label: 'Privacy', to: '/privacy' },
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
    <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#090B10]/92 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#60A5FA] whitespace-nowrap shrink-0"
        >
          {siteConfig.appName}
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#CBD5E1]"
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
                    ? 'text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#3B82F6]'
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
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap shrink-0"
          >
            Get the Game
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-[#E2E8F0] transition-colors hover:bg-white/[0.06] md:hidden"
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
          className="border-b border-white/10 bg-[#0D1017] px-4 pb-5 pt-3 md:hidden"
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
                className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
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
