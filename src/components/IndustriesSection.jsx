import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCms } from '../data/cmsStore';

export default function IndustriesSection({ onNavigate, onSelectIndustry }) {
  const { anwendungsgebiete } = useCms();

  const handleOpenIndustry = (e, item) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(`/anwendungsgebiete/${item.id}`);
    }
  };

  return (
    <section id="anwendungsgebiete" className="py-24 sm:py-32 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Sichere Anlagen für{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#166534] via-[#15803d] to-[#059669]">
              chemisch anspruchsvolle Branchen.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-5 leading-relaxed">
            Wir kennen die spezifischen Prüf-, Sicherheits- und Werkstoffanforderungen der Industrie – 
            vom doppelwandigen Chemie-Tanklager über die Feuerverzinkung bis zur Reinstmedienleitung.
          </p>
        </div>

        {/* Clean 3-Column Grid with authentic Weber photos for all 12 application areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(anwendungsgebiete || []).map((item) => (
            <div 
              key={item.id}
              onClick={(e) => handleOpenIndustry(e, item)}
              className="group rounded-2xl border border-neutral-200/90 bg-[#FBF9F5] hover:bg-white hover:border-weber-600/50 overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-weber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 py-4 border-t border-neutral-200/60 bg-white/60 flex items-center justify-between">
                <span className="text-xs font-bold text-weber-700 group-hover:text-weber-800 inline-flex items-center gap-1.5 transition-colors">
                  <span>Fachbereich & Fotos ansehen</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectIndustry) onSelectIndustry(item);
                  }}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-slate-900 transition-colors"
                >
                  Anfragen
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
