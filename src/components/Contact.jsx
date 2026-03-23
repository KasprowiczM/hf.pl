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
    <section className="section-shell section-tone-light reveal reveal-up" id="contact">
      <div className="section-frame grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('contact_overline')}</div>
          <h2 className="section-title text-balance">{t('contact_title')}</h2>
          <p className="section-lead mt-5">{t('contact_desc')}</p>
          <p className="mt-6 max-w-[34rem] text-sm leading-7 text-text-muted">{t('contact_info')}</p>
        </div>

        <div className="soft-panel interactive-card reveal reveal-right rounded-[2rem] px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:domain@hf.pl"
              onClick={() => trackEvent('cta_click', { location: 'contact', target: 'mailto' })}
              className="action-pill hoverable flex-1 bg-text text-bg no-underline"
            >
              <Mail size={16} />
              {t('contact_email_label')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="action-pill hoverable flex-1 border border-border bg-surface/95 text-text"
            >
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              {copied ? t('copied') : 'domain@hf.pl'}
            </button>
          </div>

          <ul className="mt-7 flex flex-col gap-3 text-left">
            {['cl1', 'cl2', 'cl3'].map((key) => (
              <li key={key} className="interactive-card reveal reveal-up flex items-start gap-3 rounded-[1.2rem] border border-border bg-surface/80 px-4 py-4 text-sm text-text-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 shrink-0 text-primary">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
