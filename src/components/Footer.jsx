import React, { useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { ANWENDUNGSGEBIETE, PRODUKTE, WERKSTOFFE, COMPANY_FACTS, IMAGES } from '../data/weberData';

export default function Footer({ onSelectCategory }) {
  const [legalModal, setLegalModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B120D] text-neutral-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src={IMAGES.favicon} 
                alt="Weber" 
                className="w-8 h-8 rounded"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                KUNSTSTOFFTECHNIK WEBER GMBH
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Spezialbetrieb für thermoplastischen Behälter-, Apparate- und Rohrleitungsbau. 
              Zertifizierter Fachbetrieb nach AwSV und DIBt-Zulassung am Standort Minden.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-xs">
            <div className="text-white font-semibold mb-2">Standorte</div>
            <div>Hauptwerk: {COMPANY_FACTS.address}</div>
            <div>Zweigwerk: Verdener Landstraße, 31582 Nienburg / Weser</div>
          </div>

          <div className="md:col-span-3 space-y-1.5 text-xs">
            <div className="text-white font-semibold mb-2">Kontakt</div>
            <div>Telefon: {COMPANY_FACTS.phone}</div>
            <div>E-Mail: {COMPANY_FACTS.salesEmail}</div>
            <div className="text-neutral-500 pt-1">{COMPANY_FACTS.workingHours}</div>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="py-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div>
            <div className="text-white font-semibold text-xs mb-3">Anwendungsgebiete (12)</div>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              {ANWENDUNGSGEBIETE.map((item) => (
                <li key={item.id}>
                  <a href="#anwendungsgebiete" onClick={() => onSelectCategory && onSelectCategory(item)} className="hover:text-white transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Produkte (11)</div>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              {PRODUKTE.map((item) => (
                <li key={item.id}>
                  <a href="#produkte" onClick={() => onSelectCategory && onSelectCategory(item)} className="hover:text-white transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Werkstoffe (7)</div>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              {WERKSTOFFE.map((mat) => (
                <li key={mat.id}>
                  <a href="#werkstoffe" onClick={() => onSelectCategory && onSelectCategory(mat)} className="hover:text-white transition-colors">
                    {mat.code}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Unternehmen & Karriere</div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#fertigung" className="hover:text-white transition-colors">Fertigung in Minden</a></li>
              <li><a href="#anfrage" className="hover:text-white transition-colors">Projekt anfragen</a></li>
              <li>
                <a href="https://applylane.de/weberfachkraft" target="_blank" rel="noopener noreferrer" className="text-weber-400 hover:underline">
                  Karriereportal (applylane) &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs">
          <div>
            © {new Date().getFullYear()} Kunststofftechnik Weber GmbH. Alle Rechte vorbehalten.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setLegalModal('impressum')} className="hover:text-neutral-300">
              Impressum
            </button>
            <button onClick={() => setLegalModal('datenschutz')} className="hover:text-neutral-300">
              Datenschutz
            </button>
            <button onClick={() => setLegalModal('agb')} className="hover:text-neutral-300">
              AGB
            </button>
            <button onClick={scrollToTop} className="hover:text-white flex items-center gap-1 ml-4">
              <span>Nach oben</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal Legal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70" onClick={() => setLegalModal(null)} />
          <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-xl p-6 sm:p-8 z-10">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-bold text-base">
                {legalModal === 'impressum' && 'Impressum'}
                {legalModal === 'datenschutz' && 'Datenschutz'}
                {legalModal === 'agb' && 'AGB'}
              </h3>
              <button onClick={() => setLegalModal(null)} className="p-1 hover:bg-neutral-100 rounded">
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <div className="text-xs text-neutral-600 space-y-3 leading-relaxed">
              {legalModal === 'impressum' && (
                <>
                  <p><strong>Kunststofftechnik Weber GmbH</strong><br />
                  Potsdamer Straße 11<br />
                  32423 Minden / Deutschland</p>
                  <p>Telefon: +49 (0) 571 93309-0<br />
                  E-Mail: info@weber-kunststofftechnik.de</p>
                  <p>Amtsgericht Bad Oeynhausen · USt-ID: DE 126 022 411</p>
                </>
              )}

              {legalModal === 'datenschutz' && (
                <p>
                  Wir verarbeiten personenbezogene Daten ausschließlich zur Bearbeitung von 
                  Spezifikationsanfragen gemäß DSGVO. Keine Weitergabe an Dritte.
                </p>
              )}

              {legalModal === 'agb' && (
                <p>
                  Es gelten die Allgemeinen Verkaufs- und Lieferbedingungen für den 
                  industriellen Behälter- und Anlagenbau der Kunststofftechnik Weber GmbH.
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 text-right">
              <button 
                onClick={() => setLegalModal(null)}
                className="px-4 py-1.5 bg-neutral-900 text-white rounded text-xs font-semibold"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
