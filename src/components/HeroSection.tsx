import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, Navigation } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="horizon" className="relative min-h-[92vh] pt-36 pb-24 flex flex-col justify-between overflow-hidden">
      {/* Ghosted Giant Navigational Watermark Numeral */}
      <div className="absolute -top-10 -left-6 font-serif text-[18vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        06°27′N
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Small Mono Uppercase Eyebrow */}
            <Reveal delay={60} type="scale">
              <div className="inline-flex items-center gap-2.5 mb-8 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-beacon animate-ping" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
                  ORIGIN: 06°27′N · STRATEGY · DATA · KEYNOTES
                </span>
              </div>
            </Reveal>

            {/* Giant Serif Headline (Three Lines with Italic Emphasized Word) */}
            <Reveal delay={140}>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.6rem] font-normal leading-[1.04] tracking-tight text-white mb-8">
                Building People.<br />
                Building Businesses.<br />
                <span className="italic text-beacon">
                  Building Purpose.
                </span>
              </h1>
            </Reveal>

            {/* Short, Concise, Punchy Description (Large & Readable) */}
            <Reveal delay={220}>
              <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-10">
                Guiding leaders, ambitious founders, and institutions through modern complexity—illuminating the path toward clarity, structured execution, and lasting impact.
              </p>
            </Reveal>

            {/* Action Buttons: Solid Accent Pill & Secondary Pill */}
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={onOpenBooking}
                  className="px-9 py-4 rounded-full bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-xl shadow-beacon/25 hover:scale-[1.01] active:scale-[0.97] flex items-center gap-2 group cursor-pointer"
                >
                  <span>Work With Dolapo</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                </button>

                <a
                  href="#foundation"
                  className="px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white text-xs sm:text-sm font-mono uppercase tracking-widest btn-press hover:scale-[1.01] active:scale-[0.97] flex items-center gap-2 backdrop-blur-md cursor-pointer"
                >
                  <span>Explore Journey</span>
                  <ArrowDown className="w-4 h-4 text-stone-accent group-hover:translate-y-0.5 transition-transform duration-150" />
                </a>
              </div>
            </Reveal>

            {/* Navigational Meta Coordinates */}
            <Reveal delay={380}>
              <div className="pt-6 border-t border-white/15 w-full max-w-lg flex flex-wrap items-center gap-3 text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
                <span>Kings Consult Lead</span>
                <span className="text-white/20">·</span>
                <span>Data Intelligence</span>
                <span className="text-white/20">·</span>
                <span>3,000+ Equipped</span>
                <span className="text-white/20">·</span>
                <span>Lagos & Global</span>
              </div>
            </Reveal>

          </div>

          {/* Right Column: Beacon Callout */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center pointer-events-none">
            <Reveal delay={450} type="scale">
              <div className="pointer-events-auto p-6 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 max-w-[300px] text-left shadow-2xl">
                <div className="flex items-center gap-2 text-beacon font-mono text-xs tracking-widest uppercase mb-2 font-semibold">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>ACTIVE BEACON 360°</span>
                </div>
                <p className="font-serif text-cream text-base leading-snug mb-3">
                  Move your cursor to swivel the volumetric lighthouse beam across the page.
                </p>
                <span className="font-mono text-xs text-stone-accent uppercase tracking-wider block">
                  WAYPOINT 00 // ORIGIN
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Bottom of Hero: Scroll to Navigate */}
      <div className="w-full text-center relative z-10 pt-6 pb-2">
        <a
          href="#foundation"
          className="inline-flex flex-col items-center gap-2 text-stone-accent hover:text-beacon font-mono text-xs tracking-[0.25em] uppercase transition-colors"
        >
          <span>SCROLL TO NAVIGATE ↓</span>
        </a>
      </div>
    </section>
  );
};
