import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { MapsLocationSection } from './components/MapsLocationSection';
import { CartDrawer } from './components/CartDrawer';
import { MapsAssistantModal } from './components/MapsAssistantModal';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { StripeDivider } from './components/StripeDivider';
import { LanguageProvider } from './i18n/LanguageContext';
import { useCart } from './hooks';

function RestaurantApp() {
  const {
    items: cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    count: totalCartCount,
    total: cartTotal,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 transition-colors">
      {/* Top Fixed Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="pb-24 md:pb-0">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleNavigateSection('menu')}
          onScrollToReviews={() => handleNavigateSection('avis')}
        />

        <StripeDivider variant="cyan" />

        {/* Popular Dishes & Full Menu Section */}
        <MenuSection
          onAddToCart={addToCart}
        />

        <StripeDivider variant="gold" />

        {/* Customer Reviews & Google Rating Section */}
        <ReviewsSection />

        <StripeDivider variant="cyan" />

        {/* Maps Location & Directions Hub */}
        <MapsLocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPhotos={() => setIsPhotosOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modern App-style Floating Dock for Mobile View */}
      <MobileBottomNav
        cartCount={totalCartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      {/* Maps Grounding AI Concierge Modal */}
      <MapsAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={isPhotosOpen}
        onClose={() => setIsPhotosOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RestaurantApp />
    </LanguageProvider>
  );
}
