import React, { useState } from 'react';
import { Compass, BookOpen, ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const IdeasSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Systems & Africa',
    'Strategy & Execution',
    'Leadership & Character',
  ];

  const ideas = [
    {
      id: 1,
      title: 'People Build Systems. Systems Build Nations.',
      category: 'Systems & Africa',
      readTime: '4 min',
      excerpt: 'Enduring institutions are never accidental. Nations rise when disciplined people erect transparent, repeatable systems that outlive political personalities.',
      takeaway: 'Institutions outlast charisma. Build the tracks before running the train.',
    },
    {
      id: 2,
      title: 'Africa Doesn’t Have a Talent Problem. It Has a Systems Problem.',
      category: 'Systems & Africa',
      readTime: '5 min',
      excerpt: 'Raw talent is abundant across the continent. What is missing are predictable rails, distribution pipelines, and governance mechanisms that scale talent.',
      takeaway: 'Talent without systemic rails produces frustration, not prosperity.',
    },
    {
      id: 3,
      title: 'Your Potential Is Not Your Achievement.',
      category: 'Leadership & Character',
      readTime: '3 min',
      excerpt: 'Potential is merely stored capacity. Unapplied, it turns into regret. The bridge between raw gifts and lasting impact is non-negotiable daily execution.',
      takeaway: 'Stop romanticizing what you could do. Measure what you ship.',
    },
    {
      id: 4,
      title: 'Stop Being Busy. Start Being Productive.',
      category: 'Strategy & Execution',
      readTime: '4 min',
      excerpt: 'Activity is often an emotional coping mechanism for lack of strategic focus. High-leverage leaders ruthlessly eliminate vanity tasks.',
      takeaway: 'Efficiency is doing things right; effectiveness is doing the right things.',
    },
  ];

  const filteredIdeas =
    activeCategory === 'All'
      ? ideas
      : ideas.filter((idea) => idea.category === activeCategory);

  return (
    <section id="discourse" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        42°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 03 · 42°N · INTELLECT & DISCOURSE
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Ideas worth <span className="italic text-beacon">building</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-12 drop-shadow-sm">
            Perspectives on enterprise architectures, technological leaps, disciplined leadership, and faith in the marketplace.
          </p>
        </Reveal>

        {/* Category Pills */}
        <Reveal delay={220}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider btn-press active:scale-[0.96] cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-beacon text-black font-bold shadow-md shadow-beacon/25 scale-[1.01]'
                    : 'bg-black/40 hover:bg-black/70 text-stone-accent hover:text-white border border-white/15 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 2-Column Uncrowded Card Grid (Large & Readable) */}
        <Reveal delay={200}>
          <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredIdeas.map((idea, idx) => (
              <div
                key={idea.id}
                style={{ animationDelay: `${idx * 70}ms` }}
                className="tab-pane-enter h-full"
              >
                <div
                  className="p-8 sm:p-9 rounded-3xl bg-black/60 hover:bg-black/75 border border-white/15 hover:border-beacon/40 card-press flex flex-col justify-between group backdrop-blur-xl shadow-xl h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 font-mono text-[11px] tracking-widest uppercase text-beacon font-semibold">
                        {idea.category}
                      </span>
                      <span className="font-mono text-xs text-[#d6cebe]">
                        {idea.readTime} read
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3 group-hover:text-beacon transition-colors leading-snug drop-shadow-sm">
                      {idea.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#e2d8cc] leading-[1.65] mb-6">
                      {idea.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15">
                    <div className="font-serif italic text-amber-300 text-xs sm:text-sm">
                      "{idea.takeaway}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={340}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // THE POWER OF PARADIGMS
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "You cannot solve systemic underdevelopment with superficial enthusiasm. Thought leadership is only valuable when it equips people with cognitive tools to make higher-quality decisions under pressure."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 42°N</span>
              <span>TOPIC: COGNITIVE ARCHITECTURE</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
