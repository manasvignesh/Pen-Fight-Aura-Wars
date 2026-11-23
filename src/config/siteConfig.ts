import {
  cleanEnvString,
  isSafeHttpsUrl,
  resolvePlayStoreAction,
  validateApkDownloadConfig,
  type PlayStoreActionState,
  type ValidatedApkConfig,
} from '../utils/validation';

const env = import.meta.env;

const PACKAGE_NAME = 'com.penfightroyale.game';
const ADMOB_APP_ADS_LINE = 'google.com, pub-9403523388888787, DIRECT, f08c47fec0942fa0';

const configuredSupportEmail = cleanEnvString(env.VITE_SUPPORT_EMAIL);
const configuredPublisherName = cleanEnvString(env.VITE_PUBLISHER_NAME);
const configuredSiteUrl = cleanEnvString(env.VITE_SITE_URL);
const configuredTrailerUrl = cleanEnvString(env.VITE_TRAILER_URL);

export interface SiteConfig {
  appName: string;
  tagline: string;
  packageName: string;
  admobAppAdsLine: string;
  publisherName: string;
  publisherNameNeedsConfirmation: boolean;
  supportEmail: string;
  supportEmailNeedsConfirmation: boolean;
  siteUrl: string | null;
  playStore: PlayStoreActionState;
  apk: ValidatedApkConfig;
  features: {
    onlineMultiplayerLive: boolean;
  };
  media: {
    trailerUrl: string | null;
  };
  legal: {
    effectiveDate: string | null;
    lastUpdated: string | null;
    deletionTimeframe: string | null;
  };
}

export const siteConfig: SiteConfig = {
  appName: 'Pen Fight Aura Wars',
  tagline: 'Every Flick Counts. Every Victory Builds Your Aura.',
  packageName: PACKAGE_NAME,
  admobAppAdsLine: ADMOB_APP_ADS_LINE,
  publisherName: configuredPublisherName ?? 'Pen Fight Aura Wars Developer',
  publisherNameNeedsConfirmation: !configuredPublisherName,
  supportEmail: configuredSupportEmail ?? 'manasvig43@gmail.com',
  supportEmailNeedsConfirmation: !configuredSupportEmail,
  siteUrl: configuredSiteUrl && isSafeHttpsUrl(configuredSiteUrl) ? configuredSiteUrl : null,
  playStore: resolvePlayStoreAction({
    isLiveFlag: env.VITE_PLAY_STORE_LIVE,
    url: env.VITE_PLAY_STORE_URL,
    packageName: PACKAGE_NAME,
  }),
  apk: validateApkDownloadConfig({
    url: env.VITE_APK_URL,
    version: env.VITE_APK_VERSION,
    releaseDate: env.VITE_APK_RELEASE_DATE,
    fileSize: env.VITE_APK_FILE_SIZE,
    sha256: env.VITE_APK_SHA256,
    minAndroidVersion: env.VITE_MIN_ANDROID_VERSION,
  }),
  features: {
    onlineMultiplayerLive: cleanEnvString(env.VITE_ONLINE_MULTIPLAYER_LIVE)?.toLowerCase() === 'true',
  },
  media: {
    trailerUrl: configuredTrailerUrl && isSafeHttpsUrl(configuredTrailerUrl) ? configuredTrailerUrl : null,
  },
  legal: {
    effectiveDate: cleanEnvString(env.VITE_LEGAL_EFFECTIVE_DATE) ?? 'November 23, 2026',
    lastUpdated: cleanEnvString(env.VITE_LEGAL_LAST_UPDATED) ?? 'November 23, 2026',
    deletionTimeframe:
      cleanEnvString(env.VITE_DELETION_TIMEFRAME) ??
      'Within 14 business days of ownership verification',
  },
};
