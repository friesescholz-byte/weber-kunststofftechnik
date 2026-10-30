import React from 'react';
import { ArrowRight, Ruler, Factory, ShieldCheck, Truck } from 'lucide-react';
import { IMAGES } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';

export default function ManufacturingDepth({ onNavigate }) {
  const steps = [
    {
      icon: Ruler,
      title: "Engineering, Statik & CAD-Auslegung",
      text: "Prüffähige statische Berechnung nach DIN EN 12573, DVS 2205 und DIBt-Richtlinien. Auslegung von Wanddicken, Stutzen, Wind- und Erdbebenlasten durch unser eigenes Ingenieurteam in Minden."
    },
    {
      icon: Factory,
      title: "Eigene Fertigung auf über 25.000 m²",
      text: "CNC-Zuschnitt, Wickeltechnik und Extrusionsschweißung im eigenen Werk. Geprüfte Kunststoffschweißer nach DVS 2212-1 garantieren reproduzierbare Schweißnahtgüte ohne Subunternehmer."
    },
    {
      icon: ShieldCheck,
      title: "Qualitätssicherung & Werksprüfzeugnis",
      text: "Zerstörungsfreie Hochspannungs-Funkeninduktion, hydrostatische Druckprüfungen und lückenlose Dokumentation nach DIN EN ISO 9001:2015 inkl. Abnahmeprüfzeugnis."
    },
    {
      icon: Truck,
      title: "Schwerlastlogistik & weltweite Montage",
      text: "Eigener Schwerlasttransport für Großbehälter bis 4.000 mm Durchmesser sowie fachgerechte Einbringung, Rohrleitungsmontage und Inbetriebnahme vor Ort durch SCC**-zertifizierte Richtmeister."
    }
  ];

  return (
    <section id="fertigung" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-neutral-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text & Steps */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Alles aus einer Hand. Von der Statik bis zur Montage.
              </h2>
              <p className="text-base text-slate-600 mt-5 leading-relaxed">
                Als inhabergeführter Schweißfachbetrieb (gegründet 1967) bündeln wir Konstruktion, 
                Fertigung und weltweite Montage an unserem Hauptsitz in Minden. Das verhindert 
                Schnittstellenverluste und sichert lückenlose Qualität.
              </p>
            </div>

            {/* Steps without numbers or tag clutter */}
            <div className="space-y-4 pt-2">
              {steps.map((s) => {
                const IconComponent = s.icon;
                return (
                  <div 
                    key={s.title} 
                    className="group bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-[#1c5f2e]/60 transition-all duration-300 flex gap-4 sm:gap-5 items-start shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/70 text-[#1c5f2e] flex items-center justify-center shrink-0 group-hover:bg-[#1c5f2e] group-hover:text-white transition-all duration-300 shadow-2xs mt-0.5">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1c5f2e] transition-colors mb-1">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <SpecialCtaButton 
                text="Einblick in unser Werk & Zertifikate" 
                onClick={() => onNavigate && onNavigate('/ueber-uns')} 
              />
              <button
                onClick={() => onNavigate && onNavigate('/downloads')}
                className="h-[52px] px-6 rounded-xl border border-neutral-300 bg-white hover:border-[#1c5f2e] text-slate-800 font-bold text-xs sm:text-sm transition-colors inline-flex items-center justify-center shrink-0 shadow-xs"
              >
                Zertifikate herunterladen (PDF)
              </button>
            </div>
          </div>

          {/* Right Column: Clean Authentic Production Photos */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-slate-900 aspect-[16/10] relative group">
              <img 
                src={IMAGES.droneShot || IMAGES.luftbild2025} 
                alt="Luftaufnahme Kunststofftechnik Weber GmbH Hauptwerk Minden" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092211]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-xs sm:text-sm font-bold bg-[#0d2a14]/90 border border-emerald-400/30 px-3 py-1.5 rounded-lg text-white backdrop-blur-xs inline-block">
                  Über 25.000 m² Produktions- & Hallenfläche
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-neutral-200 bg-slate-900 aspect-[4/3] relative group shadow-xs">
                <img 
                  src={IMAGES.heavyTransport} 
                  alt="Schwerlasttransport Großbehälter Kunststofftechnik Weber" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-neutral-200 bg-slate-900 aspect-[4/3] relative group shadow-xs">
                <img 
                  src={IMAGES.wickelrohrAnlage || IMAGES.produktionBehaelter} 
                  alt="Wickelrohranlage und Kunststoffschweißtechnik Weber" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Official Certifications Strip with subtle green accents */}
            <div className="bg-[#0d2a14] text-white rounded-2xl p-5 border border-[#1c5f2e]/50 relative overflow-hidden shadow-xs">
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(135deg, rgba(74, 222, 128, 0.25) 0px, rgba(74, 222, 128, 0.25) 1px, transparent 1px, transparent 10px)'
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 block">
                    Geprüfte Sicherheit
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Zertifizierter Fachbetrieb nach WHG, ISO 9001:2015 & SCC**
                  </h4>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('/ueber-uns#zertifizierungen')}
                  className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Alle Zulassungen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
