import React from 'react';
import {
  Fish,
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Utensils,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenAiAssistant?: () => void;
  onScrollToReviews: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onScrollToReviews,
}) => {
  const [copiedPlusCode, setCopiedPlusCode] = React.useState(false);
  const { language, t } = useLanguage();

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_CONFIG.address);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  return (
    <section id="hero" className="relative min-h-[auto] lg:min-h-[92vh] flex items-center pt-20 sm:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-hidden">
      {/* Background imagery with oceanic deep water & grilled seafood theme */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=2000&q=85"
          alt="Poissons frais et fruits de mer grillés"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-125 scale-105 transform motion-safe:animate-pulse"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/25 via-teal-950/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 lg:space-y-6 text-left">
            {/* Badges bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-sm">
                <Fish className="w-3.5 h-3.5 text-cyan-400" />
                {t.hero.badge}
              </span>

              <button
                onClick={onScrollToReviews}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900/80 border border-stone-700/80 text-stone-200 hover:border-amber-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="ml-1 font-bold">4,8</span>
                </div>
                <span className="text-stone-400">({RESTAURANT_CONFIG.reviewsCount} {language === 'ar' ? 'تقييم' : 'avis Google Maps'})</span>
              </button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-600/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                {t.nav.openStatus}
              </span>
            </div>

            {/* Title & Arabic */}
            <div className="space-y-2">
              <h1 className="text-[2rem] leading-[1.08] sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                {language === 'ar' ? RESTAURANT_CONFIG.arabicName : RESTAURANT_CONFIG.name} <br />
                <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-200 bg-clip-text text-transparent font-arabic text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {language === 'ar' ? RESTAURANT_CONFIG.name : RESTAURANT_CONFIG.arabicName}
                </span>
              </h1>
              <p className="text-stone-300 text-sm sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed pt-1">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Action buttons - Mobile touch-optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-2 items-stretch gap-2 sm:gap-3 pt-1 sm:pt-2 max-w-3xl">
              <a
                href={RESTAURANT_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3 sm:px-5 py-3 sm:py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-stone-950 font-black text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
              >
                <MessageCircle className="w-5 h-5 text-stone-950" />
                <span>{t.hero.orderWhatsapp}</span>
              </a>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-3 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 active:scale-95 text-stone-950 font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.hero.exploreMenu}</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <a
                href={`tel:${RESTAURANT_CONFIG.phone.replace(/[^0-9]/g, '')}`}
                className="w-full sm:w-auto px-3 sm:px-4 py-3 bg-stone-900 hover:bg-stone-800 active:scale-95 border border-stone-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{t.hero.callDirect} ({RESTAURANT_CONFIG.phone})</span>
              </a>

              <a
                href={RESTAURANT_CONFIG.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3 sm:px-4 py-3 bg-stone-900/80 hover:bg-stone-800 active:scale-95 border border-stone-700 text-stone-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.googleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>

            {/* Quick Actions toolbar */}
            <div className="hidden sm:flex flex-wrap items-center gap-3 pt-3 text-xs text-stone-400 border-t border-stone-800/80">
              <span className="font-medium text-stone-300">{t.hero.mapsQuickActions}</span>
              <button
                onClick={handleCopyPlusCode}
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors underline-offset-4 hover:underline"
              >
                {copiedPlusCode ? t.hero.addressCopied : t.hero.copyAddress}
              </button>
              <span>•</span>
              <a
                href={RESTAURANT_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1 transition-colors underline-offset-4 hover:underline"
              >
                WhatsApp : {RESTAURANT_CONFIG.phone}
              </a>
              <span>•</span>
              <a
                href={`tel:${RESTAURANT_CONFIG.phone.replace(/[^0-9]/g, '')}`}
                className="hover:text-amber-400 flex items-center gap-1 transition-colors underline-offset-4 hover:underline"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                {t.hero.callDirect} : {RESTAURANT_CONFIG.phone}
              </a>
            </div>
          </div>

          {/* Right Feature Card with Google Maps cordony look */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-cyan-900/40 rounded-2xl p-5 shadow-2xl shadow-black/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                    {t.hero.cardBadge}
                  </div>
                  <div className="text-white font-bold text-lg">
                    {RESTAURANT_CONFIG.name}
                  </div>
                  <div className="text-xs text-stone-400 font-arabic">
                    {RESTAURANT_CONFIG.arabicName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    4,8
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{t.hero.cardReviewsCount}</div>
                </div>
              </div>

              {/* Card key attributes */}
              <div className="py-4 space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-200">{RESTAURANT_CONFIG.address}</div>
                    <div className="text-stone-400">{RESTAURANT_CONFIG.plusCode}, Algérie</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-emerald-300">{t.hero.openHours}</div>
                    <div className="text-stone-400">{t.location.dailyCatch}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-200">{RESTAURANT_CONFIG.phone}</div>
                    <div className="text-stone-400">{t.hero.phoneLabel}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Utensils className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-stone-200">{t.hero.serviceModes}</div>
                    <div className="text-stone-400">{RESTAURANT_CONFIG.pricePerPerson}</div>
                  </div>
                </div>
              </div>

              {/* Customer quote excerpt */}
              <div className="bg-stone-950/80 rounded-xl p-3 border border-stone-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-stone-400 text-[11px]">
                  <span className="font-semibold text-amber-400">{t.hero.quoteTitle}</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-stone-300 italic line-clamp-3">
                  {t.hero.quoteText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
