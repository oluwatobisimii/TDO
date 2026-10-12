import React from 'react';
import { ArrowUpRight, Sparkles, Mail, Mic, Briefcase } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="relative py-32 sm:py-48 overflow-hidden text-center">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        PORT
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              DESTINATION · SAFE HARBOUR · ENGAGEMENT
            </span>
          </div>
        </Reveal>

        {/* Centred Large Translucent Bubble with Monogram */}
        <Reveal delay={80} type="scale">
          <div className="relative mb-12 group">
            <div className="absolute inset-0 rounded-full bg-beacon/20 blur-3xl scale-125 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-black/60 border border-white/25 backdrop-blur-2xl flex flex-col items-center justify-center p-6 shadow-2xl relative z-10 hover:border-beacon/60 transition-all duration-500">
              <div className="w-14 h-14 mb-3 filter invert opacity-95">
                <img
                  src="/assets/lighthouse_monogram.svg"
                  alt="Lighthouse Monogram"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-bold">
                SAFE HARBOUR
              </span>
              <span className="font-serif italic text-white text-sm mt-1 text-center opacity-90 drop-shadow-sm">
                Ready to build?
              </span>
            </div>
          </div>
        </Reveal>

        {/* Big Serif Headline with Italic Accent */}
        <Reveal delay={160}>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-[5.2rem] font-normal leading-[1.06] text-white tracking-tight mb-6 max-w-3xl">
            Let’s build something <br className="hidden sm:inline" />
            <span className="italic text-beacon">
              that matters
            </span>.
          </h2>
        </Reveal>

        {/* Short, Concise Paragraph */}
        <Reveal delay={240}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-12">
            Whether organizing an executive convention, restructuring enterprise operations, or hosting a leadership masterclass—let's eliminate ambiguity together.
          </p>
        </Reveal>

        {/* Solid Accent Action Pill Button */}
        <Reveal delay={300} type="scale">
          <div className="mb-10">
            <button
              onClick={onOpenBooking}
              className="px-10 sm:px-12 py-5 sm:py-6 rounded-full bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-2xl shadow-beacon/30 hover:scale-[1.02] active:scale-[0.97] flex items-center gap-3 mx-auto group cursor-pointer"
            >
              <span>Work With Dolapo</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </button>
          </div>
        </Reveal>

        {/* Row of Three Ghost Pill Buttons */}
        <Reveal delay={360}>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 text-white transition-all flex items-center gap-2 backdrop-blur-md shadow-md btn-press cursor-pointer"
            >
              <Mic className="w-4 h-4 text-beacon" />
              <span>Invite to Speak</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 text-white transition-all flex items-center gap-2 backdrop-blur-md shadow-md btn-press cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-beacon" />
              <span>Enterprise Advisory</span>
            </button>

            <a
              href="mailto:Dolapoolutoye@gmail.com"
              className="px-6 py-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/40 text-white transition-all flex items-center gap-2 backdrop-blur-md shadow-md btn-press cursor-pointer"
            >
              <Mail className="w-4 h-4 text-beacon" />
              <span>Direct Email</span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
