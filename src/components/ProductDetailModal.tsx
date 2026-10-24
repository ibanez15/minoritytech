import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  BatteryCharging, 
  Thermometer, 
  HardDrive, 
  Cpu, 
  Layers, 
  Monitor, 
  Scale, 
  ExternalLink, 
  MessageCircle, 
  Share2,
  Calendar,
  UserCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { UltrabookProduct } from '../types';

interface ProductDetailModalProps {
  product: UltrabookProduct | null;
  onClose: () => void;
  isCompared: boolean;
  onToggleCompare: (product: UltrabookProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isCompared,
  onToggleCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'qc' | 'specs' | 'garansi'>('qc');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0c111e] border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-mono">
              VERIFIED QC CERTIFICATE
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Unit ID: #{product.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              title="Bagikan Unit"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Tersalin!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top Row: Gallery & Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery (Left - 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative h-64 sm:h-72 w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800">
                <img
                  src={product.galleryImages[activeImageIndex] || product.heroImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold bg-emerald-500 text-slate-950">
                  {product.conditionGrade}
                </div>
              </div>

              {/* Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Trust Check Pill */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Status BIOS / MDM:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Clean / Bebas Lock
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Garansi Toko:</span>
                  <span className="text-cyan-400 font-semibold">1 Tahun Hardware</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Ganti Unit:</span>
                  <span className="text-slate-200 font-semibold">30 Hari Garansi Retur</span>
                </div>
              </div>
            </div>

            {/* Info & Buy Box (Right - 7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-semibold">
                  {product.brand} • {product.modelSeries}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {product.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-xs text-slate-400">Harga Minority Tech:</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 line-through">
                      MSRP Baru: Rp {product.originalPrice.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      Hemat Rp {(product.originalPrice - product.price).toLocaleString('id-ID')} ({discountPercent}%)
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-300">Keunggulan Utama:</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={product.affiliateLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp CS</span>
                  </a>

                  <button
                    onClick={() => onToggleCompare(product)}
                    className={`w-full sm:w-auto py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isCompared
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isCompared ? 'Sedang Dibandingkan' : 'Bandingkan'}</span>
                  </button>
                </div>

                {/* Marketplace Affiliate Links */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={product.affiliateLinks.tokopedia}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Beli di Tokopedia</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={product.affiliateLinks.shopee}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Beli di Shopee</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: QC Report vs Full Specs vs Garansi */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('qc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'qc'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Laporan 28-Titik QC (Hardware Lab)
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                Spesifikasi Lengkap
              </button>

              <button
                onClick={() => setActiveTab('garansi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'garansi'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Ketentuan Garansi 1 Tahun
              </button>
            </div>

            {/* TAB CONTENT: QC REPORT */}
            {activeTab === 'qc' && (
              <div className="pt-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>Lead Teknisi: <strong className="text-white">{product.inspectionReport.technician}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>Diinspeksi pada: {product.inspectionReport.date}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                    Skor QC: {product.inspectionScore}/100 PASSED
                  </div>
                </div>

                {/* Hardware Stress Test Diagnostic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                      <span>Kesehatan NVMe SSD</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      {product.inspectionReport.ssdHealth}% (CrystalDiskInfo)
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1">Status: Good / Bebas Bad Sector</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                      <span>Uji Suhu Stress Test</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono truncate" title={product.inspectionReport.thermalUnderLoad}>
                      {product.inspectionReport.thermalUnderLoad}
                    </div>
                    <div className="text-[11px] text-cyan-400 mt-1">Fresh Thermal Grease Repasted</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Baterai &amp; Siklus Daya</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      {product.batteryHealth}% ({product.batteryCycle} Cycle)
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1">Daya tahan teruji 8-12 Jam</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Monitor className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kondisi Layar</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono truncate">
                      {product.inspectionReport.screenTest}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1">Zero Dead Pixel Verified</div>
                  </div>
                </div>

                {/* Detailed Checklist Table */}
                <div className="rounded-xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                      <tr>
                        <th className="py-2.5 px-3">Komponen / Fitur</th>
                        <th className="py-2.5 px-3">Kategori</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Catatan Teknisi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 bg-[#090d16]">
                      {product.inspectionReport.checkItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="py-2.5 px-3 text-white font-medium">{item.name}</td>
                          <td className="py-2.5 px-3 text-slate-400">{item.category}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800/80">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-300">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SPECS */}
            {activeTab === 'specs' && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Prosesor (CPU)</div>
                  <div className="text-white font-semibold">{product.processor}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Memory (RAM)</div>
                  <div className="text-white font-semibold">{product.ram}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Storage (SSD)</div>
                  <div className="text-white font-semibold">{product.storage}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Layar &amp; Resolusi</div>
                  <div className="text-white font-semibold">{product.display}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Kartu Grafis (GPU)</div>
                  <div className="text-white font-semibold">{product.gpu}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Bobot Laptop</div>
                  <div className="text-white font-semibold font-mono">{product.weightKg} kg (Sangat Ringan)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 sm:col-span-2">
                  <div className="text-slate-400">Port &amp; Konektivitas Lengkap</div>
                  <div className="text-white font-semibold flex flex-wrap gap-1.5 mt-1">
                    {product.keyPorts.map((port, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] border border-slate-700">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GARANSI */}
            {activeTab === 'garansi' && (
              <div className="pt-4 space-y-3 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    Cakupan Garansi Resmi Minority Tech
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                    <li><strong>30 Hari Ganti Unit (Retur Bebas Khawatir)</strong>: Jika terdapat cacat fungsi hardware dalam 30 hari pertama sejak barang diterima, kami ganti unit setara tanpa dipungut biaya.</li>
                    <li><strong>1 Tahun Garansi Hardware &amp; Servis</strong>: Meliputi perbaikan motherboard, keyboard, layar, dan suku cadang orisinal.</li>
                    <li><strong>Gratis Maintenance Selamanya</strong>: Pembersihan debu kipas, pengecekan berkala, dan repasting thermal paste gratis selamanya di workshop kami.</li>
                    <li><strong>Dukungan Remote &amp; Konsultasi Software</strong>: Panduan setup Linux/Windows, driver instalasi, dan optimasi performa.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
