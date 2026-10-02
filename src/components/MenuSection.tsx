import React, { useState } from 'react';
import {
  Flame,
  Fish,
  Plus,
  Check,
  Search,
  Sparkles,
  Utensils,
  Tag,
  Users,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, SpiceLevel } from '../types';

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

  const categories = [
    { id: 'all', label: 'Toute la Mer (الكل)' },
    { id: 'plateaux', label: 'Plateaux Royaux (أطباق ملكية)' },
    { id: 'grillades', label: 'Poissons Grillés (أسماك مشوية)' },
    { id: 'friture', label: 'Fritures Croustillantes (قلي مشكل)' },
    { id: 'tajines', label: 'Tajines de la Mer (طواجن البحر)' },
    { id: 'entrees', label: 'Entrées & Salades (مقبلات وسلطات)' },
    { id: 'boissons', label: 'Boissons Fraîches (المشروبات)' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameArabic.includes(searchQuery);
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
    <section id="menu" className="py-20 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Fish className="w-3.5 h-3.5 text-cyan-400" />
            ARRIVAGE DU JOUR · مسمكة وهران
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Menu Pêcherie d'Oran · مسمكة وهران
          </h2>
          <div className="text-cyan-400 font-bold font-arabic text-lg">
            أسماك طازجة، فواكه البحر وأطباق مشوية على الجمر
          </div>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Sélection quotidienne des meilleurs poissons de la côte oranaise : dorades, bars, gambas et calamars. Commandes directes sur WhatsApp au 0776 52 68 41 ou à emporter.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (dorade, bar, gambas, friture, tajine, soupe...)"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900/90 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="text-xs text-stone-400 font-medium">
              Affichage de <span className="text-amber-400 font-bold">{filteredItems.length}</span> spécialités fraîches
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
                className="group bg-stone-900/60 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Popular badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-stone-950 text-xs font-black rounded-lg shadow-md uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}

                  {/* Servings count */}
                  {item.servesCount && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-stone-950/80 backdrop-blur-md text-amber-300 text-xs font-medium rounded-lg border border-stone-700/60 flex items-center gap-1">
                      <Users className="w-3 h-3 text-amber-400" />
                      {item.servesCount}
                    </span>
                  )}

                  {/* Price overlay on image bottom */}
                  <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-500/40 text-amber-400 font-extrabold text-base">
                    {item.price.toLocaleString('fr-FR')} DA
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-amber-500/90 text-sm font-arabic font-bold pt-0.5">
                      {item.nameArabic}
                    </div>
                    <p className="text-stone-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Optional Spice Configuration for children/families */}
                  {item.spicyConfigurable && (
                    <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-2.5 space-y-1.5">
                      <div className="text-[11px] text-stone-400 font-semibold flex items-center justify-between">
                        <span>Assaisonnement épices :</span>
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
                                ? 'bg-amber-600 text-stone-950 font-bold'
                                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                            }`}
                          >
                            {level === 'Piquant (Oranais)' ? 'Piquant 🔥' : level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to order button */}
                  <button
                    onClick={() => handleAddWithFeedback(item)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 hover:border-amber-500'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-400 group-hover:text-stone-950" />
                        <span>Ajouter à ma commande</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800 max-w-md mx-auto">
            <Utensils className="w-10 h-10 text-stone-500 mx-auto mb-3" />
            <div className="text-stone-300 font-semibold">Aucun plat correspondant trouvé</div>
            <div className="text-xs text-stone-500 mt-1">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-800 text-amber-400 text-xs font-semibold rounded-lg hover:bg-stone-700"
            >
              Afficher tout le menu
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
