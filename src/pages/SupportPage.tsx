import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Check, Copy, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { siteConfig } from '../config/siteConfig';
import { SUPPORT_FAQS } from '../data/gameContent';
import { buildSupportMailto, validateSupportRequest } from '../utils/validation';

const SUPPORT_CATEGORIES = [
  'Bug Report',
  'Google Sign-In & Account Access',
  'Online Multiplayer Connection',
  'APK Download & Installation',
  'Advertising & Privacy Question',
  'General Feedback',
];

export function SupportPage() {
  const [category, setCategory] = useState(SUPPORT_CATEGORIES[0]);
  const [contactEmail, setContactEmail] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [androidVersion, setAndroidVersion] = useState('');
  const [appVersion, setAppVersion] = useState(siteConfig.apk.version ? `v${siteConfig.apk.version}` : '');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(SUPPORT_FAQS[0].id);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateSupportRequest({
      category,
      contactEmail,
      deviceModel,
      androidVersion,
      appVersion,
      details,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }

    setErrors({});
    setPreparedMailto(
      buildSupportMailto(siteConfig.supportEmail, {
        category,
        contactEmail,
        deviceModel,
        androidVersion,
        appVersion,
        details,
      })
    );
  };

  const handleCopyTicket = async () => {
    const body = [
      `To: ${siteConfig.supportEmail}`,
      `Subject: [Support: ${category}] ${siteConfig.appName}`,
      `Reply Email: ${contactEmail.trim()}`,
      `Device Model: ${deviceModel.trim() || 'Not specified'}`,
      `Android Version: ${androidVersion.trim() || 'Not specified'}`,
      `Game Version: ${appVersion.trim() || 'Not specified'}`,
      '',
      details.trim(),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(body);
      setCopiedTicket(true);
      window.setTimeout(() => setCopiedTicket(false), 2000);
    } catch {
      setCopiedTicket(false);
    }
  };

  return (
    <Layout
      meta={{
        title: 'Player Support & FAQ — Pen Fight Aura Wars',
        description:
          'Official player support for Pen Fight Aura Wars on Android: contact email, bug reporting, Google Sign-In troubleshooting, multiplayer connectivity, APK help, and FAQ.',
      }}
    >
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="max-w-3xl border-b border-white/[0.08] pb-8">
          <p className="text-sm font-medium text-[#60A5FA]">Official Help Center</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Player Support
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#B4BCCE]">
            Having trouble signing in, installing the official APK, or reporting a gameplay bug? Review the troubleshooting guides below or reach our support inbox directly.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent('Pen Fight Aura Wars Support Request')}`}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Email {siteConfig.supportEmail}</span>
            </a>

            <Link
              to="/delete-account"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-[#E2E8F0] transition-colors hover:border-white/30 hover:text-white"
            >
              <span>Request Account Deletion</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* Troubleshooting Guides Grid */}
        <section aria-labelledby="troubleshooting-heading" className="mt-12">
          <h2 id="troubleshooting-heading" className="font-display text-3xl font-bold text-white">
            Troubleshooting Guides
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6">
              <p className="text-xs font-medium text-[#60A5FA]">Account &amp; Authentication</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">
                Google Sign-In &amp; Account Access Issues
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#B4BCCE]">
                <li>Confirm your device runs an up-to-date version of Google Play Services.</li>
                <li>Verify your Android date and time are set to automatic network time.</li>
                <li>
                  Ensure you installed the official signed release APK or Google Play build—modified or unsigned APKs fail Google Sign-In signature checks.
                </li>
                <li>If your login session stalls, clear the app cache (not app data) and relaunch on a stable connection.</li>
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6">
              <p className="text-xs font-medium text-[#A78BFA]">Online 1v1 Connectivity</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">
                Multiplayer Connection Troubleshooting
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[#B4BCCE]">
                <li>
                  Check whether Online 1v1 is currently live on production servers (status:{' '}
                  <strong className="text-white">
                    {siteConfig.features.onlineMultiplayerLive ? 'Live' : 'Coming Soon / Verification'}
                  </strong>
                  ).
                </li>
                <li>Avoid switching between Wi-Fi and mobile data during an active match turn.</li>
                <li>Wait 10–20 seconds and retry if the hosted Render server is waking or restarting.</li>
                <li>Disable aggressive VPNs or private DNS filters that block WebSocket/HTTPS game traffic.</li>
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6">
              <p className="text-xs font-medium text-[#EAB308]">Direct Android Package</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">APK Installation Help</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[#B4BCCE]">
                <li>Verify your device meets the minimum supported Android version listed on the Downloads page.</li>
                <li>Compare the file&apos;s SHA-256 hash against the hash published on <Link to="/download" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">/download</Link>.</li>
                <li>If Android reports &ldquo;App not installed,&rdquo; ensure you have enough free storage and remove any older debug/test build with a conflicting signature first.</li>
                <li>Never disable Google Play Protect—only allow temporary installation from your browser or Files app.</li>
              </ul>
            </article>

            <article className="rounded-xl border border-white/10 bg-[#11151F] p-6">
              <p className="text-xs font-medium text-[#60A5FA]">Privacy &amp; AdMob</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">
                Advertising &amp; Privacy Questions
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[#B4BCCE]">
                <li>
                  Read our full <Link to="/privacy" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">Privacy Policy</Link> for details on Google Sign-In, Supabase, Render, and Google AdMob data handling.
                </li>
                <li>Manage ad personalization or reset your Advertising ID in Android Settings → Google → Ads.</li>
                <li>
                  Need permanent account and cloud data deletion? Visit <Link to="/delete-account" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">/delete-account</Link>.
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Bug Report & Support Email Composer */}
        <section
          id="bug-report"
          aria-labelledby="bug-report-heading"
          className="mt-14 rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
        >
          <h2 id="bug-report-heading" className="font-display text-3xl font-bold text-white">
            Report a Bug or Send a Support Email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
            Because this official website runs as a static site without a third-party ticket tracker, this form validates your report locally and opens a pre-filled <code className="font-mono text-xs">mailto:</code> email directly to{' '}
            <strong className="text-[#E2E8F0]">{siteConfig.supportEmail}</strong>.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="support-category" className="block text-sm font-medium text-[#E2E8F0]">
                  Topic
                </label>
                <select
                  id="support-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white focus:border-[#3B82F6] focus:outline-none"
                >
                  {SUPPORT_CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="support-email" className="block text-sm font-medium text-[#E2E8F0]">
                  Your Reply Email <span className="text-[#EAB308]">*</span>
                </label>
                <input
                  id="support-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.contactEmail)}
                  aria-describedby={errors.contactEmail ? 'support-email-error' : undefined}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
                {errors.contactEmail && (
                  <p id="support-email-error" className="mt-1.5 text-xs text-red-300">
                    {errors.contactEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="support-device" className="block text-sm font-medium text-[#E2E8F0]">
                  Android Device Model
                </label>
                <input
                  id="support-device"
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder="e.g., Pixel 8, Galaxy A54"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="support-android" className="block text-sm font-medium text-[#E2E8F0]">
                  Android Version
                </label>
                <input
                  id="support-android"
                  type="text"
                  value={androidVersion}
                  onChange={(e) => setAndroidVersion(e.target.value)}
                  placeholder="e.g., Android 14"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="support-version" className="block text-sm font-medium text-[#E2E8F0]">
                  Game Version
                </label>
                <input
                  id="support-version"
                  type="text"
                  value={appVersion}
                  onChange={(e) => setAppVersion(e.target.value)}
                  placeholder="e.g., v1.0.0"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 font-mono text-sm text-white placeholder:font-sans placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="support-details" className="block text-sm font-medium text-[#E2E8F0]">
                What Happened? (Include steps to reproduce) <span className="text-[#EAB308]">*</span>
              </label>
              <textarea
                id="support-details"
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what mode you were playing, what you expected to happen, and any error message shown..."
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? 'support-details-error' : undefined}
                className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
              />
              {errors.details && (
                <p id="support-details-error" className="mt-1.5 text-xs text-red-300">
                  {errors.details}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Prepare Support Email</span>
            </button>
          </form>

          {preparedMailto && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-[#3B82F6]/35 bg-[#131C2E] p-5"
            >
              <p className="text-sm font-semibold text-white">Support Email Ready to Send</p>
              <p className="mt-1.5 text-xs text-[#CBD5E1]">
                Open your email app to send this message to {siteConfig.supportEmail}, or copy the structured summary below.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={preparedMailto}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Open Email Client</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-white/30 hover:text-white"
                >
                  {copiedTicket ? (
                    <>
                      <Check className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                      <span>Copied Ticket Summary</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Frequently Asked Questions */}
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="font-display text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/10 bg-[#11151F]">
            {SUPPORT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <span>
                      <span className="block text-xs text-[#94A3B8]">{faq.category}</span>
                      <span className="mt-0.5 block text-sm font-semibold text-white sm:text-base">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-panel-${faq.id}`}
                      className="px-5 pb-5 text-sm leading-relaxed text-[#CBD5E1]"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
