import React from 'react';
import {
  Fish,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Star,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onOpenAiAssistant?: () => void;
  onOpenPhotos: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhotos,
  onNavigateSection,
}) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-900">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-amber-500 p-0.5">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                  <Fish className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-white block">
                  {RESTAURANT_CONFIG.name}
                </span>
                <span className="text-cyan-400 text-sm font-arabic font-bold">
                  {RESTAURANT_CONFIG.arabicName}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Pêcherie et restaurant de poisson réputé à Oran. Arrivage direct de la Méditerranée, dorades royales et poissons frais grillés au charbon de bois, fritures croustillantes et plateaux de fruits de mer.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">Note 4,8 / 5</span>
              <span className="text-stone-500">(44 avis Google Maps)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation Rapide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('menu')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Menu & Spécialités
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('avis')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Avis clients vérifiés (123)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('maps')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Localisation & Itinéraires
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPhotos}
                  className="hover:text-amber-400 transition-colors"
                >
                  Galerie Photos & Vidéos
                </button>
              </li>
              <li>
                <a
                  href={RESTAURANT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Commander par WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Horaires & Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-400">Ouvert 7j/7</div>
                  <div className="text-stone-400">Fermeture à 01:00 du matin</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-stone-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Téléphone direct :</div>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.phone.replace(/\s+/g, '')}`}
                    className="text-amber-400 hover:underline"
                  >
                    {RESTAURANT_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 text-stone-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">WhatsApp Commandes :</div>
                  <a
                    href={RESTAURANT_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    {RESTAURANT_CONFIG.intlPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Repère Google Maps
            </h4>
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{RESTAURANT_CONFIG.address}</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Plus Code : {RESTAURANT_CONFIG.plusCode} · Localisation officielle à Oran.
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <a
                  href={RESTAURANT_CONFIG.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-center font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ouvrir dans Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_CONFIG.name} ({RESTAURANT_CONFIG.arabicName}). Tous droits réservés.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Repas sur place · Vente à emporter</span>
            <span>•</span>
            <span>1 000–6 000 DA</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Oran, Algérie</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
