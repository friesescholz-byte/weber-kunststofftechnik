import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ANWENDUNGSGEBIETE,
  PRODUKTE,
  WERKSTOFFE,
  INITIAL_JOBS,
  INITIAL_AUSBILDUNGEN,
  INITIAL_DOWNLOAD_CATEGORIES,
  INITIAL_DOWNLOADS,
} from './weberData';

const STORAGE_KEY = 'weber_cms_state_v2';

const CmsContext = createContext(null);

function normalizeCategories(cats) {
  if (!Array.isArray(cats)) return INITIAL_DOWNLOAD_CATEGORIES;
  return cats.map((c) => ({
    ...c,
    title: c.title || c.name || (c.id === 'prospekte' ? 'Prospekte' : c.id === 'dokumente' ? 'Dokumente & Zertifikate' : 'Herstelleranweisungen'),
    name: c.name || c.title || (c.id === 'prospekte' ? 'Prospekte' : c.id === 'dokumente' ? 'Dokumente & Zertifikate' : 'Herstelleranweisungen'),
  }));
}

function getDefaultState() {
  return {
    anwendungsgebiete: ANWENDUNGSGEBIETE,
    produkte: PRODUKTE,
    werkstoffe: WERKSTOFFE,
    jobs: INITIAL_JOBS,
    ausbildungen: INITIAL_AUSBILDUNGEN,
    downloadCategories: normalizeCategories(INITIAL_DOWNLOAD_CATEGORIES),
    downloads: INITIAL_DOWNLOADS,
  };
}

export function CmsProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...getDefaultState(),
          ...parsed,
          downloadCategories: normalizeCategories(parsed.downloadCategories || INITIAL_DOWNLOAD_CATEGORIES),
        };
      }
    } catch (_) {}
    return getDefaultState();
  });

  const [syncStatus, setSyncStatus] = useState('idle');

  // Beim Start prüfen, ob auf dem Plesk-/Server-Backend bereits ein neuerer Stand liegt
  useEffect(() => {
    let mounted = true;
    fetch('/api/cms', { method: 'GET', headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (mounted && json && json.success && json.data) {
          setState((prev) => {
            const merged = { ...prev, ...json.data };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch (_) {}
            return merged;
          });
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback((nextState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (_) {}

    setSyncStatus('saving');
    fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: nextState }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then(() => setSyncStatus('saved'))
      .catch(() => setSyncStatus('local_only'));
  }, []);

  const updateCollection = useCallback(
    (key, updater) => {
      setState((prev) => {
        const nextItems = typeof updater === 'function' ? updater(prev[key]) : updater;
        const nextState = { ...prev, [key]: nextItems };
        persist(nextState);
        return nextState;
      });
    },
    [persist]
  );

  const resetToFactoryDefaults = useCallback(() => {
    const defaults = getDefaultState();
    setState(defaults);
    persist(defaults);
  }, [persist]);

  // Hilfsfunktion: Datei (PDF oder Bild) auf Plesk hochladen oder als Data-URL verarbeiten
  const uploadFile = useCallback(async (file) => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/cms', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && json.url) {
          return json.url;
        }
      }
    } catch (_) {}

    // Fallback für Vorschau/Browser ohne PHP-Upload: als Data-URL / Blob-URL bereitstellen
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(URL.createObjectURL(file));
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <CmsContext.Provider
      value={{
        ...state,
        syncStatus,
        updateCollection,
        resetToFactoryDefaults,
        uploadFile,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return ctx;
}
