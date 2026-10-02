import React, { useState, useEffect } from 'react';
import { Phone, MapPin, ShoppingBag, Fish, Clock, MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiAssistant?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAiAssistant,
  onNavigateSection,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-cyan-950/40 shadow-xl shadow-black/60 py-3'
          : 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Arabic typography */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-amber-500 to-orange-500 p-0.5 shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Fish className="w-6 h-6 text-amber-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {RESTAURANT_CONFIG.name}
                </span>
                <span className="text-amber-400/90 text-sm font-arabic font-bold hidden sm:inline">
                  {RESTAURANT_CONFIG.arabicName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  {RESTAURANT_CONFIG.status}
                </span>
                <span className="hidden md:inline text-stone-600">•</span>
                <span className="hidden md:inline-flex items-center gap-1 text-stone-400">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {RESTAURANT_CONFIG.address}
                </span>
              </div>
            </div>
          </div>

          {/* Nav links on desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
            <button
              onClick={() => onNavigateSection('menu')}
              className="hover:text-amber-400 transition-colors"
            >
              Menu Officiel & Plats
            </button>
            <button
              onClick={() => onNavigateSection('avis')}
              className="hover:text-amber-400 transition-colors"
            >
              Avis Google (123)
            </button>
            <button
              onClick={() => onNavigateSection('maps')}
              className="hover:text-amber-400 transition-colors"
            >
              Itinéraire Oran
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Phone Call */}
            <a
              href={`tel:${RESTAURANT_CONFIG.phone.replace(/[^0-9]/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-stone-200 bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_CONFIG.phone}</span>
            </a>

            {/* Direct WhatsApp link */}
            <a
              href={`${RESTAURANT_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                'Salam Pêcherie d\'Oran (مسمكة وهران) ! Je souhaite passer une commande de poisson frais.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-600/40 rounded-lg transition-colors flex items-center gap-1.5"
              title="Commander sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:px-3 sm:py-2 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-lg shadow-md shadow-orange-950/40 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">Panier</span>
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
