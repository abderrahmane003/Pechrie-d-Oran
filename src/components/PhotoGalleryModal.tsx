import React, { useState } from 'react';
import { Camera, X, Play, Image as ImageIcon } from 'lucide-react';
import plateauMerImg from '../assets/images/plateau_fruits_de_mer_1790978235478.jpg';
import doradeImg from '../assets/images/dorade_grillee_1790978248725.jpg';
import fritureImg from '../assets/images/friture_mixte_1790978261233.jpg';
import tajinePoissonImg from '../assets/images/tajine_poisson_1790978272874.jpg';
import saladePoulpeImg from '../assets/images/salade_poulpe_1790978285770.jpg';
import soupePoissonImg from '../assets/images/soupe_poisson_1790978297382.jpg';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'tout' | 'plats' | 'atmosphere' | 'proprio'>('tout');

  if (!isOpen) return null;

  const photos = [
    {
      id: 1,
      cat: 'plats',
      title: 'Grand Plateau Royal de fruits de mer et dorade grillée',
      time: 'Il y a 26 jours',
      url: plateauMerImg,
    },
    {
      id: 2,
      cat: 'plats',
      title: 'Dorade royale fraîche grillée au feu de bois',
      time: 'Il y a 1 mois',
      url: doradeImg,
    },
    {
      id: 3,
      cat: 'plats',
      title: 'Friture mixte de poissons de la pêcherie et calamars',
      time: 'Il y a 26 jours',
      url: fritureImg,
    },
    {
      id: 4,
      cat: 'plats',
      title: 'Tajine de poisson et crevettes à la charmoula oranaise',
      time: 'Il y a 3 semaines',
      url: tajinePoissonImg,
    },
    {
      id: 5,
      cat: 'proprio',
      title: 'Salade de poulpe frais mariné à l’huile d’olive et citron',
      time: 'Photos du propriétaire',
      url: saladePoulpeImg,
    },
    {
      id: 6,
      cat: 'atmosphere',
      title: 'Ambiance chaleureuse au 5 Av. Khiali Ben Salem Mohamed',
      time: 'Il y a 2 mois',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filtered = photos.filter((p) => {
    if (activeTab === 'tout') return true;
    return p.cat === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-white text-base sm:text-lg">
              Photos & Vidéos de l'établissement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Bar as in user prompt */}
        <div className="px-5 py-3 bg-stone-950/80 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-semibold">
          {[
            { id: 'tout', label: 'Tout (6)' },
            { id: 'plats', label: 'Plats et boissons' },
            { id: 'atmosphere', label: 'Atmosphère' },
            { id: 'proprio', label: 'Photos du propriétaire' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 aspect-video sm:aspect-square flex flex-col justify-end"
            >
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="relative p-3 z-10 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-stone-950/80 px-2 py-0.5 rounded-md">
                  {item.time}
                </span>
                <div className="text-xs font-bold text-white leading-tight">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
