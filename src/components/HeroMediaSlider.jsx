import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../data/weberData';

const SLIDES = [
  {
    src: IMAGES.heavyTransport,
    alt: "Weber Kunststofftechnik Schwerlasttransport Alexanderplatz Berlin",
    objectPosition: "center 72%"
  },
  {
    src: IMAGES.rundbehaelter,
    alt: "Zylindrische Großbehälter bis 100 m³ Werksfertigung Minden",
    objectPosition: "center center"
  },
  {
    src: IMAGES.tanklager,
    alt: "Industrielle Groß-Tanklager und Chemikalienlagerung",
    objectPosition: "center center"
  },
  {
    src: IMAGES.rechteckbehaelter,
    alt: "Stahlarmierte Rechteckbehälter und Galvanikbäder",
    objectPosition: "center center"
  },
  {
    src: IMAGES.abluft,
    alt: "TA-Luft konforme Abluftreinigungsanlage und Gaswäscher",
    objectPosition: "center center"
  },
  {
    src: IMAGES.droneShot,
    alt: "Unternehmensstandort Weber Kunststofftechnik in Minden auf über 25.000 m² Werksgelände",
    objectPosition: "center center"
  }
];

const AUTOPLAY_INTERVAL = 5500; // 5.5 Sekunden pro Bild

export default function HeroMediaSlider({ 
  className = "", 
  heightClass = "h-[240px] sm:h-[370px] lg:h-[calc(100vh-475px)] lg:min-h-[380px] lg:max-h-[500px]" 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentIndex]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <div 
      className={`w-full rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-neutral-950 relative group select-none ${heightClass} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Weber Bildgalerie"
    >
      {/* 1. Nahtlose Überblendung OHNE Dunkelpause (kein mode="wait", fließendes Crossfade Bild in Bild) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Dezente, butterweiche Kamerabewegung (Ken Burns / bewegte Bilder) */}
          <motion.img
            src={currentSlide.src}
            alt={currentSlide.alt}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: AUTOPLAY_INTERVAL / 1000 + 0.8, ease: "easeOut" }}
            style={{ objectPosition: currentSlide.objectPosition }}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Subtile fotografische Vignette für Tiefe & Kontrast */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] z-[5]" />

      {/* 3. Firmenlogo oben rechts mit Schatten */}
      <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-6 z-10 pointer-events-none select-none">
        <img 
          src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik/weber-logo-1-fbg-weiss-1024x410_11.webp" 
          alt="Weber Kunststofftechnik" 
          className="h-6 sm:h-8 md:h-9 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] opacity-95"
        />
      </div>

      {/* 4. Sehr dezente, minimalistische Punkte-Navigation unten rechts (ohne Text, ohne Pfeile) */}
      <div className="absolute bottom-3.5 right-4 sm:bottom-4 sm:right-6 z-10 flex items-center gap-1.5 p-1 rounded-full bg-black/25 backdrop-blur-xs border border-white/10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(idx);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-3.5 h-1.5 bg-white/95'
                : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Bild ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
