import React from 'react';
import { UtensilsCrossed, MessageCircle, ShoppingBag, Navigation, Phone } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDA } from '../cart';

interface MobileBottomNavProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onNavigateSection,
}) => {
  const { language, t } = useLanguage();

  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Pêcherie d\'Oran, 5 Av. Khiali Ben Salem Mohamed, Oran 31000, Algérie'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-cyan-900/30 px-3 pt-2 pb-safe-offset-2 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {/* Menu Tab */}
        <button
          onClick={() => onNavigateSection('menu')}
          className="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-stone-300 hover:text-cyan-400 active:scale-95 transition-all"
        >
          <UtensilsCrossed className="w-5 h-5 text-cyan-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.mobileNav.menu}</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={`${RESTAURANT_CONFIG.whatsappUrl}?text=${encodeURIComponent(
            language === 'ar'
              ? 'السلام عليكم مسمكة وهران ! أود تقديم طلبية أسماك طازجة.'
              : 'Salam Pêcherie d\'Oran ! Je souhaite passer une commande de poisson frais.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-stone-300 hover:text-emerald-400 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-emerald-400 mb-0.5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-emerald-400">{t.mobileNav.whatsapp}</span>
        </a>

        {/* Cart Primary Central Button */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center flex-1.5 -mt-3 py-2 px-2 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-stone-950 rounded-2xl shadow-lg shadow-orange-950/60 active:scale-90 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-stone-950" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 px-1.5 py-0.5 bg-stone-950 text-amber-300 text-[10px] font-black rounded-full border border-amber-400 shadow-sm min-w-4 text-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-black tracking-tight mt-0.5">
            {cartCount > 0 ? formatDA(cartTotal, language) : t.mobileNav.cart}
          </span>
        </button>

        {/* GPS / Itinéraire */}
        <a
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-stone-300 hover:text-cyan-400 active:scale-95 transition-all"
        >
          <Navigation className="w-5 h-5 text-cyan-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.mobileNav.gps}</span>
        </a>

        {/* Direct Phone Call */}
        <a
          href={`tel:${RESTAURANT_CONFIG.phone.replace(/[^0-9]/g, '')}`}
          className="flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-stone-300 hover:text-amber-400 active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">{t.mobileNav.call}</span>
        </a>
      </div>
    </div>
  );
};
