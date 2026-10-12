import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How far in advance should we book Dolapo for a keynote?',
      a: 'We recommend securing dates 6 to 12 weeks in advance for annual conventions and international summits. Expedited requests are evaluated based on current advisory schedules.',
    },
    {
      q: 'Does Dolapo work with early-stage startups or only enterprises?',
      a: 'Both. Through Kings Consult, Dolapo advises select venture-backed founders on unit economic validation and operational foundations, while delivering systems restructuring for enterprise clients.',
    },
    {
      q: 'Can keynote presentations and masterclasses be customized?',
      a: 'Every keynote is bespoke. Prior to the event, Dolapo conducts an executive briefing to diagnose your team’s immediate pressures, ensuring frameworks directly resolve real bottlenecks.',
    },
    {
      q: 'What engagement formats are supported?',
      a: 'Engagements are delivered globally in-person across Lagos, London, and international capitals, as well as virtually via high-definition broadcast setups.',
    },
    {
      q: 'What deliverables are produced after an advisory engagement?',
      a: 'Clients receive a comprehensive Systems Blueprint, workflow schematics, internal training recordings, KPI scorecards, and a scheduled 60-day governance review.',
    },
    {
      q: 'How does faith and purpose integrate with commercial strategy?',
      a: 'Faith serves as the moral foundation for character, stewardship, and ethical resilience. In secular corporate contexts, this translates into rigorous integrity; in faith forums, it bridges purpose with technical excellence.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        90°N
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 10 · 90°N · INQUIRIES & PERSPECTIVES
            </span>
          </div>
        </Reveal>

        {/* Big Serif Headline */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 drop-shadow-md">
            Common <span className="italic text-beacon">questions</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Direct answers regarding keynote speaking, strategic consulting, executive training cohorts, and scheduling.
          </p>
        </Reveal>

        {/* Full-Width Accordion Rows */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={180 + idx * 50}>
                <div
                  className="rounded-3xl bg-black/60 hover:bg-black/75 border border-white/15 transition-all duration-300 overflow-hidden backdrop-blur-xl shadow-md"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left py-6 sm:py-7 px-6 sm:px-8 flex items-center justify-between gap-6 cursor-pointer select-none group"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-beacon transition-colors drop-shadow-sm">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 text-stone-accent group-hover:text-beacon transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-beacon' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-250 ease-emil-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-6 sm:px-8 pb-7 pt-2 border-t border-white/15 text-[#f3ece2] text-base sm:text-lg leading-[1.7] font-normal transition-opacity duration-200 ${
                          isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
