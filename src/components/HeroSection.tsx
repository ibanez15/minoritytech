import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  BatteryCharging, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal,
  Flame,
  Loader2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { UltrabookProduct, MatchResponse } from '../types';

interface HeroSectionProps {
  products: UltrabookProduct[];
  onSelectProduct: (product: UltrabookProduct) => void;
  onExploreCatalog: () => void;
}

const PRESET_QUERIES = [
  { label: '👨‍💻 Coding & Docker (Budget 10 Juta)', query: 'Rekomendasi laptop coding backend docker budget 10 jutaan, RAM 16GB, keyboard empuk tahan banting' },
  { label: '🎨 Desain & Layar Akurat OLED', query: 'Ultrabook untuk desain grafis dan editing video dengan layar akurat OLED / Retina 100% sRGB' },
  { label: '🎓 Mahasiswa Baterai 12 Jam Ringan', query: 'Laptop mahasiswa skripsi ringan di bawah 1.3 kg, baterai tahan 12 jam tanpa repot bawa charger' },
  { label: '💼 Eksekutif Tipis < 1.2 Kg', query: 'Ultrabook premium tipis bahan carbon atau CNC aluminium mewah untuk meeting klien dan presentasi' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  onSelectProduct,
  onExploreCatalog,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearchMatch = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;
    setLoading(true);
    setErrorMsg(null);
    setQuery(q);

    try {
      const response = await fetch('/api/gemini/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan rekomendasi AI');
      }

      const data: MatchResponse = await response.json();
      setMatchResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Gagal memproses rekomendasi AI. Mencoba pencarian katalog manual...');
      
      // Fallback matching
      const qLow = q.toLowerCase();
      const matched = products
        .filter(p => 
          p.title.toLowerCase().includes(qLow) ||
          p.description.toLowerCase().includes(qLow) ||
          p.suitableFor.some(s => s.toLowerCase().includes(qLow))
        )
        .slice(0, 3)
        .map(p => ({
          productId: p.id,
          matchScore: 92,
          reason: `Pilihan teruji untuk kebutuhan Anda: grade ${p.conditionGrade} dengan kesehatan baterai ${p.batteryHealth}%.`,
          bestFitAspects: p.highlights.slice(0, 2),
        }));

      setMatchResult({
        query: q,
        summary: `Hasil pencarian cerdas katalog untuk "${q}":`,
        recommendations: matched.length > 0 ? matched : [
          {
            productId: products[0].id,
            matchScore: 95,
            reason: 'Salah satu ultrabook paling seimbang dan serbaguna di katalog kami.',
            bestFitAspects: products[0].highlights.slice(0, 2),
          }
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: string): UltrabookProduct | undefined => {
    return products.find(p => p.id === id);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 border-b border-slate-800/80 cyber-grid-bg">
      {/* Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-emerald-500/10 to-blue-600/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 tracking-wide cyber-glow-cyan">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI-POWERED ULTRABOOK SELECTION
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Bergaransi 1 Tahun &amp; 30 Hari Tukar Unit
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Ultrabook Bisnis Idaman.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Performa Maksimal, Harga 1/3 Baru.
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kurasi ketat ThinkPad, MacBook, Dell XPS, &amp; ZenBook bekas Grade A+ yang telah lolos <strong className="text-white font-semibold">28-Point QC Inspection</strong>, bebas BIOS/iCloud lock, dan thermal paste baru.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8 text-left">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <div className="text-cyan-400 font-mono text-xl font-bold">28 Titik</div>
              <div className="text-xs text-slate-400">QC Lab Inspection</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <div className="text-emerald-400 font-mono text-xl font-bold">1 Tahun</div>
              <div className="text-xs text-slate-400">Garansi Sparepart</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <div className="text-blue-400 font-mono text-xl font-bold">&gt; 90%</div>
              <div className="text-xs text-slate-400">Battery Health Prima</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <div className="text-amber-400 font-mono text-xl font-bold">0% Lock</div>
              <div className="text-xs text-slate-400">Clean BIOS &amp; MDM</div>
            </div>
          </div>
        </div>

        {/* AI Product Match Finder Box */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-[#0c111d]/90 border border-cyan-500/40 p-4 sm:p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl cyber-glow-cyan">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                    AI PRODUCT MATCH FINDER
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-600/40 px-1.5 py-0.2 rounded font-sans font-medium">
                      Gemini 3.8
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ketik kebutuhan, budget, atau software kerja Anda — AI kami akan mencocokkan ultrabook paling tepat.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchMatch(query);
              }}
              className="relative flex flex-col sm:flex-row items-stretch gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Misal: Butuh laptop coding backend docker budget 10 jutaan batre tahan lama..."
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Cari Match AI</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Preset Queries */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block mb-2">
                Pencarian Cepat Populer:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_QUERIES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSearchMatch(preset.query)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-750 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
                  >
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Match Results Display */}
        {matchResult && (
          <div className="mt-8 max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0b101d] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-600/50">
                    HASIL ANALISIS AI GEMINI
                  </span>
                  <span className="text-xs text-slate-400">
                    Kebutuhan: &quot;{matchResult.query}&quot;
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed font-medium">
                  {matchResult.summary}
                </p>
              </div>
              <button
                onClick={() => setMatchResult(null)}
                className="text-xs text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors"
                title="Tutup Hasil"
              >
                ✕
              </button>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchResult.recommendations.map((rec) => {
                const prod = getProductById(rec.productId);
                if (!prod) return null;

                return (
                  <div
                    key={rec.productId}
                    className="flex flex-col rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-cyan-950/40"
                  >
                    {/* Header Image & Match Badge */}
                    <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={prod.heroImage}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                      
                      {/* Match Score Badge */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold font-mono shadow-md flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{rec.matchScore}% MATCH</span>
                      </div>

                      {/* Condition Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                        {prod.conditionGrade}
                      </div>

                      {/* Battery Health in image */}
                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                        <BatteryCharging className="w-3 h-3" />
                        <span>Baterai: {prod.batteryHealth}%</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold">
                          {prod.brand} • {prod.modelSeries}
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {prod.title}
                        </h4>
                        
                        {/* Price */}
                        <div className="mt-1.5 flex items-baseline gap-2">
                          <span className="text-base font-bold text-white font-mono">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-xs text-slate-500 line-through">
                            Rp {prod.originalPrice.toLocaleString('id-ID')}
                          </span>
                        </div>

                        {/* AI Match Reason */}
                        <div className="mt-2.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200/90 leading-snug">
                          <strong className="text-cyan-300 block mb-0.5">Kenapa Cocok:</strong>
                          {rec.reason}
                        </div>

                        {/* Best Fit Aspects */}
                        <ul className="mt-2 space-y-1">
                          {rec.bestFitAspects?.map((aspect, i) => (
                            <li key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="line-clamp-1">{aspect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 flex items-center gap-2 border-t border-slate-800">
                        <button
                          onClick={() => onSelectProduct(prod)}
                          className="flex-1 py-2 px-3 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                        >
                          Lihat QC &amp; Detail
                        </button>
                        <a
                          href={prod.affiliateLinks.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
                          title="Pesan via WhatsApp"
                        >
                          Pesan
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                <span>Lihat Seluruh Koleksi di Katalog Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
