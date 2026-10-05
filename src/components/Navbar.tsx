import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Fish, MessageCircle, Globe } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiAssistant?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-cyan-950/40 shadow-xl shadow-black/60 py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Arabic typography */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-amber-500 to-orange-500 p-0.5 shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Fish className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {language === 'ar' ? RESTAURANT_CONFIG.arabicName : RESTAURANT_CONFIG.name}
                </span>
                <span className="text-amber-400/90 text-xs sm:text-sm font-arabic font-bold hidden md:inline">
                  {language === 'ar' ? RESTAURANT_CONFIG.name : RESTAURANT_CONFIG.arabicName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-400">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  {t.nav.openStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Nav links on desktop */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm text-sm font-medium text-stone-300">
            <button
              onClick={() => onNavigateSection('menu')}
              className="px-3.5 py-2 rounded-xl hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.nav.menu}
            </button>
            <button
              onClick={() => onNavigateSection('avis')}
              className="px-3.5 py-2 rounded-xl hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.nav.reviews}
            </button>
            <button
              onClick={() => onNavigateSection('maps')}
              className="px-3.5 py-2 rounded-xl hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              {t.nav.location}
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Switcher Button (FR / AR) */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-2 sm:px-3 text-xs font-bold rounded-xl border border-stone-800 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-400 flex items-center gap-1.5 transition-colors shadow-sm"
              title={language === 'fr' ? 'Passer en Arabe (العربية)' : 'Passer en Français'}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{t.nav.langSwitch}</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${RESTAURANT_CONFIG.phone.replace(/[^0-9]/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-200 bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_CONFIG.phone}</span>
            </a>

            {/* Direct WhatsApp link */}
            <a
              href={`${RESTAURANT_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                language === 'ar'
                  ? 'السلام عليكم مسمكة وهران ! أود تقديم طلبية أسماك طازجة.'
                  : 'Salam Pêcherie d\'Oran (مسمكة وهران) ! Je souhaite passer une commande de poisson frais.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-600/40 rounded-lg transition-colors flex items-center gap-1.5"
              title="Commander sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-lg shadow-md shadow-orange-950/40 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-stone-950 text-amber-400 text-xs rounded-full flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
