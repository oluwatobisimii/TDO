import React, { useState } from 'react';
import { Mic, GraduationCap, LineChart, Video, Compass, ArrowUpRight, Check, FileText } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { SegmentedTabs } from './ui/SegmentedTabs';

interface WhatIDoSectionProps {
  onSelectService: (service: string) => void;
}

export const WhatIDoSection: React.FC<WhatIDoSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      num: '01',
      title: 'Speaking & Keynotes',
      tagline: 'High-conviction, perspective-shifting keynotes.',
      desc: 'Sharp, intellectually grounded addresses on business systems, technological discipline, and personal purpose across summits and conventions.',
      deliverables: [
        'Corporate Executive Keynotes',
        'Tech Innovation & African Summits',
        'Youth Leadership & University Conclaves',
        'High-Stakes Firesides & Panels',
      ],
      impact: '1,500+ attendees per convention with enduring clarity.',
    },
    {
      num: '02',
      title: 'Education & Training',
      tagline: 'Practical capability building for teams and builders.',
      desc: 'Equipping organizations and practitioners with market-ready skills in predictive analytics, strategic thinking, and high-performance workflows.',
      deliverables: [
        'Data Strategy & Analytics Bootcamps',
        'Executive Leadership Masterclasses',
        'Operational Workflow Design Sprints',
        'Enterprise Upskilling Curricula',
      ],
      impact: '3,000+ professionals equipped across corporate cohorts.',
    },
    {
      num: '03',
      title: 'Business & Strategy',
      tagline: 'Turning ambition into structured, repeatable action.',
      desc: 'Guiding founders and executive teams from frantic hustle to structured operational engines, unit economic validation, and governance.',
      deliverables: [
        'Operational Architecture & Audits',
        'Commercial Strategy Formulation',
        'Unit Economic Modeling & Validation',
        'Early-Stage Advisory & Boardroom Counsel',
      ],
      impact: '50+ advisory and research sprints executed.',
    },
    {
      num: '04',
      title: 'Content & Media',
      tagline: 'Creating ideas that challenge and equip.',
      desc: 'Distilling high-level mental models and cultural critiques into sharp video essays, YouTube Shorts, Instagram Reels, and written articles.',
      deliverables: [
        'Video Essays & Strategic Breakdowns',
        'YouTube Shorts, Instagram Reels & Executive Frameworks',
        'Keynote Transcripts & Systems Essays',
        'Broadcast Dialogues & Podcasts',
      ],
      impact: 'Dozens of broadcasts equipping builders globally.',
    },
    {
      num: '05',
      title: 'Leadership & Purpose',
      tagline: 'Equipping builders to lead with character and conviction.',
      desc: 'One-on-one executive mentorship for leaders carrying significant weight, ensuring commercial ambition is anchored in timeless purpose.',
      deliverables: [
        'Founder & Executive Mentorship',
        'Emerging Leaders Accelerator',
        'Values & Organizational Culture Alignment',
        'Purpose-Driven Career Navigation',
      ],
      impact: 'Direct counsel to senior leaders across tech and finance.',
    },
  ];

  const pillarTabs = pillars.map((pillar, idx) => ({
    id: idx,
    label: (
      <>
        <span>{pillar.num}</span>
        <span>·</span>
        <span>{pillar.title.split(' ')[0]}</span>
      </>
    ),
    ariaLabel: `Discipline ${pillar.num}: ${pillar.title}`,
  }));

  const current = pillars[activeTab];

  return (
    <section id="pillars" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        28°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 02 · 28°N · THE FIVE PILLARS
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Five structured pathways to <span className="italic text-beacon">measurable momentum</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-12 drop-shadow-sm">
            From the keynote stage to the corporate boardroom, each discipline is engineered to turn complexity into durable, repeatable results.
          </p>
        </Reveal>

        {/* Interactive Pill Switcher Buttons */}
        <Reveal delay={220}>
          <div className="mb-12">
            <SegmentedTabs
              tabs={pillarTabs}
              activeId={activeTab}
              onChange={setActiveTab}
              tabClassName="py-3"
              ariaLabel="Discipline pillars navigation"
            />
          </div>
        </Reveal>

        {/* Active Pillar Card (Large & Un-choked) */}
        <Reveal delay={280}>
          <div className="p-8 sm:p-12 rounded-3xl bg-black/60 border border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden mb-16">
            <div key={activeTab} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Core Narrative */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="tab-stagger-1 inline-flex items-center gap-2 font-mono text-xs text-beacon uppercase tracking-widest font-semibold">
                  <span>DISCIPLINE {current.num}</span>
                  <span>//</span>
                  <span>{current.impact}</span>
                </div>

                <h3 className="tab-stagger-2 font-serif text-3xl sm:text-4xl text-white font-normal drop-shadow-sm">
                  {current.title}
                </h3>

                <p className="tab-stagger-3 font-serif italic text-amber-300 text-base sm:text-lg">
                  "{current.tagline}"
                </p>

                <p className="tab-stagger-4 text-base sm:text-lg text-[#f3ece2] leading-[1.65]">
                  {current.desc}
                </p>

                <div className="tab-stagger-5 pt-4">
                  <button
                    onClick={() => onSelectService(current.title)}
                    className="px-7 py-3.5 rounded-full bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-md shadow-beacon/20 hover:scale-[1.01] active:scale-[0.97] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Engage This Discipline</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Deliverables List */}
              <div className="tab-stagger-3 lg:col-span-5 p-6 rounded-2xl bg-black/70 border border-white/15 text-left space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-beacon block mb-2 font-semibold">
                  KEY DELIVERABLES
                </span>
                <ul className="space-y-3.5">
                  {current.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className={`tab-stagger-${Math.min(dIdx + 4, 7)} flex items-start gap-3 text-sm sm:text-base text-white`}>
                      <div className="w-4 h-4 rounded-full bg-beacon/20 text-beacon flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={340}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // DELIVERY PRINCIPLE
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "A strategy deck that gathers dust is worse than useless—it breeds cynicism. Every framework we construct is designed to be owned and executed by internal teams immediately."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 28°N</span>
              <span>GOVERNANCE: REPEATABLE</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
