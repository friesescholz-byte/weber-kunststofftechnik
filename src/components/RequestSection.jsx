import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, UploadCloud, FileCheck } from 'lucide-react';
import { COMPANY_FACTS } from '../data/weberData';

export default function RequestSection({ prefilledData }) {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    project: prefilledData?.title || '',
    message: '',
    fileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (prefilledData) {
      if (prefilledData.title) {
        setFormData(prev => ({ ...prev, project: prefilledData.title }));
      } else if (prefilledData.code) {
        setFormData(prev => ({ ...prev, project: `Werkstoff ${prefilledData.code}` }));
      }
    }
  }, [prefilledData]);

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
    <section id="anfrage" className="py-24 sm:py-32 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Contact Info & Reassurance */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Kontakt & Ausschreibung
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sprechen Sie direkt mit unseren Projektingenieuren.
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed">
              Senden Sie uns Ihre Leistungsverzeichnisse, R&I-Fließbilder oder Maßskizzen. 
              Wir prüfen Werkstoffbeständigkeit, statische Machbarkeit und erstellen Ihnen ein fundiertes Angebot.
            </p>

            <div className="pt-6 border-t border-neutral-200 space-y-3 text-sm text-slate-800">
              <div>
                <span className="text-xs text-neutral-500 block">Zentrale & Technischer Vertrieb:</span>
                <a href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-slate-900 hover:text-weber-700 transition-colors">
                  {COMPANY_FACTS.phone}
                </a>
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">E-Mail für Ausschreibungsunterlagen:</span>
                <a href={`mailto:${COMPANY_FACTS.salesEmail}`} className="font-bold text-slate-900 hover:text-weber-700 transition-colors">
                  {COMPANY_FACTS.salesEmail}
                </a>
              </div>
              <div className="text-xs text-neutral-500 pt-2">
                Standort: {COMPANY_FACTS.address}
              </div>
            </div>
          </div>

          {/* Right: Clean B2B Form */}
          <div className="lg:col-span-7 bg-[#FBF9F5] rounded-2xl border border-neutral-200 p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-weber-100 text-weber-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Vielen Dank für Ihre Anfrage.
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                  Ihre Spezifikationen wurden erfasst. Unser technischer Vertrieb in Minden meldet sich zeitnah bei Ihnen.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-weber-700 hover:underline pt-2"
                >
                  Neue Anfrage verfassen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
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
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Geschäftliche E-Mail *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@unternehmen.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefonnummer *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+49 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vorhaben / Behältertyp / Medium
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Rundbehälter 25 m³ für Salzsäure 32%"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dateianhang (optional, z. B. Leistungsverzeichnis, Zeichnung)
                  </label>
                  <label className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 text-xs text-neutral-600 transition-colors">
                    {formData.fileName ? (
                      <span className="font-medium text-slate-900 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-weber-600" />
                        {formData.fileName}
                      </span>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-neutral-400" />
                        <span>Datei auswählen (PDF, STEP, DWG)</span>
                      </>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ihre Nachricht
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Projektrahmen, Zeitplan oder Spezifikationen..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-weber-600 hover:bg-weber-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
