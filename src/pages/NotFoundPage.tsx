import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function NotFoundPage() {
  return (
    <Layout
      meta={{
        title: 'Page Not Found — Pen Fight Aura Wars',
        description: 'The requested page could not be found on the official Pen Fight Aura Wars website.',
      }}
    >
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-sm font-medium text-[#EAB308]">404</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-white sm:text-6xl">
          Knocked Off the Desk
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--site-muted)]">
          The page you are looking for does not exist or has moved. Use the links below to head back to the arena.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[var(--site-accent)] px-6 py-2.5 text-sm font-semibold text-[#241b1a] transition-colors hover:bg-[#ffe1b3]"
          >
            Back to Homepage
          </Link>
          <Link
            to="/download"
            className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            Downloads
          </Link>
          <Link
            to="/support"
            className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            Support
          </Link>
        </div>
      </div>
    </Layout>
  );
}
