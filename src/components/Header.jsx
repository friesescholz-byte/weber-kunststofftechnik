import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, Menu, ArrowRight, FileText, FlaskConical, Layers, Briefcase } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { CHEMICAL_DATABASE } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';

export default function Header({ currentPath, onNavigate, onSearchQuery, onSelectCategory, onOpenRequestModal }) {
  const { anwendungsgebiete, produkte, werkstoffe, downloads, jobs } = useCms();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamische 3-Spalten-Aufteilung für Anwendungsgebiete (inkl. im Admin neu angelegter Einträge)
  const anwendungenClusters = useMemo(() => {
    const list = anwendungsgebiete || [];
    const colSize = Math.ceil(list.length / 3) || 4;
    return [
      { title: "Chemie & Schwerindustrie", items: list.slice(0, colSize) },
      { title: "Umwelt & Prozesstechnik", items: list.slice(colSize, colSize * 2) },
      { title: "Infrastruktur & Sonderbau", items: list.slice(colSize * 2) }
    ];
  }, [anwendungsgebiete]);

  // Dynamische 3-Spalten-Aufteilung für Produkte (alle 11+ Produkte)
  const produkteClusters = useMemo(() => {
    const list = produkte || [];
    const colSize = Math.ceil(list.length / 3) || 4;
    return [
      { title: "Tanks & Großbehälter", items: list.slice(0, colSize) },
      { title: "Umwelt & Verfahrenstechnik", items: list.slice(colSize, colSize * 2) },
      { title: "Montage, Logistik & Engineering", items: list.slice(colSize * 2) }
    ];
  }, [produkte]);

  // Dynamische 3-Spalten-Aufteilung für Werkstoffe (alle 7+ Werkstoffe)
  const werkstoffeClusters = useMemo(() => {
    const list = werkstoffe || [];
    return [
      { title: "Standard-Thermoplaste", items: list.slice(0, 3) },
      { title: "Fluorpolymere & High Purity", items: list.slice(3, 6) },
      {
        title: "Spezial- & Verbundwerkstoffe",
        items: [
          ...list.slice(6),
          {
            id: "verbundbehaelter-link",
            isProductLink: true,
            targetRoute: "/produkte/verbundbehaelter",
            code: "GFK / Dual-Laminate",
            name: "Verbundbauweise mit Inliner",
            temp: "bis +140 °C"
          },
          {
            id: "zertifikate-link",
            isPageLink: true,
            targetRoute: "/ueber-uns#zertifizierungen",
            code: "DVS 2207 / DIBt",
            name: "Geprüfte Schweiß- & Werkstoffgüte",
            temp: "ISO 9001"
          }
        ]
      }
    ];
  }, [werkstoffe]);

  // Intelligente Echtzeit-Suchvorschläge (Produkte, Werkstoffe, Anwendungsgebiete, Chemikalien, Downloads, Jobs)
  const liveResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    const matches = [];

    (produkte || []).forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'Produkt',
          title: p.title,
          sub: p.subtitle || 'Produktbereich',
          route: `/produkte/${p.id}`,
        });
      }
    });

    (anwendungsgebiete || []).forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        (a.desc && a.desc.toLowerCase().includes(q)) ||
        (a.specs && a.specs.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'Anwendungsgebiet',
          title: a.title,
          sub: a.tag || 'Branchenlösung',
          route: `/anwendungsgebiete/${a.id}`,
        });
      }
    });

    (werkstoffe || []).forEach((w) => {
      if (
        w.code.toLowerCase().includes(q) ||
        w.name.toLowerCase().includes(q) ||
        (w.desc && w.desc.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'Werkstoff',
          title: `${w.code} – ${w.name}`,
          sub: `Temperaturbereich: ${w.temp}`,
          route: `/werkstoffe/${w.id}`,
        });
      }
    });

    CHEMICAL_DATABASE.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.empfohlenerWerkstoff.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'Chemikalie / Medium',
          title: `${c.name} (${c.concentration})`,
          sub: `Empfehlung: ${c.empfohlenerWerkstoff} · ${c.behälter}`,
          route: c.targetRoute || '/werkstoffe/pe-polyethylen',
        });
      }
    });

    (downloads || []).forEach((d) => {
      if (
        d.title.toLowerCase().includes(q) ||
        (d.description && d.description.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'Download (PDF)',
          title: d.title,
          sub: d.fileSize || 'PDF-Dokument',
          route: '/downloads',
        });
      }
    });

    (jobs || []).forEach((j) => {
      if (j.active !== false && j.title.toLowerCase().includes(q)) {
        matches.push({
          type: 'Karriere / Job',
          title: j.title,
          sub: `${j.department} · ${j.location}`,
          route: `/karriere?job=${j.id}`,
        });
      }
    });

    return matches.slice(0, 7);
  }, [searchTerm, produkte, anwendungsgebiete, werkstoffe, downloads, jobs]);

  const handleRoute = (e, route, item) => {
    if (e) e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    if (item && onSelectCategory) {
      onSelectCategory(item);
    }
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (liveResults.length > 0) {
      const top = liveResults[0];
      setSearchFocused(false);
      setSearchTerm('');
      if (onNavigate) onNavigate(top.route);
      return;
    }
    if (onSearchQuery && searchTerm.trim()) {
      onSearchQuery(searchTerm.trim());
      setSearchFocused(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06170c]/95 backdrop-blur-md border-b border-emerald-900/50 shadow-xl shadow-black/25 py-3 sm:py-3.5' 
          : 'bg-[#06170c]/65 backdrop-blur-md border-b border-white/15 shadow-lg shadow-black/20 py-5 sm:py-6 lg:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 xl:gap-8 transition-all duration-300">
        
        {/* Offizielles Weber Firmenlogo */}
        <a
          href="/"
          onClick={(e) => handleRoute(e, '/')}
          className="flex items-center shrink-0 group"
        >
          <img 
            src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik/weber-logo-clean.webp" 
            alt="Kunststofftechnik Weber GmbH" 
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled 
                ? 'h-8 sm:h-9 md:h-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]' 
                : 'h-11 sm:h-12 md:h-14 lg:h-16 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]'
            }`}
          />
        </a>

        {/* Desktop Navigation */}
        <nav 
          className={`hidden lg:flex items-center gap-3.5 xl:gap-6 text-sm font-medium transition-colors duration-300 ${
            isScrolled ? 'text-neutral-200' : 'text-white/90'
          }`}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* 1. Produkte Dropdown */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('produkte')}
              onClick={(e) => handleRoute(e, '/#produkte')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'produkte' || currentPath?.startsWith('/produkte') ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Produkte</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'produkte' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-x-2 gap-y-0.5 animate-in fade-in duration-150 z-50 text-slate-900">
                {(produkte || []).map((p) => (
                  <a
                    key={p.id}
                    href={`/produkte/${p.id}`}
                    onClick={(e) => handleRoute(e, `/produkte/${p.id}`, p)}
                    className="text-xs text-slate-700 hover:text-[#1c5f2e] hover:bg-emerald-50/70 px-2.5 py-1.5 rounded-lg transition-colors font-semibold flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{p.title}</span>
                    <ArrowRight className="w-3 h-3 text-[#1c5f2e] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}

                <div className="col-span-2 pt-2 mt-1.5 border-t border-neutral-100 px-2.5 flex justify-between items-center text-xs">
                  <a 
                    href="/#produkte" 
                    onClick={(e) => handleRoute(e, '/#produkte')} 
                    className="font-bold text-[#1c5f2e] hover:underline flex items-center gap-1"
                  >
                    <span>Alle {produkte.length} Produkte im Überblick</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 2. Werkstoffe Dropdown */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('werkstoffe')}
              onClick={(e) => handleRoute(e, '/#werkstoffe')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'werkstoffe' || currentPath?.startsWith('/werkstoffe') ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Werkstoffe</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'werkstoffe' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-3.5 flex flex-col space-y-0.5 animate-in fade-in duration-150 z-50 text-slate-900">
                {(werkstoffe || []).map((w) => {
                  const cleanName = w.name || w.code;
                  return (
                    <a
                      key={w.id}
                      href={`/werkstoffe/${w.id}`}
                      onClick={(e) => handleRoute(e, `/werkstoffe/${w.id}`, w)}
                      className="text-xs text-slate-700 hover:text-[#1c5f2e] hover:bg-emerald-50/70 px-2.5 py-1.5 rounded-lg transition-colors font-semibold flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{cleanName}</span>
                      <ArrowRight className="w-3 h-3 text-[#1c5f2e] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </a>
                  );
                })}

                <div className="pt-2 mt-1.5 border-t border-neutral-100 px-2.5 flex justify-between items-center text-xs">
                  <a 
                    href="/#werkstoffe" 
                    onClick={(e) => handleRoute(e, '/#werkstoffe')} 
                    className="font-bold text-[#1c5f2e] hover:underline flex items-center gap-1"
                  >
                    <span>Alle {werkstoffe.length} Werkstoffe im Überblick</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Anwendungsgebiete Dropdown (an dritter Stelle) */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('anwendungen')}
              onClick={(e) => handleRoute(e, '/#anwendungsgebiete')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'anwendungen' || currentPath?.startsWith('/anwendungsgebiete') ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Anwendungsgebiete</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'anwendungen' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-x-2 gap-y-0.5 animate-in fade-in duration-150 z-50 text-slate-900">
                {(anwendungsgebiete || []).map((item) => (
                  <a
                    key={item.id}
                    href={`/anwendungsgebiete/${item.id}`}
                    onClick={(e) => handleRoute(e, `/anwendungsgebiete/${item.id}`, item)}
                    className="text-xs text-slate-700 hover:text-[#1c5f2e] hover:bg-emerald-50/70 px-2.5 py-1.5 rounded-lg transition-colors font-semibold flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{item.title}</span>
                    <ArrowRight className="w-3 h-3 text-[#1c5f2e] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}

                <div className="col-span-2 pt-2 mt-1.5 border-t border-neutral-100 px-2.5 flex justify-between items-center text-xs">
                  <a 
                    href="/#anwendungsgebiete" 
                    onClick={(e) => handleRoute(e, '/#anwendungsgebiete')} 
                    className="font-bold text-[#1c5f2e] hover:underline flex items-center gap-1"
                  >
                    <span>Alle {anwendungsgebiete.length} Fachbereiche im Überblick</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 4. Über uns / Unternehmen (mit Schnellzugriff auf Philosophie, Zertifizierungen & Standorte) */}
          <div className="relative py-2">
            <a 
              href="/ueber-uns" 
              onMouseEnter={() => setActiveDropdown('unternehmen')}
              onClick={(e) => handleRoute(e, '/ueber-uns')}
              className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap ${
                currentPath?.startsWith('/ueber-uns') ? 'text-white font-semibold bg-white/10' : ''
              }`}
            >
              <span>Über uns</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </a>

            {activeDropdown === 'unternehmen' && (
              <div className="absolute top-full left-0 w-64 bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-4 flex flex-col space-y-1 animate-in fade-in duration-150 z-50 text-slate-900">
                <a
                  href="/ueber-uns"
                  onClick={(e) => handleRoute(e, '/ueber-uns')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-semibold flex items-center justify-between group"
                >
                  <span>Unternehmen & Historie</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
                <a
                  href="/ueber-uns#philosophie"
                  onClick={(e) => handleRoute(e, '/ueber-uns#philosophie')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-medium flex items-center justify-between group"
                >
                  <span>Firmenphilosophie</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
                <a
                  href="/ueber-uns#zertifizierungen"
                  onClick={(e) => handleRoute(e, '/ueber-uns#zertifizierungen')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-medium flex items-center justify-between group"
                >
                  <span>Zertifizierungen & Qualität</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
                <a
                  href="/ueber-uns#standorte"
                  onClick={(e) => handleRoute(e, '/ueber-uns#standorte')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-medium flex items-center justify-between group"
                >
                  <span>Standorte weltweit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
              </div>
            )}
          </div>

          {/* 5. Downloads */}
          <a 
            href="/downloads" 
            onClick={(e) => handleRoute(e, '/downloads')}
            className={`hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap ${
              currentPath === '/downloads' ? 'text-white font-semibold bg-white/10' : ''
            }`}
          >
            Downloads
          </a>

          {/* 6. Karriere */}
          <div className="relative py-2">
            <a 
              href="/karriere" 
              onMouseEnter={() => setActiveDropdown('karriere')}
              onClick={(e) => handleRoute(e, '/karriere')}
              className={`flex items-center gap-1 hover:text-white transition-colors text-emerald-400 font-semibold px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap ${
                currentPath?.startsWith('/karriere') ? 'bg-white/10 text-emerald-300' : ''
              }`}
            >
              <span>Karriere</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </a>

            {activeDropdown === 'karriere' && (
              <div className="absolute top-full right-0 w-64 bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-4 flex flex-col space-y-1 animate-in fade-in duration-150 z-50 text-slate-900">
                <a
                  href="/karriere#jobs"
                  onClick={(e) => handleRoute(e, '/karriere#jobs')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-semibold flex items-center justify-between group"
                >
                  <span>Jobportal ({jobs.filter(j => j.active !== false).length} Stellen)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
                <a
                  href="/karriere#ausbildung"
                  onClick={(e) => handleRoute(e, '/karriere#ausbildung')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-medium flex items-center justify-between group"
                >
                  <span>Ausbildungsangebote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
                <a
                  href="/karriere#arbeitgeber"
                  onClick={(e) => handleRoute(e, '/karriere#arbeitgeber')}
                  className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-3 py-2 rounded-lg font-medium flex items-center justify-between group"
                >
                  <span>Wir als Arbeitgeber</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-weber-700" />
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Intelligentes Suchfeld & Kontakt-Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className={`flex items-center border rounded-lg px-2.5 py-1.5 transition-all shadow-xs w-32 sm:w-40 xl:w-48 ${
                isScrolled 
                  ? 'bg-black/35 hover:bg-black/45 focus-within:bg-black/60 border-emerald-800/50 text-white' 
                  : 'bg-white/10 hover:bg-white/15 focus-within:bg-white/20 border-white/20 text-white'
              }`}>
                <Search className={`w-3.5 h-3.5 mr-2 shrink-0 ${isScrolled ? 'text-emerald-400' : 'text-white/80'}`} />
                <input
                  type="text"
                  value={searchTerm}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="z.B. Salzsäure, PVDF..."
                  className="w-full text-xs text-white placeholder:text-white/60 bg-transparent outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-white/60 hover:text-white p-0.5 shrink-0"
                    title="Zurücksetzen"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </form>

            {/* Live-Suchvorschläge Dropdown */}
            {searchFocused && searchTerm.trim().length >= 2 && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-900">
                <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Direkt-Treffer ({liveResults.length})
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Industrie-Sofortsuche
                  </span>
                </div>
                {liveResults.length > 0 ? (
                  <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                    {liveResults.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.route}
                        onMouseDown={(e) => handleRoute(e, res.route)}
                        className="px-4 py-3 hover:bg-emerald-50/50 flex items-start justify-between gap-3 transition-colors block"
                      >
                        <div>
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded mb-1">
                            {res.type}
                          </span>
                          <div className="text-xs font-bold text-slate-900">{res.title}</div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">{res.sub}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-neutral-500">
                    Keine direkten Treffer für „{searchTerm}“. Drücken Sie Enter für die Volltextsuche.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary Action Button: Weber Special CTA (compact size='sm') */}
          <div className="hidden sm:block">
            <SpecialCtaButton
              size="sm"
              text="Projekt anfragen"
              onClick={(e) => {
                if (e) e.preventDefault();
                if (onOpenRequestModal) {
                  onOpenRequestModal();
                } else {
                  handleRoute(e, '/#anfrage');
                }
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-emerald-300 rounded-lg"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/40 bg-[#06170c]/98 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-emerald-800/60 rounded-lg px-3 py-2 bg-black/40 mb-4">
            <Search className="w-4 h-4 text-emerald-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suchbegriff eingeben (z.B. Salzsäure, Tank)..."
              className="text-xs text-white placeholder:text-white/50 w-full outline-none bg-transparent"
            />
          </form>

          <div className="flex flex-col space-y-3 text-sm font-medium text-white/90">
            <a href="/#produkte" onClick={(e) => handleRoute(e, '/#produkte')} className="py-1.5 hover:text-emerald-400 transition-colors flex justify-between items-center border-b border-white/10">
              <span>Produkte ({produkte.length})</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="/#werkstoffe" onClick={(e) => handleRoute(e, '/#werkstoffe')} className="py-1.5 hover:text-emerald-400 transition-colors flex justify-between items-center border-b border-white/10">
              <span>Werkstoffe ({werkstoffe.length})</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="/#anwendungsgebiete" onClick={(e) => handleRoute(e, '/#anwendungsgebiete')} className="py-1.5 hover:text-emerald-400 transition-colors flex justify-between items-center border-b border-white/10">
              <span>Anwendungsgebiete ({anwendungsgebiete.length})</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="/ueber-uns" onClick={(e) => handleRoute(e, '/ueber-uns')} className="py-1.5 hover:text-emerald-400 transition-colors flex justify-between items-center border-b border-white/10">
              <span>Über uns & Standorte</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="/downloads" onClick={(e) => handleRoute(e, '/downloads')} className="py-1.5 hover:text-emerald-400 transition-colors flex justify-between items-center border-b border-white/10">
              <span>Downloads & Zertifikate</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
            <a href="/karriere" onClick={(e) => handleRoute(e, '/karriere')} className="py-1.5 text-emerald-400 font-semibold flex justify-between items-center">
              <span>Karriere & Jobportal</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

          <div className="pt-4 border-t border-emerald-900/60 flex justify-center">
            <SpecialCtaButton
              size="sm"
              text="Projekt anfragen"
              onClick={(e) => {
                if (e) e.preventDefault();
                setMobileMenuOpen(false);
                if (onOpenRequestModal) {
                  onOpenRequestModal();
                } else {
                  handleRoute(e, '/#anfrage');
                }
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
