import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateApkDownloadConfig,
  resolvePlayStoreAction,
  validateDeletionRequest,
  buildDeletionMailto,
  validateSupportRequest,
  buildSupportMailto,
  formatCanonicalUrl,
  validateSha256,
} from './validation';

test('APK validator rejects missing URL cleanly without throwing', () => {
  const result = validateApkDownloadConfig({});
  assert.equal(result.isAvailable, false);
  assert.equal(result.url, null);
  assert.ok(result.rejectionReason);
});

test('APK validator rejects Android App Bundles (.aab)', () => {
  const result = validateApkDownloadConfig({
    url: 'https://releases.example.com/penfight-release.aab',
    version: '1.0.0',
  });
  assert.equal(result.isAvailable, false);
  assert.match(result.rejectionReason ?? '', /\.aab/i);
});

test('APK validator rejects debug and unsigned APKs', () => {
  const debugBuild = validateApkDownloadConfig({
    url: 'https://releases.example.com/app-debug.apk',
  });
  assert.equal(debugBuild.isAvailable, false);
  assert.match(debugBuild.rejectionReason ?? '', /debug|unsigned/i);

  const unsignedBuild = validateApkDownloadConfig({
    url: '/downloads/penfight-unsigned.apk',
  });
  assert.equal(unsignedBuild.isAvailable, false);
  assert.match(unsignedBuild.rejectionReason ?? '', /debug|unsigned/i);
});

test('APK validator rejects insecure HTTP URLs and path traversal', () => {
  const httpBuild = validateApkDownloadConfig({
    url: 'http://insecure.example.com/penfight-release.apk',
  });
  assert.equal(httpBuild.isAvailable, false);

  const traversalBuild = validateApkDownloadConfig({
    url: '/downloads/../secret.apk',
  });
  assert.equal(traversalBuild.isAvailable, false);
});

test('APK validator accepts official HTTPS and static /downloads/*.apk builds with valid SHA-256', () => {
  const validHash = 'a'.repeat(64);
  const httpsBuild = validateApkDownloadConfig({
    url: 'https://downloads.penfightaurawars.com/pen-fight-aura-wars-1.0.0-release.apk',
    version: '1.0.0',
    fileSize: '42 MB',
    sha256: validHash,
    minAndroidVersion: 'Android 8.0 (API 26)',
  });
  assert.equal(httpsBuild.isAvailable, true);
  assert.equal(httpsBuild.sha256Valid, true);
  assert.equal(httpsBuild.version, '1.0.0');

  const staticBuild = validateApkDownloadConfig({
    url: '/downloads/pen-fight-aura-wars-v1.0.0.apk',
  });
  assert.equal(staticBuild.isAvailable, true);
  assert.equal(validateSha256('not-a-hash'), false);
});

test('Play Store resolver defaults to Coming Soon when not explicitly live', () => {
  const comingSoon = resolvePlayStoreAction({
    isLiveFlag: 'false',
    packageName: 'com.penfightroyale.game',
  });
  assert.equal(comingSoon.isLive, false);
  assert.equal(comingSoon.href, null);
  assert.match(comingSoon.label, /Coming Soon/i);

  const live = resolvePlayStoreAction({
    isLiveFlag: 'true',
    packageName: 'com.penfightroyale.game',
  });
  assert.equal(live.isLive, true);
  assert.equal(
    live.href,
    'https://play.google.com/store/apps/details?id=com.penfightroyale.game'
  );
});

test('Deletion request validation blocks invalid inputs and accidental OAuth tokens or passwords', () => {
  const missingFields = validateDeletionRequest({
    accountEmail: 'invalid',
    playerName: 'a',
    confirmedOwnership: false,
    confirmedPermanent: false,
  });
  assert.equal(missingFields.valid, false);
  assert.ok(missingFields.errors.accountEmail);
  assert.ok(missingFields.errors.playerName);
  assert.ok(missingFields.errors.confirmedOwnership);
  assert.ok(missingFields.errors.confirmedPermanent);

  const withToken = validateDeletionRequest({
    accountEmail: 'player@example.com',
    playerName: 'DeskChamp',
    reason: 'Here is my token ya29.a0AfH6SMBx12345',
    confirmedOwnership: true,
    confirmedPermanent: true,
  });
  assert.equal(withToken.valid, false);
  assert.ok(withToken.errors.general);

  const validRequest = validateDeletionRequest({
    accountEmail: 'player@example.com',
    playerName: 'DeskChamp',
    userId: 'uid-4910',
    confirmedOwnership: true,
    confirmedPermanent: true,
  });
  assert.equal(validRequest.valid, true);

  const mailto = buildDeletionMailto('manasvig43@gmail.com', {
    accountEmail: 'player@example.com',
    playerName: 'DeskChamp',
    userId: 'uid-4910',
    confirmedOwnership: true,
    confirmedPermanent: true,
  });
  assert.ok(mailto.startsWith('mailto:manasvig43%40gmail.com?'));
  assert.match(mailto, /DeskChamp/);
});

test('Support request validation and mailto builder work cleanly', () => {
  const invalid = validateSupportRequest({
    category: 'Bug Report',
    contactEmail: 'bad-email',
    deviceModel: 'Pixel 8',
    androidVersion: 'Android 14',
    appVersion: '1.0.0',
    details: 'Too short',
  });
  assert.equal(invalid.valid, false);

  const valid = validateSupportRequest({
    category: 'Bug Report',
    contactEmail: 'player@example.com',
    deviceModel: 'Pixel 8',
    androidVersion: 'Android 14',
    appVersion: '1.0.0',
    details: 'Game froze after Power Surge collision in Tournament round 3.',
  });
  assert.equal(valid.valid, true);

  const mailto = buildSupportMailto('manasvig43@gmail.com', {
    category: 'Bug Report',
    contactEmail: 'player@example.com',
    deviceModel: 'Pixel 8',
    androidVersion: 'Android 14',
    appVersion: '1.0.0',
    details: 'Game froze after Power Surge collision in Tournament round 3.',
  });
  assert.ok(mailto.startsWith('mailto:manasvig43%40gmail.com?'));
  assert.match(mailto, /Pixel%208/);
});

test('Canonical URL formatter handles configured domain and runtime origin cleanly', () => {
  assert.equal(
    formatCanonicalUrl('https://penfightaurawars.com/', 'http://localhost:3000', '/privacy'),
    'https://penfightaurawars.com/privacy'
  );
  assert.equal(
    formatCanonicalUrl(null, 'https://preview.pages.dev', '/'),
    'https://preview.pages.dev/'
  );
});
