import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ANWENDUNGSGEBIETE } from '../data/weberData';

export default function IndustriesSection({ onSelectIndustry }) {
  return (
    <section id="anwendungsgebiete" className="py-24 sm:py-32 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
            Branchen & Einsatzbereiche
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Einsatz in chemisch anspruchsvollen Branchen.
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed">
            Wir kennen die spezifischen Prüf- und Werkstoffanforderungen der Industrie – 
            vom korrosionsfesten Beizbad bis zur partikelfreien Reinstmedienleitung.
          </p>
        </div>

        {/* Clean 3-Column Grid without noisy badges or chips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ANWENDUNGSGEBIETE.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-xl border border-neutral-200/80 bg-[#FBF9F5] hover:border-neutral-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/50 flex items-center justify-between">
                <a
                  href="#anfrage"
                  onClick={() => onSelectIndustry && onSelectIndustry(item)}
                  className="text-xs font-semibold text-weber-700 hover:text-weber-800 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
