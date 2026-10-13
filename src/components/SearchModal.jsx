import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  FlaskConical, 
  Box, 
  Layers, 
  Factory, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  CHEMICAL_DATABASE, 
  PRODUKTE, 
  WERKSTOFFE, 
  ANWENDUNGSGEBIETE 
} from '../data/weberData';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle trigger
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Filter Chemicals
  const matchedChemicals = CHEMICAL_DATABASE.filter(c => 
    c.name.toLowerCase().includes(normalizedQuery) ||
    c.empfohlenerWerkstoff.toLowerCase().includes(normalizedQuery) ||
    c.behälter.toLowerCase().includes(normalizedQuery)
  );

  // 2. Filter Products
  const matchedProducts = PRODUKTE.filter(p => 
    p.title.toLowerCase().includes(normalizedQuery) ||
    p.subtitle.toLowerCase().includes(normalizedQuery) ||
    p.desc.toLowerCase().includes(normalizedQuery)
  );

  // 3. Filter Materials
  const matchedMaterials = WERKSTOFFE.filter(m => 
    m.code.toLowerCase().includes(normalizedQuery) ||
    m.name.toLowerCase().includes(normalizedQuery) ||
    m.desc.toLowerCase().includes(normalizedQuery)
  );

  // 4. Filter Industries
  const matchedIndustries = ANWENDUNGSGEBIETE.filter(a => 
    a.title.toLowerCase().includes(normalizedQuery) ||
    a.desc.toLowerCase().includes(normalizedQuery) ||
    a.tag.toLowerCase().includes(normalizedQuery)
  );

  const totalResults = matchedChemicals.length + matchedProducts.length + matchedMaterials.length + matchedIndustries.length;

  const quickPills = ["Salzsäure", "Rundbehälter", "PVDF", "Abluftwäscher", "Galvanik", "DIBt-Zulassung"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 bg-neutral-50/50">
          <Search className="w-5 h-5 text-weber-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchbegriff eingeben... z. B. Salzsäure, Rundbehälter, PVDF, Galvanik"
            className="w-full bg-transparent border-0 text-slate-900 placeholder:text-neutral-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-neutral-200 rounded-full text-neutral-400 hover:text-neutral-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-neutral-500 hover:text-slate-800 bg-white border border-neutral-200 rounded shadow-2xs"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="px-4 py-2.5 bg-neutral-100/60 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 font-medium shrink-0">Häufig gesucht:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="px-2.5 py-1 bg-white hover:bg-weber-50 hover:text-weber-700 text-slate-700 rounded-md border border-neutral-200/90 font-medium transition-colors shrink-0"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6">
          
          {/* Chemical Intelligence Matches (Highlight feature) */}
          {matchedChemicals.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                <span className="flex items-center gap-1.5 text-weber-700">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Chemikalien- & Medienkompatibilität ({matchedChemicals.length})
                </span>
                <span className="text-[11px] font-normal normal-case text-neutral-500">
                  Echtzeit-Empfehlung für Behälter & Werkstoff
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {matchedChemicals.map((chem, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-weber-200/80 bg-weber-50/40 hover:bg-weber-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{chem.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-weber-200 text-weber-800 font-mono">
                          {chem.concentration}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Empfohlener Werkstoff: <strong className="text-slate-900">{chem.empfohlenerWerkstoff}</strong></span>
                        <span>Bauform: <strong className="text-slate-900">{chem.behälter}</strong></span>
                        <span>Beständigkeit: <strong className="text-weber-700">{chem.beständig}</strong></span>
                      </div>
                    </div>
                    <a
                      href="#anfrage"
                      onClick={() => {
                        onClose();
                        if (onSelectResult) onSelectResult({ type: 'chem', data: chem });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-weber-600 hover:bg-weber-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                    >
                      <span>Auslegung anfragen</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Matches */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                <Box className="w-3.5 h-3.5 text-slate-700" />
                <span>Produkte & Bauformen ({matchedProducts.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchedProducts.map((p) => (
                  <a
                    key={p.id}
                    href="#produkte"
                    onClick={() => {
                      onClose();
                      if (onSelectResult) onSelectResult({ type: 'prod', data: p });
                    }}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-weber-300 hover:bg-neutral-50/70 transition-all flex items-start gap-3 group"
                  >
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-12 h-12 object-cover rounded-lg border border-neutral-200 shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-weber-700 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        {p.subtitle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Materials Matches */}
          {matchedMaterials.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                <Layers className="w-3.5 h-3.5 text-slate-700" />
                <span>Werkstoffe ({matchedMaterials.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchedMaterials.map((m) => (
                  <a
                    key={m.id}
                    href="#werkstoffe"
                    onClick={() => {
                      onClose();
                      if (onSelectResult) onSelectResult({ type: 'mat', data: m });
                    }}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-weber-300 hover:bg-neutral-50/70 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-weber-700">
                        {m.code}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                        {m.temp}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
                      {m.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Industries Matches */}
          {matchedIndustries.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                <Factory className="w-3.5 h-3.5 text-slate-700" />
                <span>Anwendungsgebiete & Branchen ({matchedIndustries.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {matchedIndustries.map((a) => (
                  <a
                    key={a.id}
                    href="#anwendungsgebiete"
                    onClick={() => {
                      onClose();
                      if (onSelectResult) onSelectResult({ type: 'app', data: a });
                    }}
                    className="p-2.5 rounded-lg border border-neutral-200 hover:border-weber-300 hover:bg-neutral-50/70 transition-all text-xs"
                  >
                    <div className="text-[10px] font-mono text-weber-700 font-semibold uppercase">{a.tag}</div>
                    <div className="font-semibold text-slate-900 mt-0.5">{a.title}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {totalResults === 0 && (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Keine direkten Treffer für „{query}“</h4>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                Unsere Projektingenieure legen Sonderbehälter für jedes Medium individuell aus.
              </p>
              <a
                href="#anfrage"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-weber-600 text-white rounded-lg text-xs font-bold"
              >
                <span>Direktanfrage an Technischen Vertrieb</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </div>

        {/* Footer Info */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Tipp: Klicken Sie auf ein Ergebnis, um direkt zum Abschnitt zu springen.</span>
          <span className="font-mono">Weber Schnellsuche v2.6</span>
        </div>

      </div>
    </div>
  );
}
