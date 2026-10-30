import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, FileText, Download, ExternalLink, Search, FolderOpen, ShieldCheck } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { COMPANY_FACTS, IMAGES } from '../data/weberData';

export default function DownloadsPage({ onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "28%"]);
  const { downloadCategories, downloads } = useCms();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredDownloads = downloads.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.categoryId === selectedCategory;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      doc.title.toLowerCase().includes(q) ||
      (doc.subtitle && doc.subtitle.toLowerCase().includes(q)) ||
      (doc.lang && doc.lang.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  // Group by category for structured display
  const categoriesToDisplay = selectedCategory === 'all'
    ? downloadCategories
    : downloadCategories.filter((c) => c.id === selectedCategory);

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      
      {/* 1. Architectural Subpage Header with Zulassungs-Parallax */}
      <section 
        ref={heroRef}
        className="relative bg-[#0d2a14] text-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 border-b border-[#1c5f2e]/50 overflow-hidden"
      >
        {/* Background Layers with GPU Parallax, Green Multiplied Tint & Masks */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
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
                maskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)",
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)"
              }}
            >
              <img 
                src={IMAGES.zulassungBanner || IMAGES.heavyTransport} 
                alt="Offizielle Zulassungen Kunststofftechnik Weber" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[#1c5f2e] opacity-[0.88] mix-blend-multiply" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/80 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 z-[1]" />
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
            }}
          />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-weber-400/15 rounded-full blur-[140px] pointer-events-none z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-8">
            <button onClick={() => onNavigate('/')} className="hover:text-white flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
            <span className="text-emerald-500/50">/</span>
            <span className="text-white font-semibold">Downloadbereich</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Downloadbereich
            </h1>
            <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
              Laden Sie aktuelle Unternehmensprospekte, amtliche Zulassungen (WHG, ISO 9001:2015, SCC**), 
              unsere AGB sowie verbindliche Transport-, Lager- und Montageanweisungen direkt als PDF herunter.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Filter Bar & Category Tabs */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-sm mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#0d2a14] text-white shadow-sm'
                    : 'bg-[#FBF9F5] text-slate-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Alle Kategorien ({downloads.length})
              </button>
              {downloadCategories.map((cat) => {
                const count = downloads.filter((d) => d.categoryId === cat.id).length;
                const catLabel = cat.title || cat.name || cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#0d2a14] text-white shadow-sm'
                        : 'bg-[#FBF9F5] text-slate-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {catLabel} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Dokument oder Sprache suchen..."
                className="w-full pl-10 pr-4 py-2 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1c5f2e]"
              />
            </div>
          </div>

          {/* 3. Categorized Document Sections */}
          <div className="space-y-14">
            {categoriesToDisplay.map((cat) => {
              const catDocs = filteredDownloads.filter((d) => d.categoryId === cat.id);
              if (catDocs.length === 0) return null;
              const catLabel = cat.title || cat.name || cat.id;

              return (
                <div key={cat.id} className="space-y-6">
                  <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-1">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Kategorie</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {catLabel}
                      </h2>
                      {cat.description && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {catDocs.length} {catDocs.length === 1 ? 'Dokument' : 'Dokumente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between hover:border-[#1c5f2e]/60 hover:shadow-md transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d2a14]/5 text-[#0d2a14] font-mono text-[11px] font-bold border border-[#1c5f2e]/20">
                              <FileText className="w-3.5 h-3.5 text-[#1c5f2e]" />
                              <span>PDF · {doc.lang || 'DE'}</span>
                            </span>
                            {doc.fileSize && (
                              <span className="text-[11px] font-mono text-slate-400">
                                {doc.fileSize}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors mb-1.5">
                            {doc.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {doc.subtitle}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF öffnen / Download</span>
                          </a>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="In neuem Tab öffnen"
                            className="p-2.5 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 text-slate-700 border border-neutral-200 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredDownloads.length === 0 && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <p className="text-sm font-bold text-slate-800 mb-1">Keine passenden Dokumente gefunden.</p>
                <p className="text-xs text-slate-500 mb-4">Bitte passen Sie Ihren Suchbegriff oder die Kategorieauswahl an.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0d2a14] text-white text-xs font-bold"
                >
                  Alle Dokumente anzeigen
                </button>
              </div>
            )}
          </div>

          {/* Info Note on Custom Certificates */}
          <div className="mt-16 bg-[#0d2a14] text-white rounded-2xl p-7 sm:p-8 border border-[#1c5f2e]/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 block">
                Projektbezogene Nachweise & Prüfzeugnisse
              </span>
              <h3 className="text-lg sm:text-xl font-bold">
                Sie benötigen ein spezifisches DIBt-Prüfzeugnis oder eine Schweißerqualifikation nach DVS 2212-1?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                Einzelne bauaufsichtliche Zulassungen und Werksprüfzeugnisse 3.1 stellen wir Ihnen gerne projektbezogen zur Verfügung.
              </p>
            </div>
            <a
              href={`mailto:${COMPANY_FACTS.salesEmail}?subject=Anfrage%20Pruefzeugnis%20%2F%20Dokumentation`}
              className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#071a0c] font-bold text-xs sm:text-sm shrink-0 transition-colors"
            >
              Dokumentation anfordern &rarr;
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
