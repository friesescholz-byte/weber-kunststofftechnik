import React from 'react';
import { ArrowRight, ShieldCheck, Layers, Wrench } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { IMAGES } from '../data/weberData';

const INDUSTRY_ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'WHG, AwSV & TA-Luft konform',
    desc: 'Rechtssichere Auslegung für Gefahrstoffe, High-Purity und Abluft.'
  },
  {
    icon: Layers,
    title: 'Vernetzte Gesamtsysteme',
    desc: 'Lagertanks, Prozessbäder, Dosierung, Verrohrung und Wäscher aus einer Hand.'
  },
  {
    icon: Wrench,
    title: 'Für den 24/7-Industriebetrieb',
    desc: 'Dickwand- und Stahlrahmenbauweise für höchste Dauerbelastung.'
  }
];

const INDUSTRY_CATEGORY_CARDS = [
  {
    categoryId: 'chemie-lager',
    title: 'Chemie, Lagerung & Dosierung',
    desc: 'Zugelassene Großtankläger, Reinstchemie-Systeme, Dosierstationen und Gefahrstofflagerung für Säuren und Laugen nach AwSV.',
    image: IMAGES.tanklager
  },
  {
    categoryId: 'oberflaeche',
    title: 'Oberflächentechnik & Verzinkung',
    desc: 'Stahlarmierte Prozess- und Beizbecken, Kaskadenspülen und Badlinien für Galvanotechnik und Feuerverzinkereien.',
    image: IMAGES.oberflaeche
  },
  {
    categoryId: 'umwelt-wasser',
    title: 'Umwelt, Abwasser & Lebensmittel',
    desc: 'Thermoplastische TA-Luft-Abluftwäscher, Abwasser- und Neutralisationsanlagen sowie lebensmittelechte Silos und Tanks.',
    image: IMAGES.abluft
  },
  {
    categoryId: 'infrastruktur',
    title: 'Rohrleitungsbau, Sondermaschinen & Service',
    desc: 'Industrierohrleitungsbau, Sonder-Apparatebau, Stahlbau-Bühnen sowie bundesweite Montage und Instandsetzung.',
    image: IMAGES.rohrleitungen
  }
];

export default function IndustriesSection({ onNavigate }) {
  const { anwendungsgebiete } = useCms();

  const goToPreFilteredOverview = (categoryId) => {
    const targetUrl = `/anwendungsgebiete?kategorie=${categoryId}#katalog`;
    if (onNavigate) {
      onNavigate(targetUrl);
    } else {
      window.history.pushState({}, '', targetUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const goToOverview = () => {
    if (onNavigate) {
      onNavigate('/anwendungsgebiete');
    } else {
      window.history.pushState({}, '', '/anwendungsgebiete');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section
      id="anwendungsgebiete"
      className="pt-28 sm:pt-36 pb-24 sm:pb-32 border-b border-[#1c5f2e]/25 relative overflow-hidden"
    >
      {/* 1. Fixed Industrial Background Image (etwas sichtbarer durch reduzierten Schleier) */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${IMAGES.panorama || IMAGES.tanklager})`
        }}
      />

      {/* 2. Lighter Veil so the fixed background image shines through more clearly + Subtle Green Tint */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(244, 249, 245, 0.78) 0%, rgba(251, 249, 245, 0.71) 50%, rgba(230, 244, 234, 0.78) 100%)'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(28, 95, 46, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28, 95, 46, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 3. Organischer, sanft geschwungener Wellen-Übergang oben (statt gerader Kante) */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none select-none z-10 -mt-[1px]">
        <svg
          className="relative block w-full h-[46px] sm:h-[68px] lg:h-[82px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sanfte Sekundärwelle in zartem Weber-Grün */}
          <path
            d="M0,0 L1440,0 L1440,46 C1180,88 940,14 680,52 C420,88 210,24 0,62 Z"
            fill="rgba(28, 95, 46, 0.12)"
          />
          {/* Hauptwelle in der Hintergrundfarbe (#FBF9F5) des darüberliegenden Abschnitts */}
          <path
            d="M0,0 L1440,0 L1440,34 C1190,76 930,6 670,42 C410,78 200,14 0,48 Z"
            fill="#FBF9F5"
          />
          {/* Feine grüne Akzentlinie entlang der Wellenkontur */}
          <path
            d="M0,48 C200,14 410,78 670,42 C930,6 1190,76 1440,34"
            fill="none"
            stroke="rgba(28, 95, 46, 0.32)"
            strokeWidth="1.5"
          />
          <path
            d="M0,58 C210,24 420,86 680,50 C940,14 1180,84 1440,44"
            fill="none"
            stroke="rgba(28, 95, 46, 0.18)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Subtle Green Bottom Dashed Accent Line */}
      <div className="absolute bottom-3.5 inset-x-6 lg:inset-x-12 border-b border-dashed border-[#1c5f2e]/30 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* 1. Section Header with Discreet Text Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
              <span className="w-5 h-[2px] bg-[#1c5f2e]" />
              <span>Anwendungsgebiete & Branchen</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Verlässlichkeit im Umgang mit sensiblen Medien.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
              Ob konzentrierte Salzsäure in der Feuerverzinkung, 95 °C heiße Elektrolyte in der Oberflächentechnik oder hochreine Medien in der Halbleiterfertigung – unsere Anlagen sind exakt auf Ihren Prozess abgestimmt.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={goToOverview}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#1c5f2e] hover:text-[#0d2a14] transition-colors pb-1 border-b border-[#1c5f2e]/45 hover:border-[#0d2a14] cursor-pointer"
            >
              <span>Alle {anwendungsgebiete?.length || 12} Anwendungsgebiete ansehen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. Core Weber Industry Advantages (3 Compact Columns with Subtle Clean Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {INDUSTRY_ADVANTAGES.map((adv, idx) => {
            const IconComp = adv.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/95 backdrop-blur-xs rounded-2xl border border-[#1c5f2e]/25 hover:border-[#1c5f2e]/65 p-5 sm:p-6 shadow-xs hover:shadow-[0_16px_36px_-10px_rgba(28,95,46,0.18)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#1c5f2e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#1c5f2e] group-hover:bg-[#1c5f2e] group-hover:border-[#1c5f2e] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
                  <IconComp className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors duration-300 leading-snug">
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

        {/* 3. 4-Card Industry Category Grid (Clicks directly into pre-sorted category on /anwendungsgebiete) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_CATEGORY_CARDS.map((card) => (
            <div
              key={card.categoryId}
              onClick={() => goToPreFilteredOverview(card.categoryId)}
              className="group bg-white/95 backdrop-blur-xs rounded-2xl border border-neutral-200/90 hover:border-[#1c5f2e]/65 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(13,42,20,0.14)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#FBF9F5] border-t border-neutral-200/80 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#1c5f2e] transition-colors">
                <span>Bereich gefiltert öffnen</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
