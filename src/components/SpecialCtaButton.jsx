import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpecialCtaButton({ 
  text = "Projekt anfragen", 
  href = "#anfrage", 
  onClick,
  className = "" 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center group cursor-pointer select-none pt-7 pb-3 focus:outline-none ${className}`}
    >
      {/* 1. Massiver 3D-Schatten / Extrusion nach unten-rechts */}
      <div 
        className="absolute top-7 left-0 right-0 bottom-3 bg-[#0a2311] rounded-l-full translate-y-[6px] translate-x-[2px] transition-transform duration-200 group-active:translate-y-[2px] group-active:translate-x-[1px]"
        style={{
          clipPath: 'polygon(0% 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%)',
        }}
      />

      {/* 2. Haupt-Button-Körper mit weißem Grund & 45°-Fase oben rechts */}
      <div 
        className="relative flex items-center h-[56px] pl-[52px] sm:pl-[58px] pr-8 sm:pr-10 bg-white border-2 border-[#16a34a] rounded-l-full transition-all duration-300 shadow-xs group-active:translate-y-[3px] group-active:translate-x-[1px] overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%)',
        }}
      >
        {/* 2a. Sanfter Smaragd-Farbverlauf bei Hover (von rechts einfließend) */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#22c55e] z-0 pointer-events-none transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            clipPath: isHovered 
              ? 'circle(180% at calc(100% - 30px) 50%)' 
              : 'circle(0% at calc(100% - 30px) 50%)',
          }}
        />

        {/* 2b. ORIGINAL PANORAMISCHE INDUSTRIE- & BERGLANDSCHAFT (GANZ DEZENT & FEIN) */}
        <svg 
          className={`absolute inset-0 w-full h-full pointer-events-none z-[1] select-none transition-colors duration-500 ${
            isHovered ? 'text-emerald-200/30' : 'text-slate-400/25'
          }`}
          viewBox="0 0 340 56" 
          preserveAspectRatio="none"
          fill="none"
        >
          {/* 1. Weite Bergsilhouette im fernen Hintergrund (Weserbergland / Wiehengebirge) */}
          <path 
            d="M 0 54 L 0 46 Q 35 30 70 36 T 140 28 Q 185 34 230 26 T 310 32 Q 325 36 340 44 L 340 54 Z" 
            fill="currentColor" 
            fillOpacity="0.08" 
            stroke="currentColor" 
            strokeWidth="0.7" 
            strokeDasharray="2 1"
          />
          <path 
            d="M 15 48 Q 50 36 90 42 Q 140 34 190 38 Q 240 30 290 36" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeOpacity="0.35" 
          />

          {/* 2. Werkshallen mit Sheddach links (hinter/neben dem Stahlgerüst) */}
          <path 
            d="M 40 54 L 40 40 L 48 34 L 48 40 L 56 34 L 56 40 L 64 34 L 64 54 Z" 
            fill="currentColor" 
            fillOpacity="0.14" 
            stroke="currentColor" 
            strokeWidth="0.8" 
          />
          <line x1="42" y1="40" x2="48" y2="34" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="50" y1="40" x2="56" y2="34" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="58" y1="40" x2="64" y2="34" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* 3. Industrieanlagen & Rohrleitungen im Mittelbereich (hinter der Schrift) */}
          <rect x="80" y="42" width="45" height="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.7" />
          <rect x="94" y="38" width="16" height="4" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.6" />
          <line x1="88" y1="46" x2="118" y2="46" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.6" />

          {/* Aufrecht stehender Chemie-Reaktorturm / Silo in der Mitte */}
          <rect x="135" y="32" width="10" height="22" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 135 32 Q 140 29 145 32 Z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="0.7" />
          <line x1="135" y1="38" x2="145" y2="38" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          <line x1="135" y1="44" x2="145" y2="44" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />

          {/* Horizontale Rohrbrücke über die Mitte */}
          <line x1="64" y1="47" x2="200" y2="47" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 1" opacity="0.4" />
          <line x1="125" y1="47" x2="125" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <line x1="175" y1="47" x2="175" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />

          {/* Halle rechts mit Sheddach */}
          <path 
            d="M 210 54 L 210 38 L 220 30 L 220 38 L 230 30 L 230 38 L 240 30 L 240 54 Z" 
            fill="currentColor" 
            fillOpacity="0.14" 
            stroke="currentColor" 
            strokeWidth="0.8" 
          />
          <line x1="212" y1="38" x2="220" y2="30" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="222" y1="38" x2="230" y2="30" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="232" y1="38" x2="240" y2="30" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />

          {/* Schornstein / Kamin rechts */}
          <polygon points="255,54 254,26 257,26 256,54" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="255.5" cy="22" r="1.6" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.5" />
          <circle cx="257" cy="18" r="2.2" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.35" />

          {/* Großtank rechts */}
          <rect x="270" y="36" width="14" height="18" rx="1.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.7" />
          <path d="M 270 36 Q 277 32 284 36 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.7" />

          {/* Durchgehende Bodenlinie am Fundament */}
          <line x1="0" y1="54" x2="340" y2="54" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        </svg>

        {/* 2c. Feines technisches Nadelstreifen-Raster */}
        <div 
          className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-500 z-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 8px)`
          }}
        />

        {/* 2d. DURCHLAUFENDES STAHLGERÜST AUF DER LINKEN SEITE */}
        <div className="absolute left-0 top-0 bottom-0 w-[44px] pointer-events-none z-[4] select-none">
          <svg 
            className={`w-full h-full transition-colors duration-300 drop-shadow-xs ${
              isHovered ? 'text-white' : 'text-slate-700'
            }`} 
            viewBox="0 0 44 56" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Äußere Stützen */}
            <rect x="-8" y="-6" width="46" height="68" stroke="currentColor" strokeWidth="2.2" fill="none" opacity="0.9" />

            {/* Durchlaufende Diagonalstreben (K- & X-Fachwerk) */}
            <line x1="-8" y1="-8" x2="38" y2="28" stroke="currentColor" strokeWidth="2.0" />
            <line x1="38" y1="28" x2="-8" y2="64" stroke="currentColor" strokeWidth="2.0" />

            {/* Gegenläufige X-Verstrebungen */}
            <line x1="38" y1="-8" x2="-8" y2="28" stroke="currentColor" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 1.5" />
            <line x1="-8" y1="28" x2="38" y2="64" stroke="currentColor" strokeWidth="1.6" opacity="0.6" strokeDasharray="3 1.5" />

            {/* Haupt-Abschlussstütze rechts */}
            <line x1="36" y1="-10" x2="36" y2="66" stroke="currentColor" strokeWidth="2.6" />

            {/* Niet- / Schraubpunkte */}
            <circle cx="36" cy="10" r="1.6" fill="currentColor" />
            <circle cx="36" cy="28" r="2.0" fill="currentColor" />
            <circle cx="36" cy="46" r="1.6" fill="currentColor" />
          </svg>
        </div>

        {/* 3. BUTTON-TEXT MIT KLAREM WEISS-HALO & WEITERLEITUNGS-PFEIL */}
        <div className="relative z-10 flex items-center gap-3">
          <span 
            className={`text-[16.5px] sm:text-[18px] font-black tracking-tight transition-colors duration-300 whitespace-nowrap ${
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
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.25 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isHovered ? 'bg-white/20 text-white' : 'bg-slate-950/10 text-slate-800'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.div>
        </div>

      </div>

    </a>
  );
}
