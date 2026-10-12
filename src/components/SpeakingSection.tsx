import React, { useState } from 'react';
import { Mic, ArrowUpRight, Check, Compass, Users, Clock, FileText } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface SpeakingSectionProps {
  onOpenBooking: () => void;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({ onOpenBooking }) => {
  const [activeDossier, setActiveDossier] = useState(0);

  const dossiers = [
    {
      title: 'Building Businesses That Last',
      subtitle: 'Engineering African Enterprises for Multi-Decade Resilience',
      audience: 'Executive Summits, Board Retreats, Corporate Conventions',
      format: '45–60 min Keynote + Executive Q&A',
      summary: 'Why most businesses fail in unpredictable emerging markets, and how high-performing operators build shock-resistant institutions.',
      takeaways: [
        'Replacing volatile hustle with predictable operational rails',
        'Unit economic discipline in inflationary macroeconomic environments',
        'Cultivating internal leadership that solves problems autonomously',
      ],
    },
    {
      title: 'Technology & the Future of Work',
      subtitle: 'Data Intelligence, AI Leaps, and Cognitive Leverage',
      audience: 'Tech Summits, Product Leaders, Enterprise Tech Teams',
      format: '45 min Keynote Address',
      summary: 'Navigating artificial intelligence and predictive data science not as vanity trends, but as foundational levers for efficiency.',
      takeaways: [
        'Separating operational AI leverage from speculative hype',
        'Building telemetry infrastructure before deploying predictive models',
        'Upskilling non-technical staff to think analytically',
      ],
    },
    {
      title: 'Leadership & Personal Responsibility',
      subtitle: 'The Non-Negotiable Foundation of Authority',
      audience: 'Executive Retreats, Emerging Leaders, MBA Cohorts',
      format: '60 min Interactive Keynote',
      summary: 'True authority begins with internal governance. An uncompromising examination of character and ownership under pressure.',
      takeaways: [
        'Why competence without character guarantees catastrophic collapse',
        'Navigating high-stakes decisions under extreme uncertainty',
        'Leading by personal standard: The covenant between leaders and teams',
      ],
    },
    {
      title: 'Purpose, Discipline & Execution',
      subtitle: 'Closing the Gap Between Potential and Output',
      audience: 'Young Professionals, Builders, University Forums',
      format: '45 min Keynote + Workshop',
      summary: 'Actionable protocols for ambitious builders tired of perpetual motion without moving the needle.',
      takeaways: [
        'The difference between emotional activity and strategic leverage',
        'Daily protocols for deep focus, energy management, and output',
        'Anchoring professional ambition in purpose so success endures',
      ],
    },
  ];

  const current = dossiers[activeDossier];

  return (
    <section id="keynotes" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        68°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 05 · 68°N · KEYNOTES & CONVENTIONS
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            I speak to people who are <span className="italic text-beacon">building something</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-12 drop-shadow-sm">
            Intellectually grounded, perspective-shifting keynote addresses delivered across corporate conventions, executive retreats, and national summits.
          </p>
        </Reveal>

        {/* macOS Window Frame with Keynote Dossiers */}
        <Reveal delay={240}>
          <div className="rounded-3xl bg-black/60 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden mb-16">
          
          {/* Window Header */}
          <div className="h-12 bg-black/70 border-b border-white/15 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            <div className="font-mono text-xs text-[#d6cebe] uppercase tracking-widest hidden sm:block">
              KEYNOTE_DOSSIERS // DOSSIER_0{activeDossier + 1}.LOG
            </div>

            <div className="font-mono text-xs text-beacon flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-beacon animate-ping" />
              <span>BOOKINGS OPEN</span>
            </div>
          </div>

          {/* Keynote Navigation Tabs */}
          <div className="p-4 sm:p-6 bg-black/40 border-b border-white/15 flex flex-wrap gap-2 sm:gap-3">
            {dossiers.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDossier(idx)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 btn-press cursor-pointer ${
                  activeDossier === idx
                    ? 'bg-beacon text-black font-bold shadow-md shadow-beacon/25 scale-[1.02]'
                    : 'bg-black/50 hover:bg-black/80 text-stone-accent hover:text-white border border-white/15'
                }`}
              >
                <span>0{idx + 1}</span>
                <span>·</span>
                <span>{d.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Dossier Content Body */}
          <div key={activeDossier} className="p-8 sm:p-12 text-left space-y-6">
            <div className="tab-stagger-1 flex flex-wrap items-center gap-4 text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span className="text-beacon font-semibold">{current.format}</span>
              <span>•</span>
              <span>{current.audience}</span>
            </div>

            <h3 className="tab-stagger-2 font-serif text-3xl sm:text-4xl text-white font-normal drop-shadow-sm">
              {current.title}
            </h3>

            <p className="tab-stagger-3 font-serif italic text-amber-300 text-base sm:text-lg">
              "{current.subtitle}"
            </p>

            <p className="tab-stagger-4 text-base sm:text-lg text-[#f3ece2] leading-[1.65]">
              {current.summary}
            </p>

            {/* Takeaways */}
            <div className="tab-stagger-4 p-6 rounded-2xl bg-black/70 border border-white/15 space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-beacon font-semibold block mb-2">
                CORE AUDIENCE TAKEAWAYS
              </span>
              <ul className="space-y-3">
                {current.takeaways.map((t, tIdx) => (
                  <li key={tIdx} className={`tab-stagger-${Math.min(tIdx + 4, 7)} flex items-start gap-3 text-sm sm:text-base text-white`}>
                    <div className="w-4 h-4 rounded-full bg-beacon/20 text-beacon flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-stagger-6 pt-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-full bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-md shadow-beacon/25 hover:scale-[1.01] active:scale-[0.97] flex items-center gap-2 cursor-pointer"
              >
                <span>Invite Dolapo to Speak</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
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
                LOGBOOK // THE CONVICTION STANDARD
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "A keynote address must not merely entertain; it must permanently alter how people perceive their responsibility. We leave the room with actionable mental models and the standard raised."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 68°N</span>
              <span>ENGAGEMENTS: GLOBAL & AFRICAN</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
