import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WERKSTOFFE } from '../data/weberData';

export default function MaterialsSection({ onRequestMaterial }) {
  const materialsList = [
    {
      code: "PE 100 / PE-HD",
      name: "Polyethylen",
      temp: "-40 °C bis +60 °C",
      application: "Laugen, Wasseraufbereitung, Abwässer, Kommunalanlagen",
      text: "Wirtschaftlicher Standardwerkstoff mit hoher Kerbschlagzähigkeit und UV-Stabilisierung."
    },
    {
      code: "PP-H / PP-B",
      name: "Polypropylen",
      temp: "0 °C bis +100 °C",
      application: "Säuren, Beizanlagen, Galvanik, Prozessbäder",
      text: "Hohe Steifigkeit und thermische Belastbarkeit für industrielle Prozessbehälter."
    },
    {
      code: "PVC-U / PVC-C",
      name: "Polyvinylchlorid",
      temp: "0 °C bis +60 °C / +85 °C",
      application: "Abluftwäscher, Chlorbleichlauge, oxidierende Säuren",
      text: "Schwer entflammbar (DIN 4102 B1) mit hervorragendem chemischem Widerstand."
    },
    {
      code: "PVDF",
      name: "Polyvinylidenfluorid",
      temp: "-30 °C bis +140 °C",
      application: "Konzentrierte Säuren, Reinstmedien, Halbleitertechnik",
      text: "High-Performance-Fluorpolymer mit maximaler Reinheit und exzellenter Temperaturresistenz."
    },
    {
      code: "ECTFE (Halar®)",
      name: "Ethylen-Chlortrifluorethylen",
      temp: "-76 °C bis +150 °C",
      application: "Aggressive Lösemittel, Chlorgas, Diffusionsbarrieren",
      text: "Hervorragende Barrierewirkung gegen Permeation und extreme Chemikalien."
    },
    {
      code: "PFA / MFA",
      name: "Perfluoralkoxy-Polymere",
      temp: "-190 °C bis +260 °C",
      application: "Universelle Chemieresistenz, Pharma, Reinstchemikalien",
      text: "Nahezu universelle chemische Inertheit über den gesamten pH-Bereich 0 bis 14."
    }
  ];

  return (
    <section id="werkstoffe" className="py-24 sm:py-32 bg-white border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
            Werkstoffkompetenz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Der passende Werkstoff für jedes Medium.
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed">
            Die Wahl des richtigen Thermoplasts entscheidet über Betriebssicherheit und Lebensdauer. 
            Wir beraten Sie herstellerunabhängig nach Medium, Konzentration und Betriebstemperatur.
          </p>
        </div>

        {/* Minimal Clean Grid (No tabs, no busy scores) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {materialsList.map((mat, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-xl border border-neutral-200 bg-[#FBF9F5] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {mat.code}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {mat.temp}
                  </span>
                </div>

                <div className="text-xs font-medium text-neutral-500 mb-4">
                  {mat.name}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {mat.text}
                </p>

                <div className="text-xs text-slate-800 font-medium pt-3 border-t border-neutral-200/60">
                  <span className="text-neutral-400 block text-[11px] mb-0.5">Typischer Einsatz:</span>
                  {mat.application}
                </div>
              </div>

              <div className="pt-6 mt-6">
                <a
                  href="#anfrage"
                  onClick={() => onRequestMaterial && onRequestMaterial(mat)}
                  className="text-xs font-semibold text-weber-700 hover:text-weber-800 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Werkstoff anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
