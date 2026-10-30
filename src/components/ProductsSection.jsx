import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCms } from '../data/cmsStore';

export default function ProductsSection({ onNavigate, onRequestProduct }) {
  const { produkte } = useCms();

  // Die 4 großen Leit-Kategorien mit echten Werksfotos und die weiteren 7+ Produktbereiche darunter
  const featuredProducts = (produkte || []).slice(0, 4);
  const moreProducts = (produkte || []).slice(4);

  const handleOpenProduct = (e, prod) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(`/produkte/${prod.id}`);
    }
  };

  return (
    <section id="produkte" className="py-24 sm:py-32 bg-[#FBF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header im Stil des Heros (aufgeräumt, weitläufig, Sora-Typografie + Weber-Grün-Akzent) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Thermoplastische Lösungen für{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#166534] via-[#15803d] to-[#059669]">
                Industrie und Anlagenbau.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mt-5 leading-relaxed max-w-2xl">
              Wir konstruieren und fertigen bauartzugelassene Standardbehälter, Verbundbehälter und 
              kundenspezifische Sonderapparate mit geprüften Schweißverfahren am Standort Minden.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="/downloads"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/downloads');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 bg-white hover:border-weber-600 hover:text-weber-700 text-xs font-bold text-slate-800 transition-all shadow-2xs"
            >
              <span>Gesamtkatalog & Zulassungen (PDF)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Haupt-Produktkarten mit echten Weber-Werksfotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-14">
          {featuredProducts.map((prod) => (
            <div 
              key={prod.id}
              onClick={(e) => handleOpenProduct(e, prod)}
              className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-weber-600/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="p-8 sm:p-9 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-weber-700 mb-1.5">
                    {prod.subtitle}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-weber-700 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {prod.desc}
                  </p>

                  {prod.specs && (
                    <div className="pt-4 pb-1 border-t border-neutral-100 space-y-1.5 text-xs">
                      {prod.specs.slice(0, 4).map((sp, i) => {
                        const colonIdx = sp.indexOf(':');
                        const hasColon = colonIdx > -1 && colonIdx < 30;
                        const label = hasColon ? sp.slice(0, colonIdx) : '';
                        const val = hasColon ? sp.slice(colonIdx + 1).trim() : sp;

                        return (
                          <div key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c5f2e] shrink-0 mt-1.5" />
                            <div className="min-w-0">
                              {hasColon ? (
                                <>
                                  <span className="font-bold text-slate-900">{label}:</span>{' '}
                                  <span className="text-slate-600">{val}</span>
                                </>
                              ) : (
                                <span className="font-medium text-slate-700">{sp}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c5f2e] group-hover:text-emerald-800 transition-colors">
                    <span>Produktseite & Werksfotos</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRequestProduct) onRequestProduct(prod);
                    }}
                    className="text-xs font-bold text-[#0c3319] hover:text-white bg-emerald-50 hover:bg-[#1c5f2e] border border-emerald-200/80 hover:border-[#1c5f2e] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                  >
                    Direkt anfragen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weitere 7 Produktbereiche als großzügige, anklickbare Fachkarten */}
        {moreProducts.length > 0 && (
          <div className="pt-8 border-t border-neutral-200/80">
            <div className="flex items-center justify-between mb-8">
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                Weitere Produkt- & Leistungsbereiche im Überblick ({moreProducts.length})
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreProducts.map((prod) => (
                <a
                  key={prod.id}
                  href={`/produkte/${prod.id}`}
                  onClick={(e) => handleOpenProduct(e, prod)}
                  className="group bg-white rounded-xl border border-neutral-200/90 hover:border-weber-600/60 p-5 flex items-start gap-4 transition-all hover:shadow-md"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-weber-700 transition-colors leading-snug mb-1">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-2.5">
                      {prod.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-weber-700">
                      <span>Details & Fotos</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
