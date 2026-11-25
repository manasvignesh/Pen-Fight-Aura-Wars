import { readFile, writeFile } from 'node:fs/promises';
import { createServer, loadEnv } from 'vite';

const mode = 'production';
const root = process.cwd();
const output = new URL('../dist/', import.meta.url);
const verification = loadEnv(mode, root, '').GOOGLE_SITE_VERIFICATION?.trim();
if (verification && !/^[A-Za-z0-9_-]+$/.test(verification)) {
  throw new Error('GOOGLE_SITE_VERIFICATION must contain only the content value from the Google HTML tag.');
}

const server = await createServer({
  mode,
  configLoader: 'native',
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: 'custom',
});

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderTag({ tag, attrs, text }) {
  const attributes = Object.entries(attrs ?? {}).map(([name, value]) => ` ${name}="${escapeHtml(value)}"`).join('');
  const opening = `<${tag} data-page-seo${attributes}>`;
  if (tag === 'script') return `${opening}${text}</script>`;
  if (tag === 'title') return `${opening}${escapeHtml(text)}</title>`;
  return opening;
}

try {
  const { pageSeo, pages, renderPage, siteConfig } = await server.ssrLoadModule('/src/prerender.tsx');
  const template = await readFile(new URL('index.html', output), 'utf8');
  const routes = Object.keys(pages);
  if (!template.includes('<!-- page-seo -->') || !template.includes('<div id="root"></div>')) {
    throw new Error('Missing template markers for static rendering.');
  }

  for (const path of [...routes, '/404']) {
    const filename = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
    const tags = pageSeo(path).map(renderTag);
    if (path === '/' && verification) tags.push(`<meta name="google-site-verification" content="${verification}">`);
    const body = renderPage(path);
    if (!body.includes('<h1')) throw new Error(`Static render produced no heading for ${path}`);
    const html = template.replace('<!-- page-seo -->', () => tags.join('\n    '))
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    await writeFile(new URL(filename, output), html);
  }

  const origin = siteConfig.siteUrl;
  const entries = routes.map((path) => `  <url><loc>${escapeHtml(new URL(path, origin).href)}</loc></url>`).join('\n');
  await writeFile(new URL('sitemap.xml', output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
  await writeFile(new URL('robots.txt', output), `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`);
  console.log(`Prerendered ${routes.length} pages and a 404 page, then generated the sitemap and robots.txt.`);
} finally {
  await server.close();
}
