import React from 'react';
import { Compass, FileText, Check } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const AboutSection: React.FC = () => {
  const bulletItems = [
    {
      lead: 'The Mind as the Irreducible Foundation',
      body: 'You cannot build resilient institutions or high-performing teams on confused thinking. The quality of what we build is shaped by the quality of how we think. Lasting discipline begins within.',
    },
    {
      lead: 'Systems Over Sporadic Hustle',
      body: 'Africa does not lack talent. But talent alone cannot build a continent. We need systems that turn individual effort into consistent results, moving beyond sporadic hustle towards operational clarity and sustainable growth.',
    },
    {
      lead: 'The Power of Building Forward',
      body: 'When we build better people, we build better businesses. Better businesses strengthen communities and institutions. And when these foundations become stronger, we create the conditions for Africa to thrive.',
    },
  ];

  return (
    <section id="foundation" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        14°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 01 · 14°N · FOUNDATION · THE MIND
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Every enduring structure begins with a foundation. Africa's future will not be built <span className="italic text-beacon">by accident</span>.
          </h2>
        </Reveal>

        {/* Crisp Introduction Paragraphs */}
        <Reveal delay={160}>
          <div className="max-w-3xl space-y-4 mb-14">
            <p className="text-xl sm:text-2xl text-cream font-serif italic leading-[1.4] drop-shadow-sm">
              It will be built by people who think clearly, lead intentionally, and build systems that last.
            </p>
            <p className="text-base sm:text-lg text-[#e8ded0] font-normal leading-[1.65] drop-shadow-sm">
              Through data science, business strategy, leadership, and purpose, Dolapo Olutoye explores how we turn ideas into action, replace guesswork with structure, and build things that create lasting impact.
            </p>
          </div>
        </Reveal>

        {/* Two-Column Grid: Bullets & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Bullets */}
          <div className="lg:col-span-7 space-y-7">
            {bulletItems.map((item, idx) => (
              <Reveal key={idx} delay={200 + idx * 80}>
                <div className="flex items-start gap-4 text-left group">
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-beacon font-mono text-xs font-bold group-hover:bg-beacon group-hover:text-black transition-all shadow-md">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-beacon transition-colors">
                      {item.lead}
                    </h3>
                    <p className="text-sm sm:text-base text-[#e2d8cc] leading-[1.6]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Portrait Window */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Reveal delay={280} type="scale">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 bg-black/60 p-3 shadow-2xl relative group backdrop-blur-xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black/70 relative">
                  <img
                    src="/assets/portrait_cover.png"
                    alt="Dolapo Olutoye"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-serif text-white text-lg font-medium drop-shadow-md">Dolapo Olutoye</div>
                    <div className="font-mono text-xs text-beacon uppercase tracking-wider font-semibold">FOUNDER // KINGS CONSULT</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={340}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // KINGS CONSULT ARCHIVES
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "Before you optimize a database or write a strategic plan, you must discipline the cognitive apparatus of the person making the decisions. Order precedes velocity."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 14°N</span>
              <span>ENTRY: 01_FOUNDATION</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
