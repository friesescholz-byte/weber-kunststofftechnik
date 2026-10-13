import React from 'react';

export default function TrustBar() {
  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 lg:-mt-24 w-full select-none bg-transparent">
      
      {/* 1. Schmaler, dezenter Stahlbau-Übergangsstreifen (sitzt exakt auf der unteren Kachel-Hälfte hinter den Cards) */}
      <div className="absolute top-[60px] sm:top-[76px] lg:top-[92px] inset-x-0 h-[50px] sm:h-[52px] z-0 overflow-hidden pointer-events-none select-none bg-[#092211] border-y border-[#1c5f2e]/35 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Feine, dezente Stahlbau-Fachwerk-Musterkachel (160px x 52px, 5 Felder x 2 Reihen) */}
            <pattern id="steelStructurePattern" width="160" height="52" patternUnits="userSpaceOnUse">
              {/* Horizontale Stahlträger-Gurte */}
              <line x1="0" y1="0" x2="160" y2="0" stroke="rgba(34, 197, 94, 0.16)" strokeWidth="0.8" />
              <line x1="0" y1="26" x2="160" y2="26" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="0" y1="52" x2="160" y2="52" stroke="rgba(34, 197, 94, 0.16)" strokeWidth="0.8" />
              
              {/* Vertikale Stützen */}
              <line x1="0" y1="0" x2="0" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="32" y1="0" x2="32" y2="52" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="64" y1="0" x2="64" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="96" y1="0" x2="96" y2="52" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="128" y1="0" x2="128" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="160" y1="0" x2="160" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />

              {/* Dezente Fachwerk-Diagonalstreben */}
              <line x1="2" y1="2" x2="30" y2="24" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="94" y1="2" x2="66" y2="24" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="34" y1="28" x2="62" y2="50" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="158" y1="28" x2="130" y2="50" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />

              {/* Dezente Knoten-Punkte */}
              <circle cx="32" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />
              <circle cx="96" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />
              <circle cx="128" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />

              {/* Subtile Weber-Grün Akzent-Kacheln (ohne Glow, ruhig & edel) */}
              <rect x="34" y="2" width="28" height="22" rx="1.5" fill="rgba(34, 197, 94, 0.07)" stroke="rgba(74, 222, 128, 0.28)" strokeWidth="0.75" />
              <rect x="98" y="28" width="28" height="22" rx="1.5" fill="rgba(21, 128, 61, 0.1)" stroke="rgba(34, 197, 94, 0.22)" strokeWidth="0.75" />
              <rect x="130" y="2" width="28" height="22" rx="1.5" fill="rgba(34, 197, 94, 0.03)" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.75" strokeDasharray="2 2" />
            </pattern>
          </defs>

          {/* Füllung mit dem feinen Stahlbau-Muster */}
          <rect width="100%" height="100%" fill="url(#steelStructurePattern)" />
        </svg>

        {/* Weiche Vignette an den Seiten */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#092211] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#092211] to-transparent pointer-events-none" />
      </div>

      {/* 2. Die 4 interessanten Kacheln (liegen auf z-10 im Vordergrund über dem Stahlbau-Raster) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          
          {/* Kachel 1: 55+ Jahre · Fertigungstradition in Minden */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-12px_rgba(28,95,46,0.2)] hover:border-weber-500/50 transition-all duration-300 flex flex-col justify-between min-h-[210px]">
            
            {/* Dezenter oberer Akzentstreifen */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-weber-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Technische CAD-Wasserzeichen-Grafik: Industrielle Fertigungshalle & Präzision */}
            <svg 
              className="absolute -right-2 -top-2 w-32 h-32 text-slate-800 pointer-events-none opacity-[0.045] group-hover:opacity-[0.20] group-hover:text-weber-700 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              {/* Werkshalle mit Sheddach (Sägezahndach) */}
              <path d="M 12 80 L 12 48 L 32 32 L 32 48 L 52 32 L 52 48 L 72 32 L 72 80 Z" strokeWidth="1.4" />
              {/* Hallenkran-Träger / Traversenlinie */}
              <line x1="12" y1="56" x2="72" y2="56" strokeDasharray="3 2" strokeWidth="0.9" />
              {/* Industrie-Fundamentlinie */}
              <line x1="8" y1="80" x2="88" y2="80" strokeWidth="1.5" />
              {/* Abluftkamin / Schornstein rechts */}
              <rect x="76" y="24" width="7" height="56" strokeWidth="1.2" />
              <line x1="74" y1="24" x2="85" y2="24" strokeWidth="1.2" />
              {/* CAD-Bemaßungspfeile */}
              <line x1="12" y1="86" x2="72" y2="86" strokeWidth="0.8" />
              <line x1="12" y1="83" x2="12" y2="89" strokeWidth="0.8" />
              <line x1="72" y1="83" x2="72" y2="89" strokeWidth="0.8" />
              {/* Feines Präzisions-Zahnrad im Hintergrund */}
              <circle cx="70" cy="30" r="16" strokeDasharray="2 3" strokeWidth="0.75" />
              <circle cx="70" cy="30" r="6" strokeWidth="0.8" />
            </svg>

            <div>
              {/* Grüner Indikator */}
              <div className="w-6 h-[2px] bg-weber-500 rounded-full mb-3.5 group-hover:w-10 transition-all duration-300" />
              
              {/* Monumentaler Kennwert */}
              <div>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none font-sans block">
                  55+
                </span>
                <span className="text-xl sm:text-2xl font-black text-weber-700 tracking-tight block mt-1">
                  Jahre
                </span>
              </div>
            </div>

            {/* Bezeichnung mit feiner Trennlinie */}
            <div className="pt-4 border-t border-neutral-100 mt-4">
              <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug">
                Fertigungstradition in Minden
              </p>
            </div>
          </div>

          {/* Kachel 2: bis 100 m³ · Behälter- und Tankvolumen */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-12px_rgba(28,95,46,0.2)] hover:border-weber-500/50 transition-all duration-300 flex flex-col justify-between min-h-[210px]">
            
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-weber-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Technische CAD-Wasserzeichen-Grafik: Zylindrischer Großbehälter nach DIN EN 12573 */}
            <svg 
              className="absolute -right-2 -top-2 w-32 h-32 text-slate-800 pointer-events-none opacity-[0.045] group-hover:opacity-[0.20] group-hover:text-weber-700 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              {/* Zylindrischer Behältermantel */}
              <rect x="24" y="28" width="52" height="54" rx="2" strokeWidth="1.4" />
              {/* Behälterdach / Kegelhaube */}
              <path d="M 24 28 L 50 16 L 76 28" strokeWidth="1.4" />
              {/* Mannloch / Domstutzen oben */}
              <rect x="44" y="11" width="12" height="5" rx="1" strokeWidth="1.1" />
              {/* Standzarge / Behälterboden */}
              <line x1="18" y1="82" x2="82" y2="82" strokeWidth="1.5" />
              {/* Füllstands-Messleiste mit Teilstrichen */}
              <line x1="68" y1="34" x2="68" y2="76" strokeWidth="0.9" />
              <line x1="65" y1="38" x2="71" y2="38" strokeWidth="0.8" />
              <line x1="66" y1="46" x2="70" y2="46" strokeWidth="0.8" />
              <line x1="65" y1="54" x2="71" y2="54" strokeWidth="0.8" />
              <line x1="66" y1="62" x2="70" y2="62" strokeWidth="0.8" />
              <line x1="65" y1="70" x2="71" y2="70" strokeWidth="0.8" />
              {/* Stumpfschweißnähte der Zylindersektionen */}
              <line x1="24" y1="46" x2="76" y2="46" strokeDasharray="3 2" strokeWidth="0.8" />
              <line x1="24" y1="64" x2="76" y2="64" strokeDasharray="3 2" strokeWidth="0.8" />
              {/* Flansch-Rohranschluss links */}
              <rect x="17" y="40" width="7" height="6" strokeWidth="1.1" />
              <line x1="17" y1="37" x2="17" y2="49" strokeWidth="1.3" />
            </svg>

            <div>
              <div className="w-6 h-[2px] bg-weber-500 rounded-full mb-3.5 group-hover:w-10 transition-all duration-300" />
              
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-0.5">
                  bis
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none font-sans">
                    100
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-weber-700 tracking-tight">
                    m³
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4">
              <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug">
                Behälter- und Tankvolumen
              </p>
            </div>
          </div>

          {/* Kachel 3: AwSV & WHG · Zertifizierter Fachbetrieb */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-12px_rgba(28,95,46,0.2)] hover:border-weber-500/50 transition-all duration-300 flex flex-col justify-between min-h-[210px]">
            
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-weber-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Technische CAD-Wasserzeichen-Grafik: Gewässerschutz & Doppelwand-Barriere */}
            <svg 
              className="absolute -right-2 -top-2 w-32 h-32 text-slate-800 pointer-events-none opacity-[0.045] group-hover:opacity-[0.20] group-hover:text-weber-700 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              {/* Äußerer Sicherheitsschild */}
              <path d="M 50 14 L 82 25 C 82 58 50 86 50 86 C 50 86 18 58 18 25 Z" strokeWidth="1.4" />
              {/* Innere Doppelwand-Barriere */}
              <path d="M 50 23 L 74 32 C 74 53 50 75 50 75 C 50 75 26 53 26 32 Z" strokeDasharray="3 2" strokeWidth="0.9" />
              {/* Zentraler Gewässerschutz-Tropfen */}
              <path d="M 50 36 C 50 36 38 52 38 59 C 38 66 43 71 50 71 C 57 71 62 66 62 59 C 62 52 50 36 50 36 Z" strokeWidth="1.3" />
              {/* Wellenlinie unter dem Tropfen (Wasseroberfläche) */}
              <path d="M 42 63 C 46 60 54 66 58 63" strokeWidth="1.1" strokeLinecap="round" />
            </svg>

            <div>
              <div className="w-6 h-[2px] bg-weber-500 rounded-full mb-3.5 group-hover:w-10 transition-all duration-300" />
              
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono block leading-tight">
                  AwSV & WHG
                </span>
                <span className="inline-block mt-1 text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                  GEWÄSSERSCHUTZ
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4">
              <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug">
                Zertifizierter Fachbetrieb
              </p>
            </div>
          </div>

          {/* Kachel 4: DIBt Z-40.21 · Bauartzugelassene Lagertanks */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-12px_rgba(28,95,46,0.2)] hover:border-weber-500/50 transition-all duration-300 flex flex-col justify-between min-h-[210px]">
            
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-weber-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Technische CAD-Wasserzeichen-Grafik: DIBt Bauaufsichtliches Prüfsiegel */}
            <svg 
              className="absolute -right-2 -top-2 w-32 h-32 text-slate-800 pointer-events-none opacity-[0.045] group-hover:opacity-[0.20] group-hover:text-weber-700 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              {/* Achteckiger amtlicher Prüfstempel-Rahmen */}
              <polygon points="32,15 68,15 85,32 85,68 68,85 32,85 15,68 15,32" strokeWidth="1.4" />
              {/* Innerer Präzisionskreis */}
              <circle cx="50" cy="50" r="28" strokeDasharray="4 2" strokeWidth="0.9" />
              <circle cx="50" cy="50" r="22" strokeWidth="0.8" />
              {/* Prüfhaken / Verifikations-Emblem */}
              <path d="M 39 50 L 46 57 L 62 41" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              {/* CAD Justier-Fadenkreuz */}
              <line x1="50" y1="10" x2="50" y2="20" strokeWidth="1" />
              <line x1="50" y1="80" x2="50" y2="90" strokeWidth="1" />
              <line x1="10" y1="50" x2="20" y2="50" strokeWidth="1" />
              <line x1="80" y1="50" x2="90" y2="50" strokeWidth="1" />
            </svg>

            <div>
              <div className="w-6 h-[2px] bg-weber-500 rounded-full mb-3.5 group-hover:w-10 transition-all duration-300" />
              
              <div className="font-mono">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight block leading-none">
                  DIBt
                </span>
                <span className="text-lg sm:text-xl font-bold text-weber-700 tracking-tight block mt-1">
                  Z-40.21
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4">
              <p className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-snug">
                Bauartzugelassene Lagertanks
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
