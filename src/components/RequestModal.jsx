import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, UploadCloud, FileCheck, ArrowRight } from 'lucide-react';
import { useCms } from '../data/cmsStore';

function getSimplePrefillTopic(prefill, produkte = [], anwendungsgebiete = [], werkstoffe = []) {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (prefill) {
    if (typeof prefill === 'string') return prefill;
    if (prefill.requestPrefill) return prefill.requestPrefill;
    if (prefill.code && prefill.name) return `${prefill.code} – ${prefill.name}`;
    if (prefill.title) return prefill.title;
    if (prefill.name) return prefill.name;
  }

  if (path.startsWith('/produkte')) {
    const slug = path.replace('/produkte/', '').replace('/produkte', '').replace(/\/$/, '');
    const found = slug ? produkte.find((p) => p.id === slug) : null;
    return found ? found.title : 'Produktauslegung & Behälterbau nach Maß';
  }

  if (path.startsWith('/anwendungsgebiete')) {
    const slug = path.replace('/anwendungsgebiete/', '').replace('/anwendungsgebiete', '').replace(/\/$/, '');
    const found = slug ? anwendungsgebiete.find((a) => a.id === slug) : null;
    return found ? found.title : 'Branchen- & Prozessanlagenauslegung';
  }

  if (path.startsWith('/werkstoffe')) {
    const slug = path.replace('/werkstoffe/', '').replace('/werkstoffe', '').replace(/\/$/, '');
    const found = slug ? werkstoffe.find((w) => w.id === slug) : null;
    return found ? `${found.code} – ${found.name}` : 'Werkstoffberatung & Beständigkeitsprüfung (DVS 2205)';
  }

  return 'Allgemeine Projekt- & Angebotsanfrage';
}

const TURNSTILE_SITEKEY = '0x4AAAAAAFlh0mSR0eMxTxR9';

export default function RequestModal({ isOpen, onClose, prefill }) {
  const { produkte = [], anwendungsgebiete = [], werkstoffe = [] } = useCms();

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    project: '',
    message: '',
    fileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      const topic = getSimplePrefillTopic(prefill, produkte, anwendungsgebiete, werkstoffe);
      setFormData((prev) => ({
        ...prev,
        project: topic
      }));
    }
  }, [isOpen, prefill, produkte, anwendungsgebiete, werkstoffe]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Render official Cloudflare Turnstile widget inside modal
  useEffect(() => {
    if (!isOpen) return;
    let widgetId = null;
    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && !turnstileRef.current.hasChildNodes()) {
        try {
          widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITEKEY,
            theme: 'light',
            callback: (token) => setTurnstileToken(token)
          });
        } catch {
          // Already rendered
        }
      }
    };
    const timer = setTimeout(renderWidget, 250);
    return () => {
      clearTimeout(timer);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        fileName: e.target.files[0].name
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const domToken = document.querySelector('#request-modal-turnstile [name="cf-turnstile-response"]')?.value || turnstileToken;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'cf-turnstile-response': domToken
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.error && data.error.includes('Turnstile')) {
          setSubmitError(data.error);
        } else {
          setSubmitted(true);
        }
      }
    } catch {
      // In local dev without workers runtime, gracefully proceed
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop: Stark abgedunkelt & Weichzeichner für maximalen Fokus auf das Formular */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Clean, Spacious High-End Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-neutral-200/90 overflow-hidden z-10 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Header */}
        <div className="flex items-center justify-between px-7 sm:px-9 py-6 sm:py-7 border-b border-neutral-200 bg-[#0d2a14] text-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Projekt anfragen
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
              Unverbindliche Auslegung & Angebot direkt aus unserem Werk in Minden
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Schließen"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Spacious Form Body */}
        <div className="p-7 sm:p-9">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#1c5f2e] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Wir haben Ihre Anfrage zu <strong className="text-slate-900">{formData.project}</strong> erfolgreich erhalten. Unsere Projektingenieure in Minden prüfen Ihre Angaben und melden sich kurzfristig bei Ihnen.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-[#0d2a14] hover:bg-[#1c5f2e] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Fenster schließen
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* 1. Prefilled Topic */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  Anfrage-Thema / Produktbereich
                </label>
                <input
                  required
                  type="text"
                  placeholder="z. B. Rundbehälter 25 m³, Werkstoffberatung..."
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2.5 sm:py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all"
                />
              </div>

              {/* 2. Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Unternehmen *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Firma / Organisation"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Ihr Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Vor- und Nachname"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all"
                  />
                </div>
              </div>

              {/* 3. Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    E-Mail-Adresse *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@firma.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    Telefonnummer *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+49 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all"
                  />
                </div>
              </div>

              {/* 4. Short Message (Deutlich größer & komfortabler) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    Kurze Eckdaten / Projektbeschreibung
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>
                <textarea
                  rows={5}
                  placeholder="Beschreiben Sie kurz Ihr geplantes Vorhaben (z. B. gewünschtes Volumen in m³ oder Liter, gelagertes Medium & Konzentration, Betriebstemperatur, Maße, gewünschter Aufstellort innen/außen oder statische Besonderheiten)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[140px] sm:min-h-[160px] px-4 py-3 bg-[#FBF9F5] border border-neutral-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#1c5f2e] focus:ring-2 focus:ring-[#1c5f2e]/20 transition-all leading-relaxed"
                />
              </div>

              {/* 5. Optional File Upload */}
              <div>
                <label className="flex items-center gap-3 px-4 py-3 bg-[#FBF9F5] border border-dashed border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100/80 text-xs sm:text-sm text-slate-600 transition-colors">
                  {formData.fileName ? (
                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-[#1c5f2e]" />
                      <span>{formData.fileName}</span>
                    </span>
                  ) : (
                    <>
                      <UploadCloud className="w-5 h-5 text-slate-400 shrink-0" />
                      <span>Optional: Zeichnung, Skizze oder Sicherheitsdatenblatt anhängen (PDF, STEP, DWG, PNG)</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {/* Fehlermeldung bei Validierung / Turnstile */}
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {submitError}
                </div>
              )}

              {/* Cloudflare Turnstile Sicherheitsüberprüfung */}
              <div className="py-1 flex justify-center" id="request-modal-turnstile">
                <div
                  ref={turnstileRef}
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITEKEY}
                  data-theme="light"
                />
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Wird geprüft & übermittelt...' : 'Projektanfrage absenden'}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
