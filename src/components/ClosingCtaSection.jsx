import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_FACTS, IMAGES } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';

export default function ClosingCtaSection({ onOpenRequestModal, showImage = true, image }) {
  const chosenImage = image || IMAGES.ctaBehaelterCrane || '/weber-cta-behaelter-crane-hd.webp';

  return (
    <section
      id="anfrage"
      className="py-12 sm:py-16 border-t border-b border-[#1c5f2e]/60 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #389e54 0%, #2c8945 55%, #217036 100%)'
      }}
    >
      {/* Dezent gestrichelter / schraffierter Diagonal-Akzent im Hintergrund (wie im Screenshot) */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.085) 0px,
              rgba(255, 255, 255, 0.085) 1.5px,
              transparent 1.5px,
              transparent 10px
            )
          `
        }}
      />

      {/* Dezent gestrichelte Akzent-Rahmenlinien oben und unten */}
      <div className="absolute top-3.5 inset-x-6 lg:inset-x-12 border-t border-dashed border-white/30 pointer-events-none z-0" />
      <div className="absolute bottom-3.5 inset-x-6 lg:inset-x-12 border-b border-dashed border-white/30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* 1. Header Text at the Top (Asymmetrisches 2-Spalten-Header-Layout wie im Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end mb-6 sm:mb-8">
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#071a0c] font-extrabold">
              <span className="w-6 h-[2.5px] bg-[#071a0c]" />
              <span>Projektanfrage & Technische Auslegung:</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.08]">
              <span className="text-white block">Haben Sie ein konkretes</span>
              <span className="text-[#071a0c] block mt-0.5">Anlagen- oder Behältervorhaben?</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-white/95 leading-relaxed">
              Sprechen Sie direkt mit unseren Projektingenieuren in Minden – wir prüfen{' '}
              <strong className="font-extrabold text-white">Werkstoff, Statik nach DVS 2205 und Einbringung</strong> und erstellen ein fundiertes Angebot.
            </p>
          </div>
        </div>

        {/* 2. Sleek Panoramic Widescreen Picture with Weber Logo in Top Right */}
        {showImage && (
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/90 shadow-[0_20px_50px_rgba(7,26,12,0.26)] bg-slate-900 group relative">
            <div className="aspect-[16/7] sm:aspect-[24/10] max-h-[340px] sm:max-h-[410px] w-full overflow-hidden">
              <img
                src={chosenImage}
                alt="Kunststofftechnik Weber Behälter- und Tanklagerbau Kran-Einbringung"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Overlaid Black Weber Logo in top right with subtle shadow */}
            <div className="absolute top-3.5 right-4 sm:top-5 sm:right-6 z-10 pointer-events-none select-none">
              <img
                src={IMAGES.logoBlack || '/weber-logo-black.webp'}
                alt="Weber Kunststofftechnik"
                className="h-6 sm:h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        )}

        {/* 3. Action Buttons - STRICTLY PLACED UNDER THE PICTURE */}
        <div className="mt-6 sm:mt-7 pt-5 border-t border-dashed border-white/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <SpecialCtaButton
              text="Projekt anfragen"
              onClick={(e) => {
                if (e) {
                  e.preventDefault();
                  e.stopPropagation();
                }
                if (onOpenRequestModal) onOpenRequestModal();
              }}
            />

            <a
              href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
              className="h-[52px] px-6 rounded-xl bg-white hover:bg-[#FBF9F5] border border-white text-slate-900 font-extrabold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2.5 shadow-md"
            >
              <Phone className="w-4 h-4 text-[#1c5f2e]" />
              <span>{COMPANY_FACTS.phone}</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#071a0c]/20 border border-dashed border-white/30 text-xs text-white font-semibold">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>Kostenlose Vorbemessung & statische Prüfung nach DVS 2205</span>
          </div>
        </div>
      </div>
    </section>
  );
}
