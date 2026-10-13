import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUKTE, IMAGES } from '../data/weberData';

export default function ProductsSection({ onRequestProduct }) {
  const mainProducts = [
    {
      id: "rundbehaelter",
      title: "Lager- & Prozessbehälter (Rund & Rechteck)",
      desc: "Zylindrische Flachboden- und Rechteckbehälter bis 100 m³ Volumen aus PE 100 und PP-H. Konstruiert mit statischer Berechnung nach DIN EN 12573 und DIBt-Zulassung Z-40.21.",
      image: IMAGES.rundbehaelter,
    },
    {
      id: "abluftwaescher",
      title: "Abluftwäscher & Abscheidesysteme",
      desc: "Thermoplastische Wäscherkolonnen und Tropfenabscheider zur zuverlässigen Emissionsminderung saurer und alkalischer Gase nach TA-Luft.",
      image: IMAGES.abluft,
    },
    {
      id: "rohrleitungsbau",
      title: "Industrieller Rohrleitungsbau",
      desc: "Medienbeständige Rohrtrassen und Formteile im Heizelement- und Stumpfschweißverfahren nach DVS-Standards für aggressive Chemikalien.",
      image: IMAGES.rohrleitungen,
    },
    {
      id: "gefahrstoff",
      title: "Dosierstationen & Auffangwannen",
      desc: "Zugelassene Thermoplast-Auffangwannen nach WHG / AwSV sowie anschlussfertige Dosierschränke für den sicheren Umgang mit Gefahrstoffen.",
      image: IMAGES.gefahrstoff,
    }
  ];

  const additionalProducts = [
    "Verbundbehälter (Dual-Laminate PVDF/GFK)",
    "Beiz- und Galvanikbecken",
    "Schwimmbecken & Kommunalbecken",
    "Leitern & Begehungsbühnen",
    "Sonderbau & Prototypenfertigung",
    "Bundesweite Industriemontage"
  ];

  return (
    <section id="produkte" className="py-24 sm:py-32 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
            Leistungsspektrum
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Thermoplastische Lösungen für Industrie und Anlagenbau.
          </h2>
          <p className="text-base text-neutral-600 mt-4 leading-relaxed">
            Wir fertigen Standardbehälter und kundenspezifische Sonderapparate mit 
            geprüften Schweißverfahren am Standort Minden.
          </p>
        </div>

        {/* 4 Main Columns / Cards (Ultra Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mainProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <a
                    href="#anfrage"
                    onClick={() => onRequestProduct && onRequestProduct(prod)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-weber-700 hover:text-weber-800 transition-colors"
                  >
                    <span>Dieses Vorhaben anfragen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle, quiet list for the remaining specialized areas */}
        <div className="border-t border-neutral-200 pt-10">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Weitere Fertigungsleistungen
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm text-neutral-700">
            {additionalProducts.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
