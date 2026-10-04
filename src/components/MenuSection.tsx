import React, { useState } from 'react';
import {
  Fish,
  Plus,
  Check,
  Search,
  Users,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, SpiceLevel } from '../types';
import { DishVisual } from './DishVisual';
import { useLanguage } from '../i18n/LanguageContext';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, spiceLevel?: SpiceLevel) => void;
  onOpenAiAssistant?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpiceByItem, setSelectedSpiceByItem] = useState<Record<string, SpiceLevel>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const categories = [
    { id: 'all', label: t.menu.categories.all },
    { id: 'plateaux', label: t.menu.categories.plateaux },
    { id: 'grillades', label: t.menu.categories.grillades },
    { id: 'friture', label: t.menu.categories.friture },
    { id: 'tajines', label: t.menu.categories.tajines },
    { id: 'entrees', label: t.menu.categories.entrees },
    { id: 'boissons', label: t.menu.categories.boissons },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.nameArabic && item.nameArabic.includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleSpiceChange = (itemId: string, level: SpiceLevel) => {
    setSelectedSpiceByItem((prev) => ({ ...prev, [itemId]: level }));
  };

  const handleAddWithFeedback = (item: MenuItem) => {
    const spice = selectedSpiceByItem[item.id] || (item.spicyConfigurable ? 'Moyen' : undefined);
    onAddToCart(item, spice);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1800);
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Fish className="w-3.5 h-3.5 text-cyan-400" />
            {t.menu.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.menu.title}
          </h2>
          <div className="text-cyan-400 font-bold font-arabic text-lg">
            {t.menu.subtitle}
          </div>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.menu.description}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900/90 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="text-xs text-stone-400 font-medium">
              <span className="text-amber-400 font-bold">{filteredItems.length}</span> {t.menu.itemsCount}
            </div>
          </div>

          {/* Sticky Categories pills for Mobile & Desktop */}
          <div className="sticky top-14 sm:top-16 z-20 bg-stone-950/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-stone-800/80">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all snap-start shrink-0 active:scale-95 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md shadow-orange-950/50 font-black'
                      : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 border border-stone-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedItemNotice === item.id;
            const currentSpice = selectedSpiceByItem[item.id] || 'Moyen';

            return (
              <div
                key={item.id}
                className="group bg-stone-900/60 border border-stone-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
              >
                {/* Visual Component */}
                <DishVisual item={item} className="h-44 sm:h-52" />

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                        {language === 'ar' ? item.nameArabic || item.name : item.name}
                      </h3>
                    </div>
                    <div className="text-amber-400/90 text-xs sm:text-sm font-arabic font-bold pt-0.5">
                      {language === 'ar' ? item.name : item.nameArabic}
                    </div>
                    <p className="text-stone-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Optional Spice Configuration */}
                  {item.spicyConfigurable && (
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-2.5 space-y-1.5">
                      <div className="text-[11px] text-stone-400 font-semibold flex items-center justify-between">
                        <span>{t.menu.spicesLabel}</span>
                        <span className="text-amber-400">{currentSpice}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {(['Doux', 'Moyen', 'Piquant (Oranais)'] as SpiceLevel[]).map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => handleSpiceChange(item.id, level)}
                            className={`px-2 py-1 text-[11px] rounded-lg font-medium transition-colors ${
                              currentSpice === level
                                ? 'bg-amber-500 text-stone-950 font-bold'
                                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                            }`}
                          >
                            {level === 'Doux' ? t.menu.spicyMild : level === 'Moyen' ? t.menu.spicyMedium : t.menu.spicyHot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to order button */}
                  <button
                    onClick={() => handleAddWithFeedback(item)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 hover:border-amber-500'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>{t.menu.addedNotice}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-400 group-hover:text-stone-950" />
                        <span>{t.menu.addToCart}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
