import React, { useState, useEffect, useCallback } from 'react';
import { CmsProvider } from './data/cmsStore';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProductsSection from './components/ProductsSection';
import MaterialsSection from './components/MaterialsSection';
import ManufacturingDepth from './components/ManufacturingDepth';
import IndustriesSection from './components/IndustriesSection';
import QualityQuote from './components/QualityQuote';
import ClosingCtaSection from './components/ClosingCtaSection';
import RequestModal from './components/RequestModal';
import Footer from './components/Footer';

import DetailSubpage from './pages/DetailSubpage';
import CompanyPage from './pages/CompanyPage';
import DownloadsPage from './pages/DownloadsPage';
import CareerPage from './pages/CareerPage';
import LegalPage from './pages/LegalPage';
import AdminDashboard from './pages/AdminDashboard';

function AppRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [searchNotification, setSearchNotification] = useState(null);
  
  // Request Modal State & Context Prefill
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState(null);

  const openRequestModal = useCallback((prefillData = null) => {
    setModalPrefill(prefillData || null);
    setIsRequestModalOpen(true);
  }, []);

  const closeRequestModal = useCallback(() => {
    setIsRequestModalOpen(false);
  }, []);

  // Intercept any click to #anfrage across the page (including Hero.jsx) so it cleanly opens the modal
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a[href="#anfrage"], a[href="/#anfrage"]');
      if (anchor) {
        e.preventDefault();
        openRequestModal();
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [openRequestModal]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((target) => {
    if (!target) return;

    // Handle hash links on home or subpages (e.g., '/ueber-uns#standorte' or '/#anfrage')
    const [pathPart, hashPart] = target.split('#');
    const cleanPath = pathPart || '/';

    if (hashPart === 'anfrage') {
      openRequestModal();
      return;
    }

    if (cleanPath !== window.location.pathname) {
      window.history.pushState({}, '', target);
      setCurrentPath(cleanPath);
    } else if (hashPart) {
      window.history.pushState({}, '', target);
    }

    if (hashPart) {
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [openRequestModal]);

  const showNotification = (msg) => {
    setSearchNotification(msg);
    setTimeout(() => setSearchNotification(null), 4000);
  };

  const handleSearchQuery = (query) => {
    const q = query.toLowerCase();
    if (q.includes('karriere') || q.includes('job') || q.includes('stelle') || q.includes('ausbildung')) {
      navigate('/karriere');
      return;
    }
    if (q.includes('download') || q.includes('zertifikat') || q.includes('prospekt') || q.includes('pdf')) {
      navigate('/downloads');
      return;
    }
    if (q.includes('standort') || q.includes('historie') || q.includes('über uns')) {
      navigate('/ueber-uns');
      return;
    }

    // Default: navigate to home section
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      if (q.includes('behaelter') || q.includes('tank') || q.includes('abluft') || q.includes('rohr') || q.includes('produkt')) {
        document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Ergebnisse für „${query}“ unter Produkte.`);
      } else if (q.includes('pe') || q.includes('pp') || q.includes('pvc') || q.includes('pvdf') || q.includes('werkstoff')) {
        document.getElementById('werkstoffe')?.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Werkstoffinformationen für „${query}“ unter Werkstoffe.`);
      } else {
        document.getElementById('anwendungsgebiete')?.scrollIntoView({ behavior: 'smooth' });
        showNotification(`Anwendungsgebiete & Lösungen für „${query}“.`);
      }
    }, 120);
  };

  const handleCategorySelection = (catItem) => {
    if (!catItem) return;
    if (catItem.code) {
      navigate(`/werkstoffe/${catItem.id}`);
    } else if (catItem.specs?.volumen || catItem.specs?.durchmesser) {
      navigate(`/produkte/${catItem.id}`);
    } else if (catItem.id) {
      navigate(`/anwendungsgebiete/${catItem.id}`);
    }
  };

  // Parse current route
  const segments = currentPath.replace(/^\/+|\/+$/g, '').split('/');
  const firstSeg = segments[0] || '';
  const secondSeg = segments[1] || '';

  let pageContent = null;

  if (firstSeg === 'anwendungsgebiete' && secondSeg) {
    pageContent = (
      <DetailSubpage 
        type="anwendungsgebiete" 
        slug={secondSeg} 
        onNavigate={navigate}
        onOpenRequestModal={openRequestModal}
      />
    );
  } else if (firstSeg === 'produkte' && secondSeg) {
    pageContent = (
      <DetailSubpage 
        type="produkte" 
        slug={secondSeg} 
        onNavigate={navigate}
        onOpenRequestModal={openRequestModal}
      />
    );
  } else if (firstSeg === 'werkstoffe' && secondSeg) {
    pageContent = (
      <DetailSubpage 
        type="werkstoffe" 
        slug={secondSeg} 
        onNavigate={navigate}
        onOpenRequestModal={openRequestModal}
      />
    );
  } else if (firstSeg === 'ueber-uns' || firstSeg === 'unternehmen') {
    pageContent = (
      <CompanyPage 
        onNavigate={navigate} 
        onOpenRequestModal={openRequestModal}
      />
    );
  } else if (firstSeg === 'downloads') {
    pageContent = <DownloadsPage onNavigate={navigate} />;
  } else if (firstSeg === 'karriere') {
    pageContent = <CareerPage onNavigate={navigate} />;
  } else if (firstSeg === 'admin') {
    pageContent = <AdminDashboard onNavigate={navigate} />;
  } else if (firstSeg === 'impressum' || firstSeg === 'datenschutz' || firstSeg === 'agb') {
    pageContent = <LegalPage type={firstSeg} onNavigate={navigate} />;
  } else {
    // Homepage View (Hero untouched!)
    pageContent = (
      <>
        {/* 1. Hero (Untouched as requested) */}
        <Hero />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Products (All 11 Products + Subpage Links & Pre-filled Modal Triggers) */}
        <ProductsSection
          onNavigate={navigate}
          onRequestProduct={(prod) => {
            openRequestModal({
              title: prod.title,
              subtitle: prod.subtitle,
              type: 'produkt'
            });
          }}
        />

        {/* 4. Materials (All 7 Materials + Chemical Matrix + Pre-filled Modal Triggers) */}
        <MaterialsSection
          onNavigate={navigate}
          onRequestMaterial={(mat) => {
            openRequestModal({
              title: mat.title || `Werkstoff ${mat.name || mat.code}`,
              type: 'werkstoff'
            });
          }}
        />

        {/* 5. Manufacturing Depth & Welding Facility Minden */}
        <ManufacturingDepth onNavigate={navigate} />

        {/* 6. Industries / Anwendungsgebiete (All 12 Areas + Pre-filled Modal Triggers) */}
        <IndustriesSection
          onNavigate={navigate}
          onSelectIndustry={(ind) => {
            openRequestModal({
              title: ind.title,
              type: 'anwendungsgebiet'
            });
          }}
        />

        {/* 7. Editorial Quality Statement */}
        <QualityQuote onNavigate={navigate} />

        {/* 8. High-End Closing CTA Section with Action Button opening the Modal */}
        <ClosingCtaSection 
          showImage={true}
          onOpenRequestModal={() => openRequestModal()} 
          onNavigate={navigate} 
        />
      </>
    );
  }

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-900 selection:bg-weber-600 selection:text-white">
      {searchNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 animate-in fade-in duration-200">
          {searchNotification}
        </div>
      )}

      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onSearchQuery={handleSearchQuery}
        onSelectCategory={handleCategorySelection}
        onOpenRequestModal={() => openRequestModal()}
      />

      <main className="flex-1">
        {pageContent}
      </main>

      <Footer 
        onNavigate={navigate} 
        onOpenRequestModal={() => openRequestModal()}
      />

      {/* Global Request Modal (Opens with prefilled product/material if triggered from card) */}
      <RequestModal 
        isOpen={isRequestModalOpen} 
        onClose={closeRequestModal} 
        prefill={modalPrefill} 
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppRouter />
    </CmsProvider>
  );
}
