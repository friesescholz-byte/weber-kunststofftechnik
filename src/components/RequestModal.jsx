import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, UploadCloud, FileCheck, ArrowRight } from 'lucide-react';
import { COMPANY_FACTS } from '../data/weberData';

function getCleanProjectTitle(prefill) {
  if (!prefill) return '';
  if (typeof prefill === 'string') return prefill;
  if (prefill.title) return prefill.title;
  if (prefill.name) return prefill.name;
  if (prefill.code) return `Werkstoff ${prefill.code}`;
  return '';
}

export default function RequestModal({ isOpen, onClose, prefill }) {
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

  // Sync prefill when modal opens or prefill changes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);

      if (prefill) {
        setFormData(prev => ({
          ...prev,
          project: getCleanProjectTitle(prefill)
        }));
      }
    }
  }, [isOpen, prefill]);

  // Lock body scroll when modal is open
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
      setFormData(prev => ({
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-auto animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean, Simple Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-100 bg-white">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Projekt anfragen
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hauptwerk Minden · Unverbindliche Auslegung & Angebot
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#1c5f2e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Wir haben Ihre Daten erhalten. Unser technischer Vertrieb in Minden prüft Ihr Vorhaben und meldet sich zeitnah bei Ihnen.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0c3319] hover:bg-[#154220] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Fertig
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Company & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unternehmen *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Firma / Organisation"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ansprechpartner *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-Mail *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@unternehmen.de"
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

              {/* Vorhaben / Produkt / Medium */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vorhaben / Produkt / Medium *
                </label>
                <input
                  required
                  type="text"
                  placeholder="z. B. Rundbehälter 25 m³ für Salzsäure, Sonderbau..."
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ihre Nachricht (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Maße, Konzentration, Einsatzort oder Zeitplan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#1c5f2e] transition-colors"
                />
              </div>

              {/* File Attachment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dateianhang (optional)
                </label>
                <label className="flex items-center gap-2 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-100 text-xs text-slate-600 transition-colors">
                  {formData.fileName ? (
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#1c5f2e]" />
                      {formData.fileName}
                    </span>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-slate-400" />
                      <span>Datei auswählen (PDF, STEP, DWG)</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#0c3319] hover:bg-[#154220] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Wird übermittelt...' : 'Anfrage absenden'}</span>
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
