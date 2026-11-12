import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Award, 
  ShieldCheck, 
  Building2, 
  FileDown, 
  Phone, 
  Mail,
  Users,
  Leaf,
  HardHat,
  Factory,
  MapPin,
  Layers
} from 'lucide-react';
import { IMAGES, COMPANY_FACTS, GLOBAL_LOCATIONS, CERTIFICATES_LIST } from '../data/weberData';
import ClosingCtaSection from '../components/ClosingCtaSection';
import HeroMediaSlider from '../components/HeroMediaSlider';


export default function CompanyPage({ onNavigate, onOpenRequestModal }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "28%"]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const philosophyPillars = [
    {
      title: "Kompromisslose Fertigungsqualität",
      desc: "Jeder Behälter, Apparat und Rohrleitungsabschnitt verlässt unser Werk in Minden erst nach strenger Prüfung nach DIN EN ISO 9001:2015 und DVS-Richtlinien.",
      icon: ShieldCheck
    },
    {
      title: "Partnerschaftliche Projektbegleitung",
      desc: "Von der ersten Machbarkeitsstudie über die 3D-CAD-Konstruktion bis zur schlüsselfertigen Inbetriebnahme stehen Ihnen feste Ansprechpartner zur Seite.",
      icon: Users
    },
    {
      title: "Aktiver Umwelt- & Gewässerschutz",
      desc: "Als zertifizierter Fachbetrieb nach WHG/AwSV schützen unsere doppelwandigen Behälter- und Auffangsysteme Böden und Gewässer zuverlässig vor Gefahrstoffen.",
      icon: Leaf
    },
    {
      title: "Arbeitssicherheit nach SCC**",
      desc: "Unsere Montageteams arbeiten weltweit nach höchsten Arbeitsschutz- und Sicherheitsstandards (SCC** zertifiziert) in sensiblen Chemie- und Industrieparks.",
      icon: HardHat
    }
  ];

  return (
    <div className="bg-[#FBF9F5]">
      
      {/* 1. Architectural Hero Header with Parallax Werksbild */}
      <section 
        ref={heroRef}
        className="relative bg-[#0d2a14] text-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 border-b border-[#1c5f2e]/50 overflow-hidden"
      >
        {/* Background Layers with GPU Parallax, Green Multiplied Tint & Masks */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
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
                maskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)",
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.92) 100%)"
              }}
            >
              <img 
                src={IMAGES.luftbild2025 || IMAGES.droneShot} 
                alt="Werksgelände Minden Luftaufnahme" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[#1c5f2e] opacity-[0.88] mix-blend-multiply" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/80 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 z-[1]" />
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
            }}
          />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-weber-400/15 rounded-full blur-[140px] pointer-events-none z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-8">
            <button onClick={() => onNavigate('/')} className="hover:text-white flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
            <span className="text-emerald-500/50">/</span>
            <span className="text-white font-semibold">Unternehmen</span>
          </div>

          <div className="max-w-3xl space-y-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Kunststofftechnik Weber GmbH – Ihr Werk für industriellen Anlagenbau.
            </h1>
            <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed">
              Was 1967 in Minden begann, ist heute einer der führenden europäischen Spezialbetriebe 
              für thermoplastischen Behälter-, Apparate- und Rohrleitungsbau mit rund 270 Mitarbeitenden 
              am Hauptsitz und über 25.000 m² Produktionsfläche.
            </p>
          </div>

          {/* Quick Anchor Navigation Pills without 01-04 */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
            <a 
              href="#ueber-uns" 
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/40 text-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              Über uns & Historie
            </a>
            <a 
              href="#philosophie" 
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/40 text-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              Unternehmensphilosophie
            </a>
            <a 
              href="#zertifizierungen" 
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/40 text-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              Zertifizierungen & Qualität
            </a>
            <a 
              href="#standorte" 
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/40 text-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              Standorte weltweit
            </a>
          </div>

          {/* Bild-Slider direkt oben beim Seitenaufruf */}
          <div className="mt-8">
            <HeroMediaSlider heightClass="h-[240px] sm:h-[360px] lg:h-[440px]" />
          </div>

        </div>
      </section>

      {/* 2. Section: Über uns & Entwicklung des Stammwerks Minden */}
      <section id="ueber-uns" className="py-20 sm:py-24 bg-[#FBF9F5] border-b border-neutral-200/90 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-4xl mb-12 sm:mb-14 pb-8 border-b border-neutral-200/80">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
              <span className="w-6 h-[2px] bg-[#1c5f2e]" />
              <span>Tradition & Entwicklung seit 1967</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Vom Mindener Pionierbetrieb zum europäischen Technologieführer.
            </h2>
          </div>

          {/* Unified Key Performance Indicators: Anchoring the section */}
          {/* Unified Key Performance Indicators: Anchoring the section with subtle hover dynamics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 sm:mb-16">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 border-t-2 border-t-[#1c5f2e] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#1c5f2e]/60 transition-all duration-300 group cursor-default">
              <span className="text-3xl sm:text-4xl font-black text-[#1c5f2e] block tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left">1967</span>
              <span className="text-xs font-bold text-slate-900 mt-1.5 block">Gründung in Minden</span>
              <span className="text-xs text-slate-500 mt-0.5 block">Über 55 Jahre Erfahrung im Behälterbau</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 border-t-2 border-t-[#1c5f2e] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#1c5f2e]/60 transition-all duration-300 group cursor-default">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#1c5f2e] block tracking-tight group-hover:scale-[1.02] transition-all duration-300 origin-left">~270</span>
              <span className="text-xs font-bold text-slate-900 mt-1.5 block">Mitarbeitende</span>
              <span className="text-xs text-slate-500 mt-0.5 block">Ingenieure, Meister & DVS-Schweißer</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 border-t-2 border-t-[#1c5f2e] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#1c5f2e]/60 transition-all duration-300 group cursor-default">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-[#1c5f2e] block tracking-tight group-hover:scale-[1.02] transition-all duration-300 origin-left">&gt;25.000 m²</span>
              <span className="text-xs font-bold text-slate-900 mt-1.5 block">Produktionsfläche</span>
              <span className="text-xs text-slate-500 mt-0.5 block">Moderne Hallen & Freilagerflächen</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 border-t-2 border-t-[#1c5f2e] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#1c5f2e]/60 transition-all duration-300 group cursor-default">
              <span className="text-3xl sm:text-4xl font-black text-[#1c5f2e] block tracking-tight group-hover:scale-[1.02] transition-transform duration-300 origin-left">6 Standorte</span>
              <span className="text-xs font-bold text-slate-900 mt-1.5 block">Präsenz in Europa</span>
              <span className="text-xs text-slate-500 mt-0.5 block">Minden, Polen, Benelux, Skandinavien</span>
            </div>
          </div>

          {/* Company Story Text */}
          <div className="max-w-4xl space-y-5 text-base sm:text-lg text-slate-600 leading-relaxed mb-16">
            <p>
              Die <strong className="text-slate-900 font-semibold">Kunststofftechnik Weber GmbH</strong> mit Hauptsitz im ostwestfälischen Minden plant, konstruiert und fertigt seit 1967 anspruchsvolle Großbehälter, Apparate und Rohrleitungssysteme aus thermoplastischen Kunststoffen (PE, PP, PVC, PVDF, ECTFE) sowie Verbundwerkstoffen (GFK).
            </p>
            <p>
              Was damals mit der Vision begann, metallische Werkstoffe in korrosiven Industrieumgebungen durch langlebige Thermoplaste zu ersetzen, ist heute ein international renommierter Partner der chemischen Industrie, Pharmazie, Halbleiterfertigung und Umwelttechnik.
            </p>
            <p>
              Mit rund 270 Mitarbeitenden am Standort Minden und Tochtergesellschaften in sechs europäischen Ländern realisieren wir anspruchsvollste Vorhaben – von der ersten DVS 2205 Vorbemessung über die werkseigene Schwerlastfertigung bis zur Montage vor Ort.
            </p>
          </div>

          {/* Früher vs. Heute: Großformatige Nebeneinander-Gegenüberstellung */}
          <div className="pt-10 border-t border-neutral-200/80">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-2">
                <span className="w-6 h-[2px] bg-[#1c5f2e]" />
                <span>Früher vs. Heute · Standortentwicklung Minden</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                55 Jahre Transformation am Mitteldamm im Direktvergleich.
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Vom ersten Handwerksbetrieb 1967 zum europäischen High-Tech Werk mit über 25.000 m² Produktions- und Freilagerfläche.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm space-y-3">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                  <img 
                    src={IMAGES.luftbild70er} 
                    alt="Historische Luftaufnahme 1970er Jahre" 
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="px-1">
                  <span className="text-base font-bold text-slate-900 block">1970er Jahre · Die Anfänge am Mitteldamm</span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Gründung als handwerklicher Pionierbetrieb mit erster Fertigungshalle und visionärem Einsatz von thermoplastischen Kunststoffen.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm space-y-3">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                  <img 
                    src={IMAGES.luftbild2025} 
                    alt="Stammwerk Minden heute (2025)" 
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="px-1">
                  <span className="text-base font-bold text-slate-900 block">Heute (2025) · Über 25.000 m² High-Tech Werk</span>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Modernste Produktionshallen mit Wickelrohranlagen bis Ø 4 m, Schwerlastkranbahnen und 270 Fachkräften am Hauptsitz Minden.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section: Unternehmensphilosophie & Fertigungskompetenz */}
      <section id="philosophie" className="py-20 sm:py-28 bg-white border-b border-neutral-200/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
              <span className="w-6 h-[2px] bg-[#1c5f2e]" />
              <span>Qualitätsphilosophie & Fertigungskompetenz</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Verlässlichkeit im Umgang mit sensiblen Medien.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Im industriellen Behälter- und Anlagenbau entscheidet die Ausführungsqualität über Betriebssicherheit, 
              Umweltschutz und jahrzehntelange Anlagenverfügbarkeit ohne ungeplante Stillstände.
            </p>
          </div>

          {/* Asymmetrical Agency Layout: 4 Quality Pillars (Left) + Wickelrohr USP Showcase (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left: 4 Principles as an Editorial List */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {philosophyPillars.map((p, idx) => {
                const IconComp = p.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-[#FBF9F5] rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-[#1c5f2e]/60 hover:shadow-sm transition-all group flex items-start gap-4 sm:gap-5"
                  >
                    <div className="shrink-0 pt-0.5">
                      <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200/90 text-[#1c5f2e] flex items-center justify-center group-hover:bg-[#1c5f2e] group-hover:text-white group-hover:border-[#1c5f2e] transition-colors shadow-xs">
                        <IconComp className="w-5 h-5 stroke-[1.75]" />
                      </div>
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Authentic Production Insight Visual (Wickelrohranlage) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="bg-[#0d2a14] text-white rounded-3xl overflow-hidden border border-[#1c5f2e]/40 shadow-xl flex-1 flex flex-col justify-between">
                
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900 relative">
                  <img 
                    src={IMAGES.wickelrohrAnlage || IMAGES.einblickProduktion1} 
                    alt="Wickelrohranlage in Minden" 
                    className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a14] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-7 sm:p-9 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#143d1f] border border-emerald-400/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
                    <Factory className="w-3.5 h-3.5" />
                    <span>Fertigungstiefe Stammwerk Minden</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Eigene Wickelrohranlagen & zertifizierte Schweißerei.
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Mit unseren hauseigenen Wickelrohranlagen fertigen wir zylindrische Behälterkörper bis zu einem Durchmesser von 4.000 mm nahtlos und spannungsarm direkt im Werk Minden – ohne risikobehaftete Längsschweißnähte.
                  </p>

                  <div className="pt-5 border-t border-emerald-500/20 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                      <span className="text-xl sm:text-2xl font-black text-white block">bis Ø 4,0 m</span>
                      <span className="text-xs text-emerald-300/80">Wickelrohrdurchmesser</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
                      <span className="text-xl sm:text-2xl font-black text-white block">bis 100 m³</span>
                      <span className="text-xs text-emerald-300/80">Behältervolumen am Stück</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Section: Zertifizierungen & Qualität - Hero-Style Signature Showcase with Architectural Borders */}
      <section id="zertifizierungen" className="py-24 sm:py-32 relative overflow-hidden bg-[#0d2a14] text-white border-y border-[#1c5f2e]/50">
        
        {/* Background Layers matching Hero styling */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          
          {/* Layer 1: Authentic industrial engineering photograph with smooth right-masking */}
          <div className="absolute inset-0 w-full h-full">
            <div
              className="w-full h-full"
              style={{
                maskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.88) 100%)",
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.88) 100%)"
              }}
            >
              <img 
                src={IMAGES.tanklager || IMAGES.droneShot} 
                alt="Industrielles Tanklager Kunststofftechnik Weber" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Layer 2: Deep Weber-Green Multiplied Tint */}
          <div className="absolute inset-0 bg-[#1c5f2e] opacity-[0.90] mix-blend-multiply" />

          {/* Layer 3: Text Readability Gradient Vignette on Left */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/85 to-transparent z-[1]" />

          {/* Layer 4: Full Contrast Darken Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75 z-[1]" />

          {/* Layer 5: 135-degree Diagonal Pinstripe Hatch Pattern */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
            }}
          />

          {/* Layer 6: Subtle Emerald Ambient Glow */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-400/15 rounded-full blur-[140px] pointer-events-none z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-300 mb-3">
                <span className="w-6 h-[2px] bg-emerald-400" />
                <span>Zertifizierungen & Baurechtliche Zulassungen</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                Zertifizierte Sicherheit für{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#a7f3d0] to-[#34d399] inline-block">
                  anspruchsvolle Industrieanlagen.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-white/90 mt-4 leading-relaxed max-w-2xl font-medium drop-shadow-xs">
                Im industriellen Anlagenbau mit aggressiven Medien gibt es keine Kompromisse. Unsere Behälter, Werkstoffe und Schweißprozesse sind lückenlos bauaufsichtlich zugelassen und werden kontinuierlich durch unabhängige Prüfinstitute auditiert.
              </p>
            </div>
            <div className="shrink-0">
              <button 
                onClick={() => onNavigate('/downloads')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-slate-900 font-bold text-xs sm:text-sm transition-all shadow-md group border border-white"
              >
                <span>Alle Zertifikate im Downloadbereich</span>
                <ArrowRight className="w-4 h-4 text-[#1c5f2e] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Feature Highlight: Crisp Pure White Card for 100% Maximum Readability & Contrast */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-8 sm:p-10 mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-slate-900">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1c5f2e]/10 text-[#1c5f2e] text-xs font-mono uppercase tracking-wider font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Bauaufsichtlich Zugelassen & Güteüberwacht</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Lückenlose Nachweise vom DIBt bis zum TÜV Nord.
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Als Hersteller für den industriellen Behälter- und Apparatebau erfüllen wir sämtliche baurechtlichen und umweltrechtlichen Anforderungen der Wasserbehörden (AwSV/WHG) sowie die europäischen Fertigungsnormen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">DIBt Bauartzulassungen</span>
                    <span className="text-xs text-slate-500">Z-40.21-7 & Z-40.21-11 für Lagerbehälter</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">WHG / AwSV Fachbetrieb</span>
                    <span className="text-xs text-slate-500">Zugelassen nach § 62 durch TÜV Nord</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">DVS 2212 Schweißfachbetrieb</span>
                    <span className="text-xs text-slate-500">Regelmäßig geprüfte Schweißfachkräfte</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">SCC** Sicherheitsstandard</span>
                    <span className="text-xs text-slate-500">Höchster Arbeitsschutz für Chemieparks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#FBF9F5] p-3.5 sm:p-4 rounded-2xl border border-neutral-200/90 shadow-inner">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs">
                  <img 
                    src={IMAGES.zulassungBanner} 
                    alt="Offizielle DIBt und TÜV Nord Zulassungsbescheide Kunststofftechnik Weber" 
                    className="w-full h-full object-contain p-2 hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2.5 px-1 text-center">
                  <span className="text-[11px] font-mono font-medium text-slate-600">
                    Auszug amtlicher Zulassungsbescheide (DIBt & TÜV Nord)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Compliance Seal Matrix with Crisp Contrast & Hover Lift */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-md flex items-center gap-3 text-slate-900 hover:shadow-xl hover:border-[#1c5f2e]/60 hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">DIBt Berlin</span>
                <span className="text-slate-500">Z-40.21-7 / -11</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-md flex items-center gap-3 text-slate-900 hover:shadow-xl hover:border-[#1c5f2e]/60 hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">TÜV Nord</span>
                <span className="text-slate-500">WHG Fachbetrieb</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-md flex items-center gap-3 text-slate-900 hover:shadow-xl hover:border-[#1c5f2e]/60 hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">ISO 9001:2015</span>
                <span className="text-slate-500">Qualitätsmanagement</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-md flex items-center gap-3 text-slate-900 hover:shadow-xl hover:border-[#1c5f2e]/60 hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center shrink-0">
                <HardHat className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">SCC** Standard</span>
                <span className="text-slate-500">Sicherheitszertifikat</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Section: Standorte weltweit */}
      <section id="standorte" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
                <span className="w-6 h-[2px] bg-[#1c5f2e]" />
                <span>Europäische Präsenz · 6 Standorte</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                International vernetzt – in ganz Europa vor Ort.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                Neben unserem Hauptwerk in Minden betreuen unsere europäischen Tochtergesellschaften und 
                Vertriebsniederlassungen Kunden in Polen, den Benelux-Staaten, Skandinavien, Frankreich und Großbritannien.
              </p>
            </div>

            {/* Europe Map Preview Card */}
            <div className="hidden lg:flex items-center gap-3 bg-[#FBF9F5] border border-neutral-200/90 rounded-2xl p-2.5 pr-4">
              <img 
                src={IMAGES.weltkarte} 
                alt="Standorte Europa Übersicht" 
                className="w-20 h-14 object-cover rounded-xl border border-neutral-200" 
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">6 europäische Standorte</span>
                <span className="text-slate-500">Eigene Fertigung & Ingenieurbüros</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GLOBAL_LOCATIONS.map((loc, idx) => {
              const isHQ = idx === 0;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm ${
                    isHQ 
                      ? 'bg-[#0d2a14] text-white border-[#1c5f2e] shadow-lg ring-1 ring-[#1c5f2e]' 
                      : 'bg-[#FBF9F5] text-slate-900 border-neutral-200/90 hover:border-[#1c5f2e]/40'
                  }`}
                >
                  {/* Location Image Header if available */}
                  {loc.image && (
                    <div className="h-44 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={loc.image} 
                        alt={loc.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                          isHQ ? 'bg-emerald-400/20 text-emerald-300' : 'bg-[#1c5f2e]/10 text-[#1c5f2e]'
                        }`}>
                          {loc.country}
                        </span>
                        {isHQ ? (
                          <span className="text-[11px] font-mono text-emerald-300 font-bold">Hauptsitz & Werk</span>
                        ) : (
                          <Globe2 className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div className={`text-xs font-semibold mb-1 ${isHQ ? 'text-emerald-300' : 'text-[#1c5f2e]'}`}>
                        {loc.role}
                      </div>
                      <h3 className={`text-lg font-extrabold mb-3 ${isHQ ? 'text-white' : 'text-slate-900'}`}>
                        {loc.name}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 flex items-start gap-2 ${isHQ ? 'text-emerald-100/90' : 'text-slate-600'}`}>
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-75" />
                        <span>{loc.address}</span>
                      </p>
                    </div>

                    <div className={`pt-4 border-t space-y-1.5 text-xs ${isHQ ? 'border-white/15 text-emerald-100' : 'border-neutral-200 text-slate-700'}`}>
                      {loc.employees && (
                        <div className="font-semibold text-emerald-400">
                          {loc.employees}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 shrink-0 opacity-75" />
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 shrink-0 opacity-75" />
                        <a href={`mailto:${loc.email}`} className="underline hover:opacity-80 truncate">
                          {loc.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCtaSection showImage={true} onOpenRequestModal={onOpenRequestModal} onNavigate={onNavigate} />

    </div>
  );
}
