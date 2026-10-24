import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  DollarSign, 
  BatteryCharging, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  LogOut, 
  RotateCcw, 
  Layers, 
  Cpu, 
  HardDrive, 
  X, 
  Save, 
  AlertCircle,
  TrendingUp,
  Package,
  BookOpen,
  FileText,
  Star,
  ExternalLink,
  Laptop,
  Database,
  Calendar,
  Clock,
  User,
  Tag
} from 'lucide-react';
import { UltrabookProduct, TechArticle } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onProductsUpdated: () => void;
  onArticlesUpdated?: () => void;
}

interface StatsData {
  totalProducts: number;
  inStockCount: number;
  outOfStockCount: number;
  totalInventoryValue: number;
  avgBatteryHealth: number;
  avgQcScore: number;
  totalArticles?: number;
  articlesByCategory?: Record<string, number>;
  dbEngine?: string;
  dbFilePath?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onProductsUpdated,
  onArticlesUpdated,
}) => {
  // Navigation inside Admin
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'articles' | 'database'>('products');

  // Authentication State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mt_admin_token'));
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Products State
  const [products, setProducts] = useState<UltrabookProduct[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('Semua');

  // Articles State
  const [articles, setArticles] = useState<TechArticle[]>([]);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('Semua');

  // Product Modal CRUD State
  const [editingProduct, setEditingProduct] = useState<UltrabookProduct | null>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productFormError, setProductFormError] = useState<string | null>(null);
  const [productFormSubmitting, setProductFormSubmitting] = useState(false);

  // Article Modal CRUD State
  const [editingArticle, setEditingArticle] = useState<TechArticle | null>(null);
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [articleFormError, setArticleFormError] = useState<string | null>(null);
  const [articleFormSubmitting, setArticleFormSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Product Create/Edit
  const [productFormData, setProductFormData] = useState<Partial<UltrabookProduct>>({
    title: '',
    brand: 'Lenovo',
    modelSeries: 'ThinkPad X1',
    price: 10500000,
    originalPrice: 24000000,
    conditionGrade: 'Grade A+',
    batteryHealth: 95,
    batteryCycle: 120,
    processor: 'Intel Core i7-1165G7',
    ram: '16GB LPDDR4x',
    storage: '512GB NVMe SSD',
    display: '14" FHD IPS Anti-Glare 400 nits',
    gpu: 'Intel Iris Xe Graphics',
    weightKg: 1.15,
    inStock: true,
    stockCount: 1,
    heroImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
    description: 'Ultrabook bisnis performa tinggi dalam kondisi Grade A+ siap pakai.',
    highlights: ['Lolos 28-Titik QC Lab', 'Garansi 1 Tahun Resmi', 'Kondisi 98% Mulus'],
    suitableFor: ['Programmer', 'Bisnis', 'Mahasiswa'],
    inspectionScore: 98,
    inspectionReport: {
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      technician: 'Rian S. (Senior QC)',
      ssdHealth: 99,
      thermalUnderLoad: '68°C Max (Cinebench R23 10 Min)',
      keyboardTest: '100% Passed (Backlit & TrackPoint Normal)',
      screenTest: '100% Clean (Zero Dead Pixel)',
      audioMicCamera: 'Passed Jernih',
      chassisCondition: 'Grade A+ Mulus',
      checkItems: [
        { name: 'Motherboard & Clean BIOS', category: 'Hardware', status: 'Passed', note: 'Non-Password' },
        { name: 'Layar Anti-Glare & Panel', category: 'Layar', status: 'Passed', note: 'Zero dead pixel' },
        { name: 'Kesehatan Baterai', category: 'Baterai', status: 'Passed', note: 'Kondisi Prima' },
        { name: 'Port I/O & Pengisian Cepat', category: 'Port & Konektivitas', status: 'Passed', note: 'Semua port normal' },
      ],
    },
    affiliateLinks: {
      tokopedia: 'https://tokopedia.com',
      shopee: 'https://shopee.co.id',
      whatsapp: 'https://wa.me/6281234567890',
    },
  });

  // Form State for Article Create/Edit
  const [articleFormData, setArticleFormData] = useState<Partial<TechArticle>>({
    title: '',
    slug: '',
    category: 'Review Mendalam',
    author: 'Tim Redaksi Minority Tech',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: '6 menit baca',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
    tags: ['ThinkPad', 'Review', 'Ultrabook'],
    relatedProductId: '',
    pros: ['Keyboard empuk anti-lelah', 'Bodi serat karbon militer tangguh', 'Port lengkap tanpa dongle'],
    cons: ['Stok unit pre-owned cepat habis'],
    verdictScore: 9.2,
  });

  const [tagInput, setTagInput] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch admin products, articles, and stats
  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [prodRes, artRes, statsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/articles'),
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.data || []);
      }

      if (artRes.ok) {
        const artData = await artRes.json();
        setArticles(artData.data || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      } else if (statsRes.status === 401) {
        handleLogout();
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminData();
    }
  }, [isOpen, token]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      localStorage.setItem('mt_admin_token', data.token);
      setToken(data.token);
      setUsernameInput('');
      setPasswordInput('');
      showToast('Selamat datang di Admin Panel Minority Tech!');
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mt_admin_token');
    setToken(null);
    setProducts([]);
    setArticles([]);
    setStats(null);
    showToast('Telah keluar dari sesi admin.');
  };

  // Toggle inStock status quickly
  const handleToggleStock = async (product: UltrabookProduct) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inStock: !product.inStock }),
      });

      if (res.ok) {
        showToast(`Status ${product.title} diubah menjadi ${!product.inStock ? 'Ready' : 'Habis'}`);
        fetchAdminData();
        onProductsUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Hapus permanen ${title} dari database SQL?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast(`Produk "${title}" berhasil dihapus dari SQL.`);
        fetchAdminData();
        onProductsUpdated();
      } else {
        const data = await res.json();
        showToast(data.error || 'Gagal menghapus produk');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Reset products to default seed
  const handleResetStock = async () => {
    if (!confirm('Peringatan: Reset database akan mengembalikan katalog ke unit default Minority Tech. Lanjutkan?')) return;

    try {
      const res = await fetch('/api/admin/products/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast('Katalog berhasil di-reset ke stok default di database SQL.');
        fetchAdminData();
        onProductsUpdated();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete article handler
  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}" dari database SQL?`)) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast(`Artikel "${title}" berhasil dihapus.`);
        fetchAdminData();
        onArticlesUpdated?.();
      } else {
        const data = await res.json();
        showToast(data.error || 'Gagal menghapus artikel');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Reset articles to default seed
  const handleResetArticles = async () => {
    if (!confirm('Reset artikel ke daftar bawaan Minority Tech?')) return;

    try {
      const res = await fetch('/api/admin/articles/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast('Artikel berhasil di-reset ke data bawaan di database SQL.');
        fetchAdminData();
        onArticlesUpdated?.();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Open Form for Create Product
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      title: '',
      brand: 'Lenovo',
      modelSeries: 'ThinkPad Series',
      price: 9900000,
      originalPrice: 22000000,
      conditionGrade: 'Grade A+',
      batteryHealth: 95,
      batteryCycle: 110,
      processor: 'Intel Core i7-1165G7',
      ram: '16GB LPDDR4x',
      storage: '512GB NVMe SSD',
      display: '14" FHD IPS Anti-Glare 400 nits',
      gpu: 'Intel Iris Xe Graphics',
      weightKg: 1.20,
      inStock: true,
      stockCount: 1,
      heroImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      description: 'Unit ultrabook bisnis pilihan Grade A+ dengan performa prima dan bergaransi 1 tahun resmi.',
      highlights: ['Bodi Serat Karbon / Aluminium', 'Baterai Sehat 95%', 'Lolos 28 Titik QC Lab'],
      suitableFor: ['Programmer', 'Eksekutif', 'Kuliah'],
      inspectionScore: 98,
      inspectionReport: {
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        technician: 'Rian S. (Senior QC)',
        ssdHealth: 99,
        thermalUnderLoad: '69°C Max (Cinebench R23 Stres Test)',
        keyboardTest: '100% Passed (Normal & Backlit Nyala)',
        screenTest: '100% Clean (Zero Dead Pixel)',
        audioMicCamera: 'Passed Normal',
        chassisCondition: 'Grade A+ Mulus',
        checkItems: [
          { name: 'Motherboard & Clean BIOS', category: 'Hardware', status: 'Passed', note: 'Non-Password' },
          { name: 'Layar Anti-Glare & Panel', category: 'Layar', status: 'Passed', note: 'Zero dead pixel' },
          { name: 'Kesehatan Baterai', category: 'Baterai', status: 'Passed', note: 'Kondisi Prima' },
        ],
      },
      affiliateLinks: {
        tokopedia: 'https://tokopedia.com',
        shopee: 'https://shopee.co.id',
        whatsapp: 'https://wa.me/6281234567890',
      },
    });
    setProductFormError(null);
    setIsProductFormOpen(true);
  };

  // Open Form for Edit Product
  const handleOpenEditProduct = (product: UltrabookProduct) => {
    setEditingProduct(product);
    setProductFormData({ ...product });
    setProductFormError(null);
    setIsProductFormOpen(true);
  };

  // Open Form for Create Article
  const handleOpenCreateArticle = () => {
    setEditingArticle(null);
    setArticleFormData({
      title: '',
      slug: '',
      category: 'Review Mendalam',
      author: 'Tim Redaksi Minority Tech',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '5 menit baca',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      tags: ['ThinkPad', 'Review', 'Ultrabook'],
      relatedProductId: products[0]?.id || '',
      pros: ['Sasis kokoh standar militer', 'Keyboard legendaris sangat nyaman'],
      cons: ['Unit pre-owned kuota terbatas'],
      verdictScore: 9.2,
    });
    setArticleFormError(null);
    setIsArticleFormOpen(true);
  };

  // Open Form for Edit Article
  const handleOpenEditArticle = (article: TechArticle) => {
    setEditingArticle(article);
    setArticleFormData({ ...article });
    setArticleFormError(null);
    setIsArticleFormOpen(true);
  };

  // Submit Product Form
  const handleProductFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.title?.trim()) {
      setProductFormError('Nama/Judul produk wajib diisi.');
      return;
    }

    setProductFormSubmitting(true);
    setProductFormError(null);

    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}` 
        : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productFormData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan produk');
      }

      showToast(editingProduct ? 'Produk berhasil diperbarui di database SQL!' : 'Produk baru tersimpan di database SQL!');
      setIsProductFormOpen(false);
      fetchAdminData();
      onProductsUpdated();
    } catch (err: any) {
      setProductFormError(err.message);
    } finally {
      setProductFormSubmitting(false);
    }
  };

  // Submit Article Form
  const handleArticleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleFormData.title?.trim()) {
      setArticleFormError('Judul artikel wajib diisi.');
      return;
    }
    if (!articleFormData.excerpt?.trim()) {
      setArticleFormError('Ringkasan/Excerpt artikel wajib diisi.');
      return;
    }

    setArticleFormSubmitting(true);
    setArticleFormError(null);

    try {
      const url = editingArticle 
        ? `/api/admin/articles/${editingArticle.id}` 
        : '/api/admin/articles';
      const method = editingArticle ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleFormData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan artikel');
      }

      showToast(editingArticle ? 'Artikel berhasil diperbarui di database SQL!' : 'Artikel baru berhasil diterbitkan ke database SQL!');
      setIsArticleFormOpen(false);
      fetchAdminData();
      onArticlesUpdated?.();
    } catch (err: any) {
      setArticleFormError(err.message);
    } finally {
      setArticleFormSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (brandFilter !== 'Semua' && p.brand !== brandFilter) return false;
    if (productSearchQuery.trim()) {
      const q = productSearchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.processor.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Articles
  const filteredArticles = articles.filter(a => {
    if (articleCategoryFilter !== 'Semua' && a.category !== articleCategoryFilter) return false;
    if (articleSearchQuery.trim()) {
      const q = articleSearchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5">
      <div className="relative w-full max-w-6xl rounded-2xl bg-[#090d16] border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 font-mono">
                MINORITY TECH ADMIN PANEL
                <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-sans">
                  @minoritytech
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-mono">
                  <Database className="w-3 h-3" /> SQLite SQL Engine
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Pusat Kontrol Database SQL: Katalog Ultrabook, Laporan QC, &amp; Artikel Blog Berkala
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Keluar dari Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        {token && (
          <div className="bg-[#0b101c] border-b border-slate-800 px-5 pt-2 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveAdminTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                activeAdminTab === 'products'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Katalog Ultrabook ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('articles')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                activeAdminTab === 'articles'
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Artikel &amp; Blog Tech Insights ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('database')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                activeAdminTab === 'database'
                  ? 'border-amber-400 text-amber-300 bg-amber-950/30 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Status Server &amp; Database SQL</span>
            </button>
          </div>
        )}

        {/* Toast Indicator */}
        {toastMessage && (
          <div className="bg-cyan-950 border-b border-cyan-500/40 px-4 py-2 text-xs text-cyan-200 font-medium flex items-center justify-between animate-in fade-in">
            <span>✓ {toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-cyan-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!token ? (
            /* LOGIN SCREEN */
            <div className="max-w-md mx-auto py-12 px-6 rounded-2xl bg-[#0f1422] border border-slate-800 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Login Admin Minority Tech</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Masukkan kredensial admin untuk mengelola katalog produk, artikel berita, dan database SQL.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 text-left text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Username Admin</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Username (default: admin)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Password (default: minoritytech2026)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
                </button>
              </form>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 text-left">
                <strong>Kredensial Default:</strong>
                <div className="mt-1 font-mono text-cyan-300">Username: <code>admin</code></div>
                <div className="font-mono text-cyan-300">Password: <code>minoritytech2026</code></div>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED TABS */
            <>
              {/* TAB 1: PRODUCTS MANAGEMENT */}
              {activeAdminTab === 'products' && (
                <div className="space-y-5">
                  {/* Stats Overview */}
                  {stats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-4 rounded-xl bg-[#0e1322] border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Unit di Database SQL</span>
                          <Package className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white font-mono">
                          {stats.totalProducts}
                        </div>
                        <div className="text-[11px] text-emerald-400">
                          {stats.inStockCount} Ready • {stats.outOfStockCount} Habis
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1322] border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Nilai Inventaris Ready</span>
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
                          Rp {(stats.totalInventoryValue / 1000000).toFixed(1)} Jt
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Unit aktif yang siap dikirim
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1322] border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Rata-Rata Baterai</span>
                          <BatteryCharging className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-white font-mono">
                          {stats.avgBatteryHealth}%
                        </div>
                        <div className="text-[11px] text-cyan-300">
                          Standar Lab Minority Tech &gt; 85%
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0e1322] border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400 flex items-center justify-between">
                          <span>Rata-Rata Skor QC</span>
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="text-2xl font-extrabold text-amber-400 font-mono">
                          {stats.avgQcScore}/100
                        </div>
                        <div className="text-[11px] text-emerald-400">
                          Lolos 28 Titik Inspeksi Lab
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0e1322] border border-slate-800">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={productSearchQuery}
                          onChange={(e) => setProductSearchQuery(e.target.value)}
                          placeholder="Cari laptop di database SQL..."
                          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Semua">Semua Brand</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="ASUS">ASUS</option>
                        <option value="HP">HP</option>
                        <option value="Microsoft">Microsoft</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleResetStock}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Reset ke katalog awal"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Default</span>
                      </button>

                      <button
                        onClick={handleOpenCreateProduct}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Produk Baru</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Table */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#0c101c]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-3">Produk &amp; Gambar</th>
                            <th className="py-3 px-3">Grade &amp; Baterai</th>
                            <th className="py-3 px-3">Spesifikasi Kunci</th>
                            <th className="py-3 px-3">Harga (IDR)</th>
                            <th className="py-3 px-3">Status Stok</th>
                            <th className="py-3 px-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850">
                          {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                              {/* Title & Image */}
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={p.heroImage}
                                    alt=""
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                                  />
                                  <div>
                                    <div className="font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1">
                                      {p.title}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono">
                                      ID: #{p.id} • {p.brand}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Grade & Battery */}
                              <td className="py-3 px-3">
                                <div className="space-y-0.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    p.conditionGrade === 'Grade A+' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                  }`}>
                                    {p.conditionGrade}
                                  </span>
                                  <div className="text-[11px] text-slate-300 font-mono mt-1">
                                    Batre: <strong className="text-emerald-400">{p.batteryHealth}%</strong> ({p.batteryCycle} cyc)
                                  </div>
                                </div>
                              </td>

                              {/* Specs */}
                              <td className="py-3 px-3 max-w-xs">
                                <div className="text-slate-300 truncate" title={p.processor}>
                                  {p.processor}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {p.ram} • {p.storage} • {p.weightKg}kg
                                </div>
                              </td>

                              {/* Price */}
                              <td className="py-3 px-3 font-mono">
                                <div className="text-white font-bold">
                                  Rp {p.price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-[10px] text-slate-500 line-through">
                                  MSRP: Rp {p.originalPrice.toLocaleString('id-ID')}
                                </div>
                              </td>

                              {/* Stock Status Toggle */}
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => handleToggleStock(p)}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
                                    p.inStock
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900/80'
                                      : 'bg-rose-950/80 text-rose-300 border border-rose-700/60 hover:bg-rose-900/80'
                                  }`}
                                  title="Klik untuk ubah status stok"
                                >
                                  {p.inStock ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                      <span>Ready Stock</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-3 h-3 text-rose-400" />
                                      <span>Sold Out</span>
                                    </>
                                  )}
                                </button>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditProduct(p)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                    title="Edit Spesifikasi & QC"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id, p.title)}
                                    className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-400 hover:text-rose-200 transition-colors"
                                    title="Hapus Produk"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {filteredProducts.length === 0 && (
                      <div className="py-12 text-center text-slate-500 text-xs">
                        Tidak ada produk yang cocok dengan pencarian.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ARTICLES & BLOG MANAGEMENT */}
              {activeAdminTab === 'articles' && (
                <div className="space-y-5">
                  {/* Articles Header Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0e1322] border border-slate-800">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={articleSearchQuery}
                          onChange={(e) => setArticleSearchQuery(e.target.value)}
                          placeholder="Cari artikel, penulis, atau tag..."
                          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <select
                        value={articleCategoryFilter}
                        onChange={(e) => setArticleCategoryFilter(e.target.value)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-emerald-400"
                      >
                        <option value="Semua">Semua Kategori</option>
                        <option value="Review Mendalam">Review Mendalam</option>
                        <option value="Komparasi">Komparasi</option>
                        <option value="Panduan Beli">Panduan Beli</option>
                        <option value="Tech Insights">Tech Insights</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleResetArticles}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        title="Reset artikel ke data awal"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Default</span>
                      </button>

                      <button
                        onClick={handleOpenCreateArticle}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tulis Artikel Baru</span>
                      </button>
                    </div>
                  </div>

                  {/* Articles Table */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#0c101c]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-3">Artikel &amp; Cover</th>
                            <th className="py-3 px-3">Kategori &amp; Score</th>
                            <th className="py-3 px-3">Penulis &amp; Tanggal</th>
                            <th className="py-3 px-3">Produk Tertaut</th>
                            <th className="py-3 px-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850">
                          {filteredArticles.map((art) => {
                            const relatedProd = products.find(p => p.id === art.relatedProductId);
                            return (
                              <tr key={art.id} className="hover:bg-slate-900/40 transition-colors">
                                {/* Title & Cover */}
                                <td className="py-3 px-3 max-w-sm">
                                  <div className="flex items-start gap-3">
                                    <img
                                      src={art.coverImage}
                                      alt=""
                                      className="w-14 h-11 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                                    />
                                    <div>
                                      <div className="font-bold text-white hover:text-emerald-300 transition-colors line-clamp-1 leading-snug">
                                        {art.title}
                                      </div>
                                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                        {art.excerpt}
                                      </div>
                                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                        Slug: /{art.slug}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* Category & Score */}
                                <td className="py-3 px-3">
                                  <div className="space-y-1">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 inline-block">
                                      {art.category}
                                    </span>
                                    {art.verdictScore && (
                                      <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>{art.verdictScore}/10</span>
                                      </div>
                                    )}
                                  </div>
                                </td>

                                {/* Author & Date */}
                                <td className="py-3 px-3">
                                  <div className="text-slate-300 font-medium">
                                    {art.author}
                                  </div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Calendar className="w-3 h-3" />
                                    <span>{art.date}</span>
                                    <span>•</span>
                                    <Clock className="w-3 h-3 text-cyan-400" />
                                    <span className="text-cyan-400">{art.readTime}</span>
                                  </div>
                                </td>

                                {/* Related Product */}
                                <td className="py-3 px-3">
                                  {relatedProd ? (
                                    <div className="text-[11px] text-cyan-300 flex items-center gap-1.5 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/40">
                                      <Laptop className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                      <span className="truncate max-w-[140px]">{relatedProd.title}</span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-500 text-[11px]">-</span>
                                  )}
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleOpenEditArticle(art)}
                                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                      title="Edit Artikel"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteArticle(art.id, art.title)}
                                      className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-400 hover:text-rose-200 transition-colors"
                                      title="Hapus Artikel"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {filteredArticles.length === 0 && (
                      <div className="py-12 text-center text-slate-500 text-xs">
                        Belum ada artikel pada kategori ini. Klik "Tulis Artikel Baru" untuk mempublikasikan artikel pertama!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SQL DATABASE & SERVER HOSTING STATUS */}
              {activeAdminTab === 'database' && (
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-[#0e1322] border border-cyan-500/40 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-mono">
                          STATUS RELATIONAL SQL DATABASE
                        </h4>
                        <p className="text-xs text-slate-400">
                          Sistem database SQL persisten siap hosting di VPS, Docker, Railway, Render, atau Cloud Run.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400">Database Engine</div>
                        <div className="text-sm font-bold text-white font-mono">
                          SQLite 3 (sql.js WebAssembly)
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          ✓ Portabel 100% tanpa kompilasi C++ gyp
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400">Lokasi File Penyimpanan</div>
                        <div className="text-xs font-bold text-cyan-300 font-mono truncate">
                          {stats?.dbFilePath || '/data/minoritytech.sqlite'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          File binary SQLite 3 standar
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400">Total Baris / Records Terdaftar</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono">
                          {products.length} Produk • {articles.length} Artikel
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Sinkron otomatis ke disk setiap aksi CRUD
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-300">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>🚀 Panduan Hosting di Server Produksi:</span>
                      </div>
                      <ol className="list-decimal pl-5 space-y-2 leading-relaxed text-slate-400">
                        <li>
                          <strong className="text-slate-200">Menjalankan di VPS / Ubuntu Server:</strong>
                          <div className="mt-1 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-cyan-300">
                            git clone &lt;repo&gt; &amp;&amp; npm install &amp;&amp; npm run build &amp;&amp; NODE_ENV=production npm start
                          </div>
                        </li>
                        <li>
                          <strong className="text-slate-200">Docker &amp; Persistent Volume:</strong> Mount folder <code className="text-cyan-300">/data</code> ke host disk (<code className="text-cyan-300">-v ./data:/data</code>) agar seluruh perubahan produk dan artikel tetap aman saat container restart.
                        </li>
                        <li>
                          <strong className="text-slate-200">Google Gemini API:</strong> Cukup definisikan environment variable <code className="text-cyan-300">GEMINI_API_KEY</code> pada server untuk mengaktifkan AI Product Matcher dan AI Chat Consultant cerdas.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODAL 1: PRODUCT CREATE / EDIT FORM */}
      {isProductFormOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0c101c] border border-cyan-500/50 shadow-2xl shadow-cyan-950/80 max-h-[90vh] overflow-y-auto p-5 sm:p-7 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>{editingProduct ? 'Edit Ultrabook & QC Report' : 'Tambah Ultrabook Baru ke Database SQL'}</span>
              </h3>
              <button
                onClick={() => setIsProductFormOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {productFormError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{productFormError}</span>
              </div>
            )}

            <form onSubmit={handleProductFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Judul / Model Laptop *</label>
                  <input
                    type="text"
                    value={productFormData.title || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                    placeholder="Contoh: Lenovo ThinkPad X1 Carbon Gen 9"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Brand</label>
                  <select
                    value={productFormData.brand || 'Lenovo'}
                    onChange={(e) => setProductFormData({ ...productFormData, brand: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Lenovo">Lenovo</option>
                    <option value="Apple">Apple</option>
                    <option value="Dell">Dell</option>
                    <option value="ASUS">ASUS</option>
                    <option value="HP">HP</option>
                    <option value="Microsoft">Microsoft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Harga Jual (IDR) *</label>
                  <input
                    type="number"
                    value={productFormData.price || 0}
                    onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">MSRP Retail Baru</label>
                  <input
                    type="number"
                    value={productFormData.originalPrice || 0}
                    onChange={(e) => setProductFormData({ ...productFormData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kondisi Fisik</label>
                  <select
                    value={productFormData.conditionGrade || 'Grade A+'}
                    onChange={(e) => setProductFormData({ ...productFormData, conditionGrade: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Grade A+">Grade A+ (98% Mulus)</option>
                    <option value="Grade A">Grade A (95% Mulus)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status Stok</label>
                  <select
                    value={productFormData.inStock ? 'true' : 'false'}
                    onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="true">Ready Stock</option>
                    <option value="false">Habis / Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Prosesor (CPU)</label>
                  <input
                    type="text"
                    value={productFormData.processor || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, processor: e.target.value })}
                    placeholder="Intel Core i7-1165G7 / Ryzen 7"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Memory (RAM)</label>
                  <input
                    type="text"
                    value={productFormData.ram || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, ram: e.target.value })}
                    placeholder="16GB LPDDR4x"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Storage (SSD)</label>
                  <input
                    type="text"
                    value={productFormData.storage || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, storage: e.target.value })}
                    placeholder="512GB NVMe SSD"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Layar &amp; Resolusi</label>
                  <input
                    type="text"
                    value={productFormData.display || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, display: e.target.value })}
                    placeholder={'14" FHD IPS Anti-Glare 400 nits'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Baterai Health (%) &amp; Cycle</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={productFormData.batteryHealth || 95}
                      onChange={(e) => setProductFormData({ ...productFormData, batteryHealth: Number(e.target.value) })}
                      placeholder="Health %"
                      className="w-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                    <input
                      type="number"
                      value={productFormData.batteryCycle || 120}
                      onChange={(e) => setProductFormData({ ...productFormData, batteryCycle: Number(e.target.value) })}
                      placeholder="Cycle"
                      className="w-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Bobot (Kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productFormData.weightKg || 1.2}
                    onChange={(e) => setProductFormData({ ...productFormData, weightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">URL Foto Produk</label>
                <input
                  type="text"
                  value={productFormData.heroImage || ''}
                  onChange={(e) => setProductFormData({ ...productFormData, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* 28-Point QC Report */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sertifikat &amp; Laporan Uji 28-Titik QC</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-0.5">Skor Inspeksi (0-100)</label>
                    <input
                      type="number"
                      value={productFormData.inspectionScore || 98}
                      onChange={(e) => setProductFormData({ ...productFormData, inspectionScore: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-0.5">Kesehatan SSD (CrystalDisk %)</label>
                    <input
                      type="number"
                      value={productFormData.inspectionReport?.ssdHealth || 99}
                      onChange={(e) => setProductFormData({
                        ...productFormData,
                        inspectionReport: { ...productFormData.inspectionReport!, ssdHealth: Number(e.target.value) },
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-0.5">Uji Suhu Stres Test</label>
                    <input
                      type="text"
                      value={productFormData.inspectionReport?.thermalUnderLoad || '68°C Max (Cinebench)'}
                      onChange={(e) => setProductFormData({
                        ...productFormData,
                        inspectionReport: { ...productFormData.inspectionReport!, thermalUnderLoad: e.target.value },
                      })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={productFormSubmitting}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-950 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{productFormSubmitting ? 'Menyimpan ke SQL...' : 'Simpan ke Database SQL'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ARTICLE CREATE / EDIT FORM */}
      {isArticleFormOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0c101c] border border-emerald-500/50 shadow-2xl shadow-emerald-950/80 max-h-[90vh] overflow-y-auto p-5 sm:p-7 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{editingArticle ? 'Edit Artikel & Ulasan Tech' : 'Tulis Artikel & Blog Baru (Database SQL)'}</span>
              </h3>
              <button
                onClick={() => setIsArticleFormOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {articleFormError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{articleFormError}</span>
              </div>
            )}

            <form onSubmit={handleArticleFormSubmit} className="space-y-4 text-xs">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Judul Artikel *</label>
                  <input
                    type="text"
                    value={articleFormData.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setArticleFormData({ ...articleFormData, title, slug: editingArticle ? articleFormData.slug : slug });
                    }}
                    placeholder="Contoh: Review Mendalam: ThinkPad X1 Carbon Gen 9 di 2026..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kategori Artikel</label>
                  <select
                    value={articleFormData.category || 'Review Mendalam'}
                    onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Review Mendalam">Review Mendalam</option>
                    <option value="Komparasi">Komparasi</option>
                    <option value="Panduan Beli">Panduan Beli</option>
                    <option value="Tech Insights">Tech Insights</option>
                  </select>
                </div>
              </div>

              {/* Author, Date, Read Time, Verdict Score */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Penulis (Author)</label>
                  <input
                    type="text"
                    value={articleFormData.author || ''}
                    onChange={(e) => setArticleFormData({ ...articleFormData, author: e.target.value })}
                    placeholder="Ilham Rizky (Tech Editor)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tanggal Rilis</label>
                  <input
                    type="text"
                    value={articleFormData.date || ''}
                    onChange={(e) => setArticleFormData({ ...articleFormData, date: e.target.value })}
                    placeholder="24 Oktober 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Estimasi Baca</label>
                  <input
                    type="text"
                    value={articleFormData.readTime || ''}
                    onChange={(e) => setArticleFormData({ ...articleFormData, readTime: e.target.value })}
                    placeholder="6 menit baca"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Skor Rating (0-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={articleFormData.verdictScore || 9.0}
                    onChange={(e) => setArticleFormData({ ...articleFormData, verdictScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              {/* Related Product Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tautkan Produk dari Katalog (Opsional)</label>
                  <select
                    value={articleFormData.relatedProductId || ''}
                    onChange={(e) => setArticleFormData({ ...articleFormData, relatedProductId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="">-- Tidak Ada Produk Tertaut --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} (Rp {p.price.toLocaleString('id-ID')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Custom URL Slug</label>
                  <input
                    type="text"
                    value={articleFormData.slug || ''}
                    onChange={(e) => setArticleFormData({ ...articleFormData, slug: e.target.value })}
                    placeholder="review-thinkpad-x1-carbon-gen-9"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">URL Foto Sampul (Cover Image)</label>
                <input
                  type="text"
                  value={articleFormData.coverImage || ''}
                  onChange={(e) => setArticleFormData({ ...articleFormData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ringkasan Singkat (Excerpt) *</label>
                <textarea
                  rows={2}
                  value={articleFormData.excerpt || ''}
                  onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                  placeholder="Ringkasan 2-3 kalimat menarik yang muncul pada kartu artikel..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Isi Artikel Lengkap (Markdown didukung) *</label>
                <textarea
                  rows={7}
                  value={articleFormData.content || ''}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  placeholder="Tulis ulasan mendalam, poin-poin benchmark, pengujian lab, dan rekomendasi pembelian di sini..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-mono text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Pros & Cons Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                {/* Pros */}
                <div className="space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kelebihan (Pros)</span>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={proInput}
                      onChange={(e) => setProInput(e.target.value)}
                      placeholder="Tambah poin kelebihan..."
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (proInput.trim()) {
                            setArticleFormData({
                              ...articleFormData,
                              pros: [...(articleFormData.pros || []), proInput.trim()],
                            });
                            setProInput('');
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (proInput.trim()) {
                          setArticleFormData({
                            ...articleFormData,
                            pros: [...(articleFormData.pros || []), proInput.trim()],
                          });
                          setProInput('');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(articleFormData.pros || []).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                        <span className="text-slate-300">+ {p}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setArticleFormData({
                              ...articleFormData,
                              pros: (articleFormData.pros || []).filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                  <div className="font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Kekurangan (Cons)</span>
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={conInput}
                      onChange={(e) => setConInput(e.target.value)}
                      placeholder="Tambah poin kekurangan..."
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (conInput.trim()) {
                            setArticleFormData({
                              ...articleFormData,
                              cons: [...(articleFormData.cons || []), conInput.trim()],
                            });
                            setConInput('');
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (conInput.trim()) {
                          setArticleFormData({
                            ...articleFormData,
                            cons: [...(articleFormData.cons || []), conInput.trim()],
                          });
                          setConInput('');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="space-y-1">
                    {(articleFormData.cons || []).map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                        <span className="text-slate-300">- {c}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setArticleFormData({
                              ...articleFormData,
                              cons: (articleFormData.cons || []).filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={articleFormSubmitting}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-950 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{articleFormSubmitting ? 'Menerbitkan ke SQL...' : 'Terbitkan Artikel ke SQL'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
