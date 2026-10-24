import React from 'react';
import { 
  Instagram, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Package, 
  Heart, 
  Flame, 
  Sparkles, 
  MessageCircle,
  Camera
} from 'lucide-react';
import { UltrabookProduct } from '../types';

interface InstagramHighlightsProps {
  products: UltrabookProduct[];
  onSelectProduct: (product: UltrabookProduct) => void;
}

export const InstagramHighlights: React.FC<InstagramHighlightsProps> = ({
  products,
  onSelectProduct,
}) => {
  const highlights = [
    { title: 'Ready Stock', icon: '🔥', desc: 'Drop unit baru harian', tag: 'Stok Terupdate' },
    { title: '28-Point QC', icon: '🔬', desc: 'Uji CrystalDisk & suhu', tag: 'Standar Lab' },
    { title: 'Packing Kayu', icon: '📦', desc: 'Safety bubble wrap tebal', tag: 'Seluruh Indonesia' },
    { title: 'Testimoni', icon: '⭐', desc: 'Ulasan asli Tokopedia/Shopee', tag: 'Rating 4.9+' },
    { title: 'ThinkPad Tips', icon: '💡', desc: 'Setup & perawatan baterai', tag: 'Edukasi Tech' },
  ];

  const instagramPosts = [
    {
      id: 'post-1',
      title: 'Lenovo ThinkPad X1 Carbon Gen 9 Grade A+',
      caption: '🔥 NEW ARRIVAL! ThinkPad X1 Carbon Gen 9 bodi serat karbon magnesium. Layar 16:10 400 nits, keyboard terenak di dunia. Kondisi 98% mulus, Baterai 94% awet seharian. Free ongkir & packing kayu se-Indonesia! #ThinkPad #MinorityTech',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      likes: '412',
      productId: 'thinkpad-x1-carbon-gen9',
      date: '2 hari lalu',
    },
    {
      id: 'post-2',
      title: 'ThinkPad T14s Gen 2 AMD Ryzen 7 PRO (8-Core)',
      caption: '💻 Raja kompilasi coding di bawah 10 juta! Ryzen 7 PRO 5850U 8-Core 16-Thread super adem. RAM 16GB, SSD 512GB NVMe. Lolos 28-titik inspeksi QC, BIOS bersih bebas kunci. #ProgrammerLaptop #LenovoThinkPad',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      likes: '389',
      productId: 'thinkpad-t14s-gen2-amd',
      date: '3 hari lalu',
    },
    {
      id: 'post-3',
      title: 'Apple MacBook Air M1 (RAM 16GB Special Edition)',
      caption: '⚡ Jarang masuk varian 16GB Unified Memory! Fanless hening 100%, baterai tahan 14 jam. Bebas iCloud & MDM lock. Siap render video 4K dan iOS development. Garansi 1 tahun resmi Minority Tech. #MacBookAirM1',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      likes: '528',
      productId: 'macbook-air-m1-16gb',
      date: '4 hari lalu',
    },
    {
      id: 'post-4',
      title: 'Microsoft Surface Laptop 4 (3:2 Touchscreen)',
      caption: '✨ Desain elegan minimalis untuk presentasi & eksekutif. Layar sentuh PixelSense rasio 3:2 tajam, audio Omnisonic Dolby Atmos. Kondisi Grade A mulus seperti baru! #SurfaceLaptop #MinorityTech',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      likes: '295',
      productId: 'surface-laptop-4-amd',
      date: '5 hari lalu',
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      {/* Header with Instagram Official Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Instagram className="w-4 h-4" />
            <span>Official Instagram Showcase</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Galeri &amp; Daily Drops <span className="text-rose-500">@minoritytech</span>
            </h2>
            <a
              href="https://instagram.com/minoritytech"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-md shadow-pink-950 transition-all hover:scale-105"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Follow @minoritytech</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Intip unit ready stock harian, video pengujian performa, dan unboxing packing kayu langsung dari feed Instagram kami.
          </p>
        </div>

        {/* Store Trust Specs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Payakumbuh, Sumbar • Pengiriman Seluruh Nusantara</span>
        </div>
      </div>

      {/* Instagram Story Highlights Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none mb-8">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-rose-950/30">
              <div className="w-full h-full rounded-full bg-[#090d16] border-2 border-[#090d16] flex flex-col items-center justify-center text-center p-1">
                <span className="text-xl sm:text-2xl">{h.icon}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors block">
                {h.title}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                {h.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Feed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {instagramPosts.map((post) => {
          const matchedProduct = products.find(p => p.id === post.productId);

          return (
            <div
              key={post.id}
              className="group rounded-2xl bg-[#0c111d] border border-slate-800/90 hover:border-rose-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg shadow-black/60"
            >
              {/* Media Card */}
              <div>
                <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c111d] via-transparent to-black/40" />

                  {/* Header in image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 font-mono">
                      @minoritytech
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>

                  {/* Likes pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-mono bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>{post.likes} suka</span>
                  </div>
                </div>

                {/* Caption Content */}
                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {post.caption}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Diposting: {post.date}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                {matchedProduct && (
                  <button
                    onClick={() => onSelectProduct(matchedProduct)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Buka Detail Unit &amp; QC</span>
                  </button>
                )}

                <a
                  href="https://instagram.com/minoritytech"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-950/80 to-purple-950/80 hover:from-rose-900/90 hover:to-purple-900/90 text-rose-200 border border-rose-800/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lihat di Instagram</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Banner */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#131b2e] via-[#101524] to-[#1a1222] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-950/40">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Ingin Cek Video Kondisi Real-Time Unit Sebelum Beli?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              DM kami di Instagram <strong>@minoritytech</strong> atau hubungi WhatsApp untuk request video 360° fisik &amp; uji benchmark.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://instagram.com/minoritytech"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-rose-950 flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Kirim DM Instagram</span>
          </a>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20dari%20Instagram%20@minoritytech%20ingin%20tanya%20stok"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950 flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Fast Response</span>
          </a>
        </div>
      </div>
    </section>
  );
};
