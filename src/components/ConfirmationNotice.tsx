import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ConfirmationNoticeProps {
  title: string;
  children: ReactNode;
}

export function ConfirmationNotice({ title, children }: ConfirmationNoticeProps) {
  return (
    <aside
      aria-label={title}
      className="rounded-xl border border-[#EAB308]/30 bg-[#EAB308]/[0.06] p-5 text-sm leading-relaxed text-[#E2E8F0]"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#EAB308]" aria-hidden="true" />
        <div className="min-w-0 space-y-2">
          <p className="font-semibold text-[#FEF08A]">{title}</p>
          <div className="text-[#CBD5E1]">{children}</div>
        </div>
      </div>
    </aside>
  );
}
