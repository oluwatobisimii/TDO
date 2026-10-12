import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { LighthouseCanvas } from './components/three/LighthouseCanvas';
import { MacMenubar } from './components/MacMenubar';
import { DepthRuler } from './components/DepthRuler';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { IdeasSection } from './components/IdeasSection';
import { ShortsSection } from './components/ShortsSection';
import { SpeakingSection } from './components/SpeakingSection';
import { ImpactSection } from './components/ImpactSection';
import { TrustGrid } from './components/TrustGrid';
import { LimitationsSection } from './components/LimitationsSection';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LighthouseLoader } from './components/LighthouseLoader';
import { BlogBuilderModal } from './components/BlogBuilderModal';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'speaking' | 'consulting' | 'general'>('general');
  const [currentCoord, setCurrentCoord] = useState<{ lat: string; bearing: string; waypoint: string }>({
    lat: "06°27.4'N",
    bearing: "042° NE",
    waypoint: "WP.00",
  });

  // URL Route Detection for Admin (#admin, #login, /admin) + Keyboard Shortcut
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#login' || path === '/admin') {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash.toLowerCase() === '#admin' || window.location.hash.toLowerCase() === '#login') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Initialize Lenis Smooth Inertial Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (type: 'speaking' | 'consulting' | 'general' = 'general') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen text-cream relative selection:bg-beacon selection:text-black bg-gradient-to-b from-[#0c101a] via-[#091b26] via-[#081524] via-[#050d18] to-[#03060c]">
      {/* 2-Second Architectural Lighthouse Web Loading Animation */}
      <LighthouseLoader durationMs={2000} />

      {/* 3D WebGL Architectural Lighthouse Canvas with Real-time Cursor Reaction & Volumetric Beam */}
      <LighthouseCanvas />

      {/* Atmospheric Vignette framing page edges without dimming the 3D lighthouse scene */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,6,12,0.45)_100%)]" />

      {/* Slim macOS-Style Menubar Nav at the Top with Nautical Telemetry */}
      <MacMenubar
        currentCoord={currentCoord}
        onOpenBooking={() => handleOpenBooking('general')}
      />

      {/* Vertical Nautical Coordinate Gauge with Live Latitude & Bearing Readout at Right Edge */}
      <DepthRuler onCoordinateChange={setCurrentCoord} />

      {/* Main Single-Page Journey with Continuous Atmosphere & Editorial Rhythm */}
      <main className="relative z-10">
        {/* WP.00 / 06°27′N: Hero / Origin */}
        <HeroSection onOpenBooking={() => handleOpenBooking('general')} />

        {/* WP.01 / 14°N: Foundation / The Mind */}
        <AboutSection />

        {/* WP.02 / 28°N: The Five Pillars */}
        <WhatIDoSection
          onSelectService={(service) => {
            const type = service.toLowerCase().includes('speaking')
              ? 'speaking'
              : 'consulting';
            handleOpenBooking(type);
          }}
        />

        {/* WP.03 / 42°N: Ideas Worth Building / Discourse */}
        <IdeasSection />

        {/* WP.04 / 56°N: YouTube Shorts & Broadcast Dispatches */}
        <ShortsSection />

        {/* WP.05 / 68°N: Keynotes & Conventions */}
        <SpeakingSection onOpenBooking={() => handleOpenBooking('speaking')} />

        {/* WP.06 / 75°N: Systems & Proof of Impact */}
        <ImpactSection />

        {/* WP.07 / 82°N: Principles & Governance Trust Grid */}
        <TrustGrid />

        {/* WP.08 / 86°N: Honest Boundaries ("What I Can't Reach") */}
        <LimitationsSection onOpenBooking={() => handleOpenBooking('general')} />

        {/* WP.09 / 88°N: Four-Step Protocol */}
        <ProcessSection onOpenBooking={() => handleOpenBooking('general')} />

        {/* WP.10 / 90°N: Common Questions (FAQ Accordion) */}
        <FaqSection />

        {/* PORT: Safe Harbour / Final CTA */}
        <FinalCtaSection onOpenBooking={() => handleOpenBooking('general')} />
      </main>

      {/* Return to Origin & Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Interactive Engagement / Booking Slide-Over Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
      />

      {/* Admin Blog Builder Studio Modal (Opens on /#admin, /admin, or Cmd+Shift+B) */}
      <BlogBuilderModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  );
}

export default App;
