import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface LimitationsSectionProps {
  onOpenBooking?: () => void;
}

export const LimitationsSection: React.FC<LimitationsSectionProps> = ({ onOpenBooking }) => {
  const limitations = [
    {
      num: '01',
      category: 'HYPE WITHOUT SUBSTANCE',
      lead: 'Motivation without a mechanism.',
      body: 'Inspiration can start the journey, but it cannot replace the work. I believe in ideas that translate into action, practical systems, and habits that sustain progress long after the initial excitement fades.',
      linkText: 'Explore systems methodology',
      linkHref: '#foundation',
    },
    {
      num: '02',
      category: 'TEMPLATES WITHOUT THOUGHT',
      lead: 'Generic solutions to specific problems.',
      body: 'Every business, team, and audience has its own context. Whether developing a strategy, delivering a keynote, or creating content, I believe in understanding the problem before prescribing the solution.',
      linkText: 'View keynote dossiers',
      linkHref: '#keynotes',
    },
    {
      num: '03',
      category: 'ADVICE WITHOUT OWNERSHIP',
      lead: 'Recommendations without responsibility.',
      body: 'Progress requires more than good advice. It requires people willing to make decisions, take ownership, and do the work. I value partnerships where insight is matched by commitment and execution.',
      linkText: 'Review engagement protocol',
      linkHref: '#roadmap',
    },
    {
      num: '04',
      category: 'THEORY WITHOUT CONTEXT',
      lead: 'Imported thinking without local understanding.',
      body: 'What works in one market may fail in another. Effective strategies must account for the people, infrastructure, economics, and realities of the environment in which they operate. African challenges deserve context-aware solutions, not blind imitation.',
      linkText: 'Read discourse on Africa & systems',
      linkHref: '#discourse',
    },
    {
      num: '05',
      category: 'SUCCESS WITHOUT PRINCIPLE',
      lead: 'Commercial gain at the expense of character.',
      body: 'Not every opportunity is worth pursuing. I believe sustainable success must be built on integrity, respect for human dignity, and a clear sense of purpose. Growth matters, but how we achieve it matters just as much.',
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

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 08 · 86°N · RADICAL BOUNDARIES & CONVICTIONS
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            What I stand for. What I <span className="italic text-beacon">stand against</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-3xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Clarity requires boundaries. Not every opportunity deserves a yes, and not every solution creates lasting value. These are the principles that shape the work I take on, the partnerships I build, and the impact I pursue.
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
                <div className="flex-1 space-y-2.5">
                  <div className="font-mono text-xs uppercase tracking-widest text-beacon font-semibold">
                    {item.num} — {item.category}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:text-beacon transition-colors drop-shadow-sm">
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
