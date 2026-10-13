import React, { useState } from 'react';
import { Search, X, ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { ANWENDUNGSGEBIETE, PRODUKTE, WERKSTOFFE, IMAGES } from '../data/weberData';

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

export default function Header({ onSearchQuery, onSelectCategory }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img 
            src={IMAGES.favicon} 
            alt="Weber Kunststofftechnik" 
            className="w-9 h-9 object-contain rounded"
          />
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg text-slate-900 leading-none">
              WEBER
            </span>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase mt-0.5">
              Kunststofftechnik
            </span>
          </div>
        </a>

        {/* Desktop Navigation mit strukturierten Dropdowns */}
        <nav 
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* 1. Anwendungsgebiete Dropdown */}
          <div className="relative py-6">
            <button 
              onMouseEnter={() => setActiveDropdown('anwendungen')}
              onClick={() => handleNavClick('anwendungsgebiete')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                activeDropdown === 'anwendungen' ? 'text-slate-900' : ''
              }`}
            >
              <span>Anwendungsgebiete</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {activeDropdown === 'anwendungen' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150 z-50">
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
          <div className="relative py-6">
            <button 
              onMouseEnter={() => setActiveDropdown('produkte')}
              onClick={() => handleNavClick('produkte')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                activeDropdown === 'produkte' ? 'text-slate-900' : ''
              }`}
            >
              <span>Produkte</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {activeDropdown === 'produkte' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150 z-50">
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

          {/* 3. Werkstoffe Dropdown */}
          <div className="relative py-6">
            <button 
              onMouseEnter={() => setActiveDropdown('werkstoffe')}
              onClick={() => handleNavClick('werkstoffe')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                activeDropdown === 'werkstoffe' ? 'text-slate-900' : ''
              }`}
            >
              <span>Werkstoffe</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {activeDropdown === 'werkstoffe' && (
              <div className="absolute top-full left-0 w-[460px] bg-white border border-neutral-200/90 rounded-2xl shadow-2xl p-6 animate-in fade-in duration-150 z-50">
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 pb-1 border-b border-neutral-100">
                      Standard-Thermoplaste
                    </span>
                    <div className="space-y-1.5">
                      {WERKSTOFFE.slice(0, 3).map((mat) => (
                        <a
                          key={mat.id}
                          href="#werkstoffe"
                          onClick={() => handleNavClick('werkstoffe', mat)}
                          className="flex flex-col p-2 rounded-lg hover:bg-neutral-50 text-xs transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{mat.code}</span>
                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">{mat.temp}</span>
                          </div>
                          <span className="text-[11px] text-neutral-500 mt-0.5">{mat.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 pb-1 border-b border-neutral-100">
                      High Purity & Fluorpolymere
                    </span>
                    <div className="space-y-1.5">
                      {WERKSTOFFE.slice(3, 6).map((mat) => (
                        <a
                          key={mat.id}
                          href="#werkstoffe"
                          onClick={() => handleNavClick('werkstoffe', mat)}
                          className="flex flex-col p-2 rounded-lg hover:bg-neutral-50 text-xs transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{mat.code}</span>
                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">{mat.temp}</span>
                          </div>
                          <span className="text-[11px] text-neutral-500 mt-0.5">{mat.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex justify-end items-center bg-neutral-50/60 -mx-6 -mb-6 px-6 py-2.5 rounded-b-2xl">
                  <a 
                    href="#werkstoffe" 
                    onClick={() => setActiveDropdown(null)} 
                    className="text-xs font-bold text-weber-700 hover:text-weber-800 flex items-center gap-1"
                  >
                    <span>Werkstofftabelle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 4. Fertigung & Qualität */}
          <a 
            href="#fertigung" 
            onClick={() => handleNavClick('fertigung')}
            className="hover:text-slate-900 transition-colors"
          >
            Fertigung & Qualität
          </a>

          {/* 5. Karriere */}
          <a 
            href="https://applylane.de/weberfachkraft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors text-weber-700 font-medium"
          >
            Karriere
          </a>
        </nav>

        {/* Right Actions: Durchgängiges Suchfeld & Kontakt-Button */}
        <div className="flex items-center gap-3">
          
          {/* Durchgängiges, kompaktes Suchfeld mit Lupe */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="flex items-center bg-neutral-100/80 hover:bg-white focus-within:bg-white border border-neutral-200/90 hover:border-neutral-300 focus-within:border-weber-600 focus-within:ring-2 focus-within:ring-weber-600/15 rounded-lg px-2.5 py-1.5 transition-all shadow-2xs w-36 sm:w-44 lg:w-48">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Suchbegriff..."
                className="w-full text-xs text-slate-900 placeholder:text-neutral-400 bg-transparent outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-neutral-400 hover:text-neutral-600 p-0.5 shrink-0"
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
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-weber-600 hover:bg-weber-700 text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap"
          >
            Projekt anfragen
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-neutral-300 rounded-lg px-3 py-2 bg-neutral-50 mb-4">
            <Search className="w-4 h-4 text-neutral-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suchbegriff eingeben..."
              className="text-xs text-slate-900 w-full outline-none bg-transparent"
            />
          </form>

          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-800">
            <a href="#anwendungsgebiete" onClick={() => setMobileMenuOpen(false)} className="py-1">Anwendungsgebiete (12)</a>
            <a href="#produkte" onClick={() => setMobileMenuOpen(false)} className="py-1">Produkte (11)</a>
            <a href="#werkstoffe" onClick={() => setMobileMenuOpen(false)} className="py-1">Werkstoffe (7)</a>
            <a href="#fertigung" onClick={() => setMobileMenuOpen(false)} className="py-1">Fertigung & Qualität</a>
            <a href="https://applylane.de/weberfachkraft" target="_blank" rel="noopener noreferrer" className="py-1 text-weber-700 font-semibold">Karriereportal</a>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <a
              href="#anfrage"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 bg-weber-600 text-white text-center text-xs font-semibold rounded-lg"
            >
              Projekt anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
