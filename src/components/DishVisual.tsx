import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Fish, Users } from 'lucide-react';
import { formatDA } from '../cart';
import { useLanguage } from '../i18n/LanguageContext';

interface DishVisualProps {
  item: MenuItem;
  className?: string;
}

export const DishVisual: React.FC<DishVisualProps> = ({ item, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const { language } = useLanguage();

  return (
    <div className={`relative w-full overflow-hidden bg-stone-950 ${className}`}>
      {!hasError ? (
        <img
          src={item.image}
          alt={language === 'ar' ? item.nameArabic || item.name : item.name}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-stone-950 to-cyan-950 text-cyan-400">
          <Fish className="w-12 h-12 opacity-40 mb-2" />
          <span className="text-xs font-bold tracking-wider text-stone-400 uppercase">
            Pêcherie d'Oran
          </span>
        </div>
      )}

      {/* Subtle Dark Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-transparent pointer-events-none" />

      {/* Badge (e.g. Arrivage du Jour, Spécialité Royale) */}
      {item.badge && (
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[11px] font-black rounded-lg shadow-md uppercase tracking-wider">
          {item.badge}
        </span>
      )}

      {/* Servings count */}
      {item.servesCount && (
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-stone-950/80 backdrop-blur-md text-amber-300 text-[11px] font-medium rounded-lg border border-stone-700/60 flex items-center gap-1">
          <Users className="w-3 h-3 text-amber-400" />
          {item.servesCount}
        </span>
      )}

      {/* Price tag overlay on image bottom right */}
      <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-500/40 text-amber-400 font-extrabold text-sm sm:text-base shadow-lg">
        {formatDA(item.price, language)}
      </div>
    </div>
  );
};
