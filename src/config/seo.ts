import { siteConfig } from './siteConfig';

export const pages = {
  '/': {
    title: 'Pen Fight Aura Wars | Android Pen Fighting Game',
    description: 'Turn your school desk into an arena in Pen Fight Aura Wars. Flick pens, climb a 24-rival Tournament, upgrade your gear, and download the Android APK.',
  },
  '/download': {
    title: 'Download Pen Fight Aura Wars APK for Android',
    description: 'Get the official signed Pen Fight Aura Wars APK. Check Android compatibility and the SHA-256 checksum, see gameplay screenshots, and follow the install guide.',
  },
  '/support': {
    title: 'Pen Fight Aura Wars Support and FAQ',
    description: 'Get help with APK installation, Google sign-in, ranked matches, ads, and saved progress in Pen Fight Aura Wars. Find troubleshooting steps and contact support.',
  },
  '/privacy': {
    title: 'Privacy Policy | Pen Fight Aura Wars',
    description: 'Read how Pen Fight Aura Wars handles account information, gameplay data, advertising, and privacy requests.',
  },
  '/terms': {
    title: 'Terms of Service | Pen Fight Aura Wars',
    description: 'Read the rules and terms for using Pen Fight Aura Wars, including fair play, online features, and account responsibilities.',
  },
  '/delete-account': {
    title: 'Delete Your Account and Data | Pen Fight Aura Wars',
    description: 'Learn how to request deletion of your Pen Fight Aura Wars account and game data and what to expect after submitting a request.',
  },
} as const;

const notFound = {
  title: 'Page Not Found | Pen Fight Aura Wars',
  description: 'Find the official Pen Fight Aura Wars Android download, gameplay guide, and player support.',
};

export const screenshotPaths = {
  match: '/media/arena-poster.jpg',
  weekly: '/media/weekly.jpg',
  garage: '/media/garage.jpg',
};

type SeoTag = { tag: 'title' | 'meta' | 'link' | 'script'; attrs?: Record<string, string>; text?: string };

export function pageSeo(pathname: string): SeoTag[] {
  const path = pathname.replace(/\/+$/, '') || '/';
  const route = Object.hasOwn(pages, path) ? path as keyof typeof pages : null;
  const page = route ? pages[route] : notFound;
  const origin = siteConfig.siteUrl;
  const url = route ? new URL(route, origin).href : null;
  const image = new URL('/media/social.jpg', origin).href;
  const imageAlt = 'Pen Fight Aura Wars key art showing pens facing off on a classroom desk';
  const meta = (kind: 'name' | 'property', value: string, content: string): SeoTag => ({
    tag: 'meta', attrs: { [kind]: value, content },
  });
  const tags: SeoTag[] = [
    { tag: 'title', text: page.title },
    meta('name', 'description', page.description),
  ];

  if (!url) return [...tags, meta('name', 'robots', 'noindex')];

  tags.push(
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', siteConfig.appName),
    meta('property', 'og:url', url),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', imageAlt),
  );

  const { apk } = siteConfig;
  if (route === '/' || route === '/download') {
    const game = {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      '@id': new URL('/#video-game', origin).href,
      name: siteConfig.appName,
      url: new URL('/', origin).href,
      description: 'An Android pen fighting game where players flick pens to knock rivals off a classroom desk. Play solo tournaments or share one phone in Pass & Play.',
      operatingSystem: apk.minAndroidVersion ? `${apk.minAndroidVersion} or newer` : 'Android',
      applicationCategory: 'GameApplication',
      gamePlatform: 'Android',
      genre: 'Arcade',
      image,
      screenshot: Object.values(screenshotPaths).map((file) => new URL(file, origin).href),
      ...(apk.isAvailable && apk.url ? {
        downloadUrl: new URL(apk.url, origin).href,
        softwareVersion: apk.version || undefined,
        offers: { '@type': 'Offer', price: 0, url: new URL('/download#apk', origin).href },
      } : {}),
    };
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(game).replaceAll('<', '\\u003c'),
    });
  }

  return tags;
}

export function updatePageSeo(pathname: string) {
  const tags = pageSeo(pathname);
  if (document.head.querySelector('title[data-page-seo]')?.textContent === tags[0].text) return;

  document.head.querySelectorAll('[data-page-seo]').forEach((element) => element.remove());
  for (const { tag, attrs, text } of tags) {
    const element = document.createElement(tag);
    element.setAttribute('data-page-seo', '');
    for (const [key, value] of Object.entries(attrs ?? {})) element.setAttribute(key, value);
    if (text) element.textContent = text;
    document.head.append(element);
  }
}
