import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Mail } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText('domain@hf.pl');
    setCopied(true);
    trackEvent('contact_copy', { value: 'domain@hf.pl' });
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-shell hairline-top" id="contact">
      <div className="section-frame grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:items-start">
        {/* Left — editorial copy */}
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('contact_title')}</h2>
          <p className="section-lead mt-5">{t('contact_desc')}</p>
          <p className="mt-6 max-w-[34rem] text-sm leading-7 text-text-muted">{t('contact_info')}</p>
          <p className="mono mt-6 flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span>NASK • 1996 • PL-676 — {t('provenance_label')}</span>
          </p>
        </div>

        {/* Right — artifact card */}
        <div className="artifact-card overflow-hidden rounded-[1.5rem] p-6 sm:p-7 lg:p-8">
          {/* Top — actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
              className="action-pill action-primary flex-1 no-underline"
            >
              <Mail size={16} aria-hidden="true" />
              {t('contact_email_label')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? t('copied') : 'domain@hf.pl — copy to clipboard'}
              className="action-pill flex-1 border border-line bg-paper text-ink hover:bg-surface dark:bg-surface dark:text-paper dark:border-white/10 dark:hover:bg-white/[0.06]"
            >
              {copied ? <Check size={16} className="text-success" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? t('copied') : 'domain@hf.pl'}
            </button>
          </div>

          {/* Middle — evidence rows */}
          <div className="mt-6 border-y border-hairline">
            {['cl1', 'cl2', 'cl3'].map((key, index) => (
              <div
                key={key}
                className="evidence-row flex gap-4 px-1 py-4 sm:px-2 sm:py-5"
              >
                <span className="mono shrink-0 pt-0.5 tabular-nums" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="text-sm leading-7 text-text-muted">{t(key)}</span>
              </div>
            ))}
          </div>

          {/* Bottom — provenance note */}
          <p className="mono mt-5 text-center tracking-[0.14em]">Odpowiedź w 24h • NDA</p>
        </div>
      </div>
    </section>
  );
}
