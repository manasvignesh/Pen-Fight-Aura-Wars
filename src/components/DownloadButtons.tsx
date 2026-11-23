import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, Clock, ShieldCheck, Check, Copy } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface DownloadButtonsProps {
  compact?: boolean;
  showMetadataStrip?: boolean;
}

export function DownloadButtons({
  compact = false,
  showMetadataStrip = true,
}: DownloadButtonsProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const { playStore, apk } = siteConfig;

  const handleCopySha = async () => {
    if (!apk.sha256) return;
    try {
      await navigator.clipboard.writeText(apk.sha256);
      setCopiedHash(true);
      window.setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      setCopiedHash(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className={`flex flex-col gap-3 sm:flex-row ${compact ? 'sm:items-center' : 'sm:items-stretch'}`}>
        {/* Primary CTA: Google Play Store */}
        {playStore.isLive && playStore.href ? (
          <a
            href={playStore.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap"
          >
            <span>Get it on Google Play</span>
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <Link
            to="/download#google-play"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap"
          >
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Google Play · Coming Soon</span>
          </Link>
        )}

        {/* Secondary CTA: Official Signed APK */}
        {apk.isAvailable && apk.url ? (
          <a
            href={apk.url}
            download
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.08] whitespace-nowrap"
          >
            <Download className="h-4 w-4 shrink-0 text-[#EAB308]" aria-hidden="true" />
            <span>
              Download Official APK{apk.version ? ` (v${apk.version})` : ''}
            </span>
          </a>
        ) : (
          <Link
            to="/download#apk"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.08] whitespace-nowrap"
          >
            <Download className="h-4 w-4 shrink-0 text-[#EAB308]" aria-hidden="true" />
            <span>Direct APK · Release Details</span>
          </Link>
        )}
      </div>

      {showMetadataStrip && (
        <div className="space-y-2 text-xs text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-x-2.5">
            <span>
              Package: <span className="font-mono text-[#CBD5E1]">{playStore.packageName}</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>
              Version:{' '}
              <span className="font-mono tabular-nums text-[#CBD5E1]">
                {apk.version ? `v${apk.version}` : 'Pending verified release'}
              </span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>
              Size:{' '}
              <span className="font-mono tabular-nums text-[#CBD5E1]">
                {apk.fileSize ?? 'Confirmed at release'}
              </span>
            </span>
          </div>

          {apk.sha256 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[#CBD5E1]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#3B82F6]" aria-hidden="true" />
                SHA-256:
              </span>
              <code className="break-all font-mono text-[11px] text-[#94A3B8]">
                {apk.sha256}
              </code>
              <button
                type="button"
                onClick={handleCopySha}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#60A5FA] hover:text-white transition-colors"
                aria-label="Copy SHA-256 checksum"
              >
                {copiedHash ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}

          <p className="max-w-2xl leading-relaxed text-[#94A3B8]">
            Installing outside Google Play? Only download the signed release APK from this domain, verify its SHA-256 hash on the{' '}
            <Link
              to="/download#install-guide"
              className="text-[#CBD5E1] underline decoration-white/25 underline-offset-4 hover:text-white"
            >
              Downloads page
            </Link>
            , and keep Google Play Protect enabled on your device.
          </p>
        </div>
      )}
    </div>
  );
}
