import React, { useEffect } from 'react';
import { ArrowLeft, FileDown, ShieldCheck } from 'lucide-react';
import { COMPANY_FACTS, R2_BASE } from '../data/weberData';

export default function LegalPage({ type, onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      
      {/* Header */}
      <section className="bg-[#0d2a14] text-white pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 border-b border-[#1c5f2e]/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Startseite</span>
          </button>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {type === 'impressum' && 'Impressum'}
            {type === 'datenschutz' && 'Datenschutzerklärung'}
            {type === 'agb' && 'Allgemeine Geschäftsbedingungen (AGB)'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-2">
            {COMPANY_FACTS.name} · {COMPANY_FACTS.address}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 sm:p-10 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            
            {type === 'impressum' && (
              <>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 mb-2">Angaben gemäß § 5 DDG</h2>
                  <p className="font-bold text-slate-900">{COMPANY_FACTS.name}</p>
                  <p>Mitteldamm 65a</p>
                  <p>D-32429 Minden</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Kontakt</h3>
                  <p>Telefon: {COMPANY_FACTS.phone}</p>
                  <p>Telefax: {COMPANY_FACTS.fax}</p>
                  <p>E-Mail: <a href={`mailto:${COMPANY_FACTS.salesEmail}`} className="text-[#1c5f2e] font-semibold underline">{COMPANY_FACTS.salesEmail}</a></p>
                  <p>Internet: www.weber-kunststofftechnik.de</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Vertretungsberechtigte Geschäftsführer</h3>
                  <p>{COMPANY_FACTS.directors.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Registereintrag</h3>
                  <p>Eintragung im Handelsregister.</p>
                  <p>Registergericht: {COMPANY_FACTS.registerCourt}</p>
                  <p>Registernummer: {COMPANY_FACTS.registerNumber}</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Umsatzsteuer-ID</h3>
                  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                  <p className="font-mono font-bold text-slate-900">{COMPANY_FACTS.vatId}</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
                  <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Unser Angebot richtet sich an gewerbliche und industrielle Auftraggeber (B2B).
                  </p>
                </div>
              </>
            )}

            {type === 'datenschutz' && (
              <>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 mb-2">1. Datenschutz auf einen Blick</h2>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">2. Verantwortliche Stelle</h3>
                  <p className="font-bold text-slate-900">{COMPANY_FACTS.name}</p>
                  <p>{COMPANY_FACTS.address}</p>
                  <p>Telefon: {COMPANY_FACTS.phone}</p>
                  <p>E-Mail: {COMPANY_FACTS.salesEmail}</p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">3. Datenerfassung auf dieser Website (B2B-Anfragen & Bewerbungen)</h3>
                  <p>
                    Wenn Sie uns per Kontaktformular, Spezifikationsanfrage, E-Mail oder Bewerbungsformular Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert (Art. 6 Abs. 1 lit. b DSGVO bzw. § 26 BDSG bei Bewerbungen). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">4. Schutz vor automatisierten Zugriffen (Cloudflare Turnstile)</h3>
                  <p>
                    Zum Schutz unserer Formulare und administrativen Zugänge vor missbräuchlichen automatisierten Zugriffen (Bots) nutzen wir Cloudflare Turnstile. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an der IT-Sicherheit gemäß Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5">5. Ihre Rechte gemäß DSGVO</h3>
                  <p>
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung, Einschränkung der Verarbeitung oder Löschung dieser Daten.
                  </p>
                </div>
              </>
            )}

            {type === 'agb' && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Allgemeine Geschäftsbedingungen (Stand: 02.01.2023)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Gültig für Lieferungen und Leistungen der Kunststofftechnik Weber GmbH
                    </p>
                  </div>
                  <a
                    href={`${R2_BASE}/doc_AGB-Stand-02.01.2023.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Original-AGB als PDF herunterladen</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <p>
                    Für sämtliche Angebote, Lieferungen, Behälter-, Apparate- und Montageleistungen der <strong>Kunststofftechnik Weber GmbH</strong> gelten unsere Allgemeinen Geschäftsbedingungen (Stand 02.01.2023).
                  </p>
                  <p>
                    Das vollständige, rechtsverbindliche Dokument steht Ihnen oben sowie jederzeit in unserem <button onClick={() => onNavigate('/downloads')} className="text-[#1c5f2e] font-bold underline">Downloadbereich</button> als PDF-Datei zur Verfügung.
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
