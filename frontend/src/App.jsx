import React, { Suspense, lazy } from 'react';

import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Eager-load hero (above the fold)
import HeroSection from './sections/HeroSection';

// Lazy-load all below-fold sections for better performance
const AboutSection         = lazy(() => import('./sections/AboutSection'));
const ProblemSection       = lazy(() => import('./sections/ProblemSection'));
const FeaturesSection      = lazy(() => import('./sections/FeaturesSection'));
const ArchitectureSection  = lazy(() => import('./sections/ArchitectureSection'));
const HardwareSection      = lazy(() => import('./sections/HardwareSection'));
const DashboardSection     = lazy(() => import('./sections/DashboardSection'));
const MappingSection       = lazy(() => import('./sections/MappingSection'));
const AlertsSection        = lazy(() => import('./sections/AlertsSection'));
const DeviceManagementSection = lazy(() => import('./sections/DeviceManagementSection'));
const AnalyticsSection     = lazy(() => import('./sections/AnalyticsSection'));
const PredictionSection    = lazy(() => import('./sections/PredictionSection'));
const UseCasesSection      = lazy(() => import('./sections/UseCasesSection'));
const BOMSection           = lazy(() => import('./sections/BOMSection'));
const MarketSection        = lazy(() => import('./sections/MarketSection'));
const TeamSection          = lazy(() => import('./sections/TeamSection'));
const ContactSection       = lazy(() => import('./sections/ContactSection'));

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <LoadingSpinner size="sm" message="" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#020818] text-white">
      <Navbar />

      <main>
        {/* Hero — eager loaded */}
        <HeroSection />

        {/* All other sections — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ArchitectureSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <HardwareSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <DashboardSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <MappingSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AlertsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <DeviceManagementSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <AnalyticsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <PredictionSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <UseCasesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <BOMSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <MarketSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <TeamSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
