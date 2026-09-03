import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const faqKeys = [1, 2, 3, 4, 5, 6, 7];

export function FAQ() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(1);

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section className="section-shell hairline-top reveal reveal-up" id="faq">
      <div className="section-frame grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('faq_overline')}</div>
          <h2 className="section-title text-balance mt-3">{t('faq_title')}</h2>
          <p className="section-lead mt-5">{t('faq_desc')}</p>
          <p className="mono mt-6 hidden lg:block">NASK • 7 — {t('faq_overline')}</p>
        </div>

        <div className="border-y border-hairline">
          {faqKeys.map((key) => {
            const isOpen = openKey === key;
            const qNum = `Q${String(key).padStart(2, '0')}`;
            return (
              <div key={key} className="border-b border-hairline last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-trigger-${key}`}
                  className="group flex w-full items-start justify-between gap-4 px-2 py-5 text-left transition-colors hover:bg-accent-soft"
                >
                  <span className="flex min-w-0 items-start gap-4">
                    <span className="mono shrink-0 pt-1 text-accent">{qNum}</span>
                    <span className="text-[0.98rem] font-semibold leading-6 tracking-[-0.01em] text-ink dark:text-paper">
                      {t(`faq${key}_q`)}
                    </span>
                  </span>
                  <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface/60 transition-colors group-hover:border-line-strong group-hover:bg-surface">
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`text-text-faint transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${key}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${key}`}
                  className="grid transition-all duration-200 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-2 pb-5 pl-[3.4rem] sm:pl-[4.2rem]">
                      <div className="h-px w-8 bg-accent/40" aria-hidden="true" />
                      <p className="mt-3 text-sm leading-7 text-text-muted">{t(`faq${key}_a`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
