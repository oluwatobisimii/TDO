import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface LimitationsSectionProps {
  onOpenBooking?: () => void;
}

export const LimitationsSection: React.FC<LimitationsSectionProps> = ({ onOpenBooking }) => {
  const limitations = [
    {
      lead: 'Motivational hype without operational mechanics.',
      body: 'If you want someone to generate a 48-hour adrenaline rush, I am the wrong choice. We construct enduring mental models, repeatable workflows, and structural discipline.',
      linkText: 'Explore systems methodology',
      linkHref: '#foundation',
    },
    {
      lead: 'Recycled cookie-cutter slide decks.',
      body: 'I do not present generic templates. Every keynote address and advisory sprint begins with an unvarnished diagnostic of your unique constraints and team capabilities.',
      linkText: 'View keynote dossiers',
      linkHref: '#keynotes',
    },
    {
      lead: 'Passive advisory without leadership ownership.',
      body: 'Transformation cannot be outsourced to a consultant while executives remain detached. We partner exclusively with leaders committed to stewarding the necessary changes.',
      linkText: 'Review engagement protocol',
      linkHref: '#roadmap',
    },
    {
      lead: 'Theoretical playbooks disconnected from African reality.',
      body: 'Silicon Valley dogma frequently fails when confronting local infrastructure frictions and currency volatility. Our frameworks are stress-tested for frontier operational realities.',
      linkText: 'Read discourse on Africa & systems',
      linkHref: '#discourse',
    },
    {
      lead: 'Value-misaligned commercial arrangements.',
      body: 'I do not accept engagements where revenue compromises character, human dignity, or ethical conviction. Alignment of purpose is a non-negotiable prerequisite.',
      linkText: 'Initiate a dialogue',
      linkHref: '#contact',
    },
  ];

  return (
    <section id="limitations" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        86°N
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 08 · 86°N · RADICAL BOUNDARIES
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 drop-shadow-md">
            What I can't reach — and what I <span className="italic text-beacon">don't do</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Clarity means knowing what to decline. To protect the depth, rigor, and measurable impact of every engagement, here are our explicit boundaries.
          </p>
        </Reveal>

        {/* Vertical List of Five Items with Tilde Markers and Hairline Rules */}
        <div className="border-t border-white/20 divide-y divide-white/15">
          {limitations.map((item, idx) => (
            <Reveal key={idx} delay={180 + idx * 60}>
              <div className="py-7 sm:py-9 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group">
                {/* Tilde Marker */}
                <div className="font-mono text-beacon text-xl sm:text-2xl font-bold select-none shrink-0 w-6">
                  ~
                </div>

                {/* Content Block */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-sans text-lg sm:text-xl font-semibold text-white group-hover:text-beacon transition-colors drop-shadow-sm">
                    {item.lead}
                  </h3>
                  <p className="text-base text-[#e2d8cc] leading-[1.65]">
                    {item.body}
                  </p>
                  <div className="pt-2">
                    <a
                      href={item.linkHref}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-accent hover:text-beacon uppercase tracking-wider transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
