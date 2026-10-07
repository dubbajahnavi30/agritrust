import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { JudgeDemoModal } from './components/modals/JudgeDemoModal';
import { TechnicalViewModal } from './components/modals/TechnicalViewModal';
import { FieldDetailModal } from './components/modals/FieldDetailModal';
import { CropSelectorModal } from './components/modals/CropSelectorModal';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { FieldIntelligencePage } from './components/pages/FieldIntelligencePage';
import { WaterSimulatorPage } from './components/pages/WaterSimulatorPage';
import { DecisionExplanationPage } from './components/pages/DecisionExplanationPage';
import { SensorReliabilityPage } from './components/pages/SensorReliabilityPage';
import { CropHealthPage } from './components/pages/CropHealthPage';
import { WeatherIntelligencePage } from './components/pages/WeatherIntelligencePage';
import { RecommendationsPage } from './components/pages/RecommendationsPage';
import { WhatIfPage } from './components/pages/WhatIfPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { useLanguageSync } from './utils/languageSynchronizer';

const AppContent: React.FC = () => {
  const { activePage, isOffline, isTechnicalView, setIsTechnicalView, language, t } = useFarm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState<boolean>(false);

  // Synchronize entire DOM with current language
  useLanguageSync(language);

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'fields':
        return <FieldIntelligencePage />;
      case 'simulator':
        return <WaterSimulatorPage />;
      case 'explanation':
        return <DecisionExplanationPage />;
      case 'sensors':
        return <SensorReliabilityPage />;
      case 'crops':
        return <CropHealthPage />;
      case 'weather':
        return <WeatherIntelligencePage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'whatif':
        return <WhatIfPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Offline Mode Alert Banner (if offline) */}
      {isOffline && (
        <div className="bg-amber-500 text-stone-950 px-4 py-2 text-xs font-bold text-center border-b border-amber-600 flex items-center justify-center gap-2">
          <span>{t('offlineBannerText')}</span>
        </div>
      )}

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area (offset by 64 (w-64) on lg screens) */}
        <main className="flex-1 lg:pl-64 transition-all duration-300 flex flex-col">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1">
            {renderCurrentPage()}
          </div>
          <Footer />
        </main>
      </div>

      {/* Modals */}
      <JudgeDemoModal />
      <TechnicalViewModal
        isOpen={isTechModalOpen || isTechnicalView}
        onClose={() => {
          setIsTechModalOpen(false);
          setIsTechnicalView(false);
        }}
      />
      <FieldDetailModal />
      <CropSelectorModal />
    </div>
  );
};

export default function App() {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
}
