import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fallbackTitle: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-video',
  fallbackTitle,
  priority = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex ${aspectClassName} w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-[#121620] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-8 w-8 text-[#64748B]" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium text-[#CBD5E1]">{fallbackTitle}</p>
        <p className="mt-1 text-xs text-[#94A3B8]">Visual asset unavailable</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${aspectClassName} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
