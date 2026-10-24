import React from 'react';
import { 
  Laptop, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  Mail, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { MinorityTechLogo } from './MinorityTechLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#05070b] text-slate-400 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-slate-850 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Garansi 1 Tahun Penuh</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Jaminan suku cadang &amp; servis hardware langsung oleh teknisi internal.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">28-Point QC Certified</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Lolos uji stres Cinebench, CrystalDiskInfo SSD &gt;90%, dan bebas lock.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Original Ultrabook</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Bukan rekondisi atau rakitan. Khusus lini enterprise ThinkPad, XPS, Mac.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Konsultasi AI &amp; CS Ramah</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Dapatkan rekomendasi tepat sasaran sesuai workflow dan budget Anda.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Bio */}
        <div className="md:col-span-2 space-y-3">
          <MinorityTechLogo size="md" />
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Platform kurasi Premium Used Ultrabook kelas bisnis bergaransi resmi di Indonesia. Spesialis Lenovo ThinkPad, Microsoft Surface, MacBook, dan Dell XPS.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Kota Payakumbuh, Sumatera Barat (Pengiriman Seluruh Nusantara via Packing Kayu Aman)</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp Hotline: 0812-3456-7890 (Setiap Hari 09.00 - 21.00 WIB)</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <a href="https://instagram.com/minoritytech" target="_blank" rel="noreferrer" className="text-rose-400 hover:text-rose-300 font-mono">
                Instagram: @minoritytech
              </a>
            </div>
          </div>
        </div>

        {/* Lini Ultrabook */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
            Lini Populer
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#katalog" className="hover:text-cyan-300 transition-colors">Lenovo ThinkPad X1 Carbon</a></li>
            <li><a href="#katalog" className="hover:text-cyan-300 transition-colors">ThinkPad T14s AMD Ryzen</a></li>
            <li><a href="#katalog" className="hover:text-cyan-300 transition-colors">Apple MacBook Air M1 (16GB)</a></li>
            <li><a href="#katalog" className="hover:text-cyan-300 transition-colors">Dell XPS 13 InfinityEdge</a></li>
            <li><a href="#katalog" className="hover:text-cyan-300 transition-colors">ASUS ZenBook OLED</a></li>
          </ul>
        </div>

        {/* Edukasi & Review */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
            Edukasi &amp; Panduan
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#reviews" className="hover:text-emerald-300 transition-colors">Panduan Membeli Laptop Bekas</a></li>
            <li><a href="#reviews" className="hover:text-emerald-300 transition-colors">Review ThinkPad X1 Gen 9</a></li>
            <li><a href="#reviews" className="hover:text-emerald-300 transition-colors">MacBook M1 vs ThinkPad T14s</a></li>
            <li><a href="#garansi" className="hover:text-emerald-300 transition-colors">Standar 28-Titik Inspeksi</a></li>
            <li><a href="#garansi" className="hover:text-emerald-300 transition-colors">Klaim Garansi 1 Tahun</a></li>
          </ul>
        </div>

        {/* Marketplace Rekber */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
            Toko Resmi
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a href="https://tokopedia.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <span>Tokopedia Official Store</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </li>
            <li>
              <a href="https://shopee.co.id" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <span>Shopee Mall Minority Tech</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </li>
            <li>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <span>Direct WhatsApp (COD / Instant)</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <div>
          © {new Date().getFullYear()} Minority Tech. All rights reserved. Platform Kurasi Premium Used Ultrabooks &amp; Tech Hub.
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 hover:text-cyan-400 transition-colors font-mono"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
