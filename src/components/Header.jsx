import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { ANWENDUNGSGEBIETE, PRODUKTE, WERKSTOFFE } from '../data/weberData';

// Strukturierte Cluster für Anwendungsgebiete (3 kompakte, logische Spalten)
const ANWENDUNGEN_CLUSTERS = [
  {
    title: "Chemie & Schwerindustrie",
    items: [
      { id: "chemie-tanklaeger", title: "Chemie Tankläger" },
      { id: "hochreine-chemie", title: "Hochreine Chemie (UHP)" },
      { id: "galvanotechnik", title: "Galvanotechnik & Eloxal" },
      { id: "feuerverzinkung", title: "Feuerverzinkung & Beizen" },
    ]
  },
  {
    title: "Umwelt & Prozesstechnik",
    items: [
      { id: "abluft-umwelttechnik", title: "Abluft- & Umwelttechnik" },
      { id: "abwasserbehandlung", title: "Abwasserbehandlung" },
      { id: "fuellen-dosieren", title: "Füllen & Dosieren" },
      { id: "lebensmittelindustrie", title: "Lebensmittelindustrie" },
    ]
  },
  {
    title: "Infrastruktur & Sonderbau",
    items: [
      { id: "rohrleitungsbau-sektor", title: "Rohrleitungsbau" },
      { id: "passive-lagerung", title: "Passive Lagerung (WHG)" },
      { id: "stahlbau", title: "Stahlbau & Tragwerke" },
      { id: "sonderbauten", title: "Sonderbauten & Prototypen" },
    ]
  }
];

// Strukturierte Cluster für Produkte (3 kompakte Spalten)
const PRODUKTE_CLUSTERS = [
  {
    title: "Tanks & Großbehälter",
    items: [
      { id: "lager-prozessbehaelter-rund", title: "Lagerbehälter Rund (DIBt)" },
      { id: "lager-prozessbehaelter-rechteck", title: "Lagerbehälter Rechteck" },
      { id: "silos-schuettgut", title: "Silos & Schüttgutbehälter" },
      { id: "auffangwannen-sicherheit", title: "Auffangwannen & WHG" },
    ]
  },
  {
    title: "Umwelt & Verfahrenstechnik",
    items: [
      { id: "abluftwaescher-kolonnen", title: "Abluftwäscher & Kolonnen" },
      { id: "dosierstationen-mischanlagen", title: "Dosier- & Mischanlagen" },
      { id: "galvanik-prozessbecken", title: "Galvanik & Prozessbecken" },
      { id: "lueftung-schalldaempfer", title: "Schalldämpfer & Lüftung" },
    ]
  },
  {
    title: "Rohre, Armaturen & Baugruppen",
    items: [
      { id: "industrierohrleitungsbau", title: "Industrierohrleitungsbau" },
      { id: "armaturen-pumpen-zubehoer", title: "Armaturen & Messtechnik" },
      { id: "sonderapparate-baugruppen", title: "Sonderapparatebau" },
    ]
  }
];

// Strukturierte Cluster für Werkstoffe (3 saubere Spalten für maximale Übersichtlichkeit)
const WERKSTOFFE_CLUSTERS = [
  {
    title: "Standard-Thermoplaste",
    items: [
      { id: "pe-polyethylen", code: "PE 100", name: "Polyethylen · Laugen & Wässer", temp: "bis +60 °C" },
      { id: "pp-polypropylen", code: "PP-H / PP-s", name: "Polypropylen · Säuren & Beizen", temp: "bis +100 °C" },
      { id: "pvc-polyvinylchlorid", code: "PVC-U / PVC-C", name: "Polyvinylchlorid · Abluft & Wäscher", temp: "bis +85 °C" },
    ]
  },
  {
    title: "Fluorpolymere & High Purity",
    items: [
      { id: "pvdf", code: "PVDF", name: "Fluorpolymer · Reinstmedien", temp: "bis +140 °C" },
      { id: "ectfe", code: "ECTFE (Halar®)", name: "Ethylen-CTFE · Chlorgas", temp: "bis +150 °C" },
      { id: "pfa", code: "PFA", name: "Perfluoralkoxy · Universell inert", temp: "bis +260 °C" },
    ]
  },
  {
    title: "Verbundwerkstoffe & Güte",
    items: [
      { id: "dual-laminate", code: "Thermoplast / GFK", name: "Dual-Laminat Großtanks", temp: "Bis 100 m³" },
      { id: "schweisszusatz", code: "DVS-Zulassung", name: "Geprüfte Schweißfachkräfte", temp: "DVS 2207" },
      { id: "lining", code: "Liner & Inlining", name: "Korrosionsfeste Auskleidung", temp: "WHG & DIBt" },
    ]
  }
];

export default function Header({ onSearchQuery, onSelectCategory }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchQuery && searchTerm.trim()) {
      onSearchQuery(searchTerm.trim());
    }
  };

  const handleNavClick = (anchor, item) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (item && onSelectCategory) {
      onSelectCategory(item);
    }
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06170c]/95 backdrop-blur-md border-b border-emerald-900/50 shadow-xl shadow-black/25 py-2.5 sm:py-3' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent py-4 sm:py-5 lg:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 xl:gap-8 transition-all duration-300">
        
        {/* Offizielles Weber Firmenlogo (reinweiß, groß und ausgewogen) */}
        <a href="#top" className="flex items-center shrink-0 group">
          <img 
            src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik/weber-logo-1-fbg-weiss-1024x410_11.webp" 
            alt="Kunststofftechnik Weber GmbH" 
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled 
                ? 'h-8 sm:h-9 md:h-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]' 
                : 'h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]'
            }`}
          />
        </a>

        {/* Desktop Navigation mit großzügigem Raum & ohne Einquetschen */}
        <nav 
          className={`hidden lg:flex items-center gap-3.5 xl:gap-6 text-sm font-medium transition-colors duration-300 ${
            isScrolled ? 'text-neutral-200' : 'text-white/90'
          }`}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* 1. Anwendungsgebiete Dropdown */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('anwendungen')}
              onClick={() => handleNavClick('anwendungsgebiete')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'anwendungen' ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Anwendungsgebiete</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'anwendungen' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150 z-50 text-slate-900">
                {ANWENDUNGEN_CLUSTERS.map((group, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-neutral-100">
                      {group.title}
                    </span>
                    <div className="flex flex-col space-y-1">
                      {group.items.map((item) => {
                        const fullItem = ANWENDUNGSGEBIETE.find(a => a.id === item.id) || item;
                        return (
                          <a
                            key={item.id}
                            href="#anwendungsgebiete"
                            onClick={() => handleNavClick('anwendungsgebiete', fullItem)}
                            className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-2 py-1.5 rounded-md transition-colors font-medium flex items-center justify-between group"
                          >
                            <span>{item.title}</span>
                            <ArrowRight className="w-3 h-3 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Footer Bar */}
                <div className="col-span-3 pt-3 border-t border-neutral-100 flex justify-end items-center bg-neutral-50/60 -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl">
                  <a 
                    href="#anwendungsgebiete" 
                    onClick={() => setActiveDropdown(null)} 
                    className="text-xs font-bold text-weber-700 hover:text-weber-800 flex items-center gap-1"
                  >
                    <span>Alle 12 Bereiche ansehen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 2. Produkte Dropdown */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('produkte')}
              onClick={() => handleNavClick('produkte')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'produkte' ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Produkte</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'produkte' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150 z-50 text-slate-900">
                {PRODUKTE_CLUSTERS.map((group, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-neutral-100">
                      {group.title}
                    </span>
                    <div className="flex flex-col space-y-1">
                      {group.items.map((item) => {
                        const fullItem = PRODUKTE.find(p => p.id === item.id) || item;
                        return (
                          <a
                            key={item.id}
                            href="#produkte"
                            onClick={() => handleNavClick('produkte', fullItem)}
                            className="text-xs text-slate-700 hover:text-weber-700 hover:bg-neutral-50 px-2 py-1.5 rounded-md transition-colors font-medium flex items-center justify-between group"
                          >
                            <span>{item.title}</span>
                            <ArrowRight className="w-3 h-3 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Footer Bar */}
                <div className="col-span-3 pt-3 border-t border-neutral-100 flex justify-end items-center bg-neutral-50/60 -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl">
                  <a 
                    href="#produkte" 
                    onClick={() => setActiveDropdown(null)} 
                    className="text-xs font-bold text-weber-700 hover:text-weber-800 flex items-center gap-1"
                  >
                    <span>Gesamtes Sortiment öffnen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Werkstoffe Dropdown – JETZT SAUBER & ÜBERSICHTLICH IN 3 SPALTEN */}
          <div className="relative py-2">
            <button 
              onMouseEnter={() => setActiveDropdown('werkstoffe')}
              onClick={() => handleNavClick('werkstoffe')}
              className={`flex items-center gap-1 transition-colors hover:text-white px-1.5 py-1 rounded-md ${
                activeDropdown === 'werkstoffe' ? 'text-white font-semibold' : ''
              }`}
            >
              <span>Werkstoffe</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80" />
            </button>

            {activeDropdown === 'werkstoffe' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150 z-50 text-slate-900">
                {WERKSTOFFE_CLUSTERS.map((group, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 pb-1 border-b border-neutral-100">
                      {group.title}
                    </span>
                    <div className="flex flex-col space-y-1.5">
                      {group.items.map((item) => {
                        const fullItem = WERKSTOFFE.find(w => w.id === item.id) || item;
                        return (
                          <a
                            key={item.id}
                            href="#werkstoffe"
                            onClick={() => handleNavClick('werkstoffe', fullItem)}
                            className="p-2 rounded-lg hover:bg-neutral-50 hover:text-emerald-700 transition-colors flex flex-col group border border-transparent hover:border-neutral-200/60"
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="font-bold text-slate-900 text-xs group-hover:text-emerald-700 transition-colors">
                                {item.code}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0">
                                {item.temp}
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-500 line-clamp-1">
                              {item.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Footer Bar */}
                <div className="col-span-3 pt-3 border-t border-neutral-100 flex justify-end items-center bg-neutral-50/60 -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl">
                  <a 
                    href="#werkstoffe" 
                    onClick={() => setActiveDropdown(null)} 
                    className="text-xs font-bold text-weber-700 hover:text-weber-800 flex items-center gap-1"
                  >
                    <span>Vollständige Werkstofftabelle öffnen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 4. Über uns (Freier, entspannter Menüpunkt ohne Einquetschen) */}
          <a 
            href="#ueber-uns" 
            onClick={(e) => {
              e.preventDefault();
            }}
            className="hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap"
            title="Bereich in Vorbereitung"
          >
            Über uns
          </a>

          {/* 5. Downloads (Freier, entspannter Menüpunkt) */}
          <a 
            href="#downloads" 
            onClick={(e) => {
              e.preventDefault();
            }}
            className="hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap"
            title="Bereich in Vorbereitung"
          >
            Downloads
          </a>

          {/* 6. Karriere */}
          <a 
            href="https://applylane.de/weberfachkraft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-emerald-400 font-semibold px-2 py-1 rounded-md hover:bg-white/10 whitespace-nowrap"
          >
            Karriere
          </a>
        </nav>

        {/* Right Actions: Durchgängiges Suchfeld & Kontakt-Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Durchgängiges, kompaktes Suchfeld mit Lupe */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className={`flex items-center border rounded-lg px-2.5 py-1.5 transition-all shadow-xs w-28 sm:w-36 xl:w-44 ${
              isScrolled 
                ? 'bg-black/35 hover:bg-black/45 focus-within:bg-black/60 border-emerald-800/50 text-white' 
                : 'bg-white/10 hover:bg-white/15 focus-within:bg-white/20 border-white/20 text-white'
            }`}>
              <Search className={`w-3.5 h-3.5 mr-2 shrink-0 ${isScrolled ? 'text-emerald-400' : 'text-white/80'}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Suchbegriff..."
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

          {/* Primary Action Button */}
          <a
            href="#anfrage"
            onClick={() => handleNavClick('anfrage')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all whitespace-nowrap"
          >
            Projekt anfragen
          </a>

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
        <div className="lg:hidden border-t border-emerald-900/40 bg-[#06170c]/98 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-emerald-800/60 rounded-lg px-3 py-2 bg-black/40 mb-4">
            <Search className="w-4 h-4 text-emerald-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suchbegriff eingeben..."
              className="text-xs text-white placeholder:text-white/50 w-full outline-none bg-transparent"
            />
          </form>

          <div className="flex flex-col space-y-3 text-sm font-medium text-white/90">
            <a href="#anwendungsgebiete" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-emerald-400 transition-colors">Anwendungsgebiete (12)</a>
            <a href="#produkte" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-emerald-400 transition-colors">Produkte (11)</a>
            <a href="#werkstoffe" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-emerald-400 transition-colors">Werkstoffe (7)</a>
            <a href="#ueber-uns" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="py-1 hover:text-emerald-400 transition-colors">Über uns</a>
            <a href="#downloads" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }} className="py-1 hover:text-emerald-400 transition-colors">Downloads</a>
            <a href="https://applylane.de/weberfachkraft" target="_blank" rel="noopener noreferrer" className="py-1 text-emerald-400 font-semibold">Karriereportal</a>
          </div>

          <div className="pt-4 border-t border-emerald-900/60">
            <a
              href="#anfrage"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-center text-xs font-semibold rounded-lg shadow-md"
            >
              Projekt anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
