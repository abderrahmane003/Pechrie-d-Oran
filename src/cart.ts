import { CartItem, MenuItem, SpiceLevel } from './types';
import { RESTAURANT_CONFIG } from './data/restaurantData';
import { Language } from './i18n/translations';

export const CART_STORAGE_KEY = 'pecherie_oran_cart';

export function loadSavedCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore
  }
}

export function calculateCartCount(items: CartItem[]): number {
  return items.reduce((acc, ci) => acc + ci.quantity, 0);
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
}

export function formatDA(price: number, lang: Language = 'fr'): string {
  const formatted = price.toLocaleString('fr-FR');
  return lang === 'ar' ? `${formatted} دج` : `${formatted} DA`;
}

export function generateOrderWhatsAppUrl(
  items: CartItem[],
  orderType: 'emporter' | 'sur-place' | 'livraison',
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  orderNotes: string,
  lang: Language = 'fr'
): string {
  const subtotal = calculateCartTotal(items);

  let msg = '';
  if (lang === 'ar') {
    msg += `*🐟 طلبية جديدة - مسمكة وهران (Pêcherie d'Oran)*\n`;
    msg += `----------------------------------------\n`;
    msg += `*طريقة الاستلام :* ${
      orderType === 'emporter'
        ? '📦 طلب سفري (استلام باليد)'
        : orderType === 'sur-place'
        ? '🍽️ تناول بالمطعم'
        : '🛵 طلب توصيل'
    }\n`;
    if (customerName.trim()) msg += `*الزبون :* ${customerName}\n`;
    if (customerPhone.trim()) msg += `*الهاتف :* ${customerPhone}\n`;
    if (orderType === 'livraison' && deliveryAddress.trim()) msg += `*عنوان التوصيل :* ${deliveryAddress}\n`;
    msg += `----------------------------------------\n`;
    msg += `*تفاصيل الطلبية :*\n`;

    items.forEach((ci) => {
      const spice = ci.spiceLevel ? ` (التتبيلة : ${ci.spiceLevel})` : '';
      msg += `• ${ci.quantity}x ${ci.item.nameArabic || ci.item.name}${spice} - ${(
        ci.item.price * ci.quantity
      ).toLocaleString('fr-FR')} دج\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `*المجموع الكلي : ${subtotal.toLocaleString('fr-FR')} دج*\n`;

    if (orderNotes.trim()) {
      msg += `*ملاحظات :* ${orderNotes}\n`;
    }
    if (orderType === 'livraison') {
      msg += `\nيرجى تأكيد تجهيز الطلبية وتوقيت التوصيل. شكراً !`;
    } else {
      msg += `\nيرجى تأكيد تجهيز الطلبية وتوقيت الاستلام بمسمكة وهران (5 شارع خيالي بن سالم محمد، وهران). شكراً !`;
    }
  } else {
    msg += `*🐟 COMMANDE - PÊCHERIE D'ORAN (مسمكة وهران)*\n`;
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
    if (orderType === 'livraison' && deliveryAddress.trim()) msg += `*Adresse de livraison :* ${deliveryAddress}\n`;
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

    if (orderType === 'livraison') {
      msg += `\nMerci de me confirmer la préparation et l'heure de livraison.`;
    } else {
      msg += `\nMerci de me confirmer la préparation et l'heure de retrait à la Pêcherie d'Oran (5 Av. Khiali Ben Salem Mohamed, Oran 31000).`;
    }
  }

  return `${RESTAURANT_CONFIG.whatsappUrl}?text=${encodeURIComponent(msg)}`;
}
