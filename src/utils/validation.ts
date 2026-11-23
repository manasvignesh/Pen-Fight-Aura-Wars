export interface ApkConfigInput {
  url?: string;
  version?: string;
  releaseDate?: string;
  fileSize?: string;
  sha256?: string;
  minAndroidVersion?: string;
}

export interface ValidatedApkConfig {
  isAvailable: boolean;
  url: string | null;
  version: string | null;
  releaseDate: string | null;
  fileSize: string | null;
  sha256: string | null;
  sha256Valid: boolean;
  minAndroidVersion: string | null;
  rejectionReason: string | null;
}

export interface PlayStoreActionState {
  isLive: boolean;
  href: string | null;
  label: string;
  packageName: string;
}

export interface DeletionRequestInput {
  accountEmail: string;
  playerName: string;
  userId?: string;
  reason?: string;
  confirmedOwnership: boolean;
  confirmedPermanent: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface SupportRequestInput {
  category: string;
  contactEmail: string;
  deviceModel: string;
  androidVersion: string;
  appVersion: string;
  details: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHA256_PATTERN = /^[a-fA-F0-9]{64}$/;
const SENSITIVE_TOKEN_PATTERN = /(ya29\.|eyJ[a-zA-Z0-9_-]{10,}\.|password\s*[:=])/i;

export function cleanEnvString(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function isSafeHttpsUrl(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateSha256(hash: string | null): boolean {
  if (!hash) return false;
  return SHA256_PATTERN.test(hash.trim());
}

/**
 * Validates that an APK download configuration points exclusively to a
 * production signed Android APK over HTTPS or a static /downloads/*.apk path.
 * Explicitly rejects Android App Bundles (.aab), debug builds, and unsigned builds.
 */
export function validateApkDownloadConfig(input: ApkConfigInput): ValidatedApkConfig {
  const url = cleanEnvString(input.url);
  const version = cleanEnvString(input.version);
  const releaseDate = cleanEnvString(input.releaseDate);
  const fileSize = cleanEnvString(input.fileSize);
  const sha256 = cleanEnvString(input.sha256);
  const minAndroidVersion = cleanEnvString(input.minAndroidVersion);
  const sha256Valid = validateSha256(sha256);

  if (!url) {
    return {
      isAvailable: false,
      url: null,
      version,
      releaseDate,
      fileSize,
      sha256,
      sha256Valid,
      minAndroidVersion,
      rejectionReason: 'Official release APK URL has not been configured yet.',
    };
  }

  const lower = url.toLowerCase();
  const isLocalStaticDownload = lower.startsWith('/downloads/') && !lower.includes('..');
  const isHttps = isSafeHttpsUrl(url);

  if (!isLocalStaticDownload && !isHttps) {
    return {
      isAvailable: false,
      url: null,
      version,
      releaseDate,
      fileSize,
      sha256,
      sha256Valid,
      minAndroidVersion,
      rejectionReason: 'APK download URL must use HTTPS or a static /downloads/ path.',
    };
  }

  // Strip query string and fragment before checking file extension / artifact name
  const pathPart = lower.split('?')[0].split('#')[0];

  if (pathPart.endsWith('.aab')) {
    return {
      isAvailable: false,
      url: null,
      version,
      releaseDate,
      fileSize,
      sha256,
      sha256Valid,
      minAndroidVersion,
      rejectionReason: 'Android App Bundles (.aab) cannot be used for direct user downloads.',
    };
  }

  if (!pathPart.endsWith('.apk')) {
    return {
      isAvailable: false,
      url: null,
      version,
      releaseDate,
      fileSize,
      sha256,
      sha256Valid,
      minAndroidVersion,
      rejectionReason: 'Direct download URL must reference an official .apk file.',
    };
  }

  if (/(debug|unsigned)/.test(pathPart)) {
    return {
      isAvailable: false,
      url: null,
      version,
      releaseDate,
      fileSize,
      sha256,
      sha256Valid,
      minAndroidVersion,
      rejectionReason: 'Debug or unsigned APK artifacts cannot be published as production downloads.',
    };
  }

  return {
    isAvailable: true,
    url,
    version,
    releaseDate,
    fileSize,
    sha256,
    sha256Valid,
    minAndroidVersion,
    rejectionReason: null,
  };
}

export function resolvePlayStoreAction(params: {
  isLiveFlag?: string;
  url?: string;
  packageName: string;
}): PlayStoreActionState {
  const isLive = cleanEnvString(params.isLiveFlag)?.toLowerCase() === 'true';
  const configuredUrl = cleanEnvString(params.url);
  const defaultUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(params.packageName)}`;
  const targetUrl = configuredUrl && isSafeHttpsUrl(configuredUrl) ? configuredUrl : defaultUrl;

  if (!isLive) {
    return {
      isLive: false,
      href: null,
      label: 'Google Play · Coming Soon',
      packageName: params.packageName,
    };
  }

  return {
    isLive: true,
    href: targetUrl,
    label: 'Get it on Google Play',
    packageName: params.packageName,
  };
}

export function validateEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function containsSensitiveCredential(text: string): boolean {
  return SENSITIVE_TOKEN_PATTERN.test(text);
}

export function validateDeletionRequest(input: DeletionRequestInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validateEmail(input.accountEmail)) {
    errors.accountEmail = 'Enter the valid email address linked to your Google Sign-In or game account.';
  }

  if (input.playerName.trim().length < 2) {
    errors.playerName = 'Enter your in-game display name (at least 2 characters) to help verify your account.';
  }

  const combinedText = `${input.playerName} ${input.userId ?? ''} ${input.reason ?? ''}`;
  if (containsSensitiveCredential(combinedText)) {
    errors.general = 'Never include passwords or Google OAuth tokens in a deletion request. Remove sensitive credentials before continuing.';
  }

  if (!input.confirmedOwnership) {
    errors.confirmedOwnership = 'Confirm that you are the owner of this game account.';
  }

  if (!input.confirmedPermanent) {
    errors.confirmedPermanent = 'Confirm that you understand account deletion is permanent.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildDeletionMailto(supportEmail: string, input: DeletionRequestInput): string {
  const subject = `[Account Deletion Request] Pen Fight Aura Wars — ${input.playerName.trim()}`;
  const bodyLines = [
    'Hello Pen Fight Aura Wars Support,',
    '',
    'I am requesting permanent deletion of my Pen Fight Aura Wars game account and associated personal data.',
    '',
    `Account Email (Google Sign-In / Auth): ${input.accountEmail.trim()}`,
    `In-Game Display Name: ${input.playerName.trim()}`,
    `Player ID (if known): ${input.userId?.trim() || 'Not provided'}`,
    `Reason (optional): ${input.reason?.trim() || 'Not specified'}`,
    '',
    'Verification Confirmations:',
    '- I am sending this request from the email address associated with the account (or can respond from it for ownership verification).',
    '- I understand that permanent account deletion removes my cloud save progress, Aura Rating, leaderboard profile, and unlocked virtual collectibles.',
    '- I have NOT included any passwords or Google OAuth tokens in this email.',
  ];

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });

  return `mailto:${encodeURIComponent(supportEmail)}?${params.toString().replace(/\+/g, '%20')}`;
}

export function validateSupportRequest(input: SupportRequestInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.category.trim()) {
    errors.category = 'Select a support category.';
  }

  if (!validateEmail(input.contactEmail)) {
    errors.contactEmail = 'Enter a valid reply email address.';
  }

  if (input.details.trim().length < 15) {
    errors.details = 'Describe the issue in at least 15 characters so we can reproduce and troubleshoot it.';
  }

  if (containsSensitiveCredential(`${input.details} ${input.deviceModel}`)) {
    errors.details = 'Do not include passwords or Google OAuth tokens in support messages.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildSupportMailto(supportEmail: string, input: SupportRequestInput): string {
  const subject = `[Support: ${input.category.trim()}] Pen Fight Aura Wars`;
  const bodyLines = [
    'Hello Pen Fight Aura Wars Support,',
    '',
    `Category: ${input.category.trim()}`,
    `Reply Email: ${input.contactEmail.trim()}`,
    `Device Model: ${input.deviceModel.trim() || 'Not specified'}`,
    `Android Version: ${input.androidVersion.trim() || 'Not specified'}`,
    `Game Version: ${input.appVersion.trim() || 'Not specified'}`,
    '',
    'Issue Description:',
    input.details.trim(),
  ];

  const params = new URLSearchParams({
    subject,
    body: bodyLines.join('\n'),
  });

  return `mailto:${encodeURIComponent(supportEmail)}?${params.toString().replace(/\+/g, '%20')}`;
}

export function formatCanonicalUrl(configuredSiteUrl: string | null, origin: string, pathname: string): string {
  const base = (configuredSiteUrl || origin || '').replace(/\/+$/, '');
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!base) return cleanPath;
  return cleanPath === '/' ? `${base}/` : `${base}${cleanPath}`;
}
