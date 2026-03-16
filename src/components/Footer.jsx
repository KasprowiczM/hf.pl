import React from 'react';

import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="px-6 py-12 border-t border-border bg-surface text-sm text-text-muted">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-bold text-text">hf.pl</span>
          <span>{t('footer_desc')}</span>
        </div>
        <div className="flex justify-center">
          <a href="mailto:domain@hf.pl" className="text-primary hover:text-primary-hover transition-colors font-semibold">
            domain@hf.pl
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
