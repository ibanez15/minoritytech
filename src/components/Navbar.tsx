import React, { useState } from 'react';
import { 
  Laptop, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  MessageSquare, 
  Menu, 
  X,
  CheckCircle2,
  PhoneCall,
  Instagram,
  Database
} from 'lucide-react';
import { MinorityTechLogo } from './MinorityTechLogo';

interface NavbarProps {
  activeTab: 'katalog' | 'ai-matcher' | 'reviews' | 'garansi';
  setActiveTab: (tab: 'katalog' | 'ai-matcher' | 'reviews' | 'garansi') => void;
  compareCount: number;
  openCompareModal: () => void;
  openChat: () => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  openCompareModal,
  openChat,
  openAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'katalog' | 'ai-matcher' | 'reviews' | 'garansi') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border-b border-cyan-500/10 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Garansi 1 Tahun Hardware &amp; 30 Hari Ganti Unit</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-cyan-400">28-Point QC Lab Inspection Certified</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <a
              href="https://instagram.com/minoritytech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-mono transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@minoritytech</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Unit Siap Kirim (Grade A+)
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Minority%20Tech,%20saya%20ingin%20konsultasi%20laptop" 
              target="_blank" 
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3" /> WA: 0812-3456-7890
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNav('katalog')} 
            className="cursor-pointer group select-none"
          >
            <MinorityTechLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('katalog')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'katalog'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 cyber-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Laptop className="w-4 h-4" />
              Katalog Ultrabook
            </button>

            <button
              onClick={() => handleNav('ai-matcher')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'ai-matcher'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 cyber-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Match Finder
            </button>

            <button
              onClick={() => handleNav('reviews')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 cyber-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Review &amp; News
            </button>

            <button
              onClick={() => handleNav('garansi')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'garansi'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 cyber-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Garansi &amp; 28-QC
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Compare Button */}
            <button
              onClick={openCompareModal}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 text-xs font-medium"
              title="Bandingkan Laptop"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Bandingkan</span>
              {compareCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full bg-cyan-500 text-slate-950 font-mono">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={openAdminModal}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Admin Portal (Database & QC Management)"
            >
              <Database className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden xl:inline">Admin DB</span>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={openChat}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 border border-cyan-400/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Tanya AI Consultant</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg md:hidden bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0f19] px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNav('katalog')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'katalog' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4 text-cyan-400" />
            Katalog Ultrabook
          </button>
          <button
            onClick={() => handleNav('ai-matcher')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'ai-matcher' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Product Match Finder
          </button>
          <button
            onClick={() => handleNav('reviews')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'reviews' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Review &amp; News
          </button>
          <button
            onClick={() => handleNav('garansi')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'garansi' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Garansi &amp; Standar QC
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openAdminModal();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-300 bg-rose-950/40 border border-rose-800/50 hover:bg-rose-900/40"
          >
            <Database className="w-4 h-4 text-rose-400" />
            Admin Database &amp; QC
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openChat();
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold"
          >
            <MessageSquare className="w-4 h-4" />
            Tanya AI Consultant
          </button>
        </div>
      )}
    </header>
  );
};
