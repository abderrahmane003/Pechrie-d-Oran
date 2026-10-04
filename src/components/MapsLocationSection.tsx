import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Share2,
  Bookmark,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  Compass,
  Clock,
  Phone,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';

interface MapsLocationSectionProps {
  onOpenAiAssistant?: () => void;
}

export const MapsLocationSection: React.FC<MapsLocationSectionProps> = () => {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [showPhoneQr, setShowPhoneQr] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  const plusCode = RESTAURANT_CONFIG.plusCode; // P92Q+WG Oran
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Pêcherie d\'Oran, 5 Av. Khiali Ben Salem Mohamed, Oran 31000, Algérie'
  )}`;

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_CONFIG.address);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pêcherie d\'Oran - مسمكة وهران',
          text: 'Découvrez la Pêcherie d\'Oran (5 Av. Khiali Ben Salem Mohamed, P92Q+WG). Arrivage de poissons frais et fruits de mer !',
          url: RESTAURANT_CONFIG.mapsSearchUrl,
        });
        return;
      } catch (e) {
        // Fallback
      }
    }
    navigator.clipboard.writeText(RESTAURANT_CONFIG.mapsSearchUrl);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  const handleSaveToFavorites = () => {
    setSavedLocally(!savedLocally);
  };

  // Nearby landmarks in Oran
  const landmarks = [
    { name: 'Port d\'Oran & Criée des Pêcheurs', distance: '~3 min' },
    { name: 'Place 1er Novembre / Centre-ville', distance: '~5 min' },
    { name: 'Front de Mer d\'Oran', distance: '~6 min' },
    { name: 'Quartier Akid Lotfi', distance: '~10 min via voie rapide' },
  ];

  return (
    <section id="maps" className="py-20 bg-stone-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Compass className="w-3.5 h-3.5" />
            {t.location.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.location.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            {t.location.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map Preview & Visualizer */}
          <div className="lg:col-span-7 bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl relative">
            {/* Top Bar simulating Google Maps */}
            <div className="bg-stone-900/90 border-b border-stone-800 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/40">
                  <MapPin className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">
                    {RESTAURANT_CONFIG.name}
                  </div>
                  <div className="text-xs text-stone-400">{plusCode}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-600/40 px-2.5 py-1 rounded-md">
                  Ouvert · Arrivage quotidien de la criée
                </span>
              </div>
            </div>

            {/* Simulated Interactive Map canvas with Pin */}
            <div className="relative h-80 sm:h-96 w-full bg-[#18181b] overflow-hidden">
              {/* Map grid lines aesthetic */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(#d97706 1px, transparent 1px), radial-gradient(#d97706 1px, #18181b 1px)',
                  backgroundSize: '40px 40px',
                  backgroundPosition: '0 0, 20px 20px',
                }}
              />

              {/* Oran Stylized Roads & Coast Representation */}
              <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M 0 80 Q 150 40 400 90" stroke="#f59e0b" strokeWidth="4" fill="none" strokeDasharray="6,4" />
                <path d="M 60 0 L 180 300" stroke="#71717a" strokeWidth="3" fill="none" />
                <path d="M 0 160 Q 200 200 400 150" stroke="#ea580c" strokeWidth="5" fill="none" />
                <path d="M 280 0 L 220 300" stroke="#52525b" strokeWidth="2" fill="none" />
                <circle cx="200" cy="150" r="45" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3,3" />
              </svg>

              {/* Central Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
                <div className="relative">
                  <div className="w-12 h-12 bg-amber-500 rounded-full animate-ping opacity-30 absolute inset-0" />
                  <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-full shadow-xl shadow-orange-950 flex items-center justify-center text-stone-950 font-black border-2 border-white">
                    <MapPin className="w-6 h-6 fill-stone-950 text-stone-950" />
                  </div>
                </div>
                <div className="mt-2 bg-stone-900/95 backdrop-blur-md border border-amber-500/60 px-3 py-1.5 rounded-xl shadow-xl text-center">
                  <div className="text-xs font-black text-amber-400">Pêcherie d'Oran</div>
                  <div className="text-[11px] text-stone-300 font-semibold">{RESTAURANT_CONFIG.address}</div>
                </div>
              </div>

              {/* Quick Map actions toolbar overlaid at bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                <a
                  href={mapsDirUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Lancer l'itinéraire GPS</span>
                </a>

                <a
                  href={RESTAURANT_CONFIG.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 backdrop-blur-md flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  <span>Voir sur Google Maps</span>
                </a>
              </div>
            </div>

            {/* Google cordony actions bar matching user prompt */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <a
                href={mapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 flex flex-col items-center gap-1 transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Itinéraires</span>
              </a>

              <button
                onClick={handleSaveToFavorites}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 flex flex-col items-center gap-1 transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${savedLocally ? 'text-amber-400 fill-amber-400' : 'text-stone-400'}`} />
                <span className="font-semibold">{savedLocally ? 'Enregistré' : 'Enregistrer'}</span>
              </button>

              <button
                onClick={() => setShowPhoneQr(!showPhoneQr)}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 flex flex-col items-center gap-1 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Vers téléphone</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 flex flex-col items-center gap-1 transition-colors"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">{copiedShareLink ? 'Lien copié !' : 'Partager'}</span>
              </button>
            </div>
          </div>

          {/* Right: Key Local Info & Landmarks */}
          <div className="lg:col-span-5 space-y-5">
            {/* Location details card */}
            <div className="bg-stone-950 rounded-3xl border border-stone-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Adresse & Coordonnées
                </span>
                <button
                  onClick={handleCopyPlusCode}
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-400 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copié !' : 'Copier Plus Code'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{RESTAURANT_CONFIG.address}</span>
                </div>
                <div className="text-xs text-stone-400 pl-7">
                  Wilaya d'Oran, Algérie · Code Plus Google Maps officiel
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/80 space-y-3 text-xs">
                <div className="flex items-center justify-between text-stone-300">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Horaires d'ouverture :
                  </span>
                  <span className="font-bold text-emerald-400">Tous les jours jusqu'à 01:00</span>
                </div>

                <div className="flex items-center justify-between text-stone-300">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Phone className="w-4 h-4 text-amber-400" />
                    Téléphone commandes :
                  </span>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="font-bold text-amber-400 hover:underline"
                  >
                    {RESTAURANT_CONFIG.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-stone-300">
                  <span className="text-stone-400">Tarifs :</span>
                  <span className="font-semibold text-white">Selon la carte (dès 30 DA)</span>
                </div>
              </div>
            </div>

            {/* Distances from main Oran zones */}
            <div className="bg-stone-950/80 rounded-3xl border border-stone-800 p-6 space-y-3">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Temps de trajet estimatif à Oran</span>
              </div>

              <div className="space-y-2.5">
                {landmarks.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-stone-900 last:border-0"
                  >
                    <span className="text-stone-300 font-medium">{l.name}</span>
                    <span className="text-amber-400 font-bold">{l.distance}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={mapsDirUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Obtenir l'itinéraire GPS en direct sur Google Maps</span>
                </a>
              </div>
            </div>

            {/* QR Code Phone drawer / popover */}
            {showPhoneQr && (
              <div className="bg-stone-900 border border-emerald-600/40 rounded-2xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Scanner pour ouvrir dans Google Maps sur mobile</span>
                </div>
                <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                  {/* Visual QR code placeholder with high contrast */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      RESTAURANT_CONFIG.mapsSearchUrl
                    )}`}
                    alt="QR Code Google Maps"
                    className="w-32 h-32 mx-auto"
                  />
                </div>
                <div className="text-xs text-stone-400">
                  Pointez votre appareil photo pour lancer le GPS vers <strong>{plusCode}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
