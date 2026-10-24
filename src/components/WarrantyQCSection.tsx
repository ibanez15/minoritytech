import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  RotateCcw, 
  Cpu, 
  Thermometer, 
  BatteryCharging, 
  Monitor, 
  Lock, 
  Award, 
  Headphones,
  FileCheck
} from 'lucide-react';

export const WarrantyQCSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hardware' | 'layar' | 'baterai' | 'keamanan'>('all');

  const inspectionPoints = [
    { cat: 'keamanan', title: 'BIOS & MDM Freedom Check', desc: '100% Bebas password supervisor BIOS, Computrace disabled, iCloud logout & non-MDM corporate profile lock.' },
    { cat: 'hardware', title: 'Motherboard VRM & Circuit Audit', desc: 'Pengecekan tidak ada korosi, tidak ada bekas servis solder kasar, jalur power delivery stabil.' },
    { cat: 'hardware', title: 'SSD Health via CrystalDiskInfo', desc: 'Hanya unit dengan kesehatan SSD minimal 90% ke atas tanpa bad-sector dan waktu pakai wajar yang lolos kurasi.' },
    { cat: 'hardware', title: 'Keyboard 100% Key-Travel & Backlit', desc: 'Setiap tombol diuji responsivitasnya, key-travel empuk khas ultrabook bisnis, lampu backlit 2-tingkat menyala merata.' },
    { cat: 'layar', title: 'Zero Dead Pixel & Zero White Spot', desc: 'Panel diinspeksi menggunakan background solid 5-warna penuh di ruang gelap untuk menjamin tidak ada bintik putih atau garis.' },
    { cat: 'layar', title: 'Backlight Uniformity & True-Tone/Nits', desc: 'Pengukuran kecerahan 300-500 nits stabil dan engsel hinge kuat tidak goyang saat mengetik di pangkuan.' },
    { cat: 'baterai', title: 'Battery Wear Level & Actual Discharge', desc: 'Baterai diuji streaming video dan kompilasi selama 2 jam untuk memastikan tidak drop mendadak di bawah 30%.' },
    { cat: 'baterai', title: 'RapidCharge & USB-C Power Delivery', desc: 'Mendukung pengisian cepat 45W-65W standar Type-C / MagSafe dengan charger original.' },
    { cat: 'hardware', title: 'Thermal Repaste & Cleaning Fan', desc: 'Setiap unit dibongkar, dibersihkan dari debu mikro, dan diaplikasikan pasta termal premium kelas enthusiast (Thermal Grizzly).' },
    { cat: 'hardware', title: 'I/O Ports & Thunderbolt Output', desc: 'Semua port USB-A, Type-C, HDMI, audio jack, dan card reader diuji transfer data dan display 4K eksternal.' },
    { cat: 'keamanan', title: 'Windows Hello IR Camera & Fingerprint', desc: 'Kamera inframerah pengenal wajah dan sensor sidik jari diuji buka kunci instan di bawah 0.5 detik.' },
    { cat: 'hardware', title: 'Dolby Audio & Quad Array Microphone', desc: 'Speaker stereo bebas kresek saat volume 100% dan mikrofon peredam bising jernih untuk Zoom / Google Meet.' },
  ];

  const filteredPoints = activeCategory === 'all'
    ? inspectionPoints
    : inspectionPoints.filter(p => p.cat === activeCategory);

  return (
    <section id="garansi" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/40 tracking-wide font-mono mb-3">
          <Award className="w-3.5 h-3.5" />
          STANDAR KUALITAS TANPA KOMPROMI
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Garansi 1 Tahun &amp; Protokol 28-Titik Inspeksi Lab
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Kami membuang stigma &quot;beli laptop bekas itu spekulasi&quot;. Di Minority Tech, setiap unit diperlakukan layaknya mesin baru dengan sertifikasi laboratorium hardware ketat.
        </p>
      </div>

      {/* 3 Pillar Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0c101c] border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400 transition-all">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 border border-cyan-500/30">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">30 Hari Ganti Unit</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Jika dalam 30 hari pertama Anda menemukan kendala teknis pada hardware yang tidak sesuai dengan laporan QC, kami ganti unit setara tanpa berbelit-belit.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-400 font-mono font-semibold">
            ✓ Bebas Biaya Retur
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0c101c] border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">1 Tahun Garansi Sparepart</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Jaminan perbaikan dan penggantian komponen motherboard, layar, keyboard, dan baterai selama 365 hari penuh didukung teknisi in-house Minority Tech.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono font-semibold">
            ✓ Sparepart Orisinal Dijamin
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0c101c] border border-blue-500/30 relative overflow-hidden group hover:border-blue-400 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Sertifikat QC Fisik &amp; Digital</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Setiap pesanan disertai lembar cetak hasil uji CrystalDiskInfo, suhu benchmark Cinebench R23, battery report resmi, dan tanda tangan lead QC kami.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-400 font-mono font-semibold">
            ✓ Transparansi 100%
          </div>
        </div>
      </div>

      {/* Interactive 28-Point Inspection Explorer */}
      <div className="rounded-2xl bg-[#0c111e] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Detail Titik Pemeriksaan Laboratorium
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Klik kategori di bawah untuk melihat rincian pengujian setiap komponen.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Semua (12 Utama)
            </button>
            <button
              onClick={() => setActiveCategory('keamanan')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'keamanan' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Keamanan &amp; BIOS
            </button>
            <button
              onClick={() => setActiveCategory('hardware')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'hardware' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Hardware &amp; Suhu
            </button>
            <button
              onClick={() => setActiveCategory('layar')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'layar' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Layar &amp; Panel
            </button>
            <button
              onClick={() => setActiveCategory('baterai')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'baterai' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Baterai &amp; Charger
            </button>
          </div>
        </div>

        {/* Inspection Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoints.map((pt, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-white">{pt.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pl-6">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
