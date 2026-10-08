import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  showSlogan?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', isDark = false, showSlogan = false }) => {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-transform hover:scale-[1.02] ${className}`}>
      {/* Radar Symbol */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-7 h-7 rounded-full border border-blue-400/40"></div>
            <div className="absolute w-4 h-4 rounded-full border border-blue-400/60"></div>
          </div>
          {/* Radar Sweep Needle */}
          <div className="absolute w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-400 rounded-tr-full transform rotate-45"></div>
          {/* Center Point */}
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] z-10"></div>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center text-2xl font-extrabold tracking-tight leading-none">
          <span className={isDark ? 'text-white' : 'text-slate-900'}>Konto</span>
          <span className="text-blue-600">Radar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5"></span>
        </div>
        {showSlogan && (
          <span className={`text-[11px] font-medium tracking-wide uppercase mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Ranking i porównywarka kont bankowych
          </span>
        )}
      </div>
    </Link>
  );
};
