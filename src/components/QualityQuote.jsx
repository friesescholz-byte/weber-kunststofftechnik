import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function QualityQuote({ onNavigate }) {
  return (
    <section className="py-20 md:py-28 bg-[#0d2a14] text-white border-b border-[#1c5f2e]/40 relative overflow-hidden">
      {/* Subtle 135-degree technical hatch matching Hero style */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(74, 222, 128, 0.18) 0px, rgba(74, 222, 128, 0.18) 1px, transparent 1px, transparent 14px)'
        }}
      />
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-300 mb-6">
          <span className="w-6 h-[2px] bg-emerald-400" />
          <span>Qualitätsversprechen seit 1967</span>
          <span className="w-6 h-[2px] bg-emerald-400" />
        </div>

        <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-8">
          „Wo hochaggressive Medien an metallische Grenzen stoßen, garantieren unsere thermoplastischen Behälter, Apparate und Rohrleitungssysteme absolute Dichtigkeit und jahrzehntelange Betriebssicherheit.“
        </blockquote>

        <div className="text-xs sm:text-sm font-medium text-emerald-100/80 mb-8">
          Konstruiert, geschweißt und geprüft von eigenen Fachkräften am Hauptstandort Minden
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate && onNavigate('/ueber-uns')}
            className="px-6 py-3 rounded-xl bg-white text-[#0d2a14] hover:bg-emerald-50 font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
          >
            <span>Unternehmensprofil & Standorte</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('/karriere')}
            className="px-6 py-3 rounded-xl bg-[#143d1f] hover:bg-[#1c5f2e] text-white border border-emerald-400/30 font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-2"
          >
            <span>Karriere & Offene Stellen (12)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
