import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { siteConfig } from '../config/siteConfig';
import { formatCanonicalUrl } from '../utils/validation';

export interface RouteMeta {
  title: string;
  description: string;
}

interface LayoutProps {
  meta: RouteMeta;
  children: ReactNode;
}

export function Layout({ meta, children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = meta.title;

    const updateMetaTag = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', meta.description);
    updateMetaTag('meta[property="og:title"]', meta.title);
    updateMetaTag('meta[property="og:description"]', meta.description);
    updateMetaTag('meta[name="twitter:title"]', meta.title);
    updateMetaTag('meta[name="twitter:description"]', meta.description);

    const canonicalHref = formatCanonicalUrl(
      siteConfig.siteUrl,
      window.location.origin,
      location.pathname
    );

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalHref);

    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (!ogUrlEl) {
      ogUrlEl = document.createElement('meta');
      ogUrlEl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlEl);
    }
    ogUrlEl.setAttribute('content', canonicalHref);
  }, [meta.title, meta.description, location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--site-ink)] text-[var(--site-text)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className={location.pathname === '/' ? 'flex-1' : 'site-reader textile-section flex-1'}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
