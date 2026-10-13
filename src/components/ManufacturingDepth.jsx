import React from 'react';
import { IMAGES } from '../data/weberData';

export default function ManufacturingDepth() {
  const steps = [
    {
      title: "1. Engineering & Statik",
      text: "Prüffähige statische Berechnung nach DIN EN 12573 und DIBt-Richtlinien. Auslegung von Wanddicken, Stutzen und Windlasten durch eigene Ingenieure."
    },
    {
      title: "2. Eigene Fertigung in Minden",
      text: "Zuschnitt und Schweißung im eigenen Werk. Geprüfte Schweißer nach DVS 2212 garantieren reproduzierbare Schweißnahtgüte ohne Subunternehmer."
    },
    {
      title: "3. Qualitätssicherung & Prüfprotokoll",
      text: "Zerstörungsfreie Hochspannungs-Funkeninduktion, hydrostatische Druckprüfungen und lückenlose Dokumentation mit Werksprüfzeugnis 3.1."
    },
    {
      title: "4. Werkslogistik & Montage",
      text: "Eigener Schwerlasttransport für Behälter bis 4 m Durchmesser sowie fachgerechte Einbringung und Anschluss vor Ort durch erfahrene Monteure."
    }
  ];

  return (
    <section id="fertigung" className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text & Steps */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
                Fertigungstiefe
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Alles aus einer Hand. Von der Auslegung bis zur Montage.
              </h2>
              <p className="text-base text-neutral-600 mt-4 leading-relaxed">
                Als inhabergeführter Schweißfachbetrieb bündeln wir Konstruktion, 
                Produktion und Montage an unserem Hauptstandort in Minden. Das verhindert 
                Schnittstellenverluste und sichert lückenlose Qualität.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-neutral-200">
              {steps.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Industrial Photo */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-neutral-200/90 shadow-subtle bg-neutral-900 aspect-[4/3]">
              <img 
                src={IMAGES.feuerverzinkung} 
                alt="Fertigung im Schweißfachbetrieb Weber in Minden" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-xs text-neutral-500 flex justify-between">
              <span>Schweißfachbetrieb Minden (NRW)</span>
              <span>AwSV-zertifiziert</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
