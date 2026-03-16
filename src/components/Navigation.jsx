import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Navigation({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <>
      <a href="#main" className="sr-only absolute top-0 left-0 p-4 bg-primary text-black z-[999]">
        {t('skip')}
      </a>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between bg-bg/85 backdrop-blur-md border-b border-border transition-all duration-300" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-label="hf.pl logo">
            <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15"/>
            <text x="16" y="22" textAnchor="middle" className="font-display text-[18px] fill-primary">hf</text>
          </svg>
          <span className="font-display text-xl text-primary tracking-tight">hf<span className="opacity-40">.pl</span></span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-surface-2 rounded-full p-1 border border-border" role="group" aria-label="Language">
            <button 
              onClick={() => changeLanguage('pl')}
              className={twMerge(
                "px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-180",
                i18n.language === 'pl' ? "bg-primary text-bg" : "text-text-muted hover:text-text"
              )}
              aria-pressed={i18n.language === 'pl'}
            >
              PL
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={twMerge(
                "px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-180",
                i18n.language === 'en' ? "bg-primary text-bg" : "text-text-muted hover:text-text"
              )}
              aria-pressed={i18n.language === 'en'}
            >
              EN
            </button>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-2 border border-border text-text-muted transition-all duration-180 hover:text-primary hover:border-primary-dim" 
            aria-label="Switch theme"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>
    </>
  );
}
