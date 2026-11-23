import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldAlert, Check, Copy, Trash2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ConfirmationNotice } from '../components/ConfirmationNotice';
import { siteConfig } from '../config/siteConfig';
import { buildDeletionMailto, validateDeletionRequest } from '../utils/validation';

export function DeleteAccountPage() {
  const [accountEmail, setAccountEmail] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [confirmedOwnership, setConfirmedOwnership] = useState(false);
  const [confirmedPermanent, setConfirmedPermanent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const deletionTimeframe =
    siteConfig.legal.deletionTimeframe ?? 'within 14 business days of ownership verification';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateDeletionRequest({
      accountEmail,
      playerName,
      userId,
      reason,
      confirmedOwnership,
      confirmedPermanent,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }

    setErrors({});
    const mailtoHref = buildDeletionMailto(siteConfig.supportEmail, {
      accountEmail,
      playerName,
      userId,
      reason,
      confirmedOwnership,
      confirmedPermanent,
    });
    setPreparedMailto(mailtoHref);
  };

  const handleCopyText = async () => {
    const plainText = [
      `To: ${siteConfig.supportEmail}`,
      `Subject: [Account Deletion Request] ${siteConfig.appName} — ${playerName.trim()}`,
      '',
      `Account Email: ${accountEmail.trim()}`,
      `In-Game Display Name: ${playerName.trim()}`,
      `Player ID: ${userId.trim() || 'Not provided'}`,
      `Reason: ${reason.trim() || 'Not specified'}`,
      '',
      'I request permanent deletion of my Pen Fight Aura Wars account and associated personal data.',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <Layout
      meta={{
        title: 'Account & Data Deletion — Pen Fight Aura Wars',
        description:
          'Request permanent deletion of your Pen Fight Aura Wars game account and associated cloud data without needing to reinstall the Android app.',
      }}
    >
      <div className="mx-auto max-w-[1000px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="max-w-3xl border-b border-white/[0.08] pb-8">
          <p className="text-sm font-medium text-[#60A5FA]">
            Google Play User Data Compliance · {siteConfig.publisherName}
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Account &amp; Data Deletion
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#B4BCCE]">
            This page explains how players of <strong className="text-white">{siteConfig.appName}</strong> (package{' '}
            <code className="font-mono text-sm text-[#E2E8F0]">{siteConfig.packageName}</code>), published by{' '}
            <strong className="text-white">{siteConfig.publisherName}</strong>, can permanently delete their game account and associated personal data.
          </p>
        </header>

        {/* Honest Manual Processing Notice */}
        <div className="mt-8">
          <ConfirmationNotice title="Manual Verification & Processing Disclosure">
            <p>
              This webpage does <strong>not</strong> directly execute automated database deletions against Supabase or Render, and it never asks for your password or Google OAuth token. Submitting the form below prepares a verified deletion email to{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-white underline underline-offset-4"
              >
                {siteConfig.supportEmail}
              </a>{' '}
              so our team can verify account ownership and process the deletion of your records within {deletionTimeframe}.
            </p>
          </ConfirmationNotice>
        </div>

        {/* Two Ways to Request Deletion */}
        <section aria-labelledby="how-to-delete" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#11151F] p-6">
            <p className="text-xs font-medium text-[#60A5FA]">Option 1 · Inside the Android App</p>
            <h2 id="how-to-delete" className="mt-1.5 font-display text-2xl font-bold text-white">
              In-App Account Deletion
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
              If you still have {siteConfig.appName} installed on your Android device and are signed in with Google Sign-In, open the app&apos;s{' '}
              <strong className="text-white">Settings → Account → Delete Account</strong> option to request permanent account removal directly from inside the game.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#11151F] p-6">
            <p className="text-xs font-medium text-[#EAB308]">Option 2 · Web Request (No App Needed)</p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white">
              Verified Email Deletion Request
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
              If you already uninstalled the game or cannot sign in, use the request composer below or email{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent('[Account Deletion Request] Pen Fight Aura Wars')}`}
                className="text-[#60A5FA] underline underline-offset-4 hover:text-white"
              >
                {siteConfig.supportEmail}
              </a>{' '}
              directly from the email address linked to your game account.
            </p>
          </div>
        </section>

        {/* Security Warning Banner */}
        <section
          aria-labelledby="security-check-heading"
          className="mt-8 rounded-xl border border-white/10 bg-[#10141E] p-6"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#60A5FA]" aria-hidden="true" />
            <div className="space-y-1.5 text-sm text-[#CBD5E1]">
              <h2 id="security-check-heading" className="font-semibold text-white">
                How We Prevent Unauthorized Deletion Requests
              </h2>
              <p className="leading-relaxed text-[#B4BCCE]">
                To protect players from malicious third-party deletion attempts, you must send your deletion email from (or reply to a confirmation message sent to) the exact email address associated with your Google Sign-In / Supabase account. We will <strong>never</strong> ask for your Google password, recovery codes, or OAuth tokens.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Deletion Request Composer */}
        <section
          aria-labelledby="composer-heading"
          className="mt-10 rounded-xl border border-white/10 bg-[#11151F] p-6 sm:p-8"
        >
          <div className="flex items-center gap-2.5">
            <Trash2 className="h-5 w-5 text-[#EAB308]" aria-hidden="true" />
            <h2 id="composer-heading" className="font-display text-3xl font-bold text-white">
              Prepare Account Deletion Request
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
            Fill in your account identifiers below to generate a pre-formatted email for your mail app (or copy the request text directly). All validation runs locally in your browser.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {errors.general && (
              <div
                role="alert"
                className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
              >
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="deletion-email"
                  className="block text-sm font-medium text-[#E2E8F0]"
                >
                  Account Email Address <span className="text-[#EAB308]">*</span>
                </label>
                <input
                  id="deletion-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  placeholder="player@example.com"
                  aria-invalid={Boolean(errors.accountEmail)}
                  aria-describedby={errors.accountEmail ? 'deletion-email-error' : undefined}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
                {errors.accountEmail && (
                  <p id="deletion-email-error" className="mt-1.5 text-xs text-red-300">
                    {errors.accountEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deletion-player-name"
                  className="block text-sm font-medium text-[#E2E8F0]"
                >
                  In-Game Display Name <span className="text-[#EAB308]">*</span>
                </label>
                <input
                  id="deletion-player-name"
                  type="text"
                  required
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your leaderboard username"
                  aria-invalid={Boolean(errors.playerName)}
                  aria-describedby={errors.playerName ? 'deletion-name-error' : undefined}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
                {errors.playerName && (
                  <p id="deletion-name-error" className="mt-1.5 text-xs text-red-300">
                    {errors.playerName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="deletion-user-id"
                  className="block text-sm font-medium text-[#E2E8F0]"
                >
                  In-Game Player ID (Optional)
                </label>
                <input
                  id="deletion-user-id"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Optional profile ID if visible in-app"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 font-mono text-sm text-white placeholder:font-sans placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="deletion-reason"
                  className="block text-sm font-medium text-[#E2E8F0]"
                >
                  Reason for Deletion (Optional)
                </label>
                <input
                  id="deletion-reason"
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Optional feedback"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#090B10] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 border-t border-white/[0.08] pt-4">
              <label className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                <input
                  type="checkbox"
                  checked={confirmedOwnership}
                  onChange={(e) => setConfirmedOwnership(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/25 bg-[#090B10] text-[#2563EB]"
                />
                <span>
                  I confirm I own this account and can verify my request using the linked email address above.
                </span>
              </label>
              {errors.confirmedOwnership && (
                <p className="pl-7 text-xs text-red-300">{errors.confirmedOwnership}</p>
              )}

              <label className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                <input
                  type="checkbox"
                  checked={confirmedPermanent}
                  onChange={(e) => setConfirmedPermanent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/25 bg-[#090B10] text-[#2563EB]"
                />
                <span>
                  I understand account deletion is permanent and removes my cloud saves, Aura Rating, leaderboard profile, and unlocked virtual pens.
                </span>
              </label>
              {errors.confirmedPermanent && (
                <p className="pl-7 text-xs text-red-300">{errors.confirmedPermanent}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Generate Verified Deletion Email</span>
              </button>
            </div>
          </form>

          {preparedMailto && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-[#3B82F6]/35 bg-[#131C2E] p-5"
            >
              <p className="text-sm font-semibold text-white">
                Deletion Request Email Ready
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                Click below to open your email client and send the request from{' '}
                <strong className="text-white">{accountEmail}</strong> to{' '}
                <strong className="text-white">{siteConfig.supportEmail}</strong>. Your account is not deleted until we receive and verify your email.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={preparedMailto}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Open Email App &amp; Send Request</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-white/30 hover:text-white"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                      <span>Copied Request Text</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Email Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Data Deleted vs Retained Breakdown */}
        <section
          aria-labelledby="data-scope-heading"
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="rounded-xl border border-white/10 bg-[#11151F] p-6">
            <h2 id="data-scope-heading" className="font-display text-2xl font-bold text-white">
              Data Permanently Deleted
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#B4BCCE]">
              <li>Supabase Authentication record (user ID and linked Google Sign-In email).</li>
              <li>Player profile, in-game display name, and leaderboard standings.</li>
              <li>Cloud-saved gameplay progress, virtual coins, achievements, and unlocked pens.</li>
              <li>Aura Rating and personal multiplayer history tied to your account identifier.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#11151F] p-6">
            <h2 className="font-display text-2xl font-bold text-white">
              Data Retained &amp; Expected Timeframe
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#B4BCCE]">
              <li>
                <strong>Security &amp; Anti-Cheat Records:</strong> Minimal non-playable security or abuse-prevention records (such as ban enforcement or server error logs) may be retained temporarily where necessary to protect multiplayer fairness or comply with legal obligations.
              </li>
              <li>
                <strong>Deletion Audit Record:</strong> Your email correspondence requesting deletion may be kept only as proof that the request was honored.
              </li>
              <li>
                <strong>Local Device Data:</strong> Clear app storage or uninstall {siteConfig.appName} on your Android device to remove offline local saves immediately.
              </li>
              <li>
                <strong>Expected Processing Timeframe:</strong> {deletionTimeframe}.
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#94A3B8]">
          <Link to="/privacy" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">
            Read Full Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/support" className="text-[#60A5FA] underline underline-offset-4 hover:text-white">
            Visit Player Support
          </Link>
        </div>
      </div>
    </Layout>
  );
}
