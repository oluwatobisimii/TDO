import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnet } from './reactbits/Magnet';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'What I Do', href: '#what-i-do' },
    { name: 'Ideas', href: '#ideas' },
    { name: 'Speaking', href: '#speaking' },
    { name: 'Impact', href: '#impact' },
    { name: 'Media', href: '#media' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/80 backdrop-blur-xl border-b border-surface-border/60 py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border p-1.5 flex items-center justify-center group-hover:border-beacon/50 transition-colors">
            <img
              src="/assets/lighthouse_monogram.svg"
              alt="Dolapo Olutoye Monogram"
              className="w-full h-full object-contain filter invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif tracking-tight text-cream group-hover:text-white text-base sm:text-lg font-semibold transition-colors">
              The Dolapo Olutoye
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-stone-accent">
              Building Purpose
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono text-stone-accent hover:text-cream transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-beacon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Magnet strength={0.25} className="hidden sm:inline-block">
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-mono font-medium border border-beacon/30 hover:border-beacon bg-surface hover:bg-surface-elevated text-cream transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-beacon animate-ping" />
              <span>Work With Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-beacon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Magnet>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream p-2 rounded-lg bg-surface border border-surface-border"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-2xl border-b border-surface-border px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest uppercase text-stone-accent hover:text-cream py-1 border-b border-surface-border/40"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 w-full py-3 bg-beacon text-black text-xs font-mono font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2"
            >
              Work With Me
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
