# 🐟 Pêcherie d'Oran (مسمكة وهران) - Journal des Corrections et Améliorations

Ce document récapitule l'ensemble des modules, composants et fonctionnalités intégrés au projet :

---

## 1. 🌐 Système Bilingue Intégral (Français & Arabe)
- **`src/i18n/translations.ts`** : Dictionnaire complet de traductions bilingues pour l'intégralité du site :
  - Barre de navigation (La Carte / قائمة الأطباق, Avis / التقييمات, etc.)
  - Section Hero (Accroches, boutons d'action rapide, devis, fiche établissement)
  - Menu et spécialités (Catégories, niveaux d'assaisonnement, boutons d'ajout)
  - Tiroir de commande Panier & message WhatsApp
  - Avis clients Google Maps et géolocalisation
- **`src/i18n/LanguageContext.tsx`** : React Context gérant l'état de la langue active (`fr` / `ar`), le sens de lecture dynamique (`ltr` ou `rtl`) et le bouton de bascule instantanée dans la barre de navigation (`FR` / `العربية`).

---

## 2. 🛒 Architecture Modulaire du Panier
- **`src/cart.ts`** :
  - Persistance automatique du panier dans le stockage local (`localStorage`).
  - Calcul dynamique du nombre d'articles et du montant total en Dinars Algériens (`formatDA`).
  - Générateur d'URL WhatsApp pré-remplie bilingue (génère un message formaté et propre pour `+213 776 52 68 41` selon que la langue choisie soit le français ou l'arabe).
- **`src/hooks.ts`** :
  - Hook réutilisable `useCart()` exportant `{ items, addToCart, updateQuantity, removeItem, clearCart, count, total }`.
  - Hook `useScrolled()` pour la gestion de l'en-tête transparent/flouté.

---

## 3. 🎨 Nouveaux Composants Visuels
- **`src/components/DishVisual.tsx`** :
  - Affiche les photos de plats en haute définition avec effet zoom au survol.
  - Gestion automatique des erreurs d'image avec illustration nautique de repli élégante.
  - Badge dynamique (`Spécialité Royale`, `Arrivage du Jour`, `Coup de Cœur`).
  - Nombre de personnes desservies et étiquette de prix en Dinars Algériens (`1 800 DA` / `1 800 دج`).
- **`src/components/StripeDivider.tsx`** :
  - Séparateur visuel élégant aux teintes ambre doré et cyan océanique entre les sections principales.

---

## 4. 📱 Optimisation Mobile de Haute Précision
- **`src/components/MobileBottomNav.tsx`** :
  - Barre d'action rapide fixée en bas sur smartphone :
    - 🍽️ **La Carte** (défilement fluide)
    - 💬 **WhatsApp Direct** (lien instantané vers `+213 776 52 68 41`)
    - 🛍️ **Panier Central** (affiche en direct le montant cumulé en DA et le nombre d'articles)
    - 🧭 **GPS** (ouvre l'itinéraire Google Maps)
    - 📞 **Appel 1-tap** (`0776 52 68 41`)
- Marge de sécurité automatique (`pb-24 md:pb-0`) pour garantir une navigation tactile sans obstruction.

---

## 5. 📍 Informations Officielles de l'Établissement
- **Nom :** Pêcherie d'Oran (مسمكة وهران)
- **Note :** 4,8 ⭐ (44 avis Google Maps)
- **Tarifs :** 1 000 – 6 000 DA par personne
- **Adresse :** 5 Av. Khiali Ben Salem Mohamed, Oran 31000
- **Plus Code :** P92Q+WG Oran
- **Téléphone & WhatsApp :** 0776 52 68 41 (+213 776 52 68 41)
