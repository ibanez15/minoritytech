import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Sparkles,
  Laptop
} from 'lucide-react';
import { UltrabookProduct } from '../types';
import { ProductCard } from './ProductCard';
import { BRAND_LIST } from '../data/mockProducts';

interface ProductCatalogProps {
  products: UltrabookProduct[];
  onSelectProduct: (product: UltrabookProduct) => void;
  comparedIds: string[];
  onToggleCompare: (product: UltrabookProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  comparedIds,
  onToggleCompare,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Semua');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Brand filter
      if (selectedBrand !== 'Semua' && p.brand !== selectedBrand) {
        return false;
      }
      // Grade filter
      if (selectedGrade !== 'all' && p.conditionGrade !== selectedGrade) {
        return false;
      }
      // Price range
      if (priceRange === 'under10' && p.price > 10000000) return false;
      if (priceRange === '10to15' && (p.price < 10000000 || p.price > 15000000)) return false;
      if (priceRange === 'above15' && p.price < 15000000) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCpu = p.processor.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesHighlights = p.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesBrand && !matchesCpu && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'battery') return b.batteryHealth - a.batteryHealth;
      if (sortBy === 'qc') return b.inspectionScore - a.inspectionScore;
      return 0; // featured default
    });
  }, [products, selectedBrand, selectedGrade, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('Semua');
    setPriceRange('all');
    setSelectedGrade('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedBrand !== 'Semua' || priceRange !== 'all' || selectedGrade !== 'all' || searchQuery.trim() !== '';

  return (
    <section id="katalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Laptop className="w-4 h-4" />
            <span>Koleksi Terverifikasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Katalog Premium Used Ultrabook
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Seluruh unit telah melalui uji hardware 28 titik &amp; bergaransi 1 tahun siap kirim ke seluruh Indonesia.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Menampilkan</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
            {filteredProducts.length} dari {products.length} Unit
          </span>
        </div>
      </div>

      {/* Brand Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        {BRAND_LIST.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
              selectedBrand === brand
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950 font-bold'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {brand === 'Lenovo' ? 'Lenovo ThinkPad' : brand}
          </button>
        ))}
      </div>

      {/* Filters & Search Control Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-8 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tipe laptop, prosesor (i7, Ryzen), atau spesifikasi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Price Range Selector */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 whitespace-nowrap font-medium hidden sm:inline">Budget:</span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">Semua Budget</option>
              <option value="under10">&lt; 10 Juta</option>
              <option value="10to15">10 - 15 Juta</option>
              <option value="above15">&gt; 15 Juta</option>
            </select>

            {/* Condition Grade */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">Semua Grade</option>
              <option value="Grade A+">Grade A+ (98% Mulus)</option>
              <option value="Grade A">Grade A (95% Mulus)</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="featured">Urutkan: Unggulan</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="battery">Baterai Paling Sehat</option>
              <option value="qc">Skor QC Tertinggi</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="py-2.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 text-xs font-medium transition-colors flex items-center gap-1 shrink-0"
                title="Reset Filter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              isCompared={comparedIds.includes(product.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Tidak ada ultrabook yang cocok</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau reset filter untuk melihat seluruh unit yang tersedia.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
          >
            Tampilkan Semua Produk
          </button>
        </div>
      )}
    </section>
  );
};
