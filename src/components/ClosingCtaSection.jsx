import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_FACTS, IMAGES } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';

export default function ClosingCtaSection({ onOpenRequestModal, showImage = false, image }) {
  const chosenImage = image || IMAGES.ctaBehaelterCrane || '/weber-cta-behaelter-crane-hd.webp';

  return (
    <section id="anfrage" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-b border-neutral-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 1. Header Text at the Top */}
        <div className="max-w-3xl space-y-4 mb-8 sm:mb-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#1c5f2e] font-bold block">
            Projektanfrage & Technische Auslegung
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Haben Sie ein konkretes Anlagen- oder Behältervorhaben?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Sprechen Sie direkt mit unseren Projektingenieuren in Minden – wir prüfen Werkstoff, Statik nach DVS 2205 und erstellen ein fundiertes Angebot.
          </p>
        </div>

        {/* 2. Large High-Resolution Widescreen Picture with Weber Logo in Top Right */}
        {showImage && (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl bg-slate-900 group relative">
            <div className="aspect-[16/9] max-h-[520px] w-full overflow-hidden">
              <img 
                src={chosenImage} 
                alt="Kunststofftechnik Weber Behälter- und Apparatebau Fertigung Werk Minden" 
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Overlaid Black Weber Logo in top right with subtle shadow */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-7 z-10 pointer-events-none select-none">
              <img 
                src={IMAGES.logoBlack || "/weber-logo-black.webp"} 
                alt="Weber Kunststofftechnik" 
                className="h-7 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        )}

        {/* 3. Action Buttons - STRICTLY PLACED UNDER THE PICTURE */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
          <SpecialCtaButton 
            text="Projekt anfragen"
            onClick={(e) => {
              if (e) e.preventDefault();
              if (onOpenRequestModal) onOpenRequestModal();
            }}
          />

          <a
            href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
            className="h-[52px] px-6 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-slate-800 font-bold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2.5 shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#1c5f2e]" />
            <span>{COMPANY_FACTS.phone}</span>
          </a>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium sm:ml-2">
            <ShieldCheck className="w-4 h-4 text-[#1c5f2e] shrink-0" />
            <span>Kostenlose Vorbemessung & statische Prüfung nach DVS 2205</span>
          </div>
        </div>

      </div>
    </section>
  );
}
