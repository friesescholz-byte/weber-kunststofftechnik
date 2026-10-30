import React from 'react';
import { ArrowRight, FlaskConical, Thermometer, Layers } from 'lucide-react';
import { useCms } from '../data/cmsStore';

const MATERIAL_ADVANTAGES = [
  {
    icon: FlaskConical,
    title: 'Auslegung nach DVS 2205',
    desc: 'Präzise Werkstoffwahl nach Sicherheitsdatenblatt, Konzentration und Temperatur.'
  },
  {
    icon: Thermometer,
    title: 'Einsatzbereich -40 bis +150 °C',
    desc: 'Von PE 100 und PP-H bis zu Fluorpolymeren (PVDF, ECTFE, PFA) & ATEX (el).'
  },
  {
    icon: Layers,
    title: 'Thermoplast & GFK-Verbundbau',
    desc: 'Chemische Thermoplast-Inliner kombiniert mit hochfestem GFK-Außenmantel.'
  }
];

export default function MaterialsSection({ onNavigate }) {
  const { werkstoffe } = useCms();

  const goToOverview = () => {
    if (onNavigate) {
      onNavigate('/werkstoffe');
    } else {
      window.history.pushState({}, '', '/werkstoffe');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const goToMediaCheck = () => {
    if (onNavigate) {
      onNavigate('/werkstoffe#medien-check');
    } else {
      window.history.pushState({}, '', '/werkstoffe#medien-check');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section
      id="werkstoffe"
      className="relative py-20 sm:py-24 text-white overflow-hidden border-y border-[#2d8544]"
      style={{
        background: 'linear-gradient(135deg, #41A55A 0%, #35964e 55%, #297c3e 100%)'
      }}
    >
      {/* Subtle 135-degree technical hatch & fine 44px grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.09) 0px,
              rgba(255, 255, 255, 0.09) 1.5px,
              transparent 1.5px,
              transparent 11px
            ),
            linear-gradient(to right, rgba(7, 26, 12, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(7, 26, 12, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 44px 44px, 44px 44px'
        }}
      />

      {/* Clean Technical Dashed Accent Transitions Top & Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="border-t-2 border-dashed border-white/35 pb-10 sm:pb-12" />

        {/* 1. Section Header with Discreet Text Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-[#071a0c] mb-3">
              <span className="w-5 h-[2px] bg-[#071a0c]" />
              <span>Werkstoffkompetenz & Chemische Beständigkeit</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-white">Der exakt passende Kunststoff </span>
              <span className="text-[#071a0c]">für Ihr Medium.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/95 font-medium leading-relaxed">
              Die Betriebssicherheit einer Chemieanlage steht und fällt mit der richtigen Materialwahl. Wir verarbeiten zertifizierte Marken-Halbzeuge (EN 10204-3.1) nach strengen DVS-2207-Schweißrichtlinien.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={goToOverview}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white text-white hover:text-[#071a0c] border border-white/40 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-xs cursor-pointer"
            >
              <span>Alle {werkstoffe?.length || 7} Werkstoffe ansehen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. Core Weber Material Advantages (3 Bright, Harmonious Cards adapted to #41A55A) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {MATERIAL_ADVANTAGES.map((adv, idx) => {
            const IconComp = adv.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-5 sm:p-6 bg-white/95 hover:bg-white border-2 border-white/90 hover:border-white shadow-[0_14px_34px_-10px_rgba(7,26,12,0.18)] hover:shadow-[0_22px_44px_-12px_rgba(7,26,12,0.28)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#41A55A] via-[#1c5f2e] to-[#41A55A] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-xl bg-[#41A55A]/15 border border-[#41A55A]/30 group-hover:bg-[#41A55A] group-hover:border-[#41A55A] flex items-center justify-center shrink-0 transition-all duration-300">
                  <IconComp
                    className="w-5 h-5 text-[#1c5f2e] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.85}
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#071a0c] group-hover:text-[#1c5f2e] transition-colors duration-300 leading-snug">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-snug mt-1">
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Harmonious Callout Bar to the Interactive DVS 2205 Media Check Database */}
        <div className="mt-7 p-4 sm:p-5 rounded-2xl bg-[#071a0c]/15 backdrop-blur-xs border border-dashed border-white/45 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-white font-semibold">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 text-white" />
            </div>
            <span>
              Welcher Werkstoff (PE, PP, PVC, PVDF, ECTFE, PFA, MFA) eignet sich für Ihre Säure oder Lauge?
            </span>
          </div>
          <button
            type="button"
            onClick={goToMediaCheck}
            className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#071a0c] text-[#071a0c] hover:text-white text-xs sm:text-sm font-extrabold transition-all shrink-0 shadow-xs cursor-pointer"
          >
            <span>Zum interaktiven Beständigkeits-Check</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="border-b-2 border-dashed border-white/35 pt-10 sm:pt-12" />
      </div>
    </section>
  );
}
