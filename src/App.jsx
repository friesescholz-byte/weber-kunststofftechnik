import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProductsSection from './components/ProductsSection';
import MaterialsSection from './components/MaterialsSection';
import ManufacturingDepth from './components/ManufacturingDepth';
import IndustriesSection from './components/IndustriesSection';
import QualityQuote from './components/QualityQuote';
import RequestSection from './components/RequestSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedPrefill, setSelectedPrefill] = useState(null);
  const [searchNotification, setSearchNotification] = useState(null);

  const handleSearchQuery = (query) => {
    const q = query.toLowerCase();
    
    // Jump cleanly to matching section
    if (q.includes('behaelter') || q.includes('tank') || q.includes('abluft') || q.includes('rohr') || q.includes('produkt')) {
      document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' });
      showNotification(`Ergebnisse für „${query}“ unter Produkte.`);
    } else if (q.includes('pe') || q.includes('pp') || q.includes('pvc') || q.includes('pvdf') || q.includes('werkstoff') || q.includes('säure') || q.includes('lauge')) {
      document.getElementById('werkstoffe')?.scrollIntoView({ behavior: 'smooth' });
      showNotification(`Werkstoffinformationen für „${query}“ unter Werkstoffe.`);
    } else if (q.includes('fertigung') || q.includes('schweiß') || q.includes('qualität') || q.includes('dibt') || q.includes('awsv')) {
      document.getElementById('fertigung')?.scrollIntoView({ behavior: 'smooth' });
      showNotification(`Informationen zu Fertigung & Qualität.`);
    } else {
      document.getElementById('anwendungsgebiete')?.scrollIntoView({ behavior: 'smooth' });
      showNotification(`Branchen & Einsatzbereiche für „${query}“.`);
    }
  };

  const showNotification = (msg) => {
    setSearchNotification(msg);
    setTimeout(() => setSearchNotification(null), 4000);
  };

  const handleCategorySelection = (catItem) => {
    setSelectedPrefill(catItem);
    if (catItem.id && (catItem.id.includes('behaelter') || catItem.id.includes('abluft') || catItem.id.includes('montage'))) {
      document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' });
    } else if (catItem.temp) {
      document.getElementById('werkstoffe')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('anwendungsgebiete')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FBF9F5] text-slate-900 selection:bg-weber-600 selection:text-white">
      
      {/* Discreet Search Notification if searched */}
      {searchNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 animate-in fade-in duration-200">
          {searchNotification}
        </div>
      )}

      {/* Clean Header with Lupe */}
      <Header 
        onSearchQuery={handleSearchQuery}
        onSelectCategory={handleCategorySelection}
      />

      <main className="flex-1">
        {/* 1. Hero (Monumental, clean, no search box in hero) */}
        <Hero />

        {/* 2. Trust Bar (Quiet metrics) */}
        <TrustBar />

        {/* 3. Products (4 Main Cards + List) */}
        <ProductsSection 
          onRequestProduct={(prod) => {
            setSelectedPrefill(prod);
            document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Materials (Clear reference grid) */}
        <MaterialsSection 
          onRequestMaterial={(mat) => {
            setSelectedPrefill(mat);
            document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. Manufacturing & Welding Facility */}
        <ManufacturingDepth />

        {/* 6. Industries (Clean 3-column overview) */}
        <IndustriesSection 
          onSelectIndustry={(ind) => {
            setSelectedPrefill(ind);
            document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Editorial Statement */}
        <QualityQuote />

        {/* 8. B2B Specification & Contact */}
        <RequestSection prefilledData={selectedPrefill} />
      </main>

      {/* 9. Minimalist Footer */}
      <Footer onSelectCategory={handleCategorySelection} />

    </div>
  );
}
