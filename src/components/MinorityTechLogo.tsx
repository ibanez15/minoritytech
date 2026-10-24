import React from 'react';

interface MinorityTechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const MinorityTechLogo: React.FC<MinorityTechLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Monogram MT with Iconic Ruby TrackPoint Accent */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-[#0e1322] to-slate-950 border border-slate-700/80 group-hover:border-cyan-400/80 transition-all duration-300 shadow-lg shadow-black/80 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5 text-cyan-400 group-hover:scale-105 transition-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Futuristic Hexagon/Facet Shield */}
          <path
            d="M50 8L88 28V72L50 92L12 72V28L50 8Z"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="text-cyan-500/40"
          />
          {/* Stylized M Shape */}
          <path
            d="M26 68V36L50 56L74 36V68"
            stroke="url(#cyanGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Crossbar T line */}
          <path
            d="M38 32H62"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Iconic ThinkPad Red Dot / Glowing Ruby Beacon on the apex */}
          <circle cx="50" cy="22" r="5.5" fill="#f43f5e" className="animate-pulse" />
          <circle cx="50" cy="22" r="8" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.4" />

          <defs>
            <linearGradient id="cyanGrad" x1="26" y1="36" x2="74" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-[#07090e]" />
        </span>
      </div>

      {/* Brand Typography */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white font-mono ${textSizes[size]}`}>
            MINORITY<span className="text-rose-500">.</span>TECH
          </span>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 font-mono tracking-wider">
            @minoritytech
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-slate-400 mt-0.5 font-medium flex items-center gap-1.5">
            <span>Premium Used Ultrabooks</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-mono">ThinkPad &amp; Surface</span>
          </p>
        )}
      </div>
    </div>
  );
};
