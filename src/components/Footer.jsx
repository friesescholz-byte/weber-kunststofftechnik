import React from 'react';
import { ArrowUp, Lock, ExternalLink, ArrowRight } from 'lucide-react';
import { COMPANY_FACTS, IMAGES } from '../data/weberData';

export default function Footer({ onNavigate, onOpenRequestModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, path) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
  };

  const handleSectionScroll = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (onNavigate) {
      onNavigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-[#081b0d] text-neutral-300 text-xs pt-16 pb-12 border-t border-[#1c5f2e]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          {/* Col 1: Branding, Die 3 Kernbereiche & Description */}
          <div className="md:col-span-4 space-y-4">
            <a 
              href="/" 
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center group"
            >
              <img 
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Weber-Kunststaofftechnik/weber-logo-clean.webp" 
                alt="Kunststofftechnik Weber GmbH" 
                className="h-11 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] group-hover:opacity-90 transition-opacity"
              />
            </a>

            {/* Die 3 Kernbereiche: Produkte · Werkstoffe · Anwendungsgebiete */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <a
                href="/produkte"
                onClick={(e) => handleNav(e, '/produkte')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-600/30 border border-white/15 hover:border-emerald-400/50 text-white font-semibold text-xs transition-all"
              >
                <span>Produkte</span>
              </a>
              <a
                href="/werkstoffe"
                onClick={(e) => handleNav(e, '/werkstoffe')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-600/30 border border-white/15 hover:border-emerald-400/50 text-white font-semibold text-xs transition-all"
              >
                <span>Werkstoffe</span>
              </a>
              <a
                href="/anwendungsgebiete"
                onClick={(e) => handleNav(e, '/anwendungsgebiete')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-600/30 border border-white/15 hover:border-emerald-400/50 text-white font-semibold text-xs transition-all"
              >
                <span>Anwendungsgebiete</span>
              </a>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm pt-1">
              Seit 1967 Ihr internationaler Partner für thermoplastischen Behälter-, Apparate-, 
              Anlagen- und Rohrleitungsbau. Zertifizierter Fachbetrieb nach WHG/AwSV, DIN EN ISO 9001:2015 und SCC** am Hauptsitz Minden.
            </p>
          </div>

          {/* Col 2: Navigation & Leistungsbereiche */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-emerald-400 font-mono">
              Navigation & Bereiche
            </div>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a 
                  href="/produkte" 
                  onClick={(e) => handleNav(e, '/produkte')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Produkte & Behälterbau</span>
                </a>
              </li>
              <li>
                <a 
                  href="/werkstoffe" 
                  onClick={(e) => handleNav(e, '/werkstoffe')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Werkstoffe & Beständigkeit</span>
                </a>
              </li>
              <li>
                <a 
                  href="/anwendungsgebiete" 
                  onClick={(e) => handleNav(e, '/anwendungsgebiete')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Anwendungsgebiete & Branchen</span>
                </a>
              </li>
              <li>
                <a 
                  href="/ueber-uns" 
                  onClick={(e) => handleNav(e, '/ueber-uns')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Über uns & Standorte</span>
                </a>
              </li>
              <li>
                <a 
                  href="/downloads" 
                  onClick={(e) => handleNav(e, '/downloads')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Downloads & Zertifikate (PDF)</span>
                </a>
              </li>
              <li>
                <a 
                  href="/karriere" 
                  onClick={(e) => handleNav(e, '/karriere')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Karriere & Ausbildung</span>
                </a>
              </li>
              <li className="pt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenRequestModal) {
                      onOpenRequestModal();
                    } else {
                      document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-xs font-bold text-white bg-emerald-700/60 hover:bg-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Projekt jetzt anfragen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Locations & Factory */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-emerald-400 font-mono">
              Hauptsitz & Werk
            </div>
            <div className="text-white font-semibold">{COMPANY_FACTS.name}</div>
            <div>{COMPANY_FACTS.address}</div>
            <div className="text-neutral-400 pt-1">
              Zweigwerk: Verdener Landstraße, 31582 Nienburg / Weser
            </div>
            <div className="pt-2">
              <a 
                href="/ueber-uns#standorte" 
                onClick={(e) => handleNav(e, '/ueber-uns#standorte')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                Alle 6 Standorte weltweit ansehen &rarr;
              </a>
            </div>
          </div>

          {/* Col 4: Contact & Google Reviews Button */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] text-emerald-400 font-mono">
                Direktkontakt
              </div>
              <div className="space-y-1">
                <div>
                  Telefon: <a href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`} className="text-white font-semibold hover:text-emerald-300">{COMPANY_FACTS.phone}</a>
                </div>
                <div>
                  E-Mail: <a href={`mailto:${COMPANY_FACTS.salesEmail}`} className="text-white font-semibold hover:text-emerald-300">{COMPANY_FACTS.salesEmail}</a>
                </div>
                <div className="text-neutral-400 pt-0.5">{COMPANY_FACTS.workingHours}</div>
              </div>
            </div>

            {/* Schicker Google Bewertungs-Button */}
            <div className="pt-1">
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJsaT-jXh0ukcRY1WQhK6mTYY"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-emerald-400/40 transition-all duration-300 shadow-lg shadow-black/20"
              >
                {/* Google "G" Icon */}
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold leading-none mb-0.5">
                    <span>★★★★★</span>
                  </div>
                  <div className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    Auf Google bewerten
                  </div>
                </div>

                <div className="ml-auto text-neutral-400 group-hover:text-white transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & Discreet Admin Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-xs">
          <div>
            © {new Date().getFullYear()} {COMPANY_FACTS.name} · Mitteldamm 65a, D-32429 Minden. Alle Rechte vorbehalten.
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a 
              href="/impressum" 
              onClick={(e) => handleNav(e, '/impressum')} 
              className="hover:text-white transition-colors"
            >
              Impressum
            </a>
            <a 
              href="/datenschutz" 
              onClick={(e) => handleNav(e, '/datenschutz')} 
              className="hover:text-white transition-colors"
            >
              Datenschutz
            </a>
            <a 
              href="/agb" 
              onClick={(e) => handleNav(e, '/agb')} 
              className="hover:text-white transition-colors"
            >
              AGB
            </a>
            <a 
              href="/admin" 
              onClick={(e) => handleNav(e, '/admin')} 
              className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-300 transition-colors"
              title="CMS Login"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
            <button onClick={scrollToTop} className="hover:text-white flex items-center gap-1 ml-2 text-emerald-400 font-semibold cursor-pointer">
              <span>Nach oben</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
