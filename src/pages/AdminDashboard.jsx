import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Briefcase,
  Package,
  Layers,
  Cpu,
  Download,
  FolderPlus,
  CheckCircle2,
  RotateCcw,
  Upload,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { useCms } from '../data/cmsStore';

// Cryptographic SHA-256 hash of the project-unique admin password (no plaintext password in code!)
const ADMIN_PASS_SHA256 = 'a4d10110ce76228ec310a5783716d89336e6a9a6e961c9728d2e0837eb7f3f39';
const TURNSTILE_SITEKEY = '0x4AAAAAAFlh0mSR0eMxTxR9';

const JOB_DEPARTMENTS = [
  'Fertigung & Produktion',
  'Montage & Rohrleitungsbau',
  'Technik & Konstruktion',
  'Logistik & Vertrieb'
];

const WEBER_LOCATIONS = [
  'Minden',
  'Süddeutschland',
  'Benelux',
  'Skandinavien',
  'Polen',
  'Österreich / Schweiz'
];

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Smart Client-Side Image Compressor (resizes to max 1400px & encodes to WebP so localStorage never overflows)
async function compressImageToWebpDataUrl(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden'));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => resolve(ev.target.result);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(webpDataUrl);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ============================================================================
// REUSABLE FOOLPROOF ("IDIOTENSICHER") FORM SUB-COMPONENTS
// ============================================================================

function BulletListEditor({ label, hint, items = [], onChange, placeholder = 'Eintrag eingeben...' }) {
  const safeItems = Array.isArray(items) && items.length > 0 ? items : [''];

  const handleItemChange = (idx, val) => {
    const next = [...safeItems];
    next[idx] = val;
    onChange(next);
  };

  const handleAddRow = () => {
    onChange([...safeItems, '']);
  };

  const handleRemoveRow = (idx) => {
    const next = safeItems.filter((_, i) => i !== idx);
    onChange(next.length > 0 ? next : ['']);
  };

  return (
    <div className="bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-4 sm:p-5 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <label className="block text-xs font-extrabold text-slate-900">{label}</label>
          {hint && <p className="text-[11px] text-slate-500 mt-0.5">{hint}</p>}
        </div>
        <span className="text-[11px] font-mono text-[#1c5f2e] font-bold">
          {safeItems.filter((x) => String(x).trim() !== '').length} Einträge
        </span>
      </div>

      <div className="space-y-2">
        {safeItems.map((val, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-white border border-neutral-200 text-[11px] font-mono font-bold text-slate-500 flex items-center justify-center shrink-0">
              {idx + 1}
            </span>
            <input
              type="text"
              value={val}
              onChange={(e) => handleItemChange(idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#1c5f2e]"
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(idx)}
              className="p-2 rounded-xl bg-white hover:bg-red-50 border border-neutral-200 text-slate-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
              title="Punkt entfernen"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddRow}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-neutral-300 hover:border-[#1c5f2e]/40 text-xs font-bold text-[#1c5f2e] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Weiteren Punkt hinzufügen</span>
      </button>
    </div>
  );
}

function SingleImageUploader({ label, hint, imageUrl, onUploadFile, onChangeUrl }) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFile = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      await onUploadFile(file, (url) => {
        onChangeUrl(url);
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-extrabold text-slate-900">{label}</label>
          {hint && <p className="text-[11px] text-slate-500 mt-0.5">{hint}</p>}
        </div>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Link-Feld ausblenden' : 'Oder Bild-Link einfügen'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Current Image Visual Preview */}
        <div className="sm:col-span-5">
          {imageUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-neutral-300 aspect-[16/10] bg-neutral-100 group">
              <img src={imageUrl} alt="Vorschau" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChangeUrl('')}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-red-600 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Entfernen</span>
              </button>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-neutral-300 aspect-[16/10] bg-white flex flex-col items-center justify-center text-slate-400 p-4 text-center">
              <ImageIcon className="w-7 h-7 mb-1.5 opacity-60" />
              <span className="text-xs font-semibold">Noch kein Hauptbild ausgewählt</span>
            </div>
          )}
        </div>

        {/* Drag & Drop / File Picker Zone */}
        <div className="sm:col-span-7">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) processFile(f);
            }}
            className={`w-full rounded-xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#1c5f2e] bg-emerald-50/70'
                : 'border-[#1c5f2e]/35 bg-white hover:bg-emerald-50/30 hover:border-[#1c5f2e]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#0d2a14] text-emerald-300 flex items-center justify-center mb-2.5 shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {isUploading
                ? 'Bild wird optimiert & hochgeladen...'
                : imageUrl
                ? 'Neues Foto vom Gerät hochladen (ersetzen)'
                : 'Foto vom Gerät auswählen oder hierher ziehen'}
            </span>
            <span className="text-[11px] text-slate-500 mt-1">
              Unterstützt JPG, PNG & WebP · Automatische WebP-Optimierung
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) processFile(f);
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      {showUrlInput && (
        <div className="pt-2">
          <input
            type="text"
            value={imageUrl || ''}
            onChange={(e) => onChangeUrl(e.target.value)}
            placeholder="https://... (Externe Bild-URL)"
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-xs text-slate-700"
          />
        </div>
      )}
    </div>
  );
}

function GalleryUploader({ gallery = [], mainImage = '', onUploadFile, onChangeGallery, onSetMainImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [showUrlAdd, setShowUrlAdd] = useState(false);

  const safeGallery = Array.isArray(gallery) ? gallery.filter(Boolean) : [];

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setIsUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of Array.from(fileList)) {
        await new Promise((resolve) => {
          onUploadFile(file, (url) => {
            if (url) uploadedUrls.push(url);
            resolve();
          });
        });
      }
      if (uploadedUrls.length > 0) {
        const nextGallery = [...safeGallery, ...uploadedUrls];
        onChangeGallery(nextGallery);
        if (!mainImage && onSetMainImage) {
          onSetMainImage(uploadedUrls[0]);
        }
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (idx) => {
    const next = safeGallery.filter((_, i) => i !== idx);
    onChangeGallery(next);
  };

  const handleMove = (idx, dir) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= safeGallery.length) return;
    const next = [...safeGallery];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    onChangeGallery(next);
  };

  return (
    <div className="bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-extrabold text-slate-900">
            Bildergalerie auf der Unterseite ({safeGallery.length} Fotos)
          </label>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Laden Sie beliebig viele Projekt- oder Produktfotos direkt von Ihrem Computer hoch und sortieren Sie die Reihenfolge per Klick.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowUrlAdd(!showUrlAdd)}
          className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlAdd ? 'Link-Eingabe schließen' : 'Bild per Link hinzufügen'}</span>
        </button>
      </div>

      {/* Multi-File Upload Dropzone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`w-full rounded-xl border-2 border-dashed p-4 flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer transition-all ${
          isDragging
            ? 'border-[#1c5f2e] bg-emerald-50/70'
            : 'border-[#1c5f2e]/35 bg-white hover:bg-emerald-50/30 hover:border-[#1c5f2e]'
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-[#0d2a14] text-emerald-300 flex items-center justify-center shrink-0">
          <Upload className="w-4 h-4" />
        </div>
        <div className="text-center sm:text-left">
          <div className="text-xs sm:text-sm font-extrabold text-slate-900">
            {isUploading
              ? 'Fotos werden verarbeitet...'
              : '+ Neue Galerie-Fotos vom Gerät auswählen (Mehrfachauswahl möglich)'}
          </div>
          <div className="text-[11px] text-slate-500">
            Sie können auch mehrere Fotos gleichzeitig markieren oder per Drag & Drop hierher ziehen.
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </label>

      {showUrlAdd && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newUrlInput}
            onChange={(e) => setNewUrlInput(e.target.value)}
            placeholder="https://... Bild-URL eingeben"
            className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => {
              if (newUrlInput.trim()) {
                onChangeGallery([...safeGallery, newUrlInput.trim()]);
                setNewUrlInput('');
              }
            }}
            className="px-4 py-2 rounded-xl bg-[#0d2a14] text-white text-xs font-bold cursor-pointer"
          >
            Hinzufügen
          </button>
        </div>
      )}

      {/* Visual Thumbnail Grid */}
      {safeGallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {safeGallery.map((imgUrl, idx) => {
            const isMain = mainImage === imgUrl;
            return (
              <div
                key={idx}
                className={`rounded-xl bg-white border overflow-hidden flex flex-col justify-between shadow-2xs ${
                  isMain ? 'border-[#1c5f2e] ring-2 ring-[#1c5f2e]/20' : 'border-neutral-200'
                }`}
              >
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <img src={imgUrl} alt={`Galerie ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono font-bold">
                    #{idx + 1}
                  </span>
                  {isMain && (
                    <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-[#1c5f2e] text-white text-[10px] font-bold">
                      Hauptbild
                    </span>
                  )}
                </div>

                <div className="p-2 bg-white border-t border-neutral-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      className="p-1 rounded hover:bg-neutral-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                      title="Nach vorne schieben"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === safeGallery.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      className="p-1 rounded hover:bg-neutral-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                      title="Nach hinten schieben"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!isMain && onSetMainImage && (
                    <button
                      type="button"
                      onClick={() => onSetMainImage(imgUrl)}
                      className="text-[10px] font-bold text-[#1c5f2e] hover:underline px-1 cursor-pointer"
                      title="Als Hauptbild verwenden"
                    >
                      Als Titelbild
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                    title="Foto aus Galerie löschen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN ADMIN DASHBOARD COMPONENT
// ============================================================================
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

  const [activeTab, setActiveTab] = useState('produkte');
  const [toast, setToast] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Render official Cloudflare Turnstile widget on login screen (Explicit Mode)
  useEffect(() => {
    if (isAuthenticated) return;
    let widgetId = null;
    let isCancelled = false;

    const renderWidget = () => {
      if (isCancelled || !turnstileRef.current) return;
      if (window.turnstile) {
        turnstileRef.current.innerHTML = '';
        try {
          widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITEKEY,
            theme: 'light',
            callback: (token) => {
              setTurnstileToken(token);
              setLoginError('');
            },
            'error-callback': (code) => {
              console.warn('Turnstile Login Challenge Status:', code);
            },
            'expired-callback': () => {
              setTurnstileToken('');
            }
          });
        } catch (e) {
          console.warn('Turnstile render warning:', e);
        }
      }
    };

    const timer = setTimeout(renderWidget, 150);

    return () => {
      isCancelled = true;
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
      const domToken = document.querySelector('[name="cf-turnstile-response"]')?.value || turnstileToken;

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

  // Universal File Upload Helper (uploads to server API if available, otherwise compresses images to WebP)
  const handleFileUpload = async (file, onSuccessUrl, onFileMeta = null) => {
    if (!file) return;

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const formattedSize = file.size > 1024 * 1024 ? `PDF · ${sizeInMb} MB` : `PDF · ${Math.max(1, Math.round(file.size / 1024))} KB`;
    if (onFileMeta) {
      onFileMeta({ formattedSize, fileName: file.name });
    }

    const token = sessionStorage.getItem('weber_admin_token') || '';
    const formData = new FormData();
    formData.append('file', file);

    for (const endpoint of ['/api/cms.php?action=upload', '/api/upload']) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url) {
            onSuccessUrl(data.url);
            showToast(`Datei „${file.name}“ erfolgreich hochgeladen.`);
            return;
          }
        }
      } catch {
        // Fallback to client-side WebP compression / DataURL below
      }
    }

    if (file.type && file.type.startsWith('image/')) {
      try {
        const compressedDataUrl = await compressImageToWebpDataUrl(file);
        onSuccessUrl(compressedDataUrl);
        showToast(`Foto „${file.name}“ optimiert (WebP) und übernommen.`);
        return;
      } catch {
        // Fallback to standard FileReader
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      onSuccessUrl(reader.result);
      showToast(`Datei „${file.name}“ erfolgreich übernommen.`);
    };
    reader.readAsDataURL(file);
  };

  // Helper to open item in editor with normalized fields so every website field is present
  const openEditorFor = (type, item) => {
    const copy = JSON.parse(JSON.stringify(item));

    if (type === 'produkte') {
      copy.subtitle = copy.subtitle || copy.norm || '';
      copy.desc = copy.desc || copy.shortDesc || '';
      copy.longDesc = copy.longDesc || copy.description || copy.desc || '';
      if (!Array.isArray(copy.specs)) {
        if (typeof copy.specs === 'string') {
          copy.specs = copy.specs.split('·').map((s) => s.trim()).filter(Boolean);
        } else if (typeof copy.specs === 'object' && copy.specs !== null) {
          copy.specs = Object.entries(copy.specs).map(([k, v]) => `${k}: ${v}`);
        } else {
          copy.specs = [''];
        }
      }
      copy.features = Array.isArray(copy.features) ? copy.features : [''];
      copy.gallery = Array.isArray(copy.gallery) ? copy.gallery : copy.image ? [copy.image] : [];
    } else if (type === 'anwendungsgebiete') {
      copy.subtitle = copy.subtitle || '';
      copy.desc = copy.desc || copy.shortDesc || '';
      copy.longDesc = copy.longDesc || copy.description || copy.desc || '';
      copy.specs = typeof copy.specs === 'string' ? copy.specs : Array.isArray(copy.specs) ? copy.specs.join(' · ') : '';
      copy.norms = Array.isArray(copy.norms) ? copy.norms : [''];
      copy.materialsUsed = Array.isArray(copy.materialsUsed) ? copy.materialsUsed : [''];
      copy.mediaExamples = Array.isArray(copy.mediaExamples) ? copy.mediaExamples : [''];
      copy.highlights = Array.isArray(copy.highlights)
        ? copy.highlights
        : Array.isArray(copy.features)
        ? copy.features
        : [''];
      copy.gallery = Array.isArray(copy.gallery) ? copy.gallery : copy.image ? [copy.image] : [];
    } else if (type === 'werkstoffe') {
      copy.desc = copy.desc || copy.shortDesc || '';
      copy.longDesc = copy.longDesc || copy.description || copy.desc || '';
      copy.highlights = Array.isArray(copy.highlights) ? copy.highlights : [''];
      copy.applications = Array.isArray(copy.applications) ? copy.applications : [''];
      copy.gallery = Array.isArray(copy.gallery) ? copy.gallery : copy.image ? [copy.image] : [];
    } else if (type === 'jobs') {
      copy.tasks = Array.isArray(copy.tasks) ? copy.tasks : [''];
      copy.profile = Array.isArray(copy.profile) ? copy.profile : [''];
    } else if (type === 'ausbildungen') {
      copy.tasks = Array.isArray(copy.tasks) ? copy.tasks : [''];
    }

    setEditingType(type);
    setEditingItem(copy);
  };

  // Save edited/new item and synchronize all aliases/fields 1:1 with the website
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!editingItem || !editingType) return;

    const cleanId =
      editingItem.id ||
      (editingItem.title || editingItem.name || editingItem.code || 'eintrag')
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const cleanList = (arr) =>
      Array.isArray(arr) ? arr.map((x) => String(x).trim()).filter(Boolean) : [];

    const finalItem = { ...editingItem, id: cleanId };

    // Synchronize field aliases so every component on the website reads the exact updated value
    if (editingType === 'produkte') {
      finalItem.norm = finalItem.subtitle;
      finalItem.shortDesc = finalItem.desc;
      finalItem.description = finalItem.longDesc;
      finalItem.specs = cleanList(finalItem.specs);
      finalItem.features = cleanList(finalItem.features);
      finalItem.gallery = cleanList(finalItem.gallery);
      if (!finalItem.image && finalItem.gallery.length > 0) {
        finalItem.image = finalItem.gallery[0];
      }
      if (finalItem.image && !finalItem.gallery.includes(finalItem.image)) {
        finalItem.gallery = [finalItem.image, ...finalItem.gallery];
      }
    } else if (editingType === 'anwendungsgebiete') {
      finalItem.shortDesc = finalItem.desc;
      finalItem.description = finalItem.longDesc;
      finalItem.norms = cleanList(finalItem.norms);
      finalItem.materialsUsed = cleanList(finalItem.materialsUsed);
      finalItem.mediaExamples = cleanList(finalItem.mediaExamples);
      finalItem.highlights = cleanList(finalItem.highlights);
      finalItem.features = finalItem.highlights;
      finalItem.gallery = cleanList(finalItem.gallery);
      if (!finalItem.image && finalItem.gallery.length > 0) {
        finalItem.image = finalItem.gallery[0];
      }
      if (finalItem.image && !finalItem.gallery.includes(finalItem.image)) {
        finalItem.gallery = [finalItem.image, ...finalItem.gallery];
      }
    } else if (editingType === 'werkstoffe') {
      finalItem.title = `${finalItem.code} – ${finalItem.name}`;
      finalItem.shortDesc = finalItem.desc;
      finalItem.description = finalItem.longDesc;
      finalItem.highlights = cleanList(finalItem.highlights);
      finalItem.applications = cleanList(finalItem.applications);
      finalItem.gallery = cleanList(finalItem.gallery);
      if (!finalItem.image && finalItem.gallery.length > 0) {
        finalItem.image = finalItem.gallery[0];
      }
      if (finalItem.image && !finalItem.gallery.includes(finalItem.image)) {
        finalItem.gallery = [finalItem.image, ...finalItem.gallery];
      }
    } else if (editingType === 'jobs') {
      finalItem.tasks = cleanList(finalItem.tasks);
      finalItem.profile = cleanList(finalItem.profile);
    } else if (editingType === 'ausbildungen') {
      finalItem.tasks = cleanList(finalItem.tasks);
    }

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
    showToast('Änderungen erfolgreich gespeichert und sofort auf der Website aktualisiert!');
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
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
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
                className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-neutral-300 text-sm focus:outline-none focus:border-[#1c5f2e]"
              />
            </div>

            <div className="py-1 flex justify-center">
              <div
                ref={turnstileRef}
                className="min-h-[65px] flex items-center justify-center"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isVerifying ? 'Sicherheitsprüfung läuft...' : 'Anmelden & Inhalte verwalten'}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Zurück zur öffentlichen Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED CMS DASHBOARD VIEW
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FBF9F5] pt-28 sm:pt-32 pb-24">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a14] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-400/40 flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        {/* Top Admin Header Bar */}
        <div className="bg-[#0d2a14] text-white rounded-2xl p-6 sm:p-8 border border-[#1c5f2e]/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 block mb-1">
              Weber CMS · Idiotensichere Live-Verwaltung
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Website-Inhalte, Bilder & Unterseiten bearbeiten
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl">
              Alle Änderungen, Texte und hochgeladenen Fotos werden 1:1 mit der Startseite und den Unterseiten synchronisiert.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website ansehen</span>
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Möchten Sie alle Inhalte auf den ursprünglichen Werkszustand zurücksetzen?'
                  )
                ) {
                  resetToDefaults();
                  showToast('Standarddaten wurden wiederhergestellt.');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Standard wiederherstellen</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-neutral-200/90 shadow-xs">
          <button
            onClick={() => setActiveTab('produkte')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'produkte' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produkte ({produkte.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('anwendungsgebiete')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'anwendungsgebiete'
                ? 'bg-[#0d2a14] text-white'
                : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Anwendungsgebiete ({anwendungsgebiete.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('werkstoffe')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'werkstoffe' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Werkstoffe ({werkstoffe.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'jobs' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Karriere & Jobs ({jobs.length + ausbildungen.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'downloads' ? 'bg-[#0d2a14] text-white' : 'text-slate-700 hover:bg-neutral-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloads & PDFs ({downloads.length})</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB: PRODUKTE & ANWENDUNGSGEBIETE                                   */}
        {/* =================================================================== */}
        {(activeTab === 'produkte' || activeTab === 'anwendungsgebiete') && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {activeTab === 'produkte'
                    ? `Produkte & Leistungsbereiche verwalten (${produkte.length})`
                    : `Anwendungsgebiete & Branchen verwalten (${anwendungsgebiete.length})`}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Klicken Sie auf „Bearbeiten“, um Texte, technische Eckdaten, Leistungsmerkmale sowie Haupt- und Galeriebilder direkt per Datei-Upload anzupassen.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigate(`/${activeTab}`)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#1c5f2e]" />
                  <span>Übersichtsseite ansehen</span>
                </button>
                <button
                  onClick={() => {
                    if (activeTab === 'produkte') {
                      openEditorFor('produkte', {
                        id: '',
                        title: '',
                        subtitle: 'Bauartzugelassen nach DIBt & DIN EN 12573',
                        desc: '',
                        longDesc: '',
                        image: '',
                        gallery: [],
                        specs: ['Volumen: individuell nach Maß', 'Werkstoffe: PE 100, PP-H, PVDF'],
                        features: ['']
                      });
                    } else {
                      openEditorFor('anwendungsgebiete', {
                        id: '',
                        title: '',
                        subtitle: '',
                        desc: '',
                        longDesc: '',
                        specs: 'Maßgefertigte Auslegung · WHG / AwSV-konform',
                        norms: ['AwSV / WHG', 'DIN EN 12573'],
                        materialsUsed: ['PE 100', 'PP-H', 'PVDF'],
                        mediaExamples: ['Säuren & Laugen'],
                        highlights: [''],
                        image: '',
                        gallery: []
                      });
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {activeTab === 'produkte' ? 'Neues Produkt anlegen' : 'Neues Anwendungsgebiet anlegen'}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(activeTab === 'produkte' ? produkte : anwendungsgebiete).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 hover:border-[#1c5f2e]/40 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image || item.gallery?.[0]}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-neutral-300 bg-neutral-100"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block truncate">
                        {item.subtitle || item.norm || `/${activeTab}/${item.id}`}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">{item.title}</h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.gallery?.length || 1} Fotos in der Galerie · /{activeTab}/{item.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onNavigate(`/${activeTab}/${item.id}`)}
                      className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-slate-500 hover:text-slate-900 cursor-pointer"
                      title="Unterseite live ansehen"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditorFor(activeTab, item)}
                      className="px-3 py-2 rounded-lg bg-white hover:bg-emerald-50 border border-neutral-200 hover:border-[#1c5f2e]/40 text-xs font-bold text-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#1c5f2e]" />
                      <span>Bearbeiten</span>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteItem(
                          activeTab,
                          activeTab === 'produkte' ? produkte : anwendungsgebiete,
                          item.id
                        )
                      }
                      className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600 cursor-pointer"
                      title="Löschen"
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
        {/* TAB: WERKSTOFFE                                                     */}
        {/* =================================================================== */}
        {activeTab === 'werkstoffe' && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Konstruktionswerkstoffe verwalten ({werkstoffe.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Werkstoffdatenblätter, Temperaturbereiche, chemische Eigenschaften, Vorteile und Galeriebilder bearbeiten.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigate('/werkstoffe')}
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#1c5f2e]" />
                  <span>Werkstoff-Seite ansehen</span>
                </button>
                <button
                  onClick={() =>
                    openEditorFor('werkstoffe', {
                      id: '',
                      code: '',
                      name: '',
                      temp: '-20 °C bis +80 °C',
                      density: '0,95 g/cm³',
                      welding: 'Heizelement-Stumpfschweißen, Extruderschweißen',
                      acids: 'Sehr gut',
                      alkalis: 'Hervorragend',
                      color: 'Schwarz / Natur',
                      desc: '',
                      longDesc: '',
                      highlights: [''],
                      applications: [''],
                      image: '',
                      gallery: []
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Werkstoff hinzufügen</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {werkstoffe.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 hover:border-[#1c5f2e]/40 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={mat.image || mat.gallery?.[0]}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-neutral-300 bg-neutral-100"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-mono font-bold text-[#1c5f2e] block truncate">
                        {mat.code} · {mat.temp}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">{mat.name}</h3>
                      <p className="text-xs text-slate-500 truncate">
                        {mat.gallery?.length || 1} Fotos · /werkstoffe/{mat.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onNavigate(`/werkstoffe/${mat.id}`)}
                      className="p-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-slate-500 hover:text-slate-900 cursor-pointer"
                      title="Werkstoff-Unterseite ansehen"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditorFor('werkstoffe', mat)}
                      className="px-3 py-2 rounded-lg bg-white hover:bg-emerald-50 border border-neutral-200 hover:border-[#1c5f2e]/40 text-xs font-bold text-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#1c5f2e]" />
                      <span>Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem('werkstoffe', werkstoffe, mat.id)}
                      className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600 cursor-pointer"
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
        {/* TAB: KARRIERE & STELLENANZEIGEN                                     */}
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
                    Erstellen oder bearbeiten Sie Stellenangebote inkl. Standort-Filter, Aufgabenprofil, Anforderungen und Detailbild.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => onNavigate('/karriere')}
                    className="px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#1c5f2e]" />
                    <span>Karriere-Seite ansehen</span>
                  </button>
                  <button
                    onClick={() =>
                      openEditorFor('jobs', {
                        id: '',
                        title: '',
                        department: 'Fertigung & Produktion',
                        location: 'Minden',
                        type: 'Vollzeit (38,5 Std./Woche)',
                        schedule: 'Tagschicht · Keine Rufbereitschaft',
                        summary: '',
                        tasks: [''],
                        profile: [''],
                        image: ''
                      })
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Neue Stellenanzeige erstellen</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {job.image && (
                        <img
                          src={job.image}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-neutral-300"
                        />
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
                        onClick={() => openEditorFor('jobs', job)}
                        className="px-3 py-2 rounded-lg bg-white hover:bg-emerald-50 border border-neutral-200 text-xs font-bold text-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#1c5f2e]" />
                        <span>Bearbeiten</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem('jobs', jobs, job.id)}
                        className="p-2 rounded-lg bg-white hover:bg-red-50 border border-neutral-200 text-red-600 cursor-pointer"
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
                  onClick={() =>
                    openEditorFor('ausbildungen', {
                      id: '',
                      title: '',
                      duration: '3 Jahre',
                      start: '01. August',
                      school: 'Berufskolleg Minden / Bielefeld',
                      summary: '',
                      tasks: [''],
                      image: ''
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Ausbildungsberuf anlegen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ausbildungen.map((ausb) => (
                  <div
                    key={ausb.id}
                    className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#1c5f2e] block">
                        {ausb.duration} · Start: {ausb.start}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">{ausb.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{ausb.summary}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/70">
                      <button
                        onClick={() => openEditorFor('ausbildungen', ausb)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#1c5f2e]" />
                        <span>Bearbeiten</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem('ausbildungen', ausbildungen, ausb.id)}
                        className="p-1.5 rounded-lg bg-white border border-neutral-200 text-red-600 cursor-pointer"
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
        {/* TAB: DOWNLOADS & KATEGORIEN                                         */}
        {/* =================================================================== */}
        {activeTab === 'downloads' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                Download-Kategorien verwalten ({downloadCategories.length})
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Bestehende Kategorien (Prospekte, Dokumente & Zertifikate, Herstelleranweisungen) oder neue Kategorien erstellen.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {downloadCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#1c5f2e] font-bold">ID: {cat.id}</span>
                      <h3 className="text-sm font-extrabold text-slate-900">{cat.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 rounded-lg bg-white border border-neutral-200 text-red-600 hover:bg-red-50 shrink-0 cursor-pointer"
                      title="Kategorie löschen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleAddCategory}
                className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
              >
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Neue Kategorie (Titel) *
                  </label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kurzbeschreibung (optional)
                  </label>
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
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Kategorie anlegen</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    PDF-Dokumente & Zertifikate ({downloads.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Neue PDF-Dateien direkt vom Gerät hochladen, einer Kategorie zuordnen oder bestehende Dokumente aktualisieren.
                  </p>
                </div>
                <button
                  onClick={() =>
                    openEditorFor('downloads', {
                      id: '',
                      categoryId: downloadCategories[0]?.id || 'prospekte',
                      title: '',
                      subtitle: '',
                      lang: 'DE',
                      fileSize: 'PDF',
                      url: ''
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neues PDF-Dokument hochladen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloads.map((doc) => {
                  const catName =
                    downloadCategories.find((c) => c.id === doc.categoryId)?.title || doc.categoryId;
                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-[#FBF9F5] border border-neutral-200 flex items-center justify-between gap-4"
                    >
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
                          onClick={() => openEditorFor('downloads', doc)}
                          className="px-3 py-2 rounded-lg bg-white border border-neutral-200 text-xs font-bold text-slate-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#1c5f2e]" />
                          <span>Bearbeiten</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem('downloads', downloads, doc.id)}
                          className="p-2 rounded-lg bg-white border border-neutral-200 text-red-600 cursor-pointer"
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
      {/* UNIVERSAL FOOLPROOF EDIT / CREATE MODAL                               */}
      {/* ===================================================================== */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0d2a14] text-white px-6 py-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block">
                  Weber CMS Editor · {editingType?.toUpperCase()}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold">
                  {editingItem.title || editingItem.name || editingItem.code || 'Neuen Eintrag anlegen'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setEditingType(null);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form
              onSubmit={handleSaveItem}
              className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm"
            >
              {/* ============================================================= */}
              {/* 1. PRODUKTE EDITOR (1:1 mit Website & Detailseite)            */}
              {/* ============================================================= */}
              {editingType === 'produkte' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Produkt-Bezeichnung / Titel *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. Lager- & Prozessbehälter Rund"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Untertitel / Norm-Zeile (über der Überschrift)
                      </label>
                      <input
                        type="text"
                        value={editingItem.subtitle || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                        placeholder="z. B. Bauartzugelassen nach DIBt Z-40.21 bis 100 m³"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Kurzbeschreibung (für die Übersichts-Kacheln auf Startseite & /produkte) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editingItem.desc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                      placeholder="Prägnante Zusammenfassung in 1–2 Sätzen..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Ausführlicher Fachtext (für die Produkt-Detailseite)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.longDesc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, longDesc: e.target.value })}
                      placeholder="Detaillierte technische Beschreibung auf der Unterseite..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <BulletListEditor
                    label="Technische Eckdaten (erscheinen im grünen Kasten oben rechts auf der Unterseite & auf den Kacheln)"
                    hint="Tipp: Mit Doppelpunkt schreiben (z. B. 'Volumen: 0,5 m³ bis 100 m³'), dann wird es automatisch zweispaltig formatiert."
                    items={editingItem.specs}
                    onChange={(next) => setEditingItem({ ...editingItem, specs: next })}
                    placeholder="z. B. Volumen: 0,5 m³ bis 100 m³"
                  />

                  <BulletListEditor
                    label="Leistungsmerkmale & Konstruktionsdetails (grüne Haken auf der Detailseite)"
                    hint="Jeder Punkt wird mit einem grünen Haken unter dem Fachtext aufgelistet."
                    items={editingItem.features}
                    onChange={(next) => setEditingItem({ ...editingItem, features: next })}
                    placeholder="z. B. Prüffähige statische Berechnung nach DIN EN 12573 und DVS 2205"
                  />

                  <SingleImageUploader
                    label="Hauptbild / Vorschaubild (für Übersichts-Kacheln & Hero-Hintergrund)"
                    hint="Laden Sie das Foto direkt von Ihrem Computer hoch."
                    imageUrl={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeUrl={(url) => setEditingItem({ ...editingItem, image: url })}
                  />

                  <GalleryUploader
                    gallery={editingItem.gallery}
                    mainImage={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeGallery={(next) => setEditingItem({ ...editingItem, gallery: next })}
                    onSetMainImage={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                </>
              )}

              {/* ============================================================= */}
              {/* 2. ANWENDUNGSGEBIETE EDITOR (1:1 mit Website & Detailseite)   */}
              {/* ============================================================= */}
              {editingType === 'anwendungsgebiete' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Branche / Anwendungsgebiet (Titel) *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. Chemie Tankläger"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Untertitel (im Hero der Unterseite)
                      </label>
                      <input
                        type="text"
                        value={editingItem.subtitle || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                        placeholder="z. B. Sichere Großtankläger für Säuren und Laugen nach AwSV"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Kurzbeschreibung (für die Übersichts-Kacheln) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editingItem.desc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Ausführlicher Fachtext (auf der Detail-Unterseite)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.longDesc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, longDesc: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Technische Kurz-Eckdaten (mit · getrennt)
                    </label>
                    <input
                      type="text"
                      value={editingItem.specs || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, specs: e.target.value })}
                      placeholder="z. B. Volumen bis 100 m³ · DIBt-Zulassung · Doppelwandig & AwSV-konform"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BulletListEditor
                      label="Normen & Regelwerke"
                      items={editingItem.norms}
                      onChange={(next) => setEditingItem({ ...editingItem, norms: next })}
                      placeholder="z. B. AwSV / WHG"
                    />
                    <BulletListEditor
                      label="Verwendete Werkstoffe"
                      items={editingItem.materialsUsed}
                      onChange={(next) => setEditingItem({ ...editingItem, materialsUsed: next })}
                      placeholder="z. B. PE 100 / PE-HD"
                    />
                  </div>

                  <BulletListEditor
                    label="Leistungsmerkmale & Konstruktionsdetails (grüne Haken)"
                    items={editingItem.highlights}
                    onChange={(next) => setEditingItem({ ...editingItem, highlights: next })}
                    placeholder="z. B. Statische Einzelberechnung für Wind-, Schnee- und Erdbebenlasten"
                  />

                  <BulletListEditor
                    label="Typische Medien & Einsatzbereiche (Chips auf der Detailseite)"
                    items={editingItem.mediaExamples}
                    onChange={(next) => setEditingItem({ ...editingItem, mediaExamples: next })}
                    placeholder="z. B. Salzsäure (HCl)"
                  />

                  <SingleImageUploader
                    label="Hauptbild / Vorschaubild"
                    imageUrl={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeUrl={(url) => setEditingItem({ ...editingItem, image: url })}
                  />

                  <GalleryUploader
                    gallery={editingItem.gallery}
                    mainImage={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeGallery={(next) => setEditingItem({ ...editingItem, gallery: next })}
                    onSetMainImage={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                </>
              )}

              {/* ============================================================= */}
              {/* 3. WERKSTOFFE EDITOR (1:1 mit Website & Detailseite)          */}
              {/* ============================================================= */}
              {editingType === 'werkstoffe' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Kurzzeichen (z. B. PE 100 / PE-HD) *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.code || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Vollständiger Werkstoffname *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        placeholder="z. B. Polyethylen (PE)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Temperaturbereich
                      </label>
                      <input
                        type="text"
                        value={editingItem.temp || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, temp: e.target.value })}
                        placeholder="z. B. -40 °C bis +60 °C"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  {/* Technische Eckdaten (erscheinen im grünen Kasten auf der Werkstoff-Unterseite) */}
                  <div className="bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-4 sm:p-5 space-y-4">
                    <span className="text-xs font-extrabold text-slate-900 block">
                      Technische Werkstoff-Kennwerte (für den Eckdaten-Kasten auf der Website)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Dichte</label>
                        <input
                          type="text"
                          value={editingItem.density || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, density: e.target.value })}
                          placeholder="z. B. 0,95 – 0,96 g/cm³"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Säurebeständigkeit
                        </label>
                        <input
                          type="text"
                          value={editingItem.acids || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, acids: e.target.value })}
                          placeholder="z. B. Sehr gut / Hervorragend"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Laugenbeständigkeit
                        </label>
                        <input
                          type="text"
                          value={editingItem.alkalis || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, alkalis: e.target.value })}
                          placeholder="z. B. Hervorragend"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Schweiß- & Verarbeitungsverfahren
                        </label>
                        <input
                          type="text"
                          value={editingItem.welding || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, welding: e.target.value })}
                          placeholder="z. B. Heizelement-Stumpfschweißen, Extruderschweißen"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Lieferbare Farben
                        </label>
                        <input
                          type="text"
                          value={editingItem.color || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                          placeholder="z. B. Schwarz / Natur"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Kurzbeschreibung (für Übersichts-Kacheln) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editingItem.desc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Ausführliche Werkstoffbeschreibung (auf der Werkstoff-Detailseite)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.longDesc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, longDesc: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <BulletListEditor
                    label="Werkstoff-Vorteile & Eigenschaften (grüne Haken)"
                    items={editingItem.highlights}
                    onChange={(next) => setEditingItem({ ...editingItem, highlights: next })}
                    placeholder="z. B. Allgemeine bauaufsichtliche DIBt-Zulassung für Lagerbehälter"
                  />

                  <BulletListEditor
                    label="Typische Bauteile & Anwendungen (Chips auf der Detailseite)"
                    items={editingItem.applications}
                    onChange={(next) => setEditingItem({ ...editingItem, applications: next })}
                    placeholder="z. B. Chemie-Lagertanks (DIBt)"
                  />

                  <SingleImageUploader
                    label="Hauptbild / Werkstoff-Foto"
                    imageUrl={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeUrl={(url) => setEditingItem({ ...editingItem, image: url })}
                  />

                  <GalleryUploader
                    gallery={editingItem.gallery}
                    mainImage={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeGallery={(next) => setEditingItem({ ...editingItem, gallery: next })}
                    onSetMainImage={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                </>
              )}

              {/* ============================================================= */}
              {/* 4. JOBS EDITOR                                                */}
              {/* ============================================================= */}
              {editingType === 'jobs' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Stellentitel *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. Kunststoffschweißer (m/w/d)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Fachbereich / Abteilung *
                      </label>
                      <select
                        value={editingItem.department || 'Fertigung & Produktion'}
                        onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
                      >
                        {JOB_DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Standort (für Standort-Filter)
                      </label>
                      <select
                        value={editingItem.location || 'Minden'}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
                      >
                        {WEBER_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Anstellungsart
                      </label>
                      <input
                        type="text"
                        value={editingItem.type || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        placeholder="z. B. Vollzeit (38,5 Std./Woche)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Arbeitszeitmodell
                      </label>
                      <input
                        type="text"
                        value={editingItem.schedule || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                        placeholder="z. B. Tagschicht · Keine Rufbereitschaft"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Einleitung / Kurzbeschreibung *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={editingItem.summary || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <BulletListEditor
                    label="Aufgabenbereich (Deine Aufgaben)"
                    items={editingItem.tasks}
                    onChange={(next) => setEditingItem({ ...editingItem, tasks: next })}
                    placeholder="Aufgabe eingeben..."
                  />

                  <BulletListEditor
                    label="Anforderungsprofil (Das bringst du mit)"
                    items={editingItem.profile}
                    onChange={(next) => setEditingItem({ ...editingItem, profile: next })}
                    placeholder="Anforderung eingeben..."
                  />

                  <SingleImageUploader
                    label="Einblick-Foto (wird im Stellen-Detailfenster angezeigt)"
                    imageUrl={editingItem.image}
                    onUploadFile={handleFileUpload}
                    onChangeUrl={(url) => setEditingItem({ ...editingItem, image: url })}
                  />
                </>
              )}

              {/* ============================================================= */}
              {/* 5. AUSBILDUNGEN EDITOR                                        */}
              {/* ============================================================= */}
              {editingType === 'ausbildungen' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Ausbildungsberuf *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Ausbildungsdauer
                      </label>
                      <input
                        type="text"
                        value={editingItem.duration || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Ausbildungsbeginn
                      </label>
                      <input
                        type="text"
                        value={editingItem.start || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, start: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Berufsschule
                      </label>
                      <input
                        type="text"
                        value={editingItem.school || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, school: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Beschreibung
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.summary || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>
                  <BulletListEditor
                    label="Ausbildungsinhalte"
                    items={editingItem.tasks}
                    onChange={(next) => setEditingItem({ ...editingItem, tasks: next })}
                    placeholder="Ausbildungsinhalt eingeben..."
                  />
                </>
              )}

              {/* ============================================================= */}
              {/* 6. DOWNLOADS / PDF EDITOR                                     */}
              {/* ============================================================= */}
              {editingType === 'downloads' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Dokumententitel *
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="z. B. TÜV Zertifikat WHG"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Kategorie *
                      </label>
                      <select
                        value={editingItem.categoryId}
                        onChange={(e) => setEditingItem({ ...editingItem, categoryId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white"
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
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      Untertitel / Beschreibung
                    </label>
                    <input
                      type="text"
                      value={editingItem.subtitle || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Sprache (z. B. DE, EN, PL)
                      </label>
                      <input
                        type="text"
                        value={editingItem.lang || 'DE'}
                        onChange={(e) => setEditingItem({ ...editingItem, lang: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1">
                        Dateigröße / Format (wird beim Upload automatisch erkannt)
                      </label>
                      <input
                        type="text"
                        value={editingItem.fileSize || 'PDF'}
                        onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300"
                      />
                    </div>
                  </div>

                  {/* Foolproof PDF File Upload Box */}
                  <div className="bg-[#FBF9F5] rounded-2xl border border-neutral-200/90 p-5 space-y-3">
                    <label className="block text-xs font-extrabold text-slate-900">
                      PDF-Datei vom Computer hochladen *
                    </label>
                    <label className="w-full rounded-xl border-2 border-dashed border-[#1c5f2e]/40 bg-white hover:bg-emerald-50/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[#0d2a14] text-emerald-300 flex items-center justify-center mb-2">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        PDF-Dokument vom Gerät auswählen oder hierher ziehen
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1">
                        Unterstützt .pdf, .doc, .docx, .zip
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            handleFileUpload(
                              f,
                              (url) => setEditingItem((prev) => ({ ...prev, url })),
                              (meta) =>
                                setEditingItem((prev) => ({
                                  ...prev,
                                  fileSize: meta.formattedSize,
                                  title: prev.title || meta.fileName.replace(/\.[^.]+$/, '')
                                }))
                            );
                          }
                        }}
                      />
                    </label>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Aktuell verknüpfte Datei / URL:
                      </label>
                      <input
                        required
                        type="text"
                        value={editingItem.url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        placeholder="Wird beim Datei-Upload automatisch ausgefüllt..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-xs text-slate-700"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setEditingType(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0d2a14] hover:bg-[#1c5f2e] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Speichern & Live veröffentlichen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
