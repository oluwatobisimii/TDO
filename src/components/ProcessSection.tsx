import React from 'react';
import { ArrowUpRight, Check, Compass } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '1',
      title: 'Diagnostic & Friction Audit',
      desc: 'An unvarnished preliminary review identifying operational bottlenecks, team capabilities, and strategic gaps before prescribing solutions.',
      linkText: 'Schedule initial diagnostic',
    },
    {
      num: '2',
      title: 'Architectural Blueprint & Modeling',
      desc: 'Formulating bespoke operational models, data structures, or custom keynote narratives addressing root causes rather than symptoms.',
      linkText: 'Explore systems methodology',
    },
    {
      num: '3',
      title: 'Execution Sprints & Capacity Transfer',
      desc: 'Delivering rigorous masterclasses, workshops, or convention keynotes that equip internal teams and replace ambiguity with decisive momentum.',
      linkText: 'View corporate workshops',
    },
    {
      num: '4',
      title: 'Institutionalization & Review',
      desc: 'Deploying governance metrics and scheduled 60-day review checkpoints to ensure operating discipline compounds into durable institutional legacy.',
      linkText: 'Review client outcomes',
    },
  ];

  return (
    <section id="roadmap" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        88°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 09 · 88°N · FOUR-STEP PROTOCOL
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Four steps from friction to <span className="italic text-beacon">structured momentum</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Whether designing enterprise data telemetry, facilitating corporate retreats, or addressing a convention hall, our collaboration follows a disciplined progression.
          </p>
        </Reveal>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left: Numbered List */}
          <div className="lg:col-span-7 space-y-7">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={180 + idx * 70}>
                <div className="flex items-start gap-5 group text-left">
                  {/* Accent Numeral in Circle */}
                  <div className="w-10 h-10 rounded-full bg-beacon/20 border border-beacon/40 flex items-center justify-center shrink-0 mt-0.5 text-beacon font-mono text-base font-bold group-hover:bg-beacon group-hover:text-black transition-all shadow-md">
                    {step.num}
                  </div>

                  {/* Step Details */}
                  <div className="space-y-1.5">
                    <h3 className="font-sans text-lg sm:text-xl font-semibold text-white group-hover:text-beacon transition-colors drop-shadow-sm">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#e2d8cc] leading-[1.6]">
                      {step.desc}
                    </p>
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#d6cebe] hover:text-beacon uppercase tracking-wider transition-colors pt-1 font-semibold"
                    >
                      <span>{step.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: Window Manifest Frame */}
          <div className="lg:col-span-5">
            <Reveal delay={280} type="scale">
              <div className="rounded-3xl bg-black/60 border border-white/20 p-7 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#d6cebe] font-semibold">
                    MANIFEST // PROTOCOL_V4.LOG
                  </span>
                  <span className="w-2 h-2 rounded-full bg-beacon animate-ping" />
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left">
                    <div className="flex items-center justify-between text-xs text-stone-accent mb-1 uppercase tracking-wider">
                      <span>STATUS: ACTIVE ENGAGEMENT</span>
                      <span className="text-beacon font-bold">IN PROGRESS</span>
                    </div>
                    <div className="font-serif text-cream text-base">
                      Strategic Realignment & Operations Sprint
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1 text-left text-xs">
                    <div className="flex items-center gap-2.5 text-cream/90">
                      <div className="w-4 h-4 rounded bg-beacon/20 text-beacon flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>01: Pre-session diagnostic complete</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-cream/90">
                      <div className="w-4 h-4 rounded bg-beacon/20 text-beacon flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>02: Systems audit & telemetry delivered</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-cream/90">
                      <div className="w-4 h-4 rounded bg-beacon/20 text-beacon flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>03: Keynote & workshop facilitated</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-beacon font-bold">
                      <div className="w-4 h-4 rounded bg-beacon text-black flex items-center justify-center shrink-0 text-xs">
                        4
                      </div>
                      <span>04: 60-day governance review</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-stone-accent text-left font-mono space-y-1">
                    <p className="text-beacon/90">$ td_systems --audit --status=verified</p>
                    <p className="text-cream/70">&gt; Redundancy eliminated: 34%</p>
                    <p className="text-emerald-400 font-bold">&gt; Governance: DURABLE</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
};
