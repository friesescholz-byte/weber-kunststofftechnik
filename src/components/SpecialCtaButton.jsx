import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpecialCtaButton({ 
  text = "Projekt anfragen", 
  href = "#anfrage", 
  onClick,
  size = "md", // "sm" | "md"
  className = "",
  children
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isSm = size === 'sm';

  const chamferCut = isSm ? '16px' : '24px';
  const clipPathStyle = `polygon(0% 0%, calc(100% - ${chamferCut}) 0%, 100% ${chamferCut}, 100% 100%, 0% 100%)`;

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
  };

  return (
    <a
      href={onClick ? undefined : href}
      role={onClick ? "button" : undefined}
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center group cursor-pointer select-none focus:outline-none shrink-0 ${
        isSm ? 'h-[38px]' : 'h-[52px]'
      } ${className}`}
    >
      {/* 1. Massiver 3D-Schatten / Extrusion nach unten-rechts */}
      <div 
        className={`absolute inset-0 bg-[#0a2311] rounded-l-full transition-transform duration-200 group-active:translate-y-[1px] group-active:translate-x-[0.5px] ${
          isSm ? 'translate-y-[2.5px] translate-x-[1.5px]' : 'translate-y-[4px] translate-x-[2px]'
        }`}
        style={{
          clipPath: clipPathStyle,
        }}
      />

      {/* 2. Haupt-Button-Körper mit weißem Grund & 45°-Fase oben rechts */}
      <div 
        className={`relative flex items-center bg-white border-2 border-[#16a34a] rounded-l-full transition-all duration-300 shadow-xs group-active:translate-y-[1px] group-active:translate-x-[0.5px] overflow-hidden ${
          isSm 
            ? 'h-[38px] pl-[36px] sm:pl-[40px] pr-3.5 sm:pr-4' 
            : 'h-[52px] pl-[50px] sm:pl-[56px] pr-7 sm:pr-9'
        }`}
        style={{
          clipPath: clipPathStyle,
        }}
      >
        {/* 2a. Sanfter Smaragd-Farbverlauf bei Hover (von rechts einfließend) */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#22c55e] z-0 pointer-events-none transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            clipPath: isHovered 
              ? 'circle(180% at calc(100% - 20px) 50%)' 
              : 'circle(0% at calc(100% - 20px) 50%)',
          }}
        />

        {/* 2b. ORIGINAL PANORAMISCHE INDUSTRIE- & BERGLANDSCHAFT */}
        <svg 
          className={`absolute inset-0 w-full h-full pointer-events-none z-[1] select-none transition-colors duration-500 ${
            isHovered ? 'text-emerald-200/30' : 'text-slate-400/25'
          }`}
          viewBox="0 0 340 52" 
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Weite Bergsilhouette im fernen Hintergrund */}
          <path 
            d="M 0 52 L 0 44 Q 35 28 70 34 T 140 26 Q 185 32 230 24 T 310 30 Q 325 34 340 42 L 340 52 Z" 
            fill="currentColor" 
            fillOpacity="0.08" 
            stroke="currentColor" 
            strokeWidth="0.7" 
            strokeDasharray="2 1"
          />
          <path 
            d="M 15 46 Q 50 34 90 40 Q 140 32 190 36 Q 240 28 290 34" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeOpacity="0.35" 
          />

          {/* Werkshallen mit Sheddach links */}
          <path 
            d="M 40 52 L 40 38 L 48 32 L 48 38 L 56 32 L 56 38 L 64 32 L 64 52 Z" 
            fill="currentColor" 
            fillOpacity="0.14" 
            stroke="currentColor" 
            strokeWidth="0.8" 
          />
          <line x1="42" y1="38" x2="48" y2="32" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="50" y1="38" x2="56" y2="32" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="58" y1="38" x2="64" y2="32" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* Industrieanlagen & Rohrleitungen */}
          <rect x="80" y="40" width="45" height="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.7" />
          <rect x="94" y="36" width="16" height="4" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.6" />
          <line x1="88" y1="44" x2="118" y2="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.6" />

          {/* Aufrecht stehender Chemie-Reaktorturm / Silo */}
          <rect x="135" y="30" width="10" height="22" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 135 30 Q 140 27 145 30 Z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="0.7" />
          <line x1="135" y1="36" x2="145" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="135" y1="42" x2="145" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

          {/* Horizontale Rohrbrücke */}
          <line x1="64" y1="45" x2="200" y2="45" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 1" opacity="0.4" />
          <line x1="125" y1="45" x2="125" y2="52" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <line x1="175" y1="45" x2="175" y2="52" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />

          {/* Halle rechts mit Sheddach */}
          <path 
            d="M 210 52 L 210 36 L 220 28 L 220 36 L 230 28 L 230 36 L 240 28 L 240 52 Z" 
            fill="currentColor" 
            fillOpacity="0.14" 
            stroke="currentColor" 
            strokeWidth="0.8" 
          />
          <line x1="212" y1="36" x2="220" y2="28" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="222" y1="36" x2="230" y2="28" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="232" y1="36" x2="240" y2="28" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* Schornstein / Kamin rechts */}
          <polygon points="255,52 254,24 257,24 256,52" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="255.5" cy="20" r="1.6" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.5" />
          <circle cx="257" cy="16" r="2.2" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.35" />

          {/* Großtank rechts */}
          <rect x="270" y="34" width="14" height="18" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 270 34 Q 277 30 284 34 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.7" />

          {/* Bodenlinie */}
          <line x1="0" y1="52" x2="340" y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        </svg>

        {/* 2c. Feines technisches Nadelstreifen-Raster */}
        <div 
          className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-500 z-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 8px)`
          }}
        />

        {/* 2d. DURCHLAUFENDES STAHLGERÜST AUF DER LINKEN SEITE */}
        <div className={`absolute left-0 top-0 bottom-0 pointer-events-none z-[4] select-none ${
          isSm ? 'w-[32px]' : 'w-[44px]'
        }`}>
          <svg 
            className={`w-full h-full transition-colors duration-300 drop-shadow-xs ${
              isHovered ? 'text-white' : 'text-slate-700'
            }`} 
            viewBox="0 0 44 52" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Äußere Stützen */}
            <rect x="-8" y="-6" width="46" height="64" stroke="currentColor" strokeWidth="2.2" fill="none" opacity="0.9" />

            {/* Durchlaufende Diagonalstreben (K- & X-Fachwerk) */}
            <line x1="-8" y1="-8" x2="38" y2="26" stroke="currentColor" strokeWidth="2.0" />
            <line x1="38" y1="26" x2="-8" y2="60" stroke="currentColor" strokeWidth="2.0" />

            {/* Gegenläufige X-Verstrebungen */}
            <line x1="38" y1="-8" x2="-8" y2="26" stroke="currentColor" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 1.5" />
            <line x1="-8" y1="26" x2="38" y2="60" stroke="currentColor" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 1.5" />

            {/* Haupt-Abschlussstütze rechts */}
            <line x1="36" y1="-10" x2="36" y2="62" stroke="currentColor" strokeWidth="2.6" />

            {/* Niet- / Schraubpunkte */}
            <circle cx="36" cy="10" r="1.6" fill="currentColor" />
            <circle cx="36" cy="26" r="2.0" fill="currentColor" />
            <circle cx="36" cy="42" r="1.6" fill="currentColor" />
          </svg>
        </div>

        {/* 3. BUTTON-TEXT MIT KLAREM WEISS-HALO & WEITERLEITUNGS-PFEIL */}
        <div className={`relative z-10 flex items-center ${isSm ? 'gap-2' : 'gap-3'}`}>
          {children ? (
            children
          ) : (
            <>
              <span 
                className={`font-black tracking-tight transition-colors duration-300 whitespace-nowrap ${
                  isSm ? 'text-xs sm:text-[13px]' : 'text-[15.5px] sm:text-[17px]'
                } ${
                  isHovered ? 'text-white' : 'text-slate-950'
                }`}
                style={{
                  textShadow: isHovered 
                    ? '0 1px 4px rgba(0,0,0,0.5)' 
                    : '0 0 1px #ffffff, 0 0 2px #ffffff, 0 1px 3px rgba(255,255,255,0.9)'
                }}
              >
                {text}
              </span>

              <motion.div
                animate={{
                  x: isHovered ? 3 : 0,
                }}
                transition={{ duration: 0.25 }}
                className={`rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isSm ? 'w-5 h-5' : 'w-6 h-6'
                } ${
                  isHovered ? 'bg-white/20 text-white' : 'bg-slate-950/10 text-slate-800'
                }`}
              >
                <ArrowRight className={`${isSm ? 'w-3 h-3 stroke-[2.2]' : 'w-3.5 h-3.5 stroke-[2.5]'}`} />
              </motion.div>
            </>
          )}
        </div>

      </div>

    </a>
  );
}
