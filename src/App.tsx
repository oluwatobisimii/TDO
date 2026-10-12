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

// Dedicated Sub-Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminBlogEditorPage } from './pages/AdminBlogEditorPage';
import { BlogReaderPage } from './pages/BlogReaderPage';
import { isAuthenticated, logoutAdmin } from './utils/auth';

type RouteState =
  | { type: 'home' }
  | { type: 'admin-login' }
  | { type: 'admin-dashboard' }
  | { type: 'admin-create' }
  | { type: 'admin-edit'; blogId: string }
  | { type: 'blog'; slug: string };

export function App() {
  const [route, setRoute] = useState<RouteState>({ type: 'home' });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'speaking' | 'consulting' | 'general'>('general');
  const [currentCoord, setCurrentCoord] = useState<{ lat: string; bearing: string; waypoint: string }>({
    lat: "06°27.4'N",
    bearing: "042° NE",
    waypoint: "WP.00",
  });

  // Client-Side Route Resolution
  const resolveRoute = (): RouteState => {
    const hash = window.location.hash;
    const path = window.location.pathname;

    // Check Blog Reader Route: #/blog/:slug or /blog/:slug
    if (hash.startsWith('#/blog/') || hash.startsWith('#blog/')) {
      const slug = hash.replace(/^#\/?blog\//, '').split('?')[0];
      if (slug) return { type: 'blog', slug };
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace(/^\/blog\//, '').split('?')[0];
      if (slug) return { type: 'blog', slug };
    }

    // Check Admin Sub-routes
    const isAdmin = hash.includes('admin') || path.includes('admin');
    if (isAdmin) {
      const authed = isAuthenticated();

      // Create Route: #/admin/create or /admin/create
      if (hash.includes('admin/create') || path.includes('admin/create')) {
        return authed ? { type: 'admin-create' } : { type: 'admin-login' };
      }

      // Edit Route: #/admin/edit/:id or /admin/edit/:id
      const editMatch = hash.match(/admin\/edit\/([^/?]+)/) || path.match(/admin\/edit\/([^/?]+)/);
      if (editMatch && editMatch[1]) {
        return authed ? { type: 'admin-edit', blogId: editMatch[1] } : { type: 'admin-login' };
      }

      // Dashboard Route: #/admin/dashboard or /admin/dashboard
      if (hash.includes('admin/dashboard') || path.includes('admin/dashboard')) {
        return authed ? { type: 'admin-dashboard' } : { type: 'admin-login' };
      }

      // Default Admin Route: #/admin or /admin
      return authed ? { type: 'admin-dashboard' } : { type: 'admin-login' };
    }

    return { type: 'home' };
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(resolveRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    // Global shortcut Cmd+Shift+B / Ctrl+Shift+B to jump to Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        window.location.hash = isAuthenticated() ? '#/admin/dashboard' : '#/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize Lenis Smooth Scroll only for the home portfolio page
  useEffect(() => {
    if (route.type !== 'home') return;

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
  }, [route.type]);

  const navigateTo = (newHash: string) => {
    window.location.hash = newHash;
  };

  const handleOpenBooking = (type: 'speaking' | 'consulting' | 'general' = 'general') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  // -------------------------------------------------------------
  // RENDER DEDICATED PAGES
  // -------------------------------------------------------------

  // 1. Admin Login Page
  if (route.type === 'admin-login') {
    return (
      <AdminLoginPage
        onSuccess={() => navigateTo('#/admin/dashboard')}
        onBackToHome={() => navigateTo('#/')}
      />
    );
  }

  // 2. Admin Dashboard Page
  if (route.type === 'admin-dashboard') {
    return (
      <AdminDashboardPage
        onCreateNew={() => navigateTo('#/admin/create')}
        onEditBlog={(id) => navigateTo(`#/admin/edit/${id}`)}
        onViewBlog={(slug) => navigateTo(`#/blog/${slug}`)}
        onBackToHome={() => navigateTo('#/')}
        onLogout={() => {
          logoutAdmin();
          navigateTo('#/admin');
        }}
      />
    );
  }

  // 3. Admin Create Blog Page
  if (route.type === 'admin-create') {
    return (
      <AdminBlogEditorPage
        mode="create"
        onSaveSuccess={() => navigateTo('#/admin/dashboard')}
        onCancel={() => navigateTo('#/admin/dashboard')}
      />
    );
  }

  // 4. Admin Edit Blog Page
  if (route.type === 'admin-edit') {
    return (
      <AdminBlogEditorPage
        mode="edit"
        blogId={route.blogId}
        onSaveSuccess={() => navigateTo('#/admin/dashboard')}
        onCancel={() => navigateTo('#/admin/dashboard')}
      />
    );
  }

  // 5. Dedicated Blog Reader Page
  if (route.type === 'blog') {
    return (
      <BlogReaderPage
        slug={route.slug}
        onBackToHome={() => navigateTo('#discourse')}
        onSelectOtherPost={(otherSlug) => navigateTo(`#/blog/${otherSlug}`)}
      />
    );
  }

  // -------------------------------------------------------------
  // RENDER MAIN HOMEPAGE (LANDING PORTFOLIO)
  // -------------------------------------------------------------
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

        {/* WP.03 / 42°N: Ideas Worth Building / Discourse (Horizontal Scroll Track) */}
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
    </div>
  );
}

export default App;
