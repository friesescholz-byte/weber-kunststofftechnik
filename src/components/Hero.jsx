import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';
import HeroMediaSlider from './HeroMediaSlider';

export default function Hero() {
  const heroRef = useRef(null);

  // Hardware-accelerierter, hochoptimierter Parallax-Scroll-Effekt (butterweich ohne Ruckeln)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Reines GPU-translateY ohne teure Filter/Scale-Neuberechnung mit spürbar intensiverem Parallax-Hub
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "28%"]);

  return (
    <section 
      ref={heroRef}
      className="relative pt-36 sm:pt-40 lg:pt-40 pb-52 sm:pb-72 lg:pb-[430px] text-white overflow-hidden bg-[#1b592c]"
    >
      
      {/* Background Layers mit butterweichem Parallax-Scroll (Großflächig über die gesamte Seite & hell abgestimmt) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        
        {/* Layer 1: Werksgelände Drohnenshot in exakt derselben großen Skalierung (2170px Höhe, -310px Top) wie im Original */}
        <motion.div 
          style={{ 
            y: backgroundY,
            height: "2170px",
            top: "-310px",
            left: 0,
            right: 0,
            willChange: "transform"
          }}
          className="absolute w-full"
        >
          <div
            className="w-full h-full"
            style={{
              maskImage: "linear-gradient(to right, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,1) 100%)"
            }}
          >
            <img 
              src={IMAGES.droneShot} 
              alt="Luftaufnahme Werksgelände Minden" 
              className="w-full h-full object-cover object-center brightness-[1.15]"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </motion.div>

        {/* Layer 2: Weber-Green Multiplied Tint */}
        <div 
          className="absolute inset-0 bg-[#267d3d] opacity-[0.52] mix-blend-multiply"
        />

        {/* Layer 3: Dezente Text-Lesbarkeits-Vignette links */}
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-[#0e3017]/60 via-[#13401f]/30 to-transparent z-[1]"
        />

        {/* Layer 4: Leichter Contrast Gradient über die gesamte Fläche */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/35 z-[1]"
        />

        {/* Layer 5: 135-degree Diagonal Pinstripe Hatch Pattern */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.07) 0px, rgba(0, 0, 0, 0.07) 1px, transparent 1px, transparent 11px)`
          }}
        />

        {/* Layer 6: Subtle green ambient glow on the right */}
        <div 
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-400/25 rounded-full blur-[140px] pointer-events-none z-[1]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Editorial Content (Große, markante Überschrift + gesamtes LKW-Bild sofort beim Öffnen komplett sichtbar) */}
        <div className="max-w-5xl mb-6 sm:mb-7">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.08] mb-3.5">
            Industrieller{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#a7f3d0] to-[#34d399] font-extrabold inline-block">
              Kunststoff- und Behälterbau.
            </span>{' '}
            <span className="text-white/95 block font-bold mt-1">
              Seit über 55 Jahren am Standort Minden.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-2xl mb-4 drop-shadow-xs">
            Wir konstruieren, fertigen und montieren thermoplastische Großbehälter, 
            Abluftwäscher und Rohrleitungssysteme für chemisch anspruchsvolle Medien – mit 
            eigener Fertigungstiefe und DIBt-Zulassung.
          </p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <SpecialCtaButton text="Projekt anfragen" href="#anfrage" />
          </div>
        </div>

        {/* Dynamic Multi-Photo Slider mit bewegten Bildern (Cinematic Ken Burns Motion) */}
        <HeroMediaSlider />

      </div>

      {/* Schmaler, dezenter Stahlbau-Übergangsstreifen exakt an der unteren Kante des grünen Hero-Hintergrunds */}
      <div className="absolute bottom-0 inset-x-0 h-[44px] sm:h-[48px] z-[5] overflow-hidden pointer-events-none select-none bg-[#092211]/90 border-t border-[#1c5f2e]/45 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroBottomSteelPattern" width="160" height="52" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="160" y2="0" stroke="rgba(34, 197, 94, 0.16)" strokeWidth="0.8" />
              <line x1="0" y1="26" x2="160" y2="26" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="0" y1="52" x2="160" y2="52" stroke="rgba(34, 197, 94, 0.16)" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="0" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="32" y1="0" x2="32" y2="52" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="64" y1="0" x2="64" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="96" y1="0" x2="96" y2="52" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.8" />
              <line x1="128" y1="0" x2="128" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="160" y1="0" x2="160" y2="52" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="0.8" />
              <line x1="2" y1="2" x2="30" y2="24" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="94" y1="2" x2="66" y2="24" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="34" y1="28" x2="62" y2="50" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <line x1="158" y1="28" x2="130" y2="50" stroke="rgba(74, 222, 128, 0.12)" strokeWidth="0.75" />
              <circle cx="32" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />
              <circle cx="96" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />
              <circle cx="128" cy="26" r="0.8" fill="#94a3b8" opacity="0.35" />
              <rect x="34" y="2" width="28" height="22" rx="1.5" fill="rgba(34, 197, 94, 0.07)" stroke="rgba(74, 222, 128, 0.28)" strokeWidth="0.75" />
              <rect x="98" y="28" width="28" height="22" rx="1.5" fill="rgba(21, 128, 61, 0.1)" stroke="rgba(34, 197, 94, 0.22)" strokeWidth="0.75" />
              <rect x="130" y="2" width="28" height="22" rx="1.5" fill="rgba(34, 197, 94, 0.03)" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="0.75" strokeDasharray="2 2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroBottomSteelPattern)" />
        </svg>
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#092211] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#092211] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
