import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

const routes = ['/', '/download', '/support', '/privacy', '/delete-account', '/terms'];

function siteOrigin(value: string | undefined) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL must be the HTTPS origin of the official site.');
  }
  return url.origin;
}

export default defineConfig(({ mode }) => {
  const origin = siteOrigin(loadEnv(mode, import.meta.dirname, 'VITE_').VITE_SITE_URL?.trim());
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'official-site-metadata',
        apply: 'build',
        transformIndexHtml(html) {
          if (!origin) return html;
          return {
            html: html.replaceAll('content="/media/social.jpg"', `content="${origin}/media/social.jpg"`),
            tags: [
              { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` } },
              { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` } },
            ],
          };
        },
        generateBundle() {
          const robots = 'User-agent: *\nAllow: /\n';
          this.emitFile({ type: 'asset', fileName: 'robots.txt',
            source: origin ? `${robots}Sitemap: ${origin}/sitemap.xml\n` : robots });
          if (!origin) return;
          const links = routes.map(route => `  <url><loc>${origin}${route}</loc></url>`).join('\n');
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${links}\n</urlset>\n` });
        },
      },
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
