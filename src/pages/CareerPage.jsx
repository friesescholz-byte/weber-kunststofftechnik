import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  X, 
  Send, 
  Sparkles, 
  UploadCloud, 
  FileCheck,
  Search,
  Filter,
  ShieldCheck,
  Factory,
  HeartHandshake,
  Award,
  Users,
  Quote,
  Wrench,
  UserCheck
} from 'lucide-react';
import { useCms } from '../data/cmsStore';
import { 
  EMPLOYER_BENEFITS, 
  TEAM_TESTIMONIALS, 
  PRODUCTION_GALLERY, 
  GALLERY_ROW_1, 
  GALLERY_ROW_2, 
  COMPANY_FACTS, 
  IMAGES 
} from '../data/weberData';
import SpecialCtaButton from '../components/SpecialCtaButton';

export default function CareerPage({ onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "28%"]);
  const { jobs, ausbildungen } = useCms();
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [activeJob, setActiveJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    earliestStart: '',
    message: '',
    cvFile: ''
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

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

  const LOCATIONS = useMemo(() => [
    { id: 'all', label: 'Alle Standorte (6)' },
    { id: 'minden', label: 'Minden (Hauptsitz, DE)' },
    { id: 'polen', label: 'Polen (Czarnków)' },
    { id: 'benelux', label: 'Benelux (Olen, BE)' },
    { id: 'skandinavien', label: 'Skandinavien' },
    { id: 'frankreich', label: 'Frankreich' },
    { id: 'uk', label: 'Großbritannien' },
  ], []);

  const CLUSTERS = useMemo(() => [
    { id: 'all', label: 'Alle Stellen' },
    { id: 'fertigung', label: 'Fertigung & Handwerk', departments: ['Produktion', 'Stahlbau & Produktion'] },
    { id: 'montage', label: 'Montage & Baustelle', departments: ['Montage'] },
    { id: 'engineering', label: 'Konstruktion & Planung', departments: ['Konstruktion & Engineering', 'Arbeitsvorbereitung'] },
    { id: 'technik-it', label: 'Technik, IT & Logistik', departments: ['Instandhaltung & Technik', 'IT & Digitalisierung', 'Logistik & Versand', 'Qualitätsmanagement & Doku'] }
  ], []);

  const getClusterCount = (clusterId) => {
    if (clusterId === 'all') return jobs.length;
    const c = CLUSTERS.find(item => item.id === clusterId);
    if (!c || !c.departments) return 0;
    return jobs.filter(j => c.departments.includes(j.department)).length;
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Cluster Filter
      if (selectedCluster !== 'all') {
        const activeCluster = CLUSTERS.find(c => c.id === selectedCluster);
        if (activeCluster && !activeCluster.departments.includes(job.department)) {
          return false;
        }
      }
      // Location Filter (Support all 6 European Weber Locations)
      if (selectedLocation !== 'all') {
        if (selectedLocation === 'minden') {
          const isMinden = job.location?.toLowerCase().includes('minden');
          if (!isMinden) return false;
        } else {
          const locLower = selectedLocation.toLowerCase();
          const matches = job.location?.toLowerCase().includes(locLower);
          if (!matches) return false;
        }
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title?.toLowerCase().includes(q);
        const matchDept = job.department?.toLowerCase().includes(q);
        const matchSummary = job.summary?.toLowerCase().includes(q);
        const matchTasks = job.tasks?.some(t => t.toLowerCase().includes(q));
        const matchProfile = job.profile?.some(p => p.toLowerCase().includes(q));
        if (!matchTitle && !matchDept && !matchSummary && !matchTasks && !matchProfile) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'az') return a.title.localeCompare(b.title, 'de');
      if (sortBy === 'department') return (a.department || '').localeCompare(b.department || '', 'de');
      return 0;
    });
  }, [jobs, selectedCluster, selectedLocation, searchQuery, sortBy, CLUSTERS]);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      
      {/* 1. Architectural Subpage Header with Team Parallax */}
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
                src={IMAGES.azubis2024 || IMAGES.collageBewerbung} 
                alt="Karriere bei Weber Minden" 
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
            <button onClick={() => onNavigate('/')} className="hover:text-white flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
            <span className="text-emerald-500/50">/</span>
            <span className="text-white font-semibold">Karriere & Jobportal</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Bauen Sie mit uns die Anlagen der Zukunft.
              </h1>
              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
                Rund 270 Kolleginnen und Kollegen fertigen an unserem Hauptsitz in Minden 
                hightech Kunststoffbehälter, Apparate und Rohrleitungssysteme für Kunden in aller Welt. 
                Werden Sie Teil eines krisensicheren Familienunternehmens mit geregelten Arbeitszeiten und echter Wertschätzung.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a href="#benefits" className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#071a0c] font-bold text-xs sm:text-sm transition-colors">
                  Vorteile & Benefits &darr;
                </a>
                <a href="#jobs" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-colors">
                  Offene Stellen ({jobs.length})
                </a>
                <a href="#ausbildung" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-colors">
                  Ausbildungsangebote ({ausbildungen.length})
                </a>
              </div>
            </div>

            {/* HR Contact Card (Charline Ahnefeld - Echte persönliche Ansprechpartnerin) */}
            <div className="lg:col-span-5">
              <div className="bg-[#09200f]/90 border border-emerald-400/25 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={IMAGES.hrAnsprechpartnerin}
                    alt={COMPANY_FACTS.hrContact}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400/40 shrink-0 shadow-md"
                  />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block">
                      Ihre Ansprechpartnerin im Personalwesen
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      {COMPANY_FACTS.hrContact}
                    </h3>
                    <span className="text-xs text-emerald-200/80">Personalabteilung · Standort Minden</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Sie haben Fragen zu einer Stelle oder möchten sich direkt bewerben? Rufen Sie uns gerne an oder senden Sie Ihre Unterlagen per E-Mail oder Schnellbewerbung.
                </p>
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <a 
                    href={`tel:${COMPANY_FACTS.hrPhone.replace(/[^0-9+]/g, '')}`} 
                    className="inline-flex items-center gap-1.5 text-emerald-300 font-bold hover:text-white shrink-0 whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="whitespace-nowrap font-mono">{COMPANY_FACTS.hrPhone}</span>
                  </a>
                  <a 
                    href={`mailto:${COMPANY_FACTS.hrEmail}`} 
                    className="inline-flex items-center gap-1.5 text-emerald-100 hover:text-white font-medium truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{COMPANY_FACTS.hrEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Schicker Homepage-Übergangsstreifen (Stahlbau-Fachwerk) */}
      <div className="relative w-full h-[50px] sm:h-[52px] overflow-hidden pointer-events-none select-none bg-[#092211] border-b border-[#1c5f2e]/35 shadow-[0_4px_16px_rgba(0,0,0,0.16)] z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="steelCareerHeroPattern" width="160" height="52" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#steelCareerHeroPattern)" />
        </svg>
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#092211] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#092211] to-transparent pointer-events-none" />
      </div>

      {/* 2. Section: Wir als Arbeitgeber & Benefits (Directly after Hero, compact & clear) */}
      <section id="benefits" className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-neutral-200/90 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-2">
                <span className="w-6 h-[2px] bg-[#1c5f2e]" />
                <span>Weber als Arbeitgeber · Standort Minden</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Was wir bieten: Verlässlichkeit statt Floskeln.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Geregelte Arbeitszeiten in Tagschicht, ein fester Arbeitsort in Minden und jahrzehntelange Arbeitsplatzsicherheit im Handwerk.
            </p>
          </div>

          {/* Premium 6-Item Grid in Dark Forest-Green Style with Smooth Hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EMPLOYER_BENEFITS.map((b, idx) => {
              const icons = [Clock, Award, MapPin, ShieldCheck, Users, Factory];
              const BenefitIcon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="relative group rounded-2xl bg-gradient-to-b from-[#0b2413] to-[#07190d] p-6 border border-[#1c5f2e]/45 hover:border-emerald-400/80 shadow-md hover:shadow-xl hover:shadow-[#07190d]/35 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 overflow-hidden cursor-default"
                >
                  {/* Subtle Top Hover Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/0 group-hover:via-emerald-400 to-transparent transition-all duration-500" />
                  
                  {/* Ambient Subtle Radial Glow */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-500/10 group-hover:bg-emerald-400/20 blur-2xl transition-all duration-500 pointer-events-none" />

                  {/* Icon Container with Hover Glow */}
                  <div className="w-12 h-12 rounded-xl bg-[#143d1f] border border-emerald-400/35 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-[#071a0c] group-hover:scale-105 group-hover:border-emerald-300 transition-all duration-300 flex items-center justify-center shrink-0 shadow-inner relative z-10">
                    <BenefitIcon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 relative z-10">
                    <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-emerald-100/80 group-hover:text-emerald-50 leading-relaxed transition-colors">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Section: Jobportal (All 12 Open Positions with Search & Categorization) */}
      <section id="jobs" className="py-20 sm:py-28 border-b border-neutral-200/90 bg-[#FBF9F5] relative overflow-hidden">
        {/* Subtle Green Background Pattern (Bespoke Technical Grid & Ambient Glow) */}
        <div 
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 15%, rgba(28, 95, 46, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 85%, rgba(16, 185, 129, 0.04) 0%, transparent 45%),
              linear-gradient(to right, rgba(28, 95, 46, 0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(28, 95, 46, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: `100% 100%, 100% 100%, 36px 36px, 36px 36px`
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
              <span className="w-6 h-[2px] bg-[#1c5f2e]" />
              <span>Karriere bei Kunststofftechnik Weber · Minden</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Offene Stellenangebote ({filteredJobs.length})
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Finden Sie Ihre passende Position in unserer High-Tech-Fertigung, der Montage, im Engineering oder in der Logistik am Standort Minden.
            </p>
          </div>

          {/* Integrated Search, Location & Sort Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-sm mb-10 space-y-4">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Stelle oder Stichwort suchen (z. B. Schweißer, CAD, Montage)..."
                  className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-neutral-200 bg-[#FBF9F5] focus:bg-white focus:outline-none focus:border-[#1c5f2e] text-xs sm:text-sm text-slate-900 transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Löschen
                  </button>
                )}
              </div>

              {/* Controls: Location Filter & Sort Selector */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                {/* Location Filter Dropdown (6 European Locations) */}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1c5f2e] shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    aria-label="Standort auswählen"
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-[#FBF9F5] focus:bg-white focus:outline-none focus:border-[#1c5f2e] text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Sortierung:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-[#FBF9F5] focus:bg-white focus:outline-none focus:border-[#1c5f2e] text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="default">Empfohlen</option>
                    <option value="az">Alphabetisch (A-Z)</option>
                    <option value="department">Nach Fachbereich</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Cluster Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
              {CLUSTERS.map((cluster) => {
                const count = getClusterCount(cluster.id);
                const isActive = selectedCluster === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#0d2a14] text-white shadow-xs'
                        : 'bg-[#FBF9F5] text-slate-700 hover:bg-neutral-100 border border-neutral-200/80'
                    }`}
                  >
                    <span>{cluster.label}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-200/70 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Cards Grid (Clean, Bild-frei für maximale Übersichtlichkeit) */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden flex flex-col justify-between hover:border-[#1c5f2e]/60 hover:shadow-lg transition-all group"
                >
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-[#1c5f2e]/10 text-[#1c5f2e] font-mono text-[11px] font-bold">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 text-[11px] font-medium">
                        {job.type}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#1c5f2e] transition-colors leading-snug">
                      {job.title}
                    </h3>
                    
                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {job.summary}
                    </p>

                    {/* Schedule / Arbeitszeit */}
                    {job.schedule && (
                      <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 border-t border-neutral-100">
                        <Clock className="w-3.5 h-3.5 text-[#1c5f2e] shrink-0" />
                        <span className="truncate">{job.schedule}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center gap-2.5 bg-[#FBF9F5]/40">
                    <button
                      onClick={() => setActiveJob(job)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-slate-900 border border-neutral-200 font-bold text-xs transition-colors shadow-2xs"
                    >
                      Stellendetails
                    </button>
                    <button
                      onClick={() => {
                        setApplyModalJob(job);
                        setAppSubmitted(false);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Jetzt bewerben</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-neutral-200/90 shadow-sm space-y-4">
              {selectedLocation !== 'all' ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center mx-auto">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Aktuell keine offenen Vakanzen an diesem Standort
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Für den ausgewählten Standort ({LOCATIONS.find(l => l.id === selectedLocation)?.label}) sind zurzeit alle Stellen besetzt. 
                    Wir freuen uns jedoch jederzeit über Ihre Initiativbewerbung für unsere europäischen Standorte!
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedLocation('all')}
                      className="px-4 py-2.5 rounded-xl border border-neutral-300 text-slate-700 font-bold text-xs hover:bg-neutral-100 transition-colors"
                    >
                      Alle Standorte anzeigen
                    </button>
                    <button
                      onClick={() => {
                        setApplyModalJob({ 
                          title: `Initiativbewerbung (${LOCATIONS.find(l => l.id === selectedLocation)?.label || 'International'})`, 
                          department: "International / Europäische Standorte", 
                          location: LOCATIONS.find(l => l.id === selectedLocation)?.label || "Europa" 
                        });
                        setAppSubmitted(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Initiativ bewerben</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#1c5f2e]/10 text-[#1c5f2e] flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Keine passenden Stellen gefunden
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Für Ihre aktuelle Filterauswahl oder Ihren Suchbegriff wurden keine offenen Stellen gefunden.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCluster('all');
                      setSelectedLocation('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0d2a14] text-white font-bold text-xs"
                  >
                    Filter zurücksetzen
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 3. Section: Ausbildungsangebote in Minden (Special Green Background wie beim CTA) */}
      <section
        id="ausbildung"
        className="py-20 sm:py-28 border-t border-b border-[#1c5f2e]/60 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #389e54 0%, #2c8945 55%, #217036 100%)'
        }}
      >
        {/* Dezent gestrichelter / schraffierter Diagonal-Akzent im Hintergrund */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.085) 0px,
                rgba(255, 255, 255, 0.085) 1.5px,
                transparent 1.5px,
                transparent 10px
              )
            `
          }}
        />
        <div className="absolute top-4 inset-x-6 lg:inset-x-12 border-t border-dashed border-white/30 pointer-events-none z-0" />
        <div className="absolute bottom-4 inset-x-6 lg:inset-x-12 border-b border-dashed border-white/30 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-[#071a0c] mb-3">
              <span className="w-6 h-[2.5px] bg-[#071a0c]" />
              <span>Ausbildung & Nachwuchsförderung</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white block">Ausbildungsangebote</span>
              <span className="text-[#071a0c] block mt-0.5">am Standort Minden</span>
            </h2>
            <p className="text-base sm:text-lg text-white/95 mt-4 leading-relaxed">
              Wir bilden unseren Fachkräftenachwuchs selbst aus – mit engmaschiger Betreuung durch erfahrene Ausbilder, 
              attraktiver Ausbildungsvergütung und besten Übernahmechancen nach erfolgreichem Abschluss.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ausbildungen.map((ausb) => (
              <div
                key={ausb.id}
                className="bg-white rounded-2xl border-2 border-white/95 shadow-[0_20px_50px_rgba(7,26,12,0.22)] overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Clean Ausbildungs Image: STRICTLY NO TAGS INSIDE IMAGE */}
                  <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={ausb.image}
                      alt={ausb.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#1c5f2e]/10 text-[#1c5f2e] font-mono text-[11px] font-bold">
                        Dauer: {ausb.duration}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {ausb.startDate || ausb.start}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {ausb.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {ausb.summary || ausb.desc}
                    </p>

                    {ausb.tasks && (
                      <div className="pt-2 space-y-2">
                        <div className="text-xs font-bold text-slate-800">Ausbildungsinhalte:</div>
                        <ul className="space-y-1.5">
                          {ausb.tasks.slice(0, 4).map((t, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1c5f2e] shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 text-xs text-slate-500 border-t border-neutral-200/70">
                      <strong>Berufsschule:</strong> {ausb.school}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={() => {
                      setApplyModalJob(ausb);
                      setAppSubmitted(false);
                    }}
                    className="w-full py-3 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Auf Ausbildungsplatz bewerben</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section: Echte Einblicke & Fotogalerie Stammwerk Minden */}
      <section id="werkstatt" className="py-20 sm:py-28 bg-[#FBF9F5] border-t border-neutral-200/90 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-3">
              <span className="w-6 h-[2px] bg-[#1c5f2e]" />
              <span>Echte Einblicke · Stammwerk Minden</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Wo Handwerk auf industrielle Spitzentechnologie trifft.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Über 25.000 m² Werksfläche, eigene Schwerlastkrane bis 20 Tonnen und ein starkes Team aus 270 Fachkräften am Mitteldamm 65a.
            </p>
          </div>
        </div>

        {/* 1. Doppelte Bilder Slider Galerie: Full-Screen über die gesamte Bildschirmbreite ohne Abschneiden */}
        <div className="relative w-full overflow-hidden py-3 space-y-5 mb-20 sm:mb-24">
          {/* Reihe 1: Gleitet sanft nach links */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1">
              {[...GALLERY_ROW_1, ...GALLERY_ROW_1].map((img, idx) => (
                <div 
                  key={`r1-${idx}`}
                  className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-[#1c5f2e]/60 transition-all duration-300 bg-slate-900 group"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Reihe 2: Gleitet in die gleiche Richtung (leicht versetzt) */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 py-1 -ml-[155px] sm:-ml-[205px] lg:-ml-[230px]">
              {[...GALLERY_ROW_2, ...GALLERY_ROW_2].map((img, idx) => (
                <div 
                  key={`r2-${idx}`}
                  className="w-[290px] sm:w-[390px] lg:w-[440px] h-[195px] sm:h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-[#1c5f2e]/60 transition-all duration-300 bg-slate-900 group"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* 2. Stimmen aus der Werkshalle (Real Employee Testimonials) */}
          <div className="pt-12 sm:pt-16 border-t border-neutral-200/80 mb-16 sm:mb-20">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#1c5f2e] mb-2">
                <span className="w-6 h-[2px] bg-[#1c5f2e]" />
                <span>Stimmen aus der Werkshalle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frag nicht uns. Frag die, die hier arbeiten.
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Echte Antworten aus der Fertigung und Montage – ohne Skripte und ohne PR-Floskeln.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM_TESTIMONIALS.map((t, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#1c5f2e]/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-[#e8f2eb] border-2 border-white shadow-xs shrink-0 flex items-center justify-center">
                        <img 
                          src={t.image} 
                          alt={t.name} 
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                          {t.name}
                        </h4>
                        <span className="text-xs font-bold text-[#1c5f2e] block mt-0.5">
                          {t.years}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {t.role}
                        </span>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <Quote className="w-5 h-5 text-[#1c5f2e]/25 absolute -top-1 left-0" />
                      <p className="text-xs sm:text-sm text-slate-700 italic pl-5 leading-relaxed">
                        „{t.quote}“
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Unkomplizierter Express-Kontakt (Vibrant Green + Hatched Dashed Accent) */}
          <div
            className="rounded-3xl p-8 sm:p-12 text-white border border-[#1c5f2e]/60 shadow-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #389e54 0%, #2c8945 55%, #217036 100%)'
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none select-none z-0"
              style={{
                backgroundImage: `repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.085) 0px, rgba(255, 255, 255, 0.085) 1.5px, transparent 1.5px, transparent 10px)`
              }}
            />
            <div className="absolute top-4 inset-x-6 lg:inset-x-10 border-t border-dashed border-white/30 pointer-events-none z-0" />
            <div className="absolute bottom-4 inset-x-6 lg:inset-x-10 border-b border-dashed border-white/30 pointer-events-none z-0" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#071a0c] font-extrabold">
                  <span className="w-6 h-[2.5px] bg-[#071a0c]" />
                  <span>Schnellbewerbung · Kein langes Anschreiben:</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  <span className="text-white block">Klingt nach Ihrem neuen Arbeitsplatz?</span>
                  <span className="text-[#071a0c] block mt-1">Dann melden Sie sich.</span>
                </h3>
                <p className="text-sm sm:text-base text-white/95 max-w-2xl leading-relaxed">
                  Sie brauchen keinen formellen Lebenslauf und kein Anschreiben. Rufen Sie unsere Personalabteilung einfach kurz an oder senden Sie Ihre Kontaktdaten. Wir melden uns{' '}
                  <strong className="font-extrabold text-white">verlässlich innerhalb von 48 Stunden</strong>.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
                  <a
                    href="tel:057195605269"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FBF9F5] text-[#071a0c] font-extrabold transition-colors shadow-md"
                  >
                    <Phone className="w-4 h-4 text-[#1c5f2e]" />
                    <span>0571 95605-269 anrufen</span>
                  </a>
                  <button
                    onClick={() => {
                      setApplyModalJob({
                        title: 'Initiativ- & Schnellbewerbung Minden',
                        department: 'Fertigung / Montage / Verwaltung',
                        location: 'Minden'
                      });
                      setAppSubmitted(false);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#071a0c]/25 hover:bg-[#071a0c]/40 text-white border border-dashed border-white/40 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>In 90 Sekunden online melden</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-2xl p-6 text-xs space-y-3 shadow-lg border border-dashed border-[#1c5f2e]/35 text-slate-900">
                <div className="flex items-center gap-3.5 pb-3 border-b border-neutral-200">
                  <img
                    src={IMAGES.hrAnsprechpartnerin}
                    alt={COMPANY_FACTS.hrContact}
                    className="w-12 h-12 rounded-xl object-cover border border-[#1c5f2e]/30 shrink-0 shadow-xs"
                  />
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">{COMPANY_FACTS.hrContact}</div>
                    <div className="text-[#1c5f2e] font-bold text-[11px]">Personalwesen · Standort Minden</div>
                  </div>
                </div>
                <div className="space-y-1 text-slate-600 font-medium">
                  <div>Telefon: <strong className="text-slate-900">{COMPANY_FACTS.hrPhone}</strong></div>
                  <div>E-Mail: <strong className="text-slate-900">{COMPANY_FACTS.hrEmail}</strong></div>
                  <div>Mo–Fr: 07:30 – 16:30 Uhr</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modal 1: Full Job Details View */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0d2a14] text-white p-6 sm:p-8 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold mb-2">
                  {activeJob.department} · {activeJob.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold">{activeJob.title}</h3>
                <div className="text-xs text-emerald-200/80 mt-1">{activeJob.schedule}</div>
              </div>
              <button
                onClick={() => setActiveJob(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Authentic Job Image Banner in Modal (STRICTLY NO TAGS INSIDE IMAGE) */}
            <div className="w-full aspect-[21/9] sm:aspect-[24/9] bg-slate-900 overflow-hidden border-b border-neutral-200 shrink-0">
              <img
                src={activeJob.image || IMAGES.jobSchweisser}
                alt={activeJob.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {activeJob.summary}
              </p>

              {activeJob.tasks && activeJob.tasks.length > 0 && (
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-3">
                    Deine Aufgaben bei uns
                  </h4>
                  <ul className="space-y-2">
                    {activeJob.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeJob.profile && activeJob.profile.length > 0 && (
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-3">
                    Dein Profil
                  </h4>
                  <ul className="space-y-2">
                    {activeJob.profile.map((p, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1c5f2e] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-[#FBF9F5] p-4 rounded-xl border border-neutral-200 text-xs space-y-1">
                <div className="font-bold text-slate-900">Direktkontakt Personalabteilung:</div>
                <div>{COMPANY_FACTS.hrContact} · Tel. {COMPANY_FACTS.hrPhone} · E-Mail: {COMPANY_FACTS.hrEmail}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-[#FBF9F5] border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveJob(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-slate-700 font-bold text-xs"
              >
                Schließen
              </button>
              <button
                onClick={() => {
                  const j = activeJob;
                  setActiveJob(null);
                  setApplyModalJob(j);
                  setAppSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <span>Jetzt online auf diese Stelle bewerben</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Express Online Application Form */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0d2a14] text-white p-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider block">
                  Direktbewerbung · Standort Minden
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold mt-0.5">
                  {applyModalJob.title}
                </h3>
              </div>
              <button
                onClick={() => setApplyModalJob(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {appSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1c5f2e] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    Vielen Dank für Ihre Bewerbung!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Ihre Angaben für die Position <strong>{applyModalJob.title}</strong> wurden an unsere Personalabteilung ({COMPANY_FACTS.hrContact}) übermittelt. Wir melden uns kurzfristig bei Ihnen.
                  </p>
                  <button
                    onClick={() => setApplyModalJob(null)}
                    className="px-6 py-2.5 rounded-xl bg-[#0d2a14] text-white font-bold text-xs"
                  >
                    Fenster schließen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Vor- und Nachname *</label>
                    <input
                      required
                      type="text"
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      placeholder="Ihr vollständiger Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#1c5f2e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">E-Mail-Adresse *</label>
                      <input
                        required
                        type="email"
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        placeholder="name@beispiel.de"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#1c5f2e]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Telefonnummer *</label>
                      <input
                        required
                        type="tel"
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        placeholder="+49 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#1c5f2e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lebenslauf / Unterlagen anhängen (optional)</label>
                    <label className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FBF9F5] border border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 text-xs text-slate-600">
                      {appForm.cvFile ? (
                        <span className="font-bold text-[#1c5f2e] flex items-center gap-1.5">
                          <FileCheck className="w-4 h-4" />
                          {appForm.cvFile}
                        </span>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4 text-slate-400" />
                          <span>PDF / Dokument auswählen</span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setAppForm({ ...appForm, cvFile: e.target.files[0].name });
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kurze Nachricht / Frühester Eintrittstermin</label>
                    <textarea
                      rows={3}
                      value={appForm.message}
                      onChange={(e) => setAppForm({ ...appForm, message: e.target.value })}
                      placeholder="Kurze Info zu Ihrer Erfahrung oder Ihrem möglichen Starttermin..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#1c5f2e]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalJob(null)}
                      className="px-4 py-2.5 rounded-xl border border-neutral-300 text-slate-700 font-bold text-xs"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Bewerbung absenden</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
