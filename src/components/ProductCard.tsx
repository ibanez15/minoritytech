import React from 'react';
import { 
  BatteryCharging, 
  Cpu, 
  HardDrive, 
  Layers, 
  Monitor, 
  Weight, 
  ShieldCheck, 
  Scale, 
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { UltrabookProduct } from '../types';

interface ProductCardProps {
  product: UltrabookProduct;
  onSelect: (product: UltrabookProduct) => void;
  isCompared: boolean;
  onToggleCompare: (product: UltrabookProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isCompared,
  onToggleCompare,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#0e1320] border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 overflow-hidden">
      {/* Top Media Container */}
      <div className="relative h-52 w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.heroImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-transparent to-black/30" />

        {/* Condition Grade Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide shadow-md ${
            product.conditionGrade === 'Grade A+'
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-950/40'
              : 'bg-cyan-500 text-slate-950 shadow-cyan-950/40'
          }`}>
            {product.conditionGrade}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-sm">
            Garansi {product.warrantyMonths} Bln
          </span>
        </div>

        {/* Compare Checkbox Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs font-medium border backdrop-blur-md transition-all ${
            isCompared
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
              : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
          }`}
          title={isCompared ? 'Hapus dari perbandingan' : 'Bandingkan laptop ini'}
        >
          <Scale className="w-3.5 h-3.5" />
        </button>

        {/* Battery Health Gauge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono">
          <BatteryCharging className={`w-3.5 h-3.5 ${
            product.batteryHealth >= 90 ? 'text-emerald-400' : 'text-amber-400'
          }`} />
          <span className="text-slate-200 font-bold">Health: {product.batteryHealth}%</span>
          <span className="text-slate-500 text-[10px]">({product.batteryCycle} cyc)</span>
        </div>

        {/* Inspection Score */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
          QC {product.inspectionScore}/100
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Series */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span className="text-cyan-400 font-semibold">{product.brand}</span>
            <span>{product.modelSeries}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="mt-2.5 flex items-baseline gap-2.5">
            <span className="text-xl font-extrabold text-white font-mono">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-slate-500 line-through">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-1.5 py-0.2 rounded">
              Hemat {discountPercent}%
            </span>
          </div>

          {/* Key Specs Tags */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate" title={product.processor}>{product.processor}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate" title={product.ram}>{product.ram}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate" title={product.storage}>{product.storage}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Weight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate font-mono">{product.weightKg} kg</span>
            </div>
          </div>

          {/* Display highlight */}
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-900/40 p-1.5 rounded-lg border border-slate-800/80">
            <Monitor className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{product.display}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(product)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Detail &amp; Laporan QC</span>
            </button>

            <a
              href={product.affiliateLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-lg shadow-emerald-950/50"
              title="Pesan Langsung via WhatsApp CS"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pesan</span>
            </a>
          </div>

          {/* Affiliate Marketplace Links */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Bisa COD / Rekber:</span>
            <div className="flex items-center gap-3">
              <a
                href={product.affiliateLinks.tokopedia}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-0.5"
              >
                <span>Tokopedia</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={product.affiliateLinks.shopee}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-0.5"
              >
                <span>Shopee</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
