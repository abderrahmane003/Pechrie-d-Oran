import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, Send, Phone, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { formatDA, generateOrderWhatsAppUrl } from '../cart';
import { useLanguage } from '../i18n/LanguageContext';

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
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  const handleWhatsAppOrder = () => {
    const safeName = customerName.trim().slice(0, 80);
    const safePhone = customerPhone.trim().slice(0, 30);
    const safeAddress = deliveryAddress.trim().slice(0, 240);
    const safeNotes = orderNotes.trim().slice(0, 300);

    if (orderType === 'livraison' && !safeAddress) {
      alert(language === 'ar' ? 'يرجى إدخال عنوان التوصيل.' : 'Veuillez saisir votre adresse de livraison.');
      return;
    }

    const url = generateOrderWhatsAppUrl(
      items,
      orderType,
      customerName,
      customerPhone,
      safeAddress,
      safeNotes,
      language
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-l border-stone-800 w-full sm:max-w-md h-full flex flex-col justify-between shadow-2xl text-stone-100">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950/98 border-b border-stone-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg text-white">{t.cart.title}</h3>
            <span className="text-xs bg-stone-800 text-amber-400 font-bold px-2 py-0.5 rounded-full">
              {items.length} {t.cart.itemsCount}
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
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
              <div className="text-stone-300 font-semibold text-base">{t.cart.emptyTitle}</div>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                {t.cart.emptySubtitle}
              </p>
            </div>
          ) : (
            <>
              {/* Service Type Switch */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-400">{t.cart.modeLabel}</label>
                <div className="grid grid-cols-3 gap-1 bg-stone-950 p-1 rounded-xl sticky top-0 z-10 border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setOrderType('emporter')}
                    className={`min-h-10 py-1.5 px-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors ${
                      orderType === 'emporter'
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {t.cart.takeaway}
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
                    {t.cart.dineIn}
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
                    {t.cart.delivery}
                  </button>
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {items.map((ci, idx) => (
                  <div
                    key={`${ci.item.id}-${ci.spiceLevel || 'default'}-${idx}`}
                    className="p-2.5 sm:p-3 bg-stone-950/70 border border-stone-800/80 rounded-xl space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-stone-200">
                          {language === 'ar' ? ci.item.nameArabic || ci.item.name : ci.item.name}
                        </div>
                        {ci.spiceLevel && (
                          <div className="text-[11px] text-amber-400 font-medium">
                            {t.menu.spicesLabel} {ci.spiceLevel}
                          </div>
                        )}
                        <div className="text-xs text-amber-500 font-bold mt-0.5">
                          {formatDA(ci.item.price, language)}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-900 text-xs">
                      <span className="text-stone-400">
                        {t.cart.subtotal} : {formatDA(ci.item.price * ci.quantity, language)}
                      </span>

                      <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(idx, ci.quantity - 1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-amber-400 min-w-4 text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, ci.quantity + 1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details Form */}
              <div className="space-y-2.5 pt-2 border-t border-stone-800">
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value.slice(0, 80))}
                    maxLength={80}
                    placeholder={t.cart.customerName}
                    className="w-full px-3 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.slice(0, 30))}
                    maxLength={30}
                    placeholder={t.cart.customerPhone}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {orderType === 'livraison' && (
                  <div>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value.slice(0, 240))}
                      maxLength={240}
                      placeholder={language === 'ar' ? 'عنوان التوصيل *' : 'Adresse de livraison *'}
                      className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                )}

                <div>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value.slice(0, 300))}
                    maxLength={300}
                    placeholder={t.cart.notesPlaceholder}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Clear button */}
              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-stone-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t.cart.clearCart}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-950/98 border-t border-stone-800 space-y-3 shadow-[0_-12px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-400">{t.cart.total}</span>
              <span className="text-xl font-black text-amber-400">
                {formatDA(subtotal, language)}
              </span>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full min-h-12 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-stone-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.cart.whatsappOrderButton}</span>
            </button>

            <div className="text-[11px] text-center text-stone-500">
              {t.cart.pickupNotice}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
