import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

const faqKeys = [1, 2, 3];

export function FAQ() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section className="section-shell section-tone-mid reveal reveal-up" id="faq">
      <div className="section-frame grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="max-w-[36rem]">
          <div className="eyebrow">{t('faq_overline')}</div>
          <h2 className="section-title text-balance">{t('faq_title')}</h2>
          <p className="section-lead mt-5">{t('faq_desc')}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqKeys.map((key) => {
            const isOpen = openKey === key;
            return (
              <div
                key={key}
                className={`interactive-card reveal reveal-up rounded-[1.4rem] border bg-surface/90 transition-colors duration-200 ${
                  isOpen ? 'border-border-strong bg-surface' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${key}`}
                  id={`faq-trigger-${key}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-base font-semibold tracking-[-0.02em] text-text">
                    {t(`faq${key}_q`)}
                  </span>
                  <Plus
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-text-faint transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${key}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${key}`}
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-text-muted">
                      {t(`faq${key}_a`)}
                    </p>
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
