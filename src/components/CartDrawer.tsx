import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  Utensils,
  Check,
} from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_CONFIG } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'emporter' | 'sur-place' | 'livraison'>('emporter');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const generateWhatsAppMessage = () => {
    let msg = `*🐟 COMMANDE - PÊCHERIE D'ORAN (مسمكة وهران)*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Type de commande :* ${
      orderType === 'emporter'
        ? '📦 Vente à emporter (Pick-up)'
        : orderType === 'sur-place'
        ? '🍽️ Repas sur place à la pêcherie'
        : '🛵 Demande de livraison'
    }\n`;

    if (customerName.trim()) msg += `*Client :* ${customerName}\n`;
    if (customerPhone.trim()) msg += `*Téléphone :* ${customerPhone}\n`;
    msg += `----------------------------------------\n`;
    msg += `*Détail de la commande :*\n`;

    items.forEach((ci) => {
      const spice = ci.spiceLevel ? ` (Assaisonnement : ${ci.spiceLevel})` : '';
      msg += `• ${ci.quantity}x ${ci.item.name}${spice} - ${(
        ci.item.price * ci.quantity
      ).toLocaleString('fr-FR')} DA\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `*TOTAL : ${subtotal.toLocaleString('fr-FR')} DA*\n`;

    if (orderNotes.trim()) {
      msg += `*Notes & instructions :* ${orderNotes}\n`;
    }

    msg += `\nMerci de me confirmer la préparation et l'heure de retrait à la Pêcherie d'Oran (5 Av. Khiali Ben Salem Mohamed, Oran 31000).`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    const encoded = generateWhatsAppMessage();
    window.open(`${RESTAURANT_CONFIG.whatsappUrl}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-l border-stone-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl text-stone-100">
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg text-white">Votre Commande</h3>
            <span className="text-xs bg-stone-800 text-amber-400 font-bold px-2 py-0.5 rounded-full">
              {items.length} {items.length > 1 ? 'articles' : 'article'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
              <div className="text-stone-300 font-semibold text-base">Votre panier est vide</div>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Ajoutez nos poissons frais de la Méditerranée, dorades grillées, fritures croustillantes ou plateaux royaux !
              </p>
            </div>
          ) : (
            <>
              {/* Service Type Switch */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-400">Modalité :</label>
                <div className="grid grid-cols-3 gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setOrderType('emporter')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      orderType === 'emporter'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    À emporter
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('sur-place')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      orderType === 'sur-place'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Sur place
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('livraison')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      orderType === 'livraison'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Livraison
                  </button>
                </div>
              </div>

              {/* Items Card */}
              <div className="space-y-3">
                {items.map((cartItem, idx) => (
                  <div
                    key={`${cartItem.item.id}-${idx}`}
                    className="p-3.5 bg-stone-950/80 border border-stone-800/80 rounded-2xl flex items-center justify-between gap-3"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-800"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-xs sm:text-sm truncate">
                        {cartItem.item.name}
                      </div>
                      {cartItem.spiceLevel && (
                        <div className="text-[11px] text-amber-400">
                          Épices : {cartItem.spiceLevel}
                        </div>
                      )}
                      <div className="text-xs font-semibold text-stone-400">
                        {cartItem.item.price.toLocaleString('fr-FR')} DA
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-2 py-1 rounded-xl">
                      <button
                        onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-white">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-amber-400 hover:text-amber-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer Inputs */}
              <div className="bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800 space-y-2.5">
                <div className="text-xs font-semibold text-stone-300">
                  Coordonnées pour la commande :
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Votre nom (facultatif)"
                  className="w-full px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Numéro de téléphone"
                  className="w-full px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Instructions (ex: pain chaud en plus, sauce séparée)"
                  className="w-full px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-500 hover:text-red-400 transition-colors"
                >
                  Vider tout le panier
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer with Total and CTAs */}
        {items.length > 0 && (
          <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-3">
            <div className="flex items-center justify-between text-stone-300">
              <span className="text-sm font-semibold">Total estimé :</span>
              <span className="text-2xl font-black text-amber-400">
                {subtotal.toLocaleString('fr-FR')} DA
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-stone-950 fill-stone-950" />
                <span>Envoyer la commande via WhatsApp</span>
              </button>

              <a
                href={`tel:${RESTAURANT_CONFIG.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Ou commander par téléphone ({RESTAURANT_CONFIG.phone})</span>
              </a>
            </div>

            <div className="text-[11px] text-center text-stone-500">
              Retrait rapide à la Pêcherie d'Oran (5 Av. Khiali Ben Salem Mohamed · P92Q+WG)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
