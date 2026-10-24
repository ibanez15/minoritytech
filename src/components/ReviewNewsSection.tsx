import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Laptop, 
  ExternalLink,
  X
} from 'lucide-react';
import { TechArticle, UltrabookProduct } from '../types';

interface ReviewNewsSectionProps {
  articles: TechArticle[];
  products: UltrabookProduct[];
  onSelectProduct: (product: UltrabookProduct) => void;
}

export const ReviewNewsSection: React.FC<ReviewNewsSectionProps> = ({
  articles,
  products,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [readingArticle, setReadingArticle] = useState<TechArticle | null>(null);

  const categories = ['Semua', 'Review Mendalam', 'Komparasi', 'Panduan Beli', 'Tech Insights'];

  const filteredArticles = selectedCategory === 'Semua'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const getRelatedProduct = (productId?: string) => {
    if (!productId) return undefined;
    return products.find(p => p.id === productId);
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Tech Insights &amp; In-Depth Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Review Mendalam &amp; Panduan Ultrabook
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Ulasan objektif, hasil pengujian benchmark lab, dan tips membeli laptop bekas berkualitas tanpa risiko.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const relatedProduct = getRelatedProduct(article.relatedProductId);

          return (
            <article
              key={article.id}
              className="flex flex-col rounded-2xl bg-[#0e1320] border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/30 overflow-hidden group"
            >
              {/* Cover Image */}
              <div 
                className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setReadingArticle(article)}
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1320] via-transparent to-black/30" />
                
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                  {article.category}
                </span>

                {article.verdictScore && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-amber-400 font-mono font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{article.verdictScore}/10</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyan-400 font-mono">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setReadingArticle(article)}
                    className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Related Product Hint */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  {relatedProduct && (
                    <div 
                      onClick={() => onSelectProduct(relatedProduct)}
                      className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/50 cursor-pointer transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Laptop className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-cyan-200 truncate font-medium">
                          Stok: {relatedProduct.title}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-mono font-bold shrink-0 text-[11px]">
                        Rp {relatedProduct.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => setReadingArticle(article)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Baca Ulasan Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ARTICLE READER MODAL */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0c111e] border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/60">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {readingArticle.category}
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-8 space-y-6">
              {/* Title & Metadata */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {readingArticle.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <User className="w-3.5 h-3.5 text-emerald-400" /> {readingArticle.author}
                  </span>
                  <span>•</span>
                  <span>{readingArticle.date}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-mono">{readingArticle.readTime}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={readingArticle.coverImage}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pros & Cons Box */}
              {(readingArticle.pros || readingArticle.cons) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  {readingArticle.pros && (
                    <div className="space-y-2">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Kelebihan (Pros):</span>
                      </div>
                      <ul className="space-y-1 text-slate-300">
                        {readingArticle.pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">+</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {readingArticle.cons && (
                    <div className="space-y-2">
                      <div className="font-bold text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        <span>Kekurangan (Cons):</span>
                      </div>
                      <ul className="space-y-1 text-slate-300">
                        {readingArticle.cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">-</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Article Markdown/Text Body */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-sans">
                {readingArticle.content}
              </div>

              {/* Related Product Callout */}
              {readingArticle.relatedProductId && (
                (() => {
                  const p = getRelatedProduct(readingArticle.relatedProductId);
                  if (!p) return null;

                  return (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-cyan-400 font-semibold uppercase">Tersedia di Minority Tech:</div>
                        <h4 className="text-base font-bold text-white">{p.title}</h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Grade {p.conditionGrade} • Baterai {p.batteryHealth}% • Garansi 1 Tahun
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setReadingArticle(null);
                          onSelectProduct(p);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
                      >
                        Lihat Laporan QC &amp; Pesan
                      </button>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
