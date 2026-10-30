import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { IMAGES } from '../data/weberData';

// Clean, professional material metadata matching user layout request
const MATERIAL_CARDS = {
  'pe-polyethylen': {
    title: 'Polyethylen (PE)',
    subtitle: 'PE 100 & PE-HD · Universeller Industriestandard',
    temp: '-40 °C bis +60 °C',
    category: 'polyolefine',
  },
  'pp-polypropylen': {
    title: 'Polypropylen (PP)',
    subtitle: 'PP-H & PP-s · Hohe Wärmeformbeständigkeit',
    temp: '0 °C bis +100 °C',
    category: 'polyolefine',
  },
  'pvc-polyvinylchlorid': {
    title: 'Polyvinylchlorid (PVC)',
    subtitle: 'PVC-U & PVC-C · Exzellent bei oxidierenden Medien',
    temp: '0 °C bis +80 °C',
    category: 'polyolefine',
  },
  'pvdf': {
    title: 'Fluorpolymer PVDF',
    subtitle: 'Polyvinylidenfluorid · Reinstwerkstoff & Heißsäuren',
    temp: '-30 °C bis +140 °C',
    category: 'fluorpolymere',
  },
  'ectfe': {
    title: 'ECTFE (Halar®)',
    subtitle: 'Ethylen-Chlortrifluorethylen · Durchgehend pH 0 bis 14',
    temp: '-76 °C bis +150 °C',
    category: 'fluorpolymere',
  },
  'pfa': {
    title: 'Perfluoralkoxy (PFA)',
    subtitle: 'Vollfluorpolymer-Auskleidung · Höchste thermische Inertheit',
    temp: '-190 °C bis +260 °C',
    category: 'fluorpolymere',
  },
  'mfa': {
    title: 'Modifiziertes Fluoralkoxy (MFA)',
    subtitle: 'Optimierter Inliner · Geringste Permeation im Verbundbau',
    temp: '-100 °C bis +240 °C',
    category: 'fluorpolymere',
  }
};

const CATEGORIES = [
  { id: 'alle', label: 'Alle Werkstoffe (7)' },
  { id: 'polyolefine', label: 'Standard-Polyolefine (PE, PP, PVC)' },
  { id: 'fluorpolymere', label: 'Fluorpolymere (PVDF, ECTFE, PFA, MFA)' }
];

export default function MaterialsSection({ onNavigate, onRequestMaterial }) {
  const { werkstoffe } = useCms();
  const [activeCategory, setActiveCategory] = useState('alle');

  const handleOpenMaterial = (e, mat) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(`/werkstoffe/${mat.id}`);
    }
  };

  const filteredMaterials = (werkstoffe || []).filter((mat) => {
    if (activeCategory === 'alle') return true;
    const cat = MATERIAL_CARDS[mat.id]?.category;
    return cat === activeCategory;
  });

  return (
    <section 
      id="werkstoffe" 
      className="relative py-28 sm:py-36 bg-[#0c3319] text-white overflow-hidden"
    >
      {/* Top Transition: Smooth curved wave line from #FBF9F5 */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-8 sm:h-12 lg:h-16 text-[#FBF9F5]" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 L1440,0 L1440,20 C1080,65 720,70 360,25 C180,5 60,10 0,20 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>

      {/* Atmospheric Photographic Background: Real Weber Tank Farm in Rich Emerald-Green with Fixed Parallax */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES.tanklager || IMAGES.panorama})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* Vibrant Weber-Green wash allowing industrial equipment to shine through */}
        <div className="absolute inset-0 bg-[#0e3f1e]/75 mix-blend-multiply" />
        {/* Soft vertical gradient to blend into curved wave lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2813]/85 via-[#0e3f1e]/40 to-[#0a2813]/90" />
        {/* Soft lateral vignette for header readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#0a2813]/90 via-[#0a2813]/55 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-4 sm:pt-6">
        
        {/* Section Header: Clean, Authoritative, High Contrast */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Der passende Werkstoff für jedes chemische Medium.
          </h2>
          
          <p className="text-base sm:text-lg text-emerald-50/90 mt-4 leading-relaxed max-w-2xl">
            Von wirtschaftlichen Polyolefinen (PE, PP) bis hin zu hochtemperaturfesten Fluorpolymeren 
            (PVDF, ECTFE, PFA). Exakt berechnet und zertifiziert nach DVS 2205 für maximale Anlagenlebensdauer.
          </p>
        </div>

        {/* Subtle, Discreet Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0a2813] shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-100/90 border border-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clean, Spacious 2-Column Grid (Filtered Werkstoffe + Symmetrical Consultation Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {filteredMaterials.map((mat) => {
            const meta = MATERIAL_CARDS[mat.id] || {
              title: mat.name || mat.code,
              subtitle: mat.code,
              temp: mat.temp
            };

            return (
              <div 
                key={mat.id}
                onClick={(e) => handleOpenMaterial(e, mat)}
                className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-[#1c5f2e] p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors leading-tight">
                    {meta.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 block mt-1">
                    {meta.subtitle}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-700 block mt-1.5 pb-2 border-b border-neutral-100">
                    {meta.temp}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed my-3 line-clamp-2">
                    {mat.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    Säuren: <strong className="text-slate-900 font-bold">{mat.acids}</strong> · Laugen: <strong className="text-slate-900 font-bold">{mat.alkalis}</strong>
                  </span>
                  <span className="font-bold text-[#1c5f2e] group-hover:text-emerald-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Symmetrical Consultation Card */}
          <div 
            onClick={() => {
              if (onRequestMaterial) {
                onRequestMaterial({ id: 'werkstoff-beratung', title: 'Chemische Beständigkeitsprüfung' });
              } else {
                document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#0b2d16] text-white rounded-2xl border border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-400 transition-all duration-300 hover:shadow-xl cursor-pointer group"
          >
            <div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                Chemische Beständigkeitsprüfung
              </h3>
              <span className="text-xs font-medium text-emerald-300/80 block mt-1">
                DVS 2205 Ingenieurberechnung Minden
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400 block mt-1.5 pb-2 border-b border-emerald-900/60">
                Kostenlose Vorbemessung & Beratung
              </span>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed my-3">
                Sie verarbeiten aggressive Medien oder hohe Prozesstemperaturen? Unsere Ingenieure in Minden ermitteln die optimale Werkstoff-Kombination nach DVS 2205.
              </p>
            </div>

            <div className="pt-3.5 border-t border-emerald-900/60 flex items-center justify-between text-xs">
              <span className="text-emerald-300/90 font-medium">
                Sicherheitsdatenblatt (SDB) prüfen lassen
              </span>
              <span className="font-bold text-emerald-400 group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Jetzt anfragen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Transition: Smooth curved wave line to #FBF9F5 */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-8 sm:h-12 lg:h-16 text-[#FBF9F5]" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,72 L1440,72 L1440,52 C1080,7 720,2 360,47 C180,67 60,62 0,52 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>
    </section>
  );
}
