import { useEffect, useState, type ComponentProps, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardNav from './react-bits/CardNav';
import { siteConfig } from '../config/siteConfig';

const NAV_ITEMS = [
  { label: 'Features', to: '/#features' },
  { label: 'Gameplay', to: '/#showcase' },
  { label: 'Pens', to: '/#pens' },
  { label: 'Download', to: '/download' },
  { label: 'Support', to: '/support' },
];

const MOBILE_CARDS = [
  { label: 'Play', bgColor: '#253b3a', textColor: '#fff1d6', links: [
    { label: 'Game modes', href: '/#features' },
    { label: 'Try a flick', href: '/#practice' },
    { label: 'Gameplay', href: '/#showcase' },
  ] },
  { label: 'Pen Garage', bgColor: '#3f2933', textColor: '#fff1d6', links: [
    { label: 'Meet the pens', href: '/#pens' },
  ] },
  { label: 'Get started', bgColor: '#343047', textColor: '#fff1d6', links: [
    { label: 'Download', href: '/download' },
    { label: 'Player support', href: '/support' },
  ] },
];

function CardLink({ href, ...props }: Omit<ComponentProps<typeof Link>, 'to'> & { href: string }) {
  return <Link to={href} {...props} />;
}

export function Navbar() {
  const location = useLocation();
  const [activeHash, setActiveHash] = useState('');
  useEffect(() => setActiveHash(location.hash), [location.hash]);

  const isRouteActive = (to: string) => {
    if (to.startsWith('/#')) {
      return location.pathname === '/' && activeHash === to.slice(1);
    }
    return location.pathname === to;
  };

  return (
    <header className="site-nav sticky top-0 z-50 h-16 border-b border-[var(--site-rule)] bg-[#1c1b29]/95 backdrop-blur-md">
      <div className="site-editorial-width hidden h-full items-center justify-between gap-5 lg:flex">
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

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/download"
            data-download-spark
            className="site-primary-action nav-download hidden sm:inline-flex whitespace-nowrap shrink-0"
          >
            Get the Game
          </Link>
        </div>
      </div>

      <div className="site-card-navigation mx-auto flex h-full max-w-[50rem] items-center px-2 lg:hidden">
        <CardNav
          key={location.key}
          logo={<span className="font-display text-lg font-bold tracking-tight sm:text-xl">{siteConfig.appName}</span>}
          logoAlt={siteConfig.appName}
          logoHref="/"
          items={MOBILE_CARDS}
          cta={{ label: 'Get the Game', href: '/download' }}
          linkComponent={CardLink}
          ariaLabel="Mobile navigation"
          menuLabel={false}
          intro={false}
          accentColor="#f3ca81"
          cardHeight={132}
          stagger={0.055}
          bounce={0.08}
          style={{ '--cn-panel': '#201e2c', '--cn-text': '#fff1d6', '--cn-radius': '12px' } as CSSProperties}
        />
      </div>
    </header>
  );
}
