import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  MapPin,
  ExternalLink,
  Navigation,
  Bot,
  User,
  Clock,
  Phone,
  Flame,
  X,
  Compass,
} from 'lucide-react';
import { AssistantMessage, MapsGroundingLink } from '../types';
import { RESTAURANT_CONFIG } from '../data/restaurantData';

interface MapsAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDishRecommendation?: (dishName: string) => void;
}

export const MapsAssistantModal: React.FC<MapsAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectDishRecommendation,
}) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Salam & Bienvenue ! Je suis le Concierge officiel de la **Rotisserie Yahia - مشاوي يحيى** à Oran (Plus Code : **${RESTAURANT_CONFIG.address}**).

Grâce à mon intégration **Google Maps en direct**, je peux vous renseigner sur :
- Les **itinéraires et repères géographiques** depuis n'importe quel quartier d'Oran.
- Les **recommandations de plats** (poulet rôti, braisé au feu de bois, frites maison, gratins).
- Les **horaires d'affluence** pour emporter ou dîner sur place (ouvert jusqu'à 01h00).
- Le dosage des épices (doux pour enfants ou relevé traditionnel).

Comment puis-je vous guider aujourd'hui ?`,
      mapsLinks: [
        {
          title: 'Rotisserie Yahia sur Google Maps (M8PV+C78 Oran)',
          uri: RESTAURANT_CONFIG.mapsSearchUrl,
          snippet: 'Fiche officielle · Note 4.0 (123 avis)',
        },
      ],
      timestamp: 'À l\'instant',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick prompts
  const samplePrompts = [
    'Itinéraire depuis Akid Lotfi ou Centre-ville ?',
    'Recommande un festin pour 4 personnes avec gratin',
    'Quelle est l\'affluence ce soir vers 21h ?',
    'Quel est le plat pour enfants pas trop épicé ?',
  ];

  // Try to acquire user's geolocation for precise Maps grounding
  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          // If denied, defaults to Oran
        },
        { timeout: 5000 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: 'À l\'instant',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/maps-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          userLat: userCoords?.lat || RESTAURANT_CONFIG.coordinates.lat,
          userLng: userCoords?.lng || RESTAURANT_CONFIG.coordinates.lng,
        }),
      });

      const data = await response.json();

      const assistantMsg: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Voici les informations demandées pour la Rotisserie Yahia à Oran.',
        mapsLinks: data.mapsLinks || [],
        timestamp: 'À l\'instant',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const fallbackMsg: AssistantMessage = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content: `La Rotisserie Yahia est située au repère Google Maps **${RESTAURANT_CONFIG.address}** à Oran.
        
- **Horaires :** Ouvert tous les jours jusqu'à **01:00 du matin**.
- **Spécialités :** Poulet rôti doré aux frites maison fraîches, poulet braisé au charbon de bois, gratins onctueux et sauces artisanales.
- **Téléphone direct :** ${RESTAURANT_CONFIG.phone}.`,
        mapsLinks: [
          {
            title: 'Rotisserie Yahia - Fiche Google Maps',
            uri: RESTAURANT_CONFIG.mapsSearchUrl,
          },
        ],
        timestamp: 'À l\'instant',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-stone-900 border border-amber-900/60 rounded-3xl w-full max-w-2xl h-[88vh] sm:h-[680px] flex flex-col overflow-hidden shadow-2xl shadow-black relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  Concierge Yahia & Guide Oran
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  Maps Grounding
                </span>
              </div>
              <div className="text-xs text-stone-400">
                Alimenté par Gemini 3.8 Flash avec données géographiques en direct
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-none shadow-md space-y-3'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Google Maps grounded links (mandatory extracted from groundingChunks) */}
                {msg.mapsLinks && msg.mapsLinks.length > 0 && (
                  <div className="pt-2 border-t border-stone-800 space-y-2">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Repères & Liens Google Maps vérifiés :
                    </div>
                    <div className="space-y-1.5">
                      {msg.mapsLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700/70 text-stone-200 hover:text-amber-400 transition-colors group"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Navigation className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate font-semibold text-xs">{link.title}</span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-stone-300" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-none p-4 text-xs text-stone-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Interrogation de Google Maps et calcul d'itinéraires en cours...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 bg-stone-950 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-stone-500 whitespace-nowrap font-semibold">
            Suggestions :
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-3 py-1 rounded-full bg-stone-900 hover:bg-amber-950/60 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-300 whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question sur le trajet, les plats ou l'affluence..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold rounded-xl transition-colors shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 px-1">
            <span>Coordonnées : {RESTAURANT_CONFIG.address}</span>
            <a
              href={`tel:${RESTAURANT_CONFIG.phone.replace(/\s+/g, '')}`}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Appeler {RESTAURANT_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
