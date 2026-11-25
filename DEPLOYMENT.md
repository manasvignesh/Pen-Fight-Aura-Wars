# Pen Fight Aura Wars — Cloudflare Pages Deployment & Maintenance Guide

This guide documents how to deploy and maintain the official **Pen Fight Aura Wars** website on a **free Cloudflare Pages plan**.

## 1. Cloudflare Pages Build Settings

Connect your Git repository in the Cloudflare Dashboard (**Workers & Pages → Create → Pages → Connect to Git**) and configure:

- **Framework preset**: `Vite` (or `None`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version** (Environment variable): `NODE_VERSION=22`

The live site uses Cloudflare Workers Static Assets. Serve the generated HTML at the extensionless routes and use the 404 page for unknown URLs, as configured in `wrangler.jsonc`. The build writes the pages, robots.txt, and sitemap.xml to dist and copies app-ads.txt and the other public assets.

## 2. Public Environment Variables (Cloudflare Pages → Settings → Environment Variables)

Only public, non-secret values should be stored in `VITE_*` variables. **Never** add Supabase service-role keys, Render secrets, or OAuth client secrets.

| Variable | Example Value | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://pen-fight-aura-wars.manasvig43.workers.dev` | Optional canonical origin override. The build defaults to the current Workers address. |
| `VITE_PUBLISHER_NAME` | `Your Studio or Developer Name` | Footer copyright & legal publisher identity |
| `VITE_SUPPORT_EMAIL` | `support@yourdomain.com` | Support & account deletion `mailto:` address |
| `VITE_PLAY_STORE_LIVE` | `false` or `true` | Switches Google Play CTA from "Coming Soon" to live link |
| `VITE_PLAY_STORE_URL` | `https://play.google.com/store/apps/details?id=com.penfightroyale.game` | Official Play Store URL |
| `VITE_APK_URL` | `https://downloads.yourdomain.com/pen-fight-aura-wars-1.0.0-release.apk` | Trusted HTTPS URL or `/downloads/*.apk` (never `.aab`, debug, or unsigned) |
| `VITE_APK_VERSION` | `1.0.0` | Displayed release version |
| `VITE_APK_RELEASE_DATE` | `2026-05-01` | Optional date for a hosted APK override |
| `VITE_APK_FILE_SIZE` | `42 MB` | Approximate signed APK size |
| `VITE_APK_SHA256` | `<64-char hex digest>` | Exact SHA-256 verification hash of the signed release APK |
| `VITE_MIN_ANDROID_VERSION` | `Android 7.0 (API 24)` | Confirmed from Android `minSdk` in `build.gradle` |
| `VITE_ONLINE_MULTIPLAYER_LIVE` | `false` or `true` | Override Online 1v1 availability (enabled by default) |
| `VITE_LEGAL_EFFECTIVE_DATE` | `May 1, 2026` | Effective date shown on `/privacy` and `/terms` |
| `VITE_LEGAL_LAST_UPDATED` | `May 1, 2026` | Last updated date shown on `/privacy` and `/terms` |
| `VITE_DELETION_TIMEFRAME` | `Within 14 days of email verification` | Account deletion SLA shown on `/delete-account` |
| `VITE_TRAILER_URL` | `https://www.youtube.com/embed/...` | Optional HTTPS trailer embed or direct MP4 URL |

After updating any `VITE_*` variable in Cloudflare Pages, trigger a fresh deployment because Vite embeds public environment variables at build time.

## 3. Custom Domain & AdMob `app-ads.txt` Setup

1. In Cloudflare Pages, open your project → **Custom domains** → **Set up a custom domain** (e.g., `penfightaurawars.com`).
2. Add the recommended CNAME / DNS record in Cloudflare DNS (SSL/TLS HTTPS activates automatically).
3. Set `VITE_SITE_URL` to the official HTTPS origin. The build generates the sitemap and adds its absolute URL to `robots.txt`.
4. Verify your AdMob file directly in a browser or via `curl`:
   ```bash
   curl -i https://YOUR-DOMAIN/app-ads.txt
   ```
   Confirm HTTP `200 OK`, `text/plain` response, and exact body:
   ```text
   google.com, pub-9403523388888787, DIRECT, f08c47fec0942fa0
   ```
5. Enter the official origin as your **Developer Website** in Google Play Console so AdMob can find `/app-ads.txt`.

## 4. Updating the Official Signed Release APK

The included version is configured in src/config/bundledApk.ts. Replace the bundled file in public/downloads/ and update its metadata together, or set all the override variables below.

1. Build and sign your release APK using your production release keystore (never use `.aab`, debug, or unsigned builds for direct APK downloads).
2. Compute the exact SHA-256 hash:
   ```bash
   shasum -a 256 pen-fight-aura-wars-v1.0.0-release.apk
   ```
3. Host the APK either:
   - Under `public/downloads/` (Cloudflare Pages supports individual files up to 25 MiB), **or**
   - On **Cloudflare R2** (free tier available, no 25 MiB per-file limit) or **GitHub Releases** served over HTTPS.
4. Update `VITE_APK_URL`, `VITE_APK_VERSION`, `VITE_APK_RELEASE_DATE`, `VITE_APK_FILE_SIZE`, `VITE_APK_SHA256`, and `VITE_MIN_ANDROID_VERSION` in Cloudflare Pages, then redeploy.

## 5. Updating the Google Play Store Listing URL

1. Once `com.penfightroyale.game` is approved and publicly accessible on Google Play, test the live store URL in an incognito browser.
2. Set `VITE_PLAY_STORE_LIVE=true` and confirm `VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.penfightroyale.game`.
3. Redeploy on Cloudflare Pages.

## 6. Updating Legal Documents and Gameplay Media

- **Privacy Policy**: Edit `src/pages/PrivacyPage.tsx` (remove `[Developer note: ...]` confirmation tags after verifying each item against your production SDKs and Google Play Data Safety declarations).
- **Account Deletion**: Edit `src/pages/DeleteAccountPage.tsx`.
- **Terms of Service**: Edit `src/pages/TermsPage.tsx`.
- **Gameplay media**: Store real game captures in public/media/ and update GameplayShowcase.tsx when the list changes.

## 7. Google Search Console

The build uses the current public Workers address, https://pen-fight-aura-wars.manasvig43.workers.dev/, by default. Leave VITE_SITE_URL unset unless the canonical public origin changes.

1. In [Google Search Console](https://search.google.com/search-console), add a **URL prefix** property for `https://pen-fight-aura-wars.manasvig43.workers.dev/`.
2. Choose **HTML tag** and copy the value inside the tag’s `content` attribute. Set `GOOGLE_SITE_VERIFICATION` to that value in the Cloudflare **build environment**. The build adds this tag to the homepage HTML. If building locally, set the variable before running `npm run build`.
3. After the owner approves publishing the website update, confirm the tag is present in the live homepage source, then click **Verify**. Keep the variable set for subsequent builds.
4. Open **Sitemaps** and submit `sitemap.xml`. Confirm it reports success and lists only real page URLs. Inspect the homepage and `/download` in **URL Inspection**, run the live test, and request indexing.
5. Check **Page indexing** for crawl or canonical issues. Use the **Performance** report to compare clicks and impressions for the homepage and download page. Check **Core Web Vitals** and mobile PageSpeed Insights after the live release. Google may require more traffic before it can report field data.

[Google ownership verification](https://support.google.com/webmasters/answer/9008080) · [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
