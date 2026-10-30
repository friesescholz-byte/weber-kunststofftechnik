import React, { useMemo } from 'react';
import { ArrowRight, Ruler, ShieldCheck, Factory } from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { R2_BASE } from '../data/weberData';

const PRODUCT_ADVANTAGES = [
  {
    icon: Ruler,
    title: 'Maßanfertigung bis 100 m³',
    desc: '3D-CAD-Konstruktion und prüffähige Statik nach DIN EN 12573 & DVS 2205.'
  },
  {
    icon: ShieldCheck,
    title: 'DIBt-Zulassung & § 62 AwSV',
    desc: 'Bauaufsichtliche Zulassungen (Z-40.21 / Z-40.22) und TÜV-überwachter Fachbetrieb.'
  },
  {
    icon: Factory,
    title: '25.000 m² Werk & eigene Montage',
    desc: 'Eigene Fertigung in Minden, Schwerlast-Tieflader und 25+ eigene Monteure.'
  }
];

const FALLBACK_PRODUCT_PHOTOS = [
  `${R2_BASE}/weber-kunststofftechnik-rundbehaelter05_09.webp`,
  `${R2_BASE}/weber-kunststofftechnik-rechteckbehaelter03_07.webp`,
  `${R2_BASE}/weber-kunststofftechnik-tanklager17_10.webp`,
  `${R2_BASE}/weber-kunststofftechnik-abluftreinigungsanlage02_01.webp`,
  `${R2_BASE}/weber-kunststofftechnik-dosieranlage01.webp`,
  `${R2_BASE}/weber-kunststofftechnik-gefahrstofflagerung01_04.webp`,
  `${R2_BASE}/weber-kunststofftechnik-rechteckbehaelter01.webp`,
  `${R2_BASE}/weber-kunststofftechnik-stahlbau02.webp`,
  `${R2_BASE}/weber-kunststofftechnik-montage04.webp`,
  `${R2_BASE}/weber-kunststofftechnik-logistik-transport15.webp`,
  `${R2_BASE}/produktion-behaelter.webp`,
  `${R2_BASE}/weber-kunststofftechnik-rundbehaelter02.webp`,
  `${R2_BASE}/weber-kunststofftechnik-rechteckbehaelter05.webp`,
  `${R2_BASE}/weber-kunststofftechnik-abluftreinigungsanlage05.webp`,
  `${R2_BASE}/weber-kunststofftechnik-gefahrstofflagerung04.webp`,
  `${R2_BASE}/weber-kunststofftechnik-montage10.webp`
];

export default function ProductsSection({ onNavigate }) {
  const { produkte } = useCms();
  const allProducts = produkte || [];

  // Build 2 rich rows of pure product photos without text or links
  const { row1Images, row2Images } = useMemo(() => {
    const collected = [];
    const seen = new Set();

    allProducts.forEach((p) => {
      if (p.image && !seen.has(p.image)) {
        seen.add(p.image);
        collected.push(p.image);
      }
      if (Array.isArray(p.gallery)) {
        p.gallery.slice(0, 2).forEach((imgUrl) => {
          if (imgUrl && !seen.has(imgUrl)) {
            seen.add(imgUrl);
            collected.push(imgUrl);
          }
        });
      }
    });

    const pool = (collected.length >= 12 ? collected : FALLBACK_PRODUCT_PHOTOS).slice(0, 12);
    return {
      row1Images: pool.slice(0, 6),
      row2Images: pool.slice(6, 12)
    };
  }, [allProducts]);

  const goToOverview = () => {
    if (onNavigate) {
      onNavigate('/produkte');
    } else {
      window.history.pushState({}, '', '/produkte');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section
      id="produkte"
      className="py-24 sm:py-32 bg-[#FBF9F5] border-b border-neutral-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* 1. Editorial Section Header with Discreet Text Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#1c5f2e] block mb-3">
              Fertigung & Leistungsspektrum
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Maßgefertigter Behälter-, Apparate- und Anlagenbau.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Von zylindrischen Großlagertanks über stahlarmierte Prozess- und Beizbecken bis zu TA-Luft-Abluftwäschern: Bei Weber erhalten Sie Konstruktion, Fertigung, Schwerlastlogistik und Montage aus einer Hand.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={goToOverview}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#1c5f2e] hover:text-[#0d2a14] transition-colors pb-1 border-b border-[#1c5f2e]/35 hover:border-[#0d2a14] cursor-pointer"
            >
              <span>Alle {allProducts.length || 11} Produkte ansehen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2. Core Weber Product Advantages (3 Compact Columns with Subtle Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PRODUCT_ADVANTAGES.map((adv, idx) => {
            const IconComp = adv.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl border border-neutral-200/90 hover:border-[#1c5f2e]/55 p-5 sm:p-6 shadow-xs hover:shadow-[0_16px_36px_-10px_rgba(28,95,46,0.14)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#1c5f2e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-11 h-11 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-[#1c5f2e] group-hover:bg-[#1c5f2e] group-hover:border-[#1c5f2e] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
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
      </div>

      {/* 3. Full-Screen 2-Row Photo Slider Gallery (Nur reine Bilder, beide Reihen gleiche Richtung & leicht versetzt, ruhiges Tempo wie Karriere) */}
      <div className="relative w-full overflow-hidden py-2 space-y-5">
        {/* Obere Slider-Reihe */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1">
            {[...row1Images, ...row1Images].map((src, idx) => (
              <div
                key={`prod-img-r1-${idx}`}
                className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs bg-slate-900"
              >
                <img
                  src={src}
                  alt="Kunststofftechnik Weber Produkt- und Behälterfertigung"
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Untere Slider-Reihe (gleiche Richtung, um eine halbe Kartenbreite versetzt) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1 -ml-[155px] sm:-ml-[205px] lg:-ml-[230px]">
            {[...row2Images, ...row2Images].map((src, idx) => (
              <div
                key={`prod-img-r2-${idx}`}
                className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs bg-slate-900"
              >
                <img
                  src={src}
                  alt="Kunststofftechnik Weber Apparate- und Anlagenbau"
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
