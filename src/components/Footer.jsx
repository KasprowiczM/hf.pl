import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-[rgba(248,244,237,0.72)] px-6 py-10 text-sm text-text-muted">
      <div className="section-frame grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div>
          <p className="display-title text-[1.8rem] leading-none text-text">
            <span className="gold-gradient bg-clip-text text-transparent">hf</span>
            <span className="text-text-faint">.pl</span>
          </p>
          <p className="mt-2">{t('footer_desc')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:justify-center">
          <a href="#market" className="anchor-link no-underline">{t('nav_market')}</a>
          <a href="#faq" className="anchor-link no-underline">{t('nav_faq')}</a>
          <a href="#contact" className="anchor-link no-underline">{t('footer_btn')}</a>
        </div>

        <div className="md:text-right">
          <span>&copy; {new Date().getFullYear()} hf.pl</span>
          <p className="mt-2">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
