import React from 'react';

import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="px-6 py-12 border-t border-border bg-surface text-sm text-text-muted">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-display text-[1.4rem] font-bold tracking-tight cursor-default">
            <span className="bg-[linear-gradient(135deg,var(--color-primary)_0%,#e8c962_50%,var(--color-primary)_100%)] bg-[length:200%_200%] bg-clip-text text-transparent">hf</span>
            <span className="text-text-faint">.pl</span>
          </span>
          <span>{t('footer_desc')}</span>
        </div>
        <div className="flex justify-center">
          <a href="#valuation" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-180 cursor-pointer no-underline bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-bg hover:shadow-[0_4px_20px_rgba(201,164,76,0.3)]">
            {t('footer_btn')}
          </a>
        </div>
        <div className="flex flex-col gap-2 md:text-right">
          <span>&copy; {new Date().getFullYear()} hf.pl</span>
          <span>{t('footer_rights')}</span>
        </div>
      </div>
    </footer>
  );
}
