import React from 'react';
import { X, Scale, Trash2, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import { UltrabookProduct } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: UltrabookProduct[];
  onRemoveFromCompare: (productId: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: UltrabookProduct) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onClearAll,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0c111e] border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono">
              KOMPARASI ULTRABOOK SIDE-BY-SIDE
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {products.length} / 3 Unit
            </span>
          </div>

          <div className="flex items-center gap-2">
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-2.5 py-1 rounded-lg bg-rose-950/50 text-rose-300 hover:bg-rose-900/60 border border-rose-800/50 text-xs font-medium transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kosongkan</span>
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

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6">
          {products.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Scale className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm">Belum ada ultrabook yang dipilih untuk dibandingkan.</p>
              <p className="text-xs text-slate-500">
                Centang ikon timbangan (Bandingkan) pada kartu produk di katalog untuk membandingkan spesifikasi.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
              >
                Kembali ke Katalog
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="py-3 px-3 text-slate-400 font-mono uppercase w-36 bg-slate-900/40">
                      Parameter
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="py-3 px-4 min-w-[240px] align-top">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {p.conditionGrade}
                          </span>
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Hapus dari perbandingan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="h-28 w-full rounded-lg overflow-hidden bg-slate-950 mb-2 border border-slate-800">
                          <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 
                          onClick={() => onSelectProduct(p)}
                          className="font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer text-sm line-clamp-1"
                        >
                          {p.title}
                        </h4>
                        <div className="mt-1 text-base font-extrabold text-cyan-400 font-mono">
                          Rp {p.price.toLocaleString('id-ID')}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {/* Battery Health */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Baterai Health &amp; Cycle
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200">
                        <span className="font-bold text-emerald-400">{p.batteryHealth}%</span>{' '}
                        <span className="text-slate-500">({p.batteryCycle} Cycle)</span>
                      </td>
                    ))}
                  </tr>

                  {/* Processor */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Prosesor (CPU)
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200 font-semibold">
                        {p.processor}
                      </td>
                    ))}
                  </tr>

                  {/* RAM */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Memory (RAM)
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200">
                        {p.ram}
                      </td>
                    ))}
                  </tr>

                  {/* Storage */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Storage SSD
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200">
                        {p.storage}
                      </td>
                    ))}
                  </tr>

                  {/* Display */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Layar &amp; Panel
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200">
                        {p.display}
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Bobot Laptop
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-200 font-mono">
                        {p.weightKg} kg
                      </td>
                    ))}
                  </tr>

                  {/* Benchmark */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Cinebench R23 Score
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-cyan-300 font-mono font-bold">
                        {p.cinebenchR23Score ? `${p.cinebenchR23Score} Pts` : '-'}
                      </td>
                    ))}
                  </tr>

                  {/* QC Score */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Skor Inspeksi QC
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-emerald-400 font-bold">
                        {p.inspectionScore}/100 PASSED
                      </td>
                    ))}
                  </tr>

                  {/* Suitable For */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Rekomendasi Pemakai
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-4 text-slate-300">
                        {p.suitableFor.join(', ')}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="py-4 px-3 text-slate-400 font-medium bg-slate-900/30">
                      Aksi Cepat
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-4 px-4 space-y-2">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="w-full py-2 px-3 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-semibold transition-all"
                        >
                          Detail &amp; Sertifikat QC
                        </button>
                        <a
                          href={p.affiliateLinks.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pesan via WA</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
