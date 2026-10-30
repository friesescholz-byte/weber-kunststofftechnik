import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ZoomIn, X, ChevronLeft, ChevronRight, Layers, FileText, Phone } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { COMPANY_FACTS, CHEMICAL_DATABASE, DVS2205_CHEMICALS } from '../data/weberData';
import SpecialCtaButton from '../components/SpecialCtaButton';
import ClosingCtaSection from '../components/ClosingCtaSection';

export default function DetailSubpage({ type, slug, onNavigate, onOpenRequestModal }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "28%"]);

  const { anwendungsgebiete, produkte, werkstoffe } = useCms();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImageIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type, slug]);

  // Find item by id or alias
  let item = null;
  let allItems = [];
  let categoryLabel = '';
  let basePath = '';

  if (type === 'anwendungsgebiete') {
    allItems = anwendungsgebiete;
    item = allItems.find((i) => i.id === slug);
    categoryLabel = 'Anwendungsgebiet';
    basePath = '/anwendungsgebiete';
  } else if (type === 'produkte') {
    allItems = produkte;
    item = allItems.find(
      (i) => i.id === slug || (Array.isArray(i.aliases) && i.aliases.includes(slug))
    );
    categoryLabel = 'Produktbereich';
    basePath = '/produkte';
  } else if (type === 'werkstoffe') {
    allItems = werkstoffe;
    item = allItems.find((i) => i.id === slug || i.code?.toLowerCase() === slug?.toLowerCase());
    categoryLabel = 'Konstruktionswerkstoff';
    basePath = '/werkstoffe';
  }

  if (!item) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center bg-[#FBF9F5]">
        <span className="text-xs font-mono uppercase tracking-widest text-[#1c5f2e] mb-2">404 · Seite nicht gefunden</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Dieser Bereich wurde nicht gefunden.</h1>
        <p className="text-sm text-slate-600 max-w-md mb-8">
          Bitte wählen Sie einen Bereich aus der Navigation oder kehren Sie zur Startseite zurück.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          Zurück zur Startseite
        </button>
      </div>
    );
  }

  const gallery = Array.isArray(item.gallery) && item.gallery.length > 0
    ? item.gallery
    : item.image
    ? [item.image]
    : [];

  const currentImage = gallery[activeImageIdx] || gallery[0];

  // For Werkstoffe: evaluate authentic chemical resistance data
  const chemicalProfile = type === 'werkstoffe' && Array.isArray(DVS2205_CHEMICALS)
    ? DVS2205_CHEMICALS.map((chem) => {
        const rating = (chem.ratings && chem.ratings[item.id]) || { grade: 'A', note: 'Beständig' };
        return {
          name: chem.name,
          conc: chem.conc,
          grade: rating.grade,
          statusLabel: rating.grade === 'A' ? 'Beständig' : rating.grade === 'B' ? 'Bedingt beständig' : 'Nicht empfohlen',
          note: rating.note
        };
      })
    : [];

  // Robust, clean renderer for Technical Specifications (NO numbers, NO character-splitting)
  const renderTechnicalSpecs = () => {
    if (type === 'werkstoffe') {
      const rows = [
        { label: 'Temperaturbereich', val: item.temp },
        { label: 'Dichte', val: item.density },
        { label: 'Schweißverfahren', val: item.welding },
        { label: 'Säurebeständigkeit', val: item.acids },
        { label: 'Laugenbeständigkeit', val: item.alkalis },
        { label: 'Lieferbare Farben', val: item.color }
      ].filter((r) => r.val);

      return (
        <div className="space-y-2.5 text-xs sm:text-sm">
          {rows.map((r, idx) => (
            <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-white/10 pb-2">
              <span className="text-emerald-200/70 shrink-0">{r.label}</span>
              <span className="text-white font-bold text-right">{r.val}</span>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'anwendungsgebiete') {
      const rows = [];
      if (item.norms && item.norms.length > 0) {
        rows.push({ label: 'Normen & Regelwerk', val: item.norms.join(', ') });
      }
      if (item.materialsUsed && item.materialsUsed.length > 0) {
        rows.push({ label: 'Verwendete Werkstoffe', val: item.materialsUsed.join(', ') });
      }
      if (typeof item.specs === 'string' && item.specs.trim()) {
        const parts = item.specs.split('·').map((p) => p.trim()).filter(Boolean);
        parts.forEach((p) => {
          if (p.includes(':')) {
            const [l, v] = p.split(':');
            rows.push({ label: l.trim(), val: v.trim() });
          } else {
            rows.push({ label: 'Auslegung', val: p });
          }
        });
      } else if (Array.isArray(item.specs)) {
        item.specs.forEach((s) => {
          if (typeof s === 'string') {
            if (s.includes(':')) {
              const [l, v] = s.split(':');
              rows.push({ label: l.trim(), val: v.trim() });
            } else {
              rows.push({ label: 'Merkmal', val: s });
            }
          }
        });
      }

      return (
        <div className="space-y-2.5 text-xs sm:text-sm">
          {rows.map((r, idx) => (
            <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-white/10 pb-2">
              <span className="text-emerald-200/70 shrink-0">{r.label}</span>
              <span className="text-white font-bold text-right">{r.val}</span>
            </div>
          ))}
        </div>
      );
    }

    // Default: Produkte
    let specsList = [];
    if (Array.isArray(item.specs)) {
      specsList = item.specs;
    } else if (typeof item.specs === 'string') {
      specsList = item.specs.split('·').map((p) => p.trim()).filter(Boolean);
    } else if (typeof item.specs === 'object' && item.specs !== null) {
      specsList = Object.entries(item.specs).map(([k, v]) => `${k}: ${v}`);
    }

    return (
      <div className="space-y-2.5 text-xs sm:text-sm">
        {specsList.map((spec, idx) => {
          if (typeof spec === 'string' && spec.includes(':')) {
            const colonIdx = spec.indexOf(':');
            const label = spec.slice(0, colonIdx).trim();
            const val = spec.slice(colonIdx + 1).trim();
            return (
              <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-white/10 pb-2">
                <span className="text-emerald-200/70 shrink-0 capitalize">{label}</span>
                <span className="text-white font-bold text-right">{val}</span>
              </div>
            );
          }
          return (
            <div key={idx} className="flex items-start gap-2 border-b border-white/10 pb-2 text-white font-medium">
              <span className="text-emerald-400 shrink-0">•</span>
              <span>{spec}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-[#FBF9F5]">
      
      {/* 1. Architectural Subpage Header with Authentic Photo Parallax in Deep Weber-Green */}
      <section 
        ref={heroRef}
        className="relative bg-[#0d2a14] text-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 border-b border-[#1c5f2e]/50 overflow-hidden"
      >
        {/* Background Layers with GPU-accelerated Parallax, Green Multiplied Tint & Masks (like in the main Hero) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Layer 1: Subpage-specific Authentic Image with smooth parallax */}
          {currentImage && (
            <motion.div 
              style={{ 
                y: backgroundY,
                willChange: "transform",
                transform: "translate3d(0, 0, 0)"
              }}
              className="absolute inset-0 w-full h-[140%] -top-[20%]"
            >
              <div
                className="w-full h-full"
                style={{
                  maskImage: "linear-gradient(to right, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.92) 100%)",
                  WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.92) 100%)"
                }}
              >
                <img 
                  src={currentImage} 
                  alt={item.title || item.code} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          )}

          {/* Layer 2: Deep Weber-Green Multiplied Tint */}
          <div className="absolute inset-0 bg-[#1c5f2e] opacity-[0.88] mix-blend-multiply" />

          {/* Layer 3: Text-Lesbarkeits-Vignette links */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/80 to-transparent z-[1]" />

          {/* Layer 4: Contrast Darken Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 z-[1]" />

          {/* Layer 5: 135-degree Diagonal Pinstripe Hatch Pattern */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
            }}
          />

          {/* Layer 6: Subtle green ambient glow on the right */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-weber-400/15 rounded-full blur-[140px] pointer-events-none z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-300/90 mb-8">
            <button 
              onClick={() => onNavigate('/')} 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
            <span className="text-emerald-500/50">/</span>
            <button
              onClick={() => onNavigate(`/${type}`)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {type === 'anwendungsgebiete' ? 'Anwendungsgebiete' : type === 'produkte' ? 'Produkte' : 'Werkstoffe'}
            </button>
            <span className="text-emerald-500/50">/</span>
            <span className="text-white font-semibold">{item.title || item.code}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                {type === 'werkstoffe' ? `${item.code} – ${item.name}` : item.title}
              </h1>

              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
                {item.shortDesc || item.subtitle || item.desc}
              </p>

              {/* Action Buttons: Pixel-perfect vertical alignment */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <SpecialCtaButton
                  text="Projekt anfragen"
                  onClick={(e) => {
                    if (e) e.preventDefault();
                    if (onOpenRequestModal) {
                      onOpenRequestModal(item);
                    } else {
                      document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />

                <a
                  href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
                  className="h-[52px] px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2 shrink-0"
                >
                  <Phone className="w-4 h-4 text-emerald-300" />
                  <span>Direktberatung: {COMPANY_FACTS.phone}</span>
                </a>
              </div>
            </div>

            {/* Key Quick Specs Card in Header */}
            <div className="lg:col-span-5">
              <div className="bg-[#09200f]/90 backdrop-blur-md border border-emerald-400/25 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xl">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block font-bold">
                    Technische Eckdaten
                  </span>
                </div>

                {renderTechnicalSpecs()}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Editorial Content + Multi-Photo Gallery */}
      <section className="py-16 sm:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Interactive Authentic Weber Photo Gallery */}
            <div className="lg:col-span-7 space-y-3">
              <div 
                onClick={() => setLightboxOpen(true)}
                className="relative rounded-2xl overflow-hidden border border-neutral-200/90 bg-slate-900 aspect-[16/11] cursor-zoom-in group shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
              >
                <img 
                  src={currentImage} 
                  alt={`${item.title || item.code}`} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span className="absolute bottom-4 right-4 p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Thumbnail Strip (all assigned Weber photos) */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-1">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-[#1c5f2e] ring-2 ring-[#1c5f2e]/30 scale-[1.02]'
                          : 'border-neutral-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Detailed Engineering Description, Features & Media */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-7 sm:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                    Konstruktion & Ausführung
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Maßgeschneiderte Auslegung nach Ihren Prozessdaten
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.longDesc || item.description || item.desc}
                </p>

                {/* Features / Highlights List */}
                {(item.features || item.highlights) && (
                  <div className="pt-4 border-t border-neutral-100 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-800">
                      Leistungsmerkmale & Konstruktionsdetails
                    </h3>
                    <ul className="space-y-2.5">
                      {(item.features || item.highlights).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                          <span className="font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Media Examples for Anwendungsgebiete */}
                {item.mediaExamples && item.mediaExamples.length > 0 && (
                  <div className="pt-4 border-t border-neutral-100">
                    <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-800 mb-3">
                      Typische Medien & Einsatzbereiche
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.mediaExamples.map((med, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[#0d2a14]/5 border border-[#1c5f2e]/20 text-xs font-semibold text-[#0d2a14]"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications for Werkstoffe */}
                {item.applications && item.applications.length > 0 && (
                  <div className="pt-4 border-t border-neutral-100">
                    <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-800 mb-3">
                      Typische Bauteile & Anwendungen
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[#0d2a14]/5 border border-[#1c5f2e]/20 text-xs font-semibold text-[#0d2a14]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Direct Engineering Contact Card (Vibrant Green + Hatched Dashed Accent) */}
              <div
                className="text-white rounded-2xl p-6 sm:p-7 border border-[#1c5f2e]/60 space-y-4 relative overflow-hidden shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #389e54 0%, #2c8945 55%, #217036 100%)'
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none select-none z-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.085) 0px, rgba(255, 255, 255, 0.085) 1.5px, transparent 1.5px, transparent 10px)`
                  }}
                />
                <div className="relative z-10 space-y-3 border border-dashed border-white/35 rounded-xl p-5 bg-[#071a0c]/10">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#071a0c] font-extrabold">
                    <span className="w-5 h-[2px] bg-[#071a0c]" />
                    <span>Projektberatung & Statik:</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                    <span className="text-white">Sie planen ein Vorhaben im Bereich </span>
                    <span className="text-[#071a0c]">{item.title || item.code}?</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                    Unsere Projektingenieure in Minden unterstützen Sie bei{' '}
                    <strong className="font-extrabold text-white">Werkstoffwahl, Aufstellungsplanung und statischer Vorbemessung</strong>.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        if (onOpenRequestModal) {
                          onOpenRequestModal(item);
                        } else {
                          document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FBF9F5] text-[#071a0c] font-extrabold text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      Jetzt Spezifikation senden
                    </button>
                    <button
                      onClick={() => onNavigate('/downloads')}
                      className="px-4 py-2.5 rounded-xl bg-[#071a0c]/25 hover:bg-[#071a0c]/40 border border-dashed border-white/40 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Zertifikate & Prospekte</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Full-Width Spacious Chemical Resistance Matrix for Werkstoffe */}
          {type === 'werkstoffe' && chemicalProfile.length > 0 && (
            <div className="mt-12 sm:mt-16 bg-white rounded-3xl border border-neutral-200/90 p-7 sm:p-10 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                    Chemische Beständigkeit
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Beständigkeitsübersicht für {item.name || item.code}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                    Praxisbewährte Richtwerte für thermoplastische Behälter und Apparate. Für individuelle Prozessparameter, Konzentrationen und Mischmedien führen unsere Ingenieure in Minden die detaillierte Auslegung durch.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onOpenRequestModal) {
                      onOpenRequestModal({ 
                        title: `${item.name || item.code} Beständigkeitsprüfung`, 
                        type: 'werkstoff' 
                      });
                    } else {
                      document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#154220] text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Medium prüfen lassen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Clean, spacious 3-column responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chemicalProfile.map((c, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FBF9F5] border border-neutral-200/70 hover:border-neutral-300 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {c.name}
                        </h4>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold shrink-0 ${
                          c.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                          c.grade === 'B' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {c.statusLabel}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 block mb-2">
                        Konzentration: {c.conc}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 pt-2.5 border-t border-neutral-200/60 leading-relaxed">
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Sibling / Related Subpages Directory */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                Gesamtübersicht
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Weitere {type === 'anwendungsgebiete' ? 'Anwendungsgebiete' : type === 'produkte' ? 'Produktbereiche' : 'Werkstoffe'} entdecken
              </h2>
            </div>
            <button
              onClick={() => onNavigate(`/${type}`)}
              className="text-xs font-bold text-[#1c5f2e] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Alle {type === 'anwendungsgebiete' ? 'Anwendungsgebiete' : type === 'produkte' ? 'Produkte' : 'Werkstoffe'} im Überblick</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allItems.map((rel) => {
              const isCurrent = rel.id === item.id;
              return (
                <button
                  key={rel.id}
                  onClick={() => onNavigate(`${basePath}/${rel.id}`)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                    isCurrent
                      ? 'bg-[#0d2a14] text-white border-[#1c5f2e] shadow-md'
                      : 'bg-[#FBF9F5] hover:bg-white text-slate-900 border-neutral-200/90 hover:border-[#1c5f2e]/50'
                  }`}
                >
                  <img
                    src={rel.image || rel.gallery?.[0]}
                    alt={rel.title || rel.code}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-black/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                      {rel.code ? `${rel.code} – ${rel.name}` : rel.title}
                    </div>
                    <div className={`text-[11px] truncate mt-0.5 ${isCurrent ? 'text-emerald-300' : 'text-slate-500'}`}>
                      {rel.norm || rel.temp || 'Details ansehen →'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. High-End Closing CTA leading to Pre-filled Request Modal */}
      <ClosingCtaSection 
        onOpenRequestModal={() => onOpenRequestModal && onOpenRequestModal(item)} 
        onNavigate={onNavigate} 
      />

      {/* Lightbox Modal for High-Res Photo Inspection */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev + 1) % gallery.length)}
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full flex flex-col items-center">
            <img
              src={currentImage}
              alt={item.title || item.code}
              className="max-h-[80vh] w-auto object-contain rounded-xl border border-white/15 shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <div className="text-sm font-bold">{item.title || item.name}</div>
              <div className="text-xs text-emerald-300 font-mono mt-0.5">
                Bild {activeImageIdx + 1} von {gallery.length} · Kunststofftechnik Weber GmbH
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
