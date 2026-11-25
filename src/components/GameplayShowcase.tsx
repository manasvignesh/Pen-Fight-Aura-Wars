import { siteConfig } from '../config/siteConfig';

const captures = [
  { src: '/media/weekly.jpg', title: 'Weekly Tournament', alt: 'Weekly Tournament bracket, stage rewards, and Clean Sweep challenge' },
  { src: '/media/garage.jpg', title: 'Pen Garage', alt: 'Pen Garage with a pen preview and upgrade options' },
  { src: '/media/progress.jpg', title: 'Your progress', alt: 'Tournament progress and the requirements for unlocking the next pen' },
];

export function GameplayShowcase() {
  const trailerUrl = siteConfig.media.trailerUrl;
  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="scroll-mt-16 border-t border-white/10 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="showcase-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Inside the game</h2>
          {trailerUrl && <a href={trailerUrl} target="_blank" rel="noopener noreferrer"
            className="py-2 text-sm font-semibold text-sky-200 hover:underline">Watch the trailer</a>}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {captures.map(({ src, title, alt }) => (
            <figure key={src} className="overflow-hidden rounded-xl border border-white/10 bg-[#11151F]">
              <img src={src} alt={alt} width={390} height={844} loading="lazy" decoding="async"
                className="h-auto w-full border-b border-white/10 bg-slate-950" />
              <figcaption className="px-4 py-3 text-sm font-semibold text-white">{title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
