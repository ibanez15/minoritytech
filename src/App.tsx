/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { InstagramHighlights } from './components/InstagramHighlights';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { ReviewNewsSection } from './components/ReviewNewsSection';
import { WarrantyQCSection } from './components/WarrantyQCSection';
import { FloatingAIChat } from './components/FloatingAIChat';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Scale } from 'lucide-react';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { MOCK_ARTICLES } from './data/mockArticles';
import { UltrabookProduct, TechArticle } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'katalog' | 'ai-matcher' | 'reviews' | 'garansi'>('katalog');
  const [products, setProducts] = useState<UltrabookProduct[]>(MOCK_PRODUCTS);
  const [articles, setArticles] = useState<TechArticle[]>(MOCK_ARTICLES);
  const [selectedProduct, setSelectedProduct] = useState<UltrabookProduct | null>(null);
  const [comparedProducts, setComparedProducts] = useState<UltrabookProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch fresh products from persistent SQL database
  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch products');
      })
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch((err) => {
        console.info('Using preloaded catalog data:', err.message);
      });
  };

  // Fetch fresh articles from persistent SQL database
  const fetchArticles = () => {
    fetch('/api/articles')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch articles');
      })
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data);
        }
      })
      .catch((err) => {
        console.info('Using preloaded article data:', err.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchArticles();
  }, []);

  const [compareToast, setCompareToast] = useState<string | null>(null);

  // Toggle compare list
  const handleToggleCompare = (product: UltrabookProduct) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        setCompareToast('Maksimal 3 laptop untuk dibandingkan sekaligus.');
        setTimeout(() => setCompareToast(null), 3000);
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  const isProductCompared = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Cyber Glow Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedProducts.length}
        openCompareModal={() => setIsCompareModalOpen(true)}
        openChat={() => setIsChatOpen(true)}
        openAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section & AI Product Match Finder always visible or highlighted */}
        {(activeTab === 'katalog' || activeTab === 'ai-matcher') && (
          <HeroSection
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onExploreCatalog={() => {
              setActiveTab('katalog');
              const el = document.getElementById('katalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* Product Catalog Section */}
        {(activeTab === 'katalog' || activeTab === 'ai-matcher') && (
          <ProductCatalog
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            comparedIds={comparedProducts.map((p) => p.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {/* Instagram @minoritytech Feed & Daily Drops */}
        {(activeTab === 'katalog' || activeTab === 'ai-matcher') && (
          <InstagramHighlights
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* Reviews & Tech News Section */}
        {(activeTab === 'reviews' || activeTab === 'katalog') && (
          <ReviewNewsSection
            articles={articles}
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* Warranty & 28-Point QC Section */}
        {(activeTab === 'garansi' || activeTab === 'katalog') && (
          <WarrantyQCSection />
        )}
      </main>

      {/* Floating AI Consultant Assistant Widget */}
      <FloatingAIChat
        products={products}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
        }}
      />

      {/* Admin Inventory, Articles & QC Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProductsUpdated={fetchProducts}
        onArticlesUpdated={fetchArticles}
      />

      {/* Product Detail & QC Inspection Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isCompared={selectedProduct ? isProductCompared(selectedProduct.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Side-by-Side Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={comparedProducts}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearAll={handleClearCompare}
        onSelectProduct={(p) => {
          setIsCompareModalOpen(false);
          setSelectedProduct(p);
        }}
      />

      {/* Toast Notification */}
      {compareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl shadow-cyan-950 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{compareToast}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
