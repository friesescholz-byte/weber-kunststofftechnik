import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Ruler,
  Factory,
  Truck,
  Wrench,
  FileCheck2,
  FlaskConical,
  Layers,
  Thermometer,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  X,
  ChevronRight
} from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { COMPANY_FACTS, IMAGES, CHEMICAL_DATABASE, DVS2205_CHEMICALS } from '../data/weberData';
import SpecialCtaButton from '../components/SpecialCtaButton';
import ClosingCtaSection from '../components/ClosingCtaSection';

// ============================================================================
// SPEZIFISCHE SEITEN-KONFIGURATION FÜR PRODUKTE, ANWENDUNGSGEBIETE & WERKSTOFFE
// ============================================================================
const PAGE_CONFIG = {
  produkte: {
    breadcrumb: 'Produkte & Leistungen',
    heroTitle: 'Maßgefertigter Behälter-, Apparate- und Anlagenbau.',
    heroLead:
      'Von bauartzugelassenen Lager- und Prozessbehältern bis 100 m³ über stahlarmierte Beizbecken und TA-Luft-Abluftwäscher bis zur schlüsselfertigen Vor-Ort-Montage: Alle Weber-Produktbereiche im Überblick.',
    heroBg: IMAGES.rundbehaelter,
    primaryCta: 'Projekt anfragen',
    secondaryCta: 'Alle Produkte ansehen',
    requestPrefill: 'Produktauslegung & Behälterbau nach Maß',
    consultTitle: 'Technische Projektauslegung',
    consultSubtitle: 'Konstruktion & Vertrieb · Standort Minden',
    consultText:
      'Sie benötigen einen Behälter nach Maß, eine Sonderkonstruktion oder Ersatzteile? Unsere Projektingenieure beraten Sie direkt zu Bauform, Statik und Werkstoffwahl.',
    benefitsEyebrow: 'Warum Weber Produkte',
    benefitsTitle: 'Fertigungstiefe und Sicherheit aus einer Hand.',
    benefitsLead:
      'Konstruktion, Bauartzulassung, Fertigung und Montage – direkt aus unserem Stammwerk in Minden.',
    benefits: [
      {
        icon: Ruler,
        title: 'Maßanfertigung bis 100 m³',
        desc: 'Rund-, Rechteck- und Verbundbehälter exakt nach Ihren Einbaumaßen.'
      },
      {
        icon: ShieldCheck,
        title: 'DIBt-Zulassung & § 62 AwSV',
        desc: 'Bauaufsichtliche Zulassungen (Z-40.21 / Z-40.22) und WHG-Fachbetrieb.'
      },
      {
        icon: FileCheck2,
        title: 'Prüffähige Statik (DVS 2205)',
        desc: 'Hauseigene 3D-CAD-Konstruktion und Berechnung nach DIN EN 12573.'
      },
      {
        icon: Factory,
        title: '25.000 m² Werk in Minden',
        desc: 'Eigene Wickelrohranlagen, CNC-Technik und DVS-2212-Schweißer.'
      },
      {
        icon: Truck,
        title: 'Eigener Schwerlasttransport',
        desc: 'Direkte Tieflader-Anlieferung bis Ø 4.000 mm ohne Umladerisiko.'
      },
      {
        icon: Wrench,
        title: '25+ eigene Montagefachkräfte',
        desc: 'Kraneinbringung, Verrohrung und Inbetriebnahme durch eigenes Personal.'
      }
    ],
    catalogEyebrow: 'Gesamtes Produktprogramm',
    catalogTitle: 'Alle Produkt- und Leistungsbereiche',
    searchPlaceholder: 'Produkt, Bauform oder Norm suchen (z. B. Rundbehälter, DIBt, Wäscher)...',
    categories: [
      { id: 'alle', label: 'Alle Bereiche' },
      {
        id: 'behaelter',
        label: 'Behälter & Becken',
        match: ['lager-prozessbehaelter-rund', 'lager-prozessbehaelter-rechteck', 'verbundbehaelter', 'schwimmbecken']
      },
      {
        id: 'anlagen',
        label: 'Abluft, Dosierung & Sicherheit',
        match: ['abluftwaescher', 'dosierstationen', 'auffangwannen', 'leitern-begehungen']
      },
      {
        id: 'service',
        label: 'Engineering, Montage & Logistik',
        match: ['engineering', 'montage', 'transport']
      }
    ],
    galleryEyebrow: 'Einblicke in unser Produktprogramm',
    galleryTitle: 'Behälter-, Apparate- und Anlagenbau in der Praxis.',
    galleryLead: 'Impressionen aus unserer Fertigung in Minden, dem Schwerlasttransport und der weltweiten Montage.'
  },

  anwendungsgebiete: {
    breadcrumb: 'Anwendungsgebiete & Branchen',
    heroTitle: 'Sichere Systemlösungen für anspruchsvolle Industrien.',
    heroLead:
      'Ob hochkorrosive Säuren im Chemie-Tanklager, 95 °C heiße Prozessbäder in der Oberflächentechnik oder hochreine Medien in der Halbleiterfertigung – entdecken Sie unsere branchenspezifischen Lösungen.',
    heroBg: IMAGES.tanklager,
    primaryCta: 'Projekt anfragen',
    secondaryCta: 'Anwendungsgebiete ansehen',
    requestPrefill: 'Branchen- & Prozessanlagenauslegung',
    consultTitle: 'Branchen- & Prozessberatung',
    consultSubtitle: 'Anlagenbau · Standort Minden',
    consultText:
      'Jede Branche stellt eigene Anforderungen an Medienbeständigkeit, Emissionsschutz und Normen. Sprechen Sie direkt mit unseren Projektleitern über Ihr Vorhaben.',
    benefitsEyebrow: 'Vorteile nach Maß für Ihre Branche',
    benefitsTitle: 'Praxiserprobte Auslegung für kritische Prozesse.',
    benefitsLead:
      'Seit 1967 realisieren wir langlebige Industrieanlagen für extreme chemische und thermische Belastungen.',
    benefits: [
      {
        icon: FlaskConical,
        title: 'Medienbeherrschung (pH 0–14)',
        desc: 'Dauerhaft korrosionsfrei bei Säuren, Laugen und Reinstchemikalien.'
      },
      {
        icon: ShieldCheck,
        title: 'WHG, AwSV & TA-Luft konform',
        desc: 'Volle Rechtssicherheit für Chemie, Umwelttechnik und High-Purity.'
      },
      {
        icon: Layers,
        title: 'Schlüsselfertige Gesamtsysteme',
        desc: 'Lagertanks, Prozessbäder, Dosierung und Abluftwäscher aus einer Hand.'
      },
      {
        icon: Thermometer,
        title: 'Thermisch belastbar bis +140 °C',
        desc: 'Stahlarmierungen, Dickwandbauweise und GFK-Verbundkonstruktionen.'
      },
      {
        icon: Wrench,
        title: 'Kurze Umbau- & Stillstandszeiten',
        desc: 'Hoher Vorfertigungsgrad in Minden und eingespielte Montageteams.'
      },
      {
        icon: FileCheck2,
        title: 'Lückenlose Prüfdokumentation',
        desc: 'Statik, Schweißprotokolle, 3.1-Zeugnisse und TÜV-Abnahme.'
      }
    ],
    catalogEyebrow: 'Branchen & Einsatzfelder',
    catalogTitle: 'Alle Anwendungsgebiete im Detail',
    searchPlaceholder: 'Branche, Medium oder Prozess suchen (z. B. Salzsäure, Galvanik, Tanklager)...',
    categories: [
      { id: 'alle', label: 'Alle Anwendungsgebiete' },
      {
        id: 'chemie-lager',
        label: 'Chemie, Lagerung & Dosierung',
        match: ['chemie-tanklaeger', 'hochreine-chemie', 'fuellen-dosieren', 'passive-lagerung']
      },
      {
        id: 'oberflaeche',
        label: 'Oberflächentechnik & Verzinkung',
        match: ['galvanotechnik', 'feuerverzinkung']
      },
      {
        id: 'umwelt-wasser',
        label: 'Umwelt, Abwasser & Lebensmittel',
        match: ['abwasserbehandlung', 'abluft-umwelttechnik', 'lebensmittelindustrie']
      },
      {
        id: 'infrastruktur',
        label: 'Rohrleitungsbau, Sondermaschinen & Service',
        match: ['rohrleitungsbau-sektor', 'stahlbau', 'sonderbauten', 'sonder-maschinenbau', 'instandsetzung-reparatur']
      }
    ],
    galleryEyebrow: 'Branchenlösungen im Einsatz',
    galleryTitle: 'Realisierte Industrieanlagen & Prozesssysteme.',
    galleryLead: 'Einblicke in Chemie-Tankläger, Beiz- und Galvanikanlagen, Abluftwäscher und Industriemontagen.'
  },

  werkstoffe: {
    breadcrumb: 'Konstruktionswerkstoffe',
    heroTitle: 'Hochleistungsthermoplaste & Verbundwerkstoffe.',
    heroLead:
      'Die Lebensdauer eines Behälters oder Rohrleitungssystems entscheidet sich bei der Werkstoffwahl. Wir verarbeiten geprüfte Thermoplaste, Fluorpolymere und GFK-Verbunde exakt passend zu Ihrem Medium.',
    heroBg: `${IMAGES.rohrleitungen || IMAGES.rundbehaelter}`,
    primaryCta: 'Projekt anfragen',
    secondaryCta: 'Werkstoffe & Medien-Check',
    requestPrefill: 'Werkstoffberatung & Beständigkeitsprüfung (DVS 2205)',
    consultTitle: 'Kostenlose Beständigkeitsprüfung',
    consultSubtitle: 'Werkstofftechnik · DVS 2205 / 2201',
    consultText:
      'Unsicher bei Mischsäuren, hohen Temperaturen oder speziellen Konzentrationen? Senden Sie uns Ihr Sicherheitsdatenblatt (SDB) – wir bestimmen den optimalen Werkstoff.',
    benefitsEyebrow: 'Werkstoffkompetenz bei Weber',
    benefitsTitle: 'Kompromisslose Materialqualität und Verarbeitung.',
    benefitsLead:
      'Herstellerunabhängige Auswahl zertifizierter Marken-Halbzeuge nach strengen DVS-Richtlinien.',
    benefits: [
      {
        icon: FlaskConical,
        title: 'Auslegung nach DVS 2205',
        desc: 'Exakte Abstimmung auf Medium, Konzentration und Betriebstemperatur.'
      },
      {
        icon: ShieldCheck,
        title: '3.1-Marken-Halbzeuge',
        desc: 'Zertifizierte Platten und Rohre mit lückenloser Chargenrückverfolgung.'
      },
      {
        icon: Thermometer,
        title: 'Einsatzbereich -40 bis +150 °C',
        desc: 'Von PE 100 und PP-H bis zu Fluorpolymeren (PVDF, ECTFE, PFA).'
      },
      {
        icon: Layers,
        title: 'Thermoplast & GFK-Verbundbau',
        desc: 'Chemische Inliner kombiniert mit hochfestem GFK-Außenmantel.'
      },
      {
        icon: Sparkles,
        title: 'ATEX (el) & Brandschutz (PP-s)',
        desc: 'Elektrisch leitfähige und schwerentflammbare Sonderausführungen.'
      },
      {
        icon: FileCheck2,
        title: 'Geprüfte DVS-2212-Schweißer',
        desc: 'Spannungsarme Extruder-, Stumpf- und IR-Schweißnähte nach DVS 2207.'
      }
    ],
    catalogEyebrow: 'Werkstoff-Portfolio & Technische Daten',
    catalogTitle: 'Unsere Konstruktionswerkstoffe im Vergleich',
    searchPlaceholder: 'Werkstoff, Kurzzeichen oder Eigenschaft suchen (z. B. PVDF, PE 100, +100 °C, ATEX)...',
    categories: [
      { id: 'alle', label: 'Alle Werkstoffe' },
      {
        id: 'polyolefine',
        label: 'Standard-Thermoplaste (PE / PP / PVC)',
        match: ['pe-polyethylen', 'pp-polypropylen', 'pvc-polyvinylchlorid']
      },
      {
        id: 'fluorpolymere',
        label: 'Fluorpolymere & High-Purity (PVDF / ECTFE / PFA / MFA)',
        match: ['pvdf', 'ectfe', 'pfa', 'mfa']
      }
    ],
    galleryEyebrow: 'Werkstoffverarbeitung & Fertigung',
    galleryTitle: 'Präzisionsverarbeitung von Thermoplasten & GFK.',
    galleryLead: 'Einblicke in CNC-Bearbeitung, Wickelrohrfertigung, Extrusionsschweißen und Verbundbau in Minden.'
  }
};

export default function CatalogOverviewPage({ type = 'produkte', routeSearch = '', onNavigate, onOpenRequestModal }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-4%', '28%']);

  const { produkte, anwendungsgebiete, werkstoffe } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alle');
  const [sortBy, setSortBy] = useState('default');

  // Chemical Resistance Interactive Lookup state (for /werkstoffe)
  const [chemQuery, setChemQuery] = useState('');
  const [selectedMedium, setSelectedMedium] = useState(DVS2205_CHEMICALS[0]);

  const config = PAGE_CONFIG[type] || PAGE_CONFIG.produkte;

  useEffect(() => {
    setSearchQuery('');
    setSortBy('default');

    const params = new URLSearchParams(window.location.search);
    const katParam = params.get('kategorie') || params.get('group');
    const hash = window.location.hash;

    if (katParam && config.categories.some((c) => c.id === katParam)) {
      setSelectedCategory(katParam);
      setTimeout(() => {
        const el = document.getElementById('katalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (hash === '#medien-check' || hash === '#katalog') {
      setSelectedCategory('alle');
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setSelectedCategory('alle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [type, routeSearch, config.categories]);

  const rawItems = useMemo(() => {
    if (type === 'produkte') return produkte || [];
    if (type === 'anwendungsgebiete') return anwendungsgebiete || [];
    if (type === 'werkstoffe') return werkstoffe || [];
    return [];
  }, [type, produkte, anwendungsgebiete, werkstoffe]);

  const galleryRows = useMemo(() => {
    const collected = [];
    const seen = new Set();

    const addUrl = (url, alt) => {
      if (url && typeof url === 'string' && !seen.has(url)) {
        seen.add(url);
        collected.push({ src: url, alt: alt || config.breadcrumb });
      }
    };

    // 1. Collect authentic images from all items of this subpage
    rawItems.forEach((item) => {
      const label = item.title || item.name || config.breadcrumb;
      if (item.image) addUrl(item.image, label);
      if (Array.isArray(item.gallery)) {
        item.gallery.forEach((imgUrl) => addUrl(imgUrl, label));
      }
    });

    // 2. Add curated topic-matched fallback images so both rows are always rich (at least 12 distinct photos)
    const fallbackPool = [
      IMAGES.rundbehaelter,
      IMAGES.rechteckbehaelter,
      IMAGES.verbundbehaelter,
      IMAGES.abluftwaescher,
      IMAGES.dosierstationen,
      IMAGES.auffangwannen,
      IMAGES.tanklager,
      IMAGES.galvanik,
      IMAGES.abwasser,
      IMAGES.rohrleitungen,
      IMAGES.fertigung,
      IMAGES.schweissen,
      IMAGES.montage,
      IMAGES.transport
    ];
    fallbackPool.forEach((url) => addUrl(url, config.breadcrumb));

    const pool = collected.slice(0, 12);
    const r1 = pool.slice(0, 6);
    const r2 = pool.slice(6, 12);
    return {
      row1: r1.length > 0 ? r1 : pool,
      row2: r2.length > 0 ? r2 : r1
    };
  }, [rawItems, config.breadcrumb]);

  const filteredItems = useMemo(() => {
    let list = [...rawItems];

    // 1. Category Filter
    if (selectedCategory !== 'alle') {
      const catObj = config.categories.find((c) => c.id === selectedCategory);
      if (catObj && Array.isArray(catObj.match)) {
        list = list.filter((item) => catObj.match.includes(item.id));
      }
    }

    // 2. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const title = (item.title || item.name || '').toLowerCase();
        const code = (item.code || '').toLowerCase();
        const sub = (item.subtitle || item.norm || item.temp || '').toLowerCase();
        const desc = (item.desc || item.shortDesc || item.longDesc || item.description || '').toLowerCase();
        const specsStr = Array.isArray(item.specs)
          ? item.specs.join(' ').toLowerCase()
          : typeof item.specs === 'string'
          ? item.specs.toLowerCase()
          : '';
        const mediaStr = Array.isArray(item.mediaExamples) ? item.mediaExamples.join(' ').toLowerCase() : '';
        const featStr = Array.isArray(item.features || item.highlights)
          ? (item.features || item.highlights).join(' ').toLowerCase()
          : '';

        return (
          title.includes(q) ||
          code.includes(q) ||
          sub.includes(q) ||
          desc.includes(q) ||
          specsStr.includes(q) ||
          mediaStr.includes(q) ||
          featStr.includes(q)
        );
      });
    }

    // 3. Sort
    if (sortBy === 'az') {
      list.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || '', 'de'));
    } else if (sortBy === 'za') {
      list.sort((a, b) => (b.title || b.name || '').localeCompare(a.title || a.name || '', 'de'));
    }

    return list;
  }, [rawItems, selectedCategory, searchQuery, sortBy, config.categories]);

  const filteredChemicals = useMemo(() => {
    if (!chemQuery.trim()) return DVS2205_CHEMICALS;
    const q = chemQuery.toLowerCase();
    return DVS2205_CHEMICALS.filter(
      (c) =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.conc || '').toLowerCase().includes(q)
    );
  }, [chemQuery]);

  const getRatingBadge = (grade) => {
    if (grade === 'A') {
      return {
        label: 'Sehr gut beständig (Stufe A)',
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-950',
        dot: 'bg-emerald-600'
      };
    }
    if (grade === 'B') {
      return {
        label: 'Bedingt beständig (Stufe B)',
        bg: 'bg-amber-50 border-amber-200 text-amber-950',
        dot: 'bg-amber-500'
      };
    }
    return {
      label: 'Nicht empfohlen (Stufe C)',
      bg: 'bg-neutral-100 border-neutral-200 text-slate-500',
      dot: 'bg-slate-400'
    };
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* =================================================================== */}
      {/* 1. ARCHITECTURAL SUBPAGE HERO (Exakt im Stil der Karriere-Seite)    */}
      {/* =================================================================== */}
      <section
        ref={heroRef}
        className="relative bg-[#0d2a14] text-white pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 border-b border-[#1c5f2e]/50 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <motion.div
            style={{
              y: backgroundY,
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
            className="absolute inset-0 w-full h-[135%] -top-[18%]"
          >
            <div
              className="w-full h-full"
              style={{
                maskImage:
                  'linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.88) 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.88) 100%)'
              }}
            >
              <img
                src={config.heroBg}
                alt={config.breadcrumb}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[#1c5f2e] opacity-[0.86] mix-blend-multiply" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-[#081b0d]/95 via-[#0b2612]/80 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#0d2a14] z-[1]" />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.16) 0px, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 11px)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300/90 mb-8">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
            <span className="text-emerald-500/50">/</span>
            <span className="text-white font-semibold">{config.breadcrumb}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
                {config.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
                {config.heroLead}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-6">
                <SpecialCtaButton
                  text={config.primaryCta}
                  onClick={() => {
                    if (onOpenRequestModal) {
                      onOpenRequestModal({
                        title: config.requestPrefill,
                        requestPrefill: config.requestPrefill,
                        breadcrumb: config.breadcrumb,
                        type
                      });
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-[52px] px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{config.secondaryCta}</span>
                </button>
              </div>
            </div>

            {/* Right: Direct Technical Consultation Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#09200f]/90 backdrop-blur-md border border-emerald-400/25 rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl">
                <div className="border-b border-white/10 pb-4">
                  <div className="text-base font-extrabold text-white">{config.consultTitle}</div>
                  <div className="text-xs text-emerald-300 mt-0.5">{config.consultSubtitle}</div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
                  {config.consultText}
                </p>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm">
                  <a
                    href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2.5 text-white hover:text-emerald-300 transition-colors font-bold whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COMPANY_FACTS.phone}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_FACTS.email}`}
                    className="flex items-center gap-2.5 text-emerald-200 hover:text-white transition-colors font-mono text-xs break-all"
                  >
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COMPANY_FACTS.email}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRequestModal &&
                      onOpenRequestModal({
                        title: config.requestPrefill,
                        requestPrefill: config.requestPrefill,
                        breadcrumb: config.breadcrumb,
                        type
                      })
                    }
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#071a0c] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Direkte Projektanfrage starten</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SCHICKER HOMEPAGE-ÜBERGANGSSTREIFEN (Stahlbau-Fachwerk wie auf /)   */}
      {/* =================================================================== */}
      <div className="relative w-full h-[50px] sm:h-[52px] overflow-hidden pointer-events-none select-none bg-[#092211] border-b border-[#1c5f2e]/35 shadow-[0_4px_16px_rgba(0,0,0,0.16)] z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`steelSubpagePattern-${type}`} width="160" height="52" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill={`url(#steelSubpagePattern-${type})`} />
        </svg>
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#092211] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#092211] to-transparent pointer-events-none" />
      </div>

      {/* =================================================================== */}
      {/* 2. DIE VORTEILE BEI WEBER (6 kompakte, knackige Dark-Green Cards)   */}
      {/* =================================================================== */}
      <section id="vorteile" className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                {config.benefitsEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {config.benefitsTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {config.benefitsLead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.benefits.map((b, i) => {
              const IconComp = b.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0b2413] to-[#07190d] border border-[#1c5f2e]/60 hover:border-emerald-400/70 shadow-[0_10px_30px_-10px_rgba(9,32,15,0.45)] hover:shadow-[0_20px_40px_-12px_rgba(28,95,46,0.55)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="-right-10 -bottom-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-400/20 transition-colors duration-300 pointer-events-none absolute" />

                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 group-hover:bg-emerald-400 group-hover:border-emerald-300 flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner">
                    <IconComp
                      className="w-5 h-5 text-emerald-300 group-hover:text-[#07190d] transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="relative z-10 min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-200 transition-colors duration-300 leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-emerald-100/80 leading-snug mt-1">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. KATALOG-AUFLISTUNG MIT DEZENTER SUCHE, FILTER & SORTIERUNG       */}
      {/* =================================================================== */}
      <section
        id="katalog"
        className="relative py-16 sm:py-24 border-b border-neutral-200 overflow-hidden bg-[#FBF9F5]"
      >
        {/* Dezent grünes technisches Hintergrundmuster (wie auf /karriere) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(28, 95, 46, 0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(28, 95, 46, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px'
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            background:
              'radial-gradient(circle at 85% 12%, rgba(28, 95, 46, 0.06) 0%, transparent 45%), radial-gradient(circle at 15% 88%, rgba(28, 95, 46, 0.05) 0%, transparent 45%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header + Dezente Filter-/Suchleiste */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                  {config.catalogEyebrow}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {config.catalogTitle} ({filteredItems.length})
                </h2>
              </div>

              {/* Dezente Suche & Sortierung */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={config.searchPlaceholder}
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FBF9F5] border border-neutral-200/90 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-9 pr-8 py-2.5 rounded-xl bg-[#FBF9F5] border border-neutral-200/90 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#1c5f2e] cursor-pointer"
                  >
                    <option value="default">Sortierung: Empfohlen</option>
                    <option value="az">Alphabetisch (A–Z)</option>
                    <option value="za">Alphabetisch (Z–A)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dezente Kategorie-Tabs */}
            <div className="pt-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap gap-2">
                {config.categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0d2a14] text-white shadow-xs'
                          : 'bg-[#FBF9F5] text-slate-600 hover:text-slate-900 border border-neutral-200/80'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {(selectedCategory !== 'alle' || searchQuery !== '' || sortBy !== 'default') && (
                <button
                  onClick={() => {
                    setSelectedCategory('alle');
                    setSearchQuery('');
                    setSortBy('default');
                  }}
                  className="text-xs font-bold text-[#1c5f2e] hover:underline cursor-pointer"
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-4">
              <p className="text-base font-bold text-slate-800">
                Keine Einträge für Ihre aktuelle Suche gefunden.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Setzen Sie den Filter zurück oder kontaktieren Sie unsere Ingenieure direkt für Sonderkonstruktionen.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('alle');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0d2a14] text-white text-xs font-bold cursor-pointer"
              >
                Alle {rawItems.length} Einträge anzeigen
              </button>
            </div>
          ) : type === 'werkstoffe' ? (
            /* =============================================================== */
            /* WERKSTOFF-KARTEN + INTERAKTIVER MEDIEN-CHECK                    */
            /* =============================================================== */
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {filteredItems.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => onNavigate(`/werkstoffe/${mat.id}`)}
                    className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-[#1c5f2e]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Clean Framed Image without any overlaid tags */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-neutral-100">
                        <div className="sm:col-span-5 aspect-[16/10] sm:aspect-auto bg-neutral-100 overflow-hidden">
                          <img
                            src={mat.image || mat.gallery?.[0]}
                            alt={mat.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                          />
                        </div>
                        <div className="sm:col-span-7 p-6 flex flex-col justify-center">
                          <span className="text-xs font-mono font-bold text-[#1c5f2e] block mb-1">
                            {mat.code}
                          </span>
                          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors">
                            {mat.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                            {mat.desc}
                          </p>
                        </div>
                      </div>

                      {/* Technical Key Values */}
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-neutral-200/70 text-xs">
                          <div>
                            <span className="text-[11px] font-mono text-slate-400 block">Temperaturbereich</span>
                            <span className="font-bold text-slate-900">{mat.temp || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[11px] font-mono text-slate-400 block">Dichte</span>
                            <span className="font-bold text-slate-900">{mat.density || '—'}</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <span className="text-[11px] font-mono text-slate-400 block">Säuren / Laugen</span>
                            <span className="font-bold text-[#1c5f2e]">
                              {mat.acids || 'Sehr gut'} / {mat.alkalis || 'Sehr gut'}
                            </span>
                          </div>
                        </div>

                        {Array.isArray(mat.highlights) && mat.highlights.length > 0 && (
                          <ul className="space-y-1.5">
                            {mat.highlights.slice(0, 3).map((hl, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#1c5f2e] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{hl}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-[#FBF9F5] border-t border-neutral-200/80 flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#1c5f2e] transition-colors">
                        <span>Werkstoffdatenblatt & Beständigkeit</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenRequestModal) {
                            onOpenRequestModal({
                              title: `${mat.code} – ${mat.name}`,
                              type: 'werkstoffe'
                            });
                          }
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        Auslegung anfragen
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interaktiver DVS 2205 Chemikalien- & Medien-Check auf der Werkstoff-Unterseite */}
              <div id="medien-check" className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm scroll-mt-28">
                <div className="max-w-3xl mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                    DVS 2205-1 Beiblatt 1 · Medien-Datenbank
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Interaktiver Beständigkeits-Check nach Medium
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Wählen Sie ein typisches Industriemedium aus, um die chemische Beständigkeit unserer 7 Konstruktionswerkstoffe nach DVS 2205-1 inkl. Temperaturgrenze direkt zu vergleichen.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Chemical Selector */}
                  <div className="lg:col-span-5 bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-5 space-y-4">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={chemQuery}
                        onChange={(e) => setChemQuery(e.target.value)}
                        placeholder="Medium oder Formel suchen (z. B. HCl, NaOH, H2SO4)..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1c5f2e]"
                      />
                    </div>

                    <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                      {filteredChemicals.map((item) => {
                        const isSelected = selectedMedium?.name === item.name;
                        return (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => setSelectedMedium(item)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-[#0d2a14] text-white shadow-xs border border-[#1c5f2e]'
                                : 'bg-white hover:bg-emerald-50/50 text-slate-900 border border-neutral-200/80 hover:border-[#1c5f2e]/40'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-extrabold truncate">
                              {item.name}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold shrink-0 ${
                                isSelected ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30' : 'bg-[#FBF9F5] text-slate-600 border border-neutral-200'
                              }`}
                            >
                              {item.conc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Evaluation Matrix */}
                  <div className="lg:col-span-7 bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-6 sm:p-7 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1c5f2e]">
                          Ausgewähltes Medium · Konzentration: {selectedMedium?.conc}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                          {selectedMedium?.name}
                        </h4>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-[#0d2a14] text-emerald-300 text-xs font-mono font-bold">
                        Richtwerte nach DVS 2205-1
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        { key: 'pe-polyethylen', name: 'PE 100 / PE-HD', slug: 'pe-polyethylen', temp: 'bis +60 °C' },
                        { key: 'pp-polypropylen', name: 'PP-H / PP-B', slug: 'pp-polypropylen', temp: 'bis +100 °C' },
                        { key: 'pvc-polyvinylchlorid', name: 'PVC-U / PVC-C', slug: 'pvc-polyvinylchlorid', temp: 'bis +60/+80 °C' },
                        { key: 'pvdf', name: 'PVDF (Fluorpolymer)', slug: 'pvdf', temp: 'bis +140 °C' },
                        { key: 'ectfe', name: 'ECTFE (Halar®)', slug: 'ectfe', temp: 'bis +150 °C' },
                        { key: 'pfa', name: 'PFA / MFA (High-Purity)', slug: 'pfa', temp: 'bis +260 °C' }
                      ].map((m) => {
                        const ratingObj = selectedMedium?.ratings?.[m.key] || { grade: 'A', note: 'Beständig' };
                        const badge = getRatingBadge(ratingObj.grade);
                        return (
                          <div
                            key={m.key}
                            onClick={() => onNavigate(`/werkstoffe/${m.slug}`)}
                            className={`p-4 rounded-xl border ${badge.bg} flex flex-col justify-between gap-2 cursor-pointer hover:shadow-md transition-all`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-sm">{m.name}</span>
                              <span className="text-[11px] font-mono opacity-80">{m.temp}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 mt-0.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${badge.dot}`} />
                                <span className="text-xs font-bold truncate">{ratingObj.note || badge.label}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {(() => {
                      const matchedDb = CHEMICAL_DATABASE.find((d) =>
                        selectedMedium?.name?.toLowerCase().includes(d.name.split(' ')[0].toLowerCase())
                      );
                      return (
                        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <strong className="text-slate-900 block mb-0.5">
                              Empfehlung unserer Werkstofftechnik:
                            </strong>
                            {matchedDb ? (
                              <span>
                                Empfohlene Werkstoffe: <strong className="text-[#1c5f2e]">{matchedDb.empfohlenerWerkstoff}</strong> · Typische Bauform: <strong>{matchedDb.behälter}</strong>.
                              </span>
                            ) : (
                              <span>
                                Verbindliche Auslegung nach DVS 2205 auf Basis Ihres Sicherheitsdatenblatts (SDB), exakter Betriebstemperatur und Aufstellbedingungen.
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenRequestModal &&
                              onOpenRequestModal({
                                title: `Werkstoff- & Behälterauslegung für ${selectedMedium?.name} (${selectedMedium?.conc})`
                              })
                            }
                            className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
                          >
                            Medium anfragen →
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* PRODUKTE & ANWENDUNGSGEBIETE KARTEN (3-Spalten Clean Grid)      */
            /* =============================================================== */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => {
                const subline =
                  item.subtitle ||
                  item.norm ||
                  (Array.isArray(item.norms) && item.norms[0]) ||
                  (Array.isArray(item.specs) && item.specs[0]) ||
                  'Maßgefertigte Ausführung';

                const specsArray = Array.isArray(item.specs)
                  ? item.specs.slice(0, 3)
                  : typeof item.specs === 'string'
                  ? item.specs
                      .split('·')
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .slice(0, 3)
                  : [];

                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigate(`/${type}/${item.id}`)}
                    className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-[#1c5f2e]/60 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(13,42,20,0.08)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Clean Framed Image - Strictly NO overlaid badges */}
                      <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                        <img
                          src={item.image || item.gallery?.[0]}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6 sm:p-7">
                        <span className="text-[11px] font-mono font-semibold text-[#1c5f2e] block mb-1.5 line-clamp-1">
                          {subline}
                        </span>

                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors leading-snug mb-2.5">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                          {item.desc || item.shortDesc}
                        </p>

                        {specsArray.length > 0 && (
                          <div className="space-y-1.5 pt-4 border-t border-neutral-100">
                            {specsArray.map((s, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1c5f2e] shrink-0" />
                                <span className="font-medium truncate">{s}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 sm:px-7 py-4 bg-[#FBF9F5] border-t border-neutral-200/80 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#1c5f2e] transition-colors">
                        <span>Details & {item.gallery?.length || 1} Fotos</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenRequestModal) {
                            onOpenRequestModal(item);
                          }
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        Direkt anfragen
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3b. VOLLBREITE 2-STÖCKIGE FOTO-SLIDER-GALERIE (Reine Bilder)        */}
      {/* =================================================================== */}
      <section
        id="galerie"
        className="py-16 sm:py-24 bg-[#F4F2EC] border-b border-neutral-200 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] block mb-2">
                {config.galleryEyebrow}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {config.galleryTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {config.galleryLead}
            </p>
          </div>
        </div>

        {/* Full-Screen 2-Row Photo Marquee (Outside max-w-7xl, same calm speed as CareerPage, both rows same direction & staggered) */}
        <div className="relative w-full space-y-5 overflow-hidden py-2 select-none">
          {/* Row 1: Scrolling Left — Pure Images Only */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1">
              {[...galleryRows.row1, ...galleryRows.row1].map((img, i) => (
                <div
                  key={`subgal-r1-${type}-${i}`}
                  className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 bg-slate-900 shadow-xs"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling in the Same Direction (Staggered by half a card width) — Pure Images Only */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1 -ml-[155px] sm:-ml-[205px] lg:-ml-[230px]">
              {[...galleryRows.row2, ...galleryRows.row2].map((img, i) => (
                <div
                  key={`subgal-r2-${type}-${i}`}
                  className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 bg-slate-900 shadow-xs"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. CLOSING CTA SECTION                                              */}
      {/* =================================================================== */}
      <ClosingCtaSection
        showImage={true}
        onOpenRequestModal={() =>
          onOpenRequestModal &&
          onOpenRequestModal({
            title: config.breadcrumb,
            type
          })
        }
        onNavigate={onNavigate}
      />
    </div>
  );
}
