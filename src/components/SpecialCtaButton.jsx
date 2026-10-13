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
      {/* 1. Massiver 3D-Schatten / Extrusion nach unten-rechts (wie im Referenz-Button) */}
      <div 
        className="absolute top-7 left-0 right-0 bottom-3 bg-[#0a2311] rounded-l-full translate-y-[6px] translate-x-[2px] transition-transform duration-200 group-active:translate-y-[2px] group-active:translate-x-[1px]"
        style={{
          clipPath: 'polygon(0% 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%)',
        }}
      />

      {/* 2. Haupt-Button-Körper mit weißem Grund & 45°-Fase oben rechts */}
      <div 
        className="relative flex items-center h-[56px] pl-[52px] sm:pl-[58px] pr-[116px] sm:pr-[126px] bg-white border-2 border-[#16a34a] rounded-l-full transition-all duration-300 shadow-xs group-active:translate-y-[3px] group-active:translate-x-[1px] overflow-hidden"
        style={{
          clipPath: 'polygon(0% 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%)',
        }}
      >
        {/* 2a. DAS GRÜN GEHT DIREKT VOM GRÜNEN TANK AUS! */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#22c55e] z-0 pointer-events-none transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            clipPath: isHovered 
              ? 'circle(180% at calc(100% - 88px) 50%)' 
              : 'circle(0% at calc(100% - 22px) 38%)',
          }}
        />

        {/* 2b. PANORAMISCHE INDUSTRIE- & BERGLANDSCHAFT ÜBER DEN GESAMTEN BUTTON */}
        {/* Durchgängig, dezent und technisch: Bergrücken, Sheddach-Hallen, Reaktoren, Kamine & Rohrleitungen */}
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
          {/* Flacher Hallenbau mit Lüftungsaufbau */}
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

          {/* Halle rechts vor dem Kran mit Sheddach */}
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
        {/* Die Balken laufen oben, unten und links weit aus dem Button heraus (verschwinden aus dem Bild!) */}
        {/* Rechts schließt das Gerüst sauber an einer Stütze ab, sodass der Text VOLLSTÄNDIG FREI und sichtbar bleibt! */}
        <div className="absolute left-0 top-0 bottom-0 w-[44px] pointer-events-none z-[4] select-none">
          <svg 
            className={`w-full h-full transition-colors duration-300 drop-shadow-xs ${
              isHovered ? 'text-white' : 'text-slate-700'
            }`} 
            viewBox="0 0 44 56" 
            fill="none"
          >
            {/* 1. Vertikale Stahlstützen (laufen von y=-30 bis y=86 weit über den Button hinaus!) */}
            <line x1="14" y1="-30" x2="14" y2="86" stroke="currentColor" strokeWidth="3.2" />
            <line x1="12.5" y1="-30" x2="12.5" y2="86" stroke="#0f172a" strokeWidth="0.8" opacity="0.35" />

            <line x1="32" y1="-30" x2="32" y2="86" stroke="currentColor" strokeWidth="3.4" />
            <line x1="30.5" y1="-30" x2="30.5" y2="86" stroke="#0f172a" strokeWidth="0.8" opacity="0.35" />

            {/* 2. Horizontale Stahlriegel (laufen links von x=-30 weit über die Rundung hinaus, enden rechts sauber an der Stütze) */}
            <line x1="-30" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="3" />
            <line x1="-30" y1="16.2" x2="36" y2="16.2" stroke="#0f172a" strokeWidth="0.8" opacity="0.3" />

            <line x1="-30" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="2.4" />

            <line x1="-30" y1="41" x2="36" y2="41" stroke="currentColor" strokeWidth="3" />
            <line x1="-30" y1="39.8" x2="36" y2="39.8" stroke="#0f172a" strokeWidth="0.8" opacity="0.3" />

            {/* 3. Großes durchlaufendes Andreaskreuz / Diagonalfachwerk */}
            <line x1="-4" y1="-3" x2="14" y2="15" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="-3" x2="-4" y2="15" stroke="currentColor" strokeWidth="2" />

            <line x1="14" y1="15" x2="32" y2="28" stroke="currentColor" strokeWidth="2.2" />
            <line x1="32" y1="15" x2="14" y2="28" stroke="currentColor" strokeWidth="2.2" />

            <line x1="14" y1="28" x2="32" y2="41" stroke="currentColor" strokeWidth="2.2" />
            <line x1="32" y1="28" x2="14" y2="41" stroke="currentColor" strokeWidth="2.2" />

            <line x1="14" y1="41" x2="32" y2="59" stroke="currentColor" strokeWidth="2" />
            <line x1="32" y1="41" x2="14" y2="59" stroke="currentColor" strokeWidth="2" />

            {/* 4. Massive Knotenbleche & Nieten/Bolzen */}
            <polygon points="10,11 18,11 18,19 10,19" fill="currentColor" />
            <polygon points="28,11 36,11 36,19 28,19" fill="currentColor" />

            <polygon points="10,24 18,24 18,32 10,32" fill="currentColor" />
            <polygon points="28,24 36,24 36,32 28,32" fill="currentColor" />

            <polygon points="10,37 18,37 18,45 10,45" fill="currentColor" />
            <polygon points="28,37 36,37 36,45 28,45" fill="currentColor" />

            <circle cx="14" cy="15" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />
            <circle cx="32" cy="15" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />

            <circle cx="14" cy="28" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />
            <circle cx="32" cy="28" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />

            <circle cx="14" cy="41" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />
            <circle cx="32" cy="41" r="1.1" fill={isHovered ? "#0d2a14" : "#ffffff"} />
          </svg>
        </div>

        {/* 3. Inhalt im Vordergrund (Typografie & Pfeil – maximal sichtbar und cool gestylt!) */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-4">
          {/* Typografie: Jetzt noch präsenter, fetter und mit weißem Halo-Glow für 100% Kontrast */}
          <div className="flex flex-col select-none">
            <span className={`font-black text-[16.5px] sm:text-[18px] tracking-tight leading-none transition-all duration-300 whitespace-nowrap ${
              isHovered 
                ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]' 
                : 'text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]'
            }`}>
              {text}
            </span>
          </div>

          {/* Runder Pfeil-Button */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 ${
            isHovered 
              ? 'bg-white text-[#15803d] scale-105 translate-x-0.5' 
              : 'bg-[#16a34a] text-white hover:bg-[#15803d]'
          }`}>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 4. DER STAND-BAUKRAN (TURMDREHKRAN) */}
      {/* STEHT DIREKT AUF DER UNTEREN KANTE DES BUTTONS (bottom-3 = bündig mit Button-Unterkante)! */}
      {/* Oben ragt er ca. 20px elegant über den Button hinaus */}
      <div className="absolute right-1 bottom-3 w-[116px] h-[76px] pointer-events-none z-20 overflow-visible flex items-end justify-end">
        <div className="relative w-full h-full">

          {/* TEIL A: DER FESTE STAND-TURM (STEHT FEST AUF DER UNTERKANTE DES BUTTONS!) */}
          <svg 
            className="absolute inset-0 w-full h-full drop-shadow-xs" 
            viewBox="0 0 116 76" 
            fill="none"
          >
            {/* 1. Massiver Beton-Fundamentsockel (Sitzt exakt auf der unteren Kante y=76 auf!) */}
            <polygon points="58,76 63,67 95,67 100,76" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />
            <rect x="63" y="66" width="32" height="2.5" rx="0.5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />

            {/* 2. Schwerlast-Fundamentkreuz auf dem Betonsockel */}
            <line x1="62" y1="66" x2="96" y2="66" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="74" y="63.5" width="12" height="2.5" fill="#1e293b" />
            <circle cx="76.5" cy="65" r="0.9" fill="#f8fafc" />
            <circle cx="83.5" cy="65" r="0.9" fill="#f8fafc" />

            {/* 3. Beton-Ballastgewichte am Fundamentfuß */}
            <rect x="64" y="58" width="8.5" height="8" rx="0.6" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="68" y1="58" x2="68" y2="66" stroke="#0f172a" strokeWidth="0.6" />
            <rect x="87.5" y="58" width="8.5" height="8" rx="0.6" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="91.5" y1="58" x2="91.5" y2="66" stroke="#0f172a" strokeWidth="0.6" />

            {/* 4. Vertikaler Gitterturm in Industrie-Gelb (von Sockel y=64 bis Drehkranz y=15) */}
            <rect x="76" y="15" width="8" height="49" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
            
            {/* Gitterturm-Streben */}
            <line x1="76" y1="25" x2="84" y2="25" stroke="#854d0e" strokeWidth="0.9" />
            <line x1="76" y1="35" x2="84" y2="35" stroke="#854d0e" strokeWidth="0.9" />
            <line x1="76" y1="45" x2="84" y2="45" stroke="#854d0e" strokeWidth="0.9" />
            <line x1="76" y1="55" x2="84" y2="55" stroke="#854d0e" strokeWidth="0.9" />

            <line x1="76" y1="15" x2="84" y2="25" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="84" y1="15" x2="76" y2="25" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="76" y1="25" x2="84" y2="35" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="84" y1="25" x2="76" y2="35" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="76" y1="35" x2="84" y2="45" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="84" y1="35" x2="76" y2="45" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="76" y1="45" x2="84" y2="55" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="84" y1="45" x2="76" y2="55" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="76" y1="55" x2="84" y2="64" stroke="#ca8a04" strokeWidth="0.9" />
            <line x1="84" y1="55" x2="76" y2="64" stroke="#ca8a04" strokeWidth="0.9" />

            {/* Kranführerkabine unter dem Drehkranz */}
            <rect x="69" y="18" width="7" height="9" rx="1.5" fill="#eab308" stroke="#78350f" strokeWidth="0.9" />
            <rect x="70" y="19.5" width="3.5" height="4.5" rx="0.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="0.5" />

            {/* Drehkranz-Plattform */}
            <rect x="74" y="14" width="12" height="3" rx="0.5" fill="#0f172a" />

            {/* Feste Turmspitze (ragt oben ca. 19px über den Button hinaus!) */}
            <polygon points="80,1 76,14 84,14" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
            <circle cx="80" cy="1" r="1.4" fill="#0f172a" />
          </svg>

          {/* TEIL B: DREHWERK-AUSLEGER (SCHWENKT HORIZONTAL LINKS RUM) */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ transformOrigin: "80px 14px" }}
            animate={{
              scaleX: isHovered ? -1 : 1,
              y: isHovered ? [0, 2.5, 0] : [0, 2.5, 0],
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg 
              className="absolute inset-0 w-full h-full drop-shadow-md" 
              viewBox="0 0 116 76" 
              fill="none"
            >
              {/* Gegenausleger mit Beton-Ballastblöcken */}
              <line x1="80" y1="12" x2="62" y2="12" stroke="#ca8a04" strokeWidth="2.2" />
              <line x1="80" y1="14" x2="62" y2="14" stroke="#854d0e" strokeWidth="1.2" />
              <line x1="80" y1="1" x2="64" y2="12" stroke="#334155" strokeWidth="0.9" strokeDasharray="2 1" />
              <rect x="63" y="11" width="7" height="8" rx="0.8" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="66.5" y1="11" x2="66.5" y2="19" stroke="#1e293b" strokeWidth="0.8" />

              {/* Haupt-Laufkatzausleger */}
              <line x1="80" y1="10" x2="114" y2="10" stroke="#eab308" strokeWidth="2.2" />
              <line x1="80" y1="14" x2="114" y2="14" stroke="#ca8a04" strokeWidth="1.8" />
              
              {/* Gitter-Fachwerk im Hauptausleger */}
              <line x1="85" y1="10" x2="90" y2="14" stroke="#854d0e" strokeWidth="0.9" />
              <line x1="91" y1="10" x2="96" y2="14" stroke="#854d0e" strokeWidth="0.9" />
              <line x1="97" y1="10" x2="102" y2="14" stroke="#854d0e" strokeWidth="0.9" />
              <line x1="103" y1="10" x2="108" y2="14" stroke="#854d0e" strokeWidth="0.9" />

              {/* Abspannseil von Turmspitze */}
              <line x1="80" y1="1" x2="104" y2="10" stroke="#334155" strokeWidth="1" strokeDasharray="3 1" />
            </svg>
          </motion.div>

          {/* TEIL C: DER TANK AM HAKEN – BEI HOVER DEUTLICH GRÖSSER & IM VORDERGRUND! */}
          {/* IM RUHEZUSTAND: Weiter hinten (x=94, scale=0.74, y=8) */}
          {/* BEI HOVER: Dreht links rum IN DIE MITTE, ALSO NACH VORNE (x=32, scale=1.40, y=19)! */}
          <motion.div 
            className="absolute top-0 w-8 h-16 pointer-events-none z-30 flex items-center justify-center"
            style={{ left: 0 }}
            animate={{
              x: isHovered ? 32 : 94,
              y: isHovered ? [8, 23, 19] : [19, 8],
              scale: isHovered ? [0.74, 1.46, 1.40] : 0.74,
              rotate: isHovered ? [0, -13, 6, -2, 0] : [0, 10, -4, 0],
            }}
            transition={{ 
              duration: 0.65, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            {/* Grüne Aura / Strahlung direkt vom Tank ausgehend */}
            <div 
              className={`absolute inset-0 bg-emerald-400/40 rounded-full blur-xl transition-opacity duration-500 pointer-events-none ${
                isHovered ? 'opacity-100 scale-175' : 'opacity-0 scale-50'
              }`} 
            />

            <svg 
              className="w-full h-full drop-shadow-xl overflow-visible relative z-10" 
              viewBox="0 0 32 64" 
              fill="none"
            >
              {/* 1. Laufkatze auf dem Ausleger */}
              <rect x="12" y="12.5" width="8" height="3" rx="0.5" fill="#0f172a" />
              
              {/* 2. Hubseil nach unten */}
              <line x1="16" y1="15.5" x2="16" y2="26" stroke="#334155" strokeWidth="1.2" strokeDasharray="2 1" />

              {/* 3. Kranhaken */}
              <path d="M 16 26 L 16 29 C 16 31.5 13.5 31.5 13.5 29" stroke="#0f172a" strokeWidth="1.6" fill="none" />

              {/* 4. Anschlaggeschirr zum Behälter */}
              <line x1="15" y1="29" x2="7" y2="35" stroke="#334155" strokeWidth="1.1" />
              <line x1="15" y1="29" x2="25" y2="35" stroke="#334155" strokeWidth="1.1" />
              <circle cx="15" cy="29" r="1.2" fill="#0f172a" />

              {/* 5. Kegeldach des chemischen Behälters */}
              <path d="M 5 38 L 16 34 L 27 38 Z" fill="#22c55e" stroke="#14532d" strokeWidth="1.1" />
              <rect x="13.5" y="32.5" width="5" height="2.5" rx="0.4" fill="#86efac" stroke="#14532d" strokeWidth="0.9" />

              {/* 6. Zylindermantel in sattem Weber-Smaragdgrün (#16a34a) */}
              <rect x="5" y="38" width="22" height="21" rx="1.5" fill="#16a34a" stroke="#14532d" strokeWidth="1.2" />

              {/* Lichtreflexion auf der Zylinderwand */}
              <rect x="7.5" y="39" width="2.5" height="19" rx="1" fill="#86efac" opacity="0.6" />

              {/* Horizontale Verstärkungsringe / Schweißnähte */}
              <line x1="5" y1="44" x2="27" y2="44" stroke="#14532d" strokeWidth="0.8" />
              <line x1="5" y1="51" x2="27" y2="51" stroke="#14532d" strokeWidth="0.8" />

              {/* Offizielles Weber-Firmenemblem auf dem Behältermantel */}
              <image 
                href="/weber-tank-logo.webp" 
                x="10.8" 
                y="42" 
                width="10.4" 
                height="13.5" 
                preserveAspectRatio="xMidYMid meet" 
              />

              {/* Auslaufflansch unten rechts */}
              <rect x="22" y="54" width="4" height="3" fill="#22c55e" stroke="#14532d" strokeWidth="0.8" />
              <line x1="26" y1="53" x2="26" y2="58" stroke="#14532d" strokeWidth="1.1" />
            </svg>
          </motion.div>

        </div>
      </div>

    </a>
  );
}
