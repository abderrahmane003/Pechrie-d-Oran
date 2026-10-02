import React, { useState, useEffect } from 'react';
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
import { CartItem, MenuItem, SpiceLevel } from './types';
import { RESTAURANT_CONFIG } from './data/restaurantData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yahia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('yahia_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem, spiceLevel?: SpiceLevel) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.spiceLevel === spiceLevel
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { item, quantity: 1, spiceLevel }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, ci) => acc + ci.item.price * ci.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
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

        {/* Popular Dishes & Full Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
        />

        {/* Customer Reviews & Google Rating Section */}
        <ReviewsSection />

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
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
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
