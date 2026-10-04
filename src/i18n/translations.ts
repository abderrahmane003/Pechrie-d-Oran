export type Language = 'fr' | 'ar';

export interface Translations {
  nav: {
    menu: string;
    reviews: string;
    location: string;
    call: string;
    whatsapp: string;
    cart: string;
    openStatus: string;
    langSwitch: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    exploreMenu: string;
    orderWhatsapp: string;
    callDirect: string;
    googleMaps: string;
    mapsQuickActions: string;
    copyAddress: string;
    addressCopied: string;
    cardBadge: string;
    cardReviewsCount: string;
    openHours: string;
    phoneLabel: string;
    serviceModes: string;
    quoteTitle: string;
    quoteText: string;
  };
  menu: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    itemsCount: string;
    addToCart: string;
    addedNotice: string;
    spicesLabel: string;
    spicyMild: string;
    spicyMedium: string;
    spicyHot: string;
    categories: {
      all: string;
      plateaux: string;
      grillades: string;
      friture: string;
      tajines: string;
      entrees: string;
      boissons: string;
    };
  };
  cart: {
    title: string;
    itemsCount: string;
    emptyTitle: string;
    emptySubtitle: string;
    modeLabel: string;
    takeaway: string;
    dineIn: string;
    delivery: string;
    customerName: string;
    customerPhone: string;
    notesPlaceholder: string;
    notesLabel: string;
    subtotal: string;
    total: string;
    whatsappOrderButton: string;
    pickupNotice: string;
    clearCart: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedReviews: string;
    googleMapsReviews: string;
    reportedBy: string;
    writeReview: string;
    filterByTag: string;
    useful: string;
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    openBadge: string;
    itinerary: string;
    save: string;
    saved: string;
    sendToPhone: string;
    share: string;
    linkCopied: string;
    addressHeader: string;
    copyPlusCode: string;
    hoursHeader: string;
    dailyCatch: string;
    landmarksHeader: string;
    qrTitle: string;
    qrNotice: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    hours: string;
    rightsReserved: string;
    currency: string;
  };
  mobileNav: {
    menu: string;
    whatsapp: string;
    cart: string;
    gps: string;
    call: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      menu: 'La Carte',
      reviews: 'Avis Google (4,8 ⭐)',
      location: 'Itinéraire Oran',
      call: 'Appeler',
      whatsapp: 'WhatsApp',
      cart: 'Panier',
      openStatus: 'Ouvert · Arrivage quotidien',
      langSwitch: 'العربية',
    },
    hero: {
      badge: 'Restaurant de Poisson & Pêcherie · Oran',
      title: 'Pêcherie d\'Oran',
      subtitle: 'L’authenticité des saveurs méditerranéennes au cœur d’Oran : poissons frais du port grillés au feu de bois, fritures croustillantes, gambas royales et grands plateaux de fruits de mer.',
      exploreMenu: 'Consulter la Carte',
      orderWhatsapp: 'Commander sur WhatsApp',
      callDirect: 'Appeler',
      googleMaps: 'Itinéraire Google Maps',
      mapsQuickActions: 'Actions rapides Maps :',
      copyAddress: 'Copier Plus Code P92Q+WG',
      addressCopied: '✓ Adresse copiée !',
      cardBadge: 'Fiche Établissement',
      cardReviewsCount: '44 avis',
      openHours: 'Ouvert · Service midi & soir',
      phoneLabel: 'Commandes & réservations',
      serviceModes: 'Repas sur place · Vente à emporter',
      quoteTitle: 'Sadek Bouziane (Local Guide)',
      quoteText: '« J\'ai récemment visité ce restaurant et je dois dire que j\'ai été extrêmement impressionné. La cuisson était parfaite, les poissons et plats étaient juteux et pleins de saveur... »',
    },
    menu: {
      badge: 'ARRIVAGE DU JOUR · مسمكة وهران',
      title: 'Menu Pêcherie d\'Oran · مسمكة وهران',
      subtitle: 'أسماك طازجة، فواكه البحر وأطباق مشوية على الجمر',
      description: 'Sélection quotidienne des meilleurs poissons de la côte oranaise : dorades, bars, gambas et calamars. Commandes directes sur WhatsApp au 0776 52 68 41 ou à emporter.',
      searchPlaceholder: 'Rechercher (dorade, bar, gambas, friture, tajine, soupe...)',
      itemsCount: 'spécialités fraîches',
      addToCart: 'Ajouter',
      addedNotice: 'Ajouté au panier !',
      spicesLabel: 'Assaisonnement :',
      spicyMild: 'Doux',
      spicyMedium: 'Moyen',
      spicyHot: 'Piquant 🔥',
      categories: {
        all: 'Toute la Mer (الكل)',
        plateaux: 'Plateaux Royaux (أطباق ملكية)',
        grillades: 'Poissons Grillés (أسماك مشوية)',
        friture: 'Fritures Croustillantes (قلي مشكل)',
        tajines: 'Tajines de la Mer (طواجن البحر)',
        entrees: 'Entrées & Salades (مقبلات وسلطات)',
        boissons: 'Boissons Fraîches (المشروبات)',
      },
    },
    cart: {
      title: 'Votre Commande',
      itemsCount: 'article',
      emptyTitle: 'Votre panier est vide',
      emptySubtitle: 'Ajoutez nos poissons frais de la Méditerranée, dorades grillées, fritures croustillantes ou plateaux royaux !',
      modeLabel: 'Modalité :',
      takeaway: 'À emporter',
      dineIn: 'Sur place',
      delivery: 'Livraison',
      customerName: 'Votre Nom ou Prénom',
      customerPhone: 'Numéro de téléphone (optionnel)',
      notesPlaceholder: 'Précisions pour la cuisson, citrons supplémentaires, heure de passage...',
      notesLabel: 'Instructions spéciales / Remarques :',
      subtotal: 'Sous-total',
      total: 'Total',
      whatsappOrderButton: 'Envoyer la commande via WhatsApp',
      pickupNotice: 'Retrait rapide à la Pêcherie d\'Oran (5 Av. Khiali Ben Salem Mohamed · P92Q+WG)',
      clearCart: 'Vider',
    },
    reviews: {
      badge: 'AVIS CERTIFIÉS · GOOGLE MAPS',
      title: 'Ce que disent nos clients à Oran',
      subtitle: '44 avis vérifiés et retours authentiques de la communauté et des Local Guides d’Oran.',
      verifiedReviews: 'avis vérifiés',
      googleMapsReviews: '44 avis Google Maps',
      reportedBy: 'Signalé par 3 personnes · 1–6 000 DA',
      writeReview: 'Rédiger un avis',
      filterByTag: 'Trier par mot-clé :',
      useful: 'Utile',
    },
    location: {
      badge: 'LOCALISATION & ITINÉRAIRE',
      title: 'Nous trouver à Oran',
      subtitle: 'Pêcherie d\'Oran (مسمكة وهران) · 5 Av. Khiali Ben Salem Mohamed, Oran 31000 · Plus Code : P92Q+WG',
      openBadge: 'Ouvert · Arrivage quotidien de la criée',
      itinerary: 'Itinéraires',
      save: 'Enregistrer',
      saved: 'Enregistré',
      sendToPhone: 'Vers téléphone',
      share: 'Partager',
      linkCopied: 'Lien copié !',
      addressHeader: 'Adresse & Coordonnées',
      copyPlusCode: 'Copier Plus Code',
      hoursHeader: 'Horaires & Arrivages',
      dailyCatch: 'Arrivage frais chaque matin depuis la criée du port d\'Oran.',
      landmarksHeader: 'Repères à proximité (Oran)',
      qrTitle: 'Flashez pour ouvrir sur votre mobile',
      qrNotice: 'Scannez avec l’appareil photo de votre smartphone pour lancer Google Maps.',
    },
    footer: {
      description: 'Pêcherie et restaurant de poisson réputé à Oran. Arrivage direct de la Méditerranée, dorades royales et poissons frais grillés au charbon de bois, fritures croustillantes et plateaux de fruits de mer.',
      quickLinks: 'Navigation Rapide',
      contact: 'Contact & Accès',
      hours: 'Disponibilité',
      rightsReserved: 'Tous droits réservés.',
      currency: 'DA',
    },
    mobileNav: {
      menu: 'La Carte',
      whatsapp: 'WhatsApp',
      cart: 'Panier',
      gps: 'GPS',
      call: 'Appeler',
    },
  },
  ar: {
    nav: {
      menu: 'قائمة الأطباق',
      reviews: 'آراء الزبائن (4.8 ⭐)',
      location: 'موقع المطعم',
      call: 'اتصال',
      whatsapp: 'واتساب',
      cart: 'السلة',
      openStatus: 'مفتوح · أسماك طازجة يومياً',
      langSwitch: 'Français',
    },
    hero: {
      badge: 'مسمكة ومطعم مأكولات بحرية · وهران',
      title: 'مسمكة وهران',
      subtitle: 'أصالة النكهات البحرية المتوسطية في قلب وهران: أسماك طازجة من الميناء مشوية على الفحم، فواكه البحر، روبيان ملكي، وأطباق ملكية فاخرة.',
      exploreMenu: 'تصفح قائمة الطعام',
      orderWhatsapp: 'طلب عبر واتساب',
      callDirect: 'اتصال مباشر',
      googleMaps: 'الاتجاهات عبر خرائط جوجل',
      mapsQuickActions: 'إجراءات سريعة :',
      copyAddress: 'نسخ رمز الموقع P92Q+WG',
      addressCopied: '✓ تم نسخ العنوان !',
      cardBadge: 'بطاقة المطعم',
      cardReviewsCount: '44 تقييم',
      openHours: 'مفتوح · خدمة الغداء والعشاء',
      phoneLabel: 'الطلبات والحجوزات',
      serviceModes: 'تناول بالمطعم · استلام باليد',
      quoteTitle: 'صادق بوزيان (مرشد محلي)',
      quoteText: '« زرت المطعم مؤخراً وكنت منبهراً جداً بجودة وطراوة السمك وطريقة الشواء المثالية. الاستقبال دافئ وفريق العمل في القمة... عنوان لا يمكن تفويته في وهران ! »',
    },
    menu: {
      badge: 'صيد اليوم الطازج · مسمكة وهران',
      title: 'قائمة مسمكة وهران',
      subtitle: 'أسماك طازجة، فواكه البحر وأطباق مشوية على الجمر',
      description: 'تشكيلة يومية من أشهى أسماك الساحل الوهراني: دوراد، قاروص، كالمار، وروبيان ملكي. طلبات سريعة عبر واتساب على 0776 52 68 41.',
      searchPlaceholder: 'ابحث (دوراد، قاروص، كالمار، قلي، طاجين، شربة...)',
      itemsCount: 'أطباق طازجة',
      addToCart: 'إضافة',
      addedNotice: 'تمت الإضافة إلى السلة !',
      spicesLabel: 'التتبيلة :',
      spicyMild: 'هادئ',
      spicyMedium: 'متوسط',
      spicyHot: 'حار وهراني 🔥',
      categories: {
        all: 'كل المأكولات (الكل)',
        plateaux: 'أطباق ملكية فواكه البحر',
        grillades: 'أسماك مشوية على الجمر',
        friture: 'قلي مشكل ومقرمش',
        tajines: 'طواجن البحر بالشرمولة',
        entrees: 'مقبلات وشوربة وسلطات',
        boissons: 'مشروبات باردة',
      },
    },
    cart: {
      title: 'طلبيتك',
      itemsCount: 'عنصر',
      emptyTitle: 'سلة الطلبات فارغة',
      emptySubtitle: 'أضف الأسماك الطازجة المشوية، فواكه البحر أو أطباقنا الملكية الشهية !',
      modeLabel: 'نوع الطلب :',
      takeaway: 'سفري (استلام)',
      dineIn: 'تناول بالمطعم',
      delivery: 'توصيل',
      customerName: 'الاسم أو اللقب',
      customerPhone: 'رقم الهاتف (اختياري)',
      notesPlaceholder: 'أي ملاحظات خاصة للطهي، ليمون إضافي، توقيت الاستلام...',
      notesLabel: 'ملاحظات وتوجيهات خاصة :',
      subtotal: 'المجموع الجزئي',
      total: 'المجموع الكلي',
      whatsappOrderButton: 'إرسال الطلب عبر واتساب الآن',
      pickupNotice: 'استلام سريع من مسمكة وهران (5 شارع خيالي بن سالم محمد · P92Q+WG)',
      clearCart: 'تفريغ',
    },
    reviews: {
      badge: 'تقييمات موثقة · خرائط جوجل',
      title: 'ماذا يقول زبائننا في وهران',
      subtitle: '44 تقييم حقيقي وموثق من زبائن ومرشدي جوجل المحليين في وهران.',
      verifiedReviews: 'تقييم موثق',
      googleMapsReviews: '44 تقييم على خرائط جوجل',
      reportedBy: 'بشهادة الزوار · 1 000–6 000 دج',
      writeReview: 'كتابة تقييم',
      filterByTag: 'تصفية حسب الكلمات :',
      useful: 'مفيد',
    },
    location: {
      badge: 'الموقع والمسار',
      title: 'موقعنا في وهران',
      subtitle: 'مسمكة وهران · 5 شارع خيالي بن سالم محمد، وهران 31000 · رمز Plus : P92Q+WG',
      openBadge: 'مفتوح · صيد طازج يومياً',
      itinerary: 'الاتجاهات',
      save: 'حفظ',
      saved: 'تم الحفظ',
      sendToPhone: 'إلى الهاتف',
      share: 'مشاركة',
      linkCopied: 'تم نسخ الرابط !',
      addressHeader: 'العنوان ومعلومات الاتصال',
      copyPlusCode: 'نسخ رمز الموقع',
      hoursHeader: 'أوقات العمل والصيد',
      dailyCatch: 'وصول يومي للأسماك الطازجة كل صباح من ميناء وهران.',
      landmarksHeader: 'معالم قريبة في وهران',
      qrTitle: 'امسح الرمز للفتح على هاتفك',
      qrNotice: 'امسح بواسطة كاميرا هاتفك لفتح المسار مباشرة في خرائط جوجل.',
    },
    footer: {
      description: 'مسمكة ومطعم أسماك رائد في وهران. وصول يومي مباشر من البحر المتوسط، سمك دوراد وقاروص مشوي على الجمر، قلي مشكل مقرمش وأطباق فواكه البحر الفاخرة.',
      quickLinks: 'روابط سريعة',
      contact: 'الاتصال والعنوان',
      hours: 'الخدمة',
      rightsReserved: 'جميع الحقوق محفوظة.',
      currency: 'دج',
    },
    mobileNav: {
      menu: 'القائمة',
      whatsapp: 'واتساب',
      cart: 'السلة',
      gps: 'الموقع',
      call: 'اتصال',
    },
  },
};
