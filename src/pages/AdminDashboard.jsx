import React, { useState, useEffect, useRef } from 'react';
import { Lock, LogOut, Plus, Trash2, Edit3, Save, X, Briefcase, Package, Layers, Cpu, Download, FolderPlus, CheckCircle2, RotateCcw, Upload, ExternalLink, ArrowLeft } from 'lucide-react';
import { useCms } from '../data/cmsStore';

// Cryptographic SHA-256 hash of the project-unique admin password (no plaintext password in code!)
const ADMIN_PASS_SHA256 = 'a4d10110ce76228ec310a5783716d89336e6a9a6e961c9728d2e0837eb7f3f39';
const TURNSTILE_SITEKEY = '0x4AAAAAAFlh0mSR0eMxTxR9';

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function AdminDashboard({ onNavigate }) {
  const {
    anwendungsgebiete,
    produkte,
    werkstoffe,
    downloadCategories,
    downloads,
    jobs,
    ausbildungen,
    updateSection,
    resetToDefaults
  } = useCms();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('weber_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);

  const [activeTab, setActiveTab] = useState('jobs');
  const [toast, setToast] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Render official Cloudflare Turnstile widget on login screen
  useEffect(() => {
    if (isAuthenticated) return;
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
    const timer = setTimeout(renderWidget, 300);
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
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsVerifying(true);

    try {
      // Read token from DOM if not set via callback
      const domToken = document.querySelector('[name="cf-turnstile-response"]')?.value || turnstileToken;

      // 1. Try server-side verification (/api/login for Cloudflare Worker or /api/login.php for Plesk)
      let serverAuthenticated = false;
      for (const endpoint of ['/api/login', '/api/login.php']) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              password,
              'cf-turnstile-response': domToken
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.token) {
              sessionStorage.setItem('weber_admin_token', data.token);
              serverAuthenticated = true;
              break;
            }
          }
        } catch {
          // Fallback to SHA-256 verification below if offline/static preview
        }
      }

      // 2. Cryptographic SHA-256 hash verification
      const inputHash = await sha256Hex(password.trim());
      if (serverAuthenticated || inputHash === ADMIN_PASS_SHA256) {
        if (!sessionStorage.getItem('weber_admin_token')) {
          sessionStorage.setItem('weber_admin_token', inputHash);
        }
        sessionStorage.setItem('weber_admin_auth', 'true');
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError('Ungültiges Admin-Passwort. Bitte prüfen Sie Ihre Eingabe.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('weber_admin_auth');
    sessionStorage.removeItem('weber_admin_token');
    setIsAuthenticated(false);
  };

  // File Upload Helper (uploads to Plesk /api/cms.php?action=upload or creates local URL)
  const handleFileUpload = async (file, onSuccessUrl) => {
    if (!file) return;
    const token = sessionStorage.getItem('weber_admin_token') || '';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cms.php?action=upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onSuccessUrl(data.url);
          showToast('Datei erfolgreich auf den Server hochgeladen.');
          return;
        }
      }
    } catch {
      // Fallback to Data URL for immediate preview
    }

    const reader = new FileReader();
    reader.onload = () => {
      onSuccessUrl(reader.result);
      showToast('Datei für die Live-Vorschau geladen.');
    };
    reader.readAsDataURL(file);
  };

  // Save edited/new item
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!editingItem || !editingType) return;

    const cleanId =
      editingItem.id ||
      (editingItem.title || editingItem.code || 'eintrag')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
        '-' +
        Date.now().toString().slice(-3);

    const finalItem = { ...editingItem, id: cleanId };

    const updateList = (list, sectionKey) => {
      const exists = list.some((i) => i.id === finalItem.id);
      const next = exists
        ? list.map((i) => (i.id === finalItem.id ? finalItem : i))
        : [finalItem, ...list];
      updateSection(sectionKey, next);
    };

    if (editingType === 'jobs') updateList(jobs, 'jobs');
    if (editingType === 'ausbildungen') updateList(ausbildungen, 'ausbildungen');
    if (editingType === 'produkte') updateList(produkte, 'produkte');
    if (editingType === 'anwendungsgebiete') updateList(anwendungsgebiete, 'anwendungsgebiete');
    if (editingType === 'werkstoffe') updateList(werkstoffe, 'werkstoffe');
    if (editingType === 'downloads') updateList(downloads, 'downloads');

    setEditingItem(null);
    setEditingType(null);
    showToast('Änderungen erfolgreich gespeichert und sofort live geschaltet.');
  };

  const handleDeleteItem = (sectionKey, list, id) => {
    if (!window.confirm('Möchten Sie diesen Eintrag wirklich löschen?')) return;
    updateSection(
      sectionKey,
      list.filter((i) => i.id !== id)
    );
    showToast('Eintrag wurde gelöscht.');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) return;
    const id = newCategoryTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const next = [
      ...downloadCategories,
      { id, title: newCategoryTitle.trim(), description: newCategoryDesc.trim() }
    ];
    updateSection('downloadCategories', next);
    setNewCategoryTitle('');
    setNewCategoryDesc('');
    showToast(`Kategorie „${newCategoryTitle}“ wurde erstellt.`);
  };

  const handleDeleteCategory = (catId) => {
    if (!window.confirm('Kategorie wirklich löschen?')) return;
    updateSection(
      'downloadCategories',
      downloadCategories.filter((c) => c.id !== catId)
    );
    showToast('Kategorie gelöscht.');
  };

  // ============================================================================
  // LOGIN VIEW (Protected by Cloudflare Turnstile + SHA-256 / Server Auth)
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-[#FBF9F5] flex items-center justify-center px-6 pt-32 sm:pt-36 pb-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/90 shadow-xl overflow-hidden">
          <div className="bg-[#0d2a14] text-white p-6 sm:p-8 border-b border-[#1c5f2e]/40">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 block">
              Kunststofftechnik Weber GmbH
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">
              CMS & Admin-Dashboard
            </h1>
            <p className="text-xs text-emerald-100/80 mt-1">
              Zentrale Verwaltung für Stellenanzeigen, Produkte, Anwendungsgebiete, Werkstoffe und Downloads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin-Passwort *
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#1c5f2e]"
              />
            </div>

            {/* Official Cloudflare Turnstile Widget */}
            <div className="pt-1">
              <div
                ref={turnstileRef}
                className="cf-turnstile"
                data-sitekey={TURNSTILE_SITEKEY}
                data-theme="light"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs sm:text-sm transition-colors"
            >
              {isVerifying ? 'Wird verifiziert...' : 'Anmelden & Dashboard öffnen'}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zurück zur Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED CMS DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FBF9F5] pb-24">
      
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a14] text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-400/40 flex items-center gap-2.5 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="bg-[#0d2a14] text-white pt-32 sm:pt-36 pb-8 border-b border-[#1c5f2e]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-1">
              <span>CMS Verwaltung · Plesk & Cloud Sync aktiv</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Weber Website- & Content-Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Möchten Sie alle Inhalte auf den Originalzustand von weber-kunststofftechnik.de zurücksetzen?')) {
                  resetToDefaults();
                  showToast('Alle Daten auf Standardwerte zurückgesetzt.');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Standard wiederherstellen</span>
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website ansehen</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 text-xs font-bold inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-neutral-200/90 shadow-sm">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'jobs' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Karriere & Jobs ({jobs.length + ausbildungen.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('produkte')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'produkte' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produkte ({produkte.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('anwendungsgebiete')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'anwendungsgebiete' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Anwendungsgebiete ({anwendungsgebiete.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('werkstoffe')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'werkstoffe' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Werkstoffe ({werkstoffe.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'downloads' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloads & Kategorien ({downloads.length})</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: KARRIERE & STELLENANZEIGEN                                   */}
        {/* =================================================================== */}
        {activeTab === 'jobs' && (
          <div className="space-y-10">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Stellenanzeigen verwalten ({jobs.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Erstellen oder bearbeiten Sie Stellenangebote inkl. Aufgabenprofil, Anforderungen, Abteilung und Bild.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('jobs');
                    setEditingItem({
                      id: '',
                      title: '',
                      department: 'Fertigung & Produktion',
                      location: 'Minden',
                      type: 'Vollzeit',
                      schedule: 'Mo–Do 07:00–15:45 Uhr, Fr bis 14:45 Uhr',
                      summary: '',
                      tasks: [''],
                      profile: [''],
                      image: ''
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neue Stellenanzeige erstellen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {job.image && (
                        <img src={job.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 border border-neutral-300" />
                      )}
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block">
                          {job.department} · {job.location}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">{job.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{job.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingType('jobs');
                          setEditingItem({ ...job });
                        }}
                        className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-slate-700"
                        title="Bearbeiten"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('jobs', jobs, job.id)}
                        className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ausbildungsangebote Section */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Ausbildungsangebote verwalten ({ausbildungen.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Ausbildungsplätze am Standort Minden bearbeiten oder ergänzen.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('ausbildungen');
                    setEditingItem({
                      id: '',
                      title: '',
                      duration: '3 Jahre',
                      start: 'August / September',
                      school: 'Leo-Sympher-Berufskolleg Minden',
                      summary: '',
                      tasks: [''],
                      image: ''
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Ausbildungsberuf anlegen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ausbildungen.map((ausb) => (
                  <div key={ausb.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block">{ausb.duration}</span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">{ausb.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{ausb.summary}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/70">
                      <button
                        onClick={() => {
                          setEditingType('ausbildungen');
                          setEditingItem({ ...ausb });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-bold text-slate-700 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Bearbeiten</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem('ausbildungen', ausbildungen, ausb.id)}
                        className="p-1.5 rounded-lg bg-white border border-neutral-200 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2 & 3: PRODUKTE & ANWENDUNGSGEBIETE                             */}
        {/* =================================================================== */}
        {(activeTab === 'produkte' || activeTab === 'anwendungsgebiete') && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {activeTab === 'produkte' ? `Produkte verwalten (${produkte.length})` : `Anwendungsgebiete verwalten (${anwendungsgebiete.length})`}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Texte, technische Eckdaten, Normen, Leistungsmerkmale und Bildergalerien bearbeiten oder neue Unterseiten anlegen.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingType(activeTab);
                  setEditingItem({
                    id: '',
                    title: '',
                    norm: 'DIN EN 12573 / DVS 2205',
                    shortDesc: '',
                    description: '',
                    image: '',
                    gallery: [],
                    specs: activeTab === 'produkte'
                      ? { volumen: '', durchmesser: '', werkstoffe: 'PE 100, PP, PVDF', normen: 'DVS 2205 / WHG' }
                      : { bauform: '', werkstoffe: 'PE, PP, PVDF, GFK', normen: 'WHG / AwSV', einsatz: '' },
                    features: ['']
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{activeTab === 'produkte' ? 'Neues Produkt anlegen' : 'Neues Anwendungsgebiet anlegen'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(activeTab === 'produkte' ? produkte : anwendungsgebiete).map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img src={item.image || item.gallery?.[0]} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0 border border-neutral-300" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block">{item.norm}</span>
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">{item.title}</h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.gallery?.length || 1} Galeriebilder · /{activeTab}/{item.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingType(activeTab);
                        setEditingItem({ ...item });
                      }}
                      className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-slate-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteItem(
                          activeTab,
                          activeTab === 'produkte' ? produkte : anwendungsgebiete,
                          item.id
                        )
                      }
                      className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: WERKSTOFFE                                                   */}
        {/* =================================================================== */}
        {activeTab === 'werkstoffe' && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Konstruktionswerkstoffe verwalten ({werkstoffe.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Werkstoffdatenblätter, Temperaturbereiche, Eigenschaften und Galeriebilder verwalten.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingType('werkstoffe');
                  setEditingItem({
                    id: '',
                    code: '',
                    name: '',
                    category: 'Thermoplast',
                    temp: '-20 °C bis +80 °C',
                    desc: '',
                    description: '',
                    highlights: [''],
                    specs: { dichte: '', schweissverfahren: '', zulassung: '', lieferform: '' },
                    image: '',
                    gallery: []
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Neuen Werkstoff hinzufügen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {werkstoffe.map((mat) => (
                <div key={mat.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img src={mat.image || mat.gallery?.[0]} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 border border-neutral-300" />
                    <div className="min-w-0">
                      <span className="text-xs font-mono font-bold text-[#1c5f2e] block">
                        {mat.code} · {mat.temp}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">{mat.name}</h3>
                      <p className="text-xs text-slate-500 truncate">{mat.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setEditingType('werkstoffe');
                        setEditingItem({ ...mat });
                      }}
                      className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-slate-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem('werkstoffe', werkstoffe, mat.id)}
                      className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: DOWNLOADS & KATEGORIEN                                       */}
        {/* =================================================================== */}
        {activeTab === 'downloads' && (
          <div className="space-y-8">
            
            {/* Category Management Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                Download-Kategorien verwalten ({downloadCategories.length})
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Bestehende Kategorien (Prospekte, Dokumente & Zertifikate, Herstelleranweisungen) oder neue Kategorien erstellen.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {downloadCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-[#1c5f2e] font-bold">ID: {cat.id}</span>
                      <h3 className="text-sm font-extrabold text-slate-900">{cat.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 rounded-lg bg-white border border-neutral-200 text-red-600 hover:bg-red-50 shrink-0"
                      title="Kategorie löschen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Create New Category Form */}
              <form onSubmit={handleAddCategory} className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Neue Kategorie (Titel) *</label>
                  <input
                    required
                    type="text"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    placeholder="z. B. Datenblätter & CAD"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kurzbeschreibung (optional)</label>
                  <input
                    type="text"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    placeholder="Kurze Beschreibung der Kategorie..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Kategorie anlegen</span>
                  </button>
                </div>
              </form>
            </div>

            {/* PDF Documents Management Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    PDF-Dokumente & Dateien ({downloads.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Neue PDF-Dateien hochladen, einer Kategorie zuordnen oder bestehende Dokumente aktualisieren.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingType('downloads');
                    setEditingItem({
                      id: '',
                      categoryId: downloadCategories[0]?.id || 'prospekte',
                      title: '',
                      subtitle: '',
                      lang: 'DE',
                      fileSize: 'PDF',
                      url: ''
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neues Dokument hinzufügen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloads.map((doc) => {
                  const catName = downloadCategories.find((c) => c.id === doc.categoryId)?.title || doc.categoryId;
                  return (
                    <div key={doc.id} className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block">
                          {catName} · {doc.lang} · {doc.fileSize}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">{doc.title}</h3>
                        <p className="text-xs text-slate-500 truncate">{doc.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white border border-neutral-200 text-slate-600 hover:text-slate-900"
                          title="PDF öffnen"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setEditingType('downloads');
                            setEditingItem({ ...doc });
                          }}
                          className="p-2 rounded-lg bg-white border border-neutral-200 text-slate-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('downloads', downloads, doc.id)}
                          className="p-2 rounded-lg bg-white border border-neutral-200 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ===================================================================== */}
      {/* UNIVERSAL EDIT / CREATE MODAL                                         */}
      {/* ===================================================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-[#0d2a14] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block">
                  CMS Editor · {editingType}
                </span>
                <h3 className="text-lg font-extrabold">
                  {editingItem.title || editingItem.code || 'Neuen Eintrag erstellen'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setEditingType(null);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm">
              
              {/* FIELDS FOR JOBS */}
              {editingType === 'jobs' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Stellentitel *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. Kunststoffschweißer (m/w/d)"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Abteilung / Bereich *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.department}
                        onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                        placeholder="z. B. Fertigung & Produktion"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Standort</label>
                      <input
                        type="text"
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Anstellungsart</label>
                      <input
                        type="text"
                        value={editingItem.type}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Arbeitszeitmodell</label>
                      <input
                        type="text"
                        value={editingItem.schedule}
                        onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Einleitung / Kurzbeschreibung *</label>
                    <textarea
                      required
                      rows={3}
                      value={editingItem.summary}
                      onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Deine Aufgaben (eine Aufgabe pro Zeile)
                    </label>
                    <textarea
                      rows={4}
                      value={(editingItem.tasks || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          tasks: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Dein Profil / Anforderungen (ein Punkt pro Zeile)
                    </label>
                    <textarea
                      rows={4}
                      value={(editingItem.profile || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          profile: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* FIELDS FOR AUSBILDUNGEN */}
              {editingType === 'ausbildungen' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ausbildungsberuf *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ausbildungsdauer</label>
                      <input
                        type="text"
                        value={editingItem.duration}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ausbildungsbeginn</label>
                      <input
                        type="text"
                        value={editingItem.start}
                        onChange={(e) => setEditingItem({ ...editingItem, start: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Berufsschule</label>
                      <input
                        type="text"
                        value={editingItem.school}
                        onChange={(e) => setEditingItem({ ...editingItem, school: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Beschreibung</label>
                    <textarea
                      rows={3}
                      value={editingItem.summary}
                      onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inhalte (ein Punkt pro Zeile)</label>
                    <textarea
                      rows={4}
                      value={(editingItem.tasks || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          tasks: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* FIELDS FOR PRODUKTE & ANWENDUNGSGEBIETE */}
              {(editingType === 'produkte' || editingType === 'anwendungsgebiete') && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bezeichnung / Titel *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Norm / Bauart / Kennzeichnung</label>
                      <input
                        type="text"
                        value={editingItem.norm || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, norm: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kurzbeschreibung (Vorschau & Header)</label>
                    <textarea
                      rows={2}
                      value={editingItem.shortDesc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ausführliche technische Beschreibung</label>
                    <textarea
                      rows={4}
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Leistungsmerkmale / Features (ein Merkmal pro Zeile)
                    </label>
                    <textarea
                      rows={4}
                      value={(editingItem.features || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          features: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Galerie-Bilder (eine Bild-URL pro Zeile)
                    </label>
                    <textarea
                      rows={4}
                      value={(editingItem.gallery || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          gallery: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* FIELDS FOR WERKSTOFFE */}
              {editingType === 'werkstoffe' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kurzzeichen (z. B. PE) *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.code || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vollständiger Name *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Temperaturbereich</label>
                      <input
                        type="text"
                        value={editingItem.temp || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, temp: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kurzbeschreibung</label>
                    <textarea
                      rows={2}
                      value={editingItem.desc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ausführliche Werkstoffbeschreibung</label>
                    <textarea
                      rows={4}
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Werkstoff-Vorteile / Highlights (ein Punkt pro Zeile)
                    </label>
                    <textarea
                      rows={4}
                      value={(editingItem.highlights || []).join('\n')}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          highlights: e.target.value.split('\n').filter((l) => l.trim() !== '')
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* FIELDS FOR DOWNLOADS */}
              {editingType === 'downloads' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Dokumententitel *</label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. TÜV Zertifikat WHG"
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kategorie *</label>
                      <select
                        value={editingItem.categoryId}
                        onChange={(e) => setEditingItem({ ...editingItem, categoryId: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                      >
                        {downloadCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Untertitel / Beschreibung</label>
                    <input
                      type="text"
                      value={editingItem.subtitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sprache (z. B. DE, EN, PL)</label>
                      <input
                        type="text"
                        value={editingItem.lang || 'DE'}
                        onChange={(e) => setEditingItem({ ...editingItem, lang: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Dateigröße (z. B. 1.2 MB)</label>
                      <input
                        type="text"
                        value={editingItem.fileSize || 'PDF'}
                        onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PDF-URL oder Datei hochladen *</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        required
                        type="text"
                        value={editingItem.url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        placeholder="https://... oder Datei rechts hochladen"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                      />
                      <label className="px-4 py-2 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 border border-neutral-300 text-xs font-bold text-slate-700 cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                        <Upload className="w-4 h-4 text-[#1c5f2e]" />
                        <span>PDF hochladen</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.zip"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              handleFileUpload(f, (url) => setEditingItem({ ...editingItem, url }));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Image URL / Upload field for non-download items */}
              {editingType !== 'downloads' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hauptbild-URL oder neues Foto hochladen</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 font-mono text-xs"
                    />
                    <label className="px-4 py-2 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 border border-neutral-300 text-xs font-bold text-slate-700 cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                      <Upload className="w-4 h-4 text-[#1c5f2e]" />
                      <span>Bild hochladen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            handleFileUpload(f, (url) => setEditingItem({ ...editingItem, image: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setEditingType(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-slate-700 font-bold text-xs"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Speichern & Veröffentlichen</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
