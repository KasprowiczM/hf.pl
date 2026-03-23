import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="reveal reveal-up border-t border-white/12 bg-[#090b10] px-4 py-8 text-sm text-white/68 sm:px-6 sm:py-10">
      <div className="section-frame grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div>
          <p className="display-title text-[1.8rem] leading-none text-white">
            <span className="gold-gradient bg-clip-text text-transparent">hf</span>
            <span className="text-white/35">.pl</span>
          </p>
          <p className="mt-2">{t('footer_desc')}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:justify-self-center">
          <a href="#hero" className="text-white/72 no-underline hover:text-white">hf.pl</a>
          <a href="#scarcity" className="text-white/72 no-underline hover:text-white">{t('scarcity_overline')}</a>
          <a href="#why" className="text-white/72 no-underline hover:text-white">{t('nav_why')}</a>
          <a href="#faq" className="text-white/72 no-underline hover:text-white">{t('nav_faq')}</a>
          <a href="#usecases" className="text-white/72 no-underline hover:text-white">{t('nav_potential')}</a>
          <a href="#valuation" className="text-white/72 no-underline hover:text-white">{t('val_overline')}</a>
          <a href="#market" className="text-white/72 no-underline hover:text-white">{t('nav_market')}</a>
          <a href="#contact" className="text-white/72 no-underline hover:text-white">{t('footer_btn')}</a>
        </div>

        <div className="md:text-right">
          <span>&copy; {new Date().getFullYear()} hf.pl</span>
          <p className="mt-2">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
