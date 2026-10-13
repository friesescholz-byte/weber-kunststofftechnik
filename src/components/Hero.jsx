import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../data/weberData';
import SpecialCtaButton from './SpecialCtaButton';

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
      className="relative pt-36 sm:pt-44 lg:pt-48 pb-32 sm:pb-38 lg:pb-44 text-white overflow-hidden bg-[#0d2a14]"
    >
      
      {/* Background Layers mit butterweichem Parallax-Scroll */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        
        {/* Layer 1: Werksgelände Drohnenshot mit GPU-beschleunigtem Parallax, horizontal gespiegelt & Maskierung */}
        <motion.div 
          style={{ 
            y: backgroundY,
            willChange: "transform",
            transform: "translate3d(0, 0, 0)"
          }}
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
        >
          <div
            className="w-full h-full"
            style={{
              // Bild ist links unter dem Text sanft abgedunkelt/ausgeblendet, rechts voll sichtbar
              maskImage: "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.95) 100%)",
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.95) 100%)"
            }}
          >
            <img 
              src={IMAGES.droneShot} 
              alt="Luftaufnahme Werksgelände Minden" 
              className="w-full h-full object-cover object-center -scale-x-100"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </motion.div>

        {/* Layer 2: Deep Weber-Green Multiplied Tint */}
        <div 
          className="absolute inset-0 bg-[#1c5f2e] opacity-[0.88] mix-blend-multiply"
        />

        {/* Layer 3: Text-Lesbarkeits-Vignette (Dunkler, ruhiger Farbverlauf gezielt hinter dem Textbereich links) */}
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/80 to-transparent z-[1]"
        />

        {/* Layer 4: Contrast Darken Gradient über die gesamte Fläche */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 z-[1]"
        />

        {/* Layer 5: 135-degree Diagonal Pinstripe Hatch Pattern */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
          }}
        />

        {/* Layer 6: Subtle green ambient glow on the right */}
        <div 
          className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-weber-400/15 rounded-full blur-[140px] pointer-events-none z-[1]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Editorial Content (Höchste Lesbarkeit & Kontrast) */}
        <div className="max-w-4xl mb-12 md:mb-16">
          

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Industrieller{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#a7f3d0] to-[#34d399] font-extrabold inline-block">
              Kunststoff- und Behälterbau.
            </span>{' '}
            <span className="text-white/95 block font-bold mt-2 sm:mt-3">
              Seit über 55 Jahren am Standort Minden.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/95 font-medium leading-relaxed max-w-2xl mb-10 drop-shadow-xs">
            Wir konstruieren, fertigen und montieren thermoplastische Großbehälter, 
            Abluftwäscher und Rohrleitungssysteme für chemisch anspruchsvolle Medien – mit 
            eigener Fertigungstiefe und DIBt-Zulassung.
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
            <SpecialCtaButton text="Projekt anfragen" href="#anfrage" />

            <a
              href="#produkte"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm font-semibold rounded-xl backdrop-blur-xs transition-colors self-center mt-3.5"
            >
              Produkte ansehen
            </a>
          </div>
        </div>

        {/* Large Hero Image: Newly generated wide 16:9 Schwerlast-Transport (Scania LKW mit Großbauwerk) */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-neutral-900 aspect-[16/9] sm:aspect-[21/9] relative group">
          <img 
            src={IMAGES.heavyTransport} 
            alt="Weber Kunststofftechnik Schwerlasttransport eines Großbehälters am Alexanderplatz Berlin" 
            className="w-full h-full object-cover object-center"
          />

          {/* Subtile fotografische Vignette zur Fokussierung auf den Scania-LKW */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.32)] z-[5]" />

          {/* Dezent platziertes weißes Firmenlogo oben rechts mit Schatten */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-7 z-10 pointer-events-none select-none">
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik/weber-logo-1-fbg-weiss-1024x410_11.webp" 
              alt="Weber Kunststofftechnik" 
              className="h-6 sm:h-8 md:h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] opacity-90"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
