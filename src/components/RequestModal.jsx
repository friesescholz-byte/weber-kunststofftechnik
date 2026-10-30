import React, { useState, useEffect } from 'react';
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

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        fileName: e.target.files[0].name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Clean, Minimal Modal Card */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-[#0d2a14] text-white">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Projekt anfragen
            </h2>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Unverbindliche Auslegung & Angebot direkt aus unserem Werk in Minden
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Simple Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#1c5f2e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Wir haben Ihre Anfrage zu <strong>{formData.project}</strong> erhalten. Unsere Projektingenieure melden sich kurzfristig bei Ihnen.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0d2a14] hover:bg-[#1c5f2e] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Schließen
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* 1. Prefilled Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Anfrage-Thema / Produkt
                </label>
                <input
                  required
                  type="text"
                  placeholder="z. B. Rundbehälter 25 m³, Werkstoffberatung..."
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FBF9F5] border border-neutral-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                />
              </div>

              {/* 2. Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unternehmen *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Firma"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ihr Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Vor- und Nachname"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>
              </div>

              {/* 3. Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-Mail *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@firma.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+49 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>
              </div>

              {/* 4. Short Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kurze Eckdaten / Nachricht (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Volumen, Medium, Maße oder Fragen..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                />
              </div>

              {/* 5. Optional File Upload */}
              <div>
                <label className="flex items-center gap-2 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-100 text-xs text-slate-600 transition-colors">
                  {formData.fileName ? (
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#1c5f2e]" />
                      {formData.fileName}
                    </span>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-slate-400" />
                      <span>Optional: Zeichnung oder Datenblatt anhängen (PDF, STEP, DWG)</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
