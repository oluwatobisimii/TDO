import React from 'react';
import { Shield, Lock, Compass, CheckCircle2, Cpu, Scale, FileText } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const TrustGrid: React.FC = () => {
  const principles = [
    {
      icon: Cpu,
      tag: 'RIGOR',
      title: 'Evidence Before Assumptions',
      desc: 'Grounded in evidence, tested against real-world constraints, and informed by data. Every recommendation should stand up to scrutiny—not just sound convincing in theory.',
      standard: 'EVIDENCE-LED',
    },
    {
      icon: Lock,
      tag: 'TRUST',
      title: 'Confidentiality & Integrity',
      desc: 'Every professional engagement deserves discretion. We respect sensitive information, protect confidential discussions, and handle information responsibly.',
      standard: 'TRUST-DRIVEN',
    },
    {
      icon: Scale,
      tag: 'ETHICS',
      title: 'Character & Purpose',
      desc: 'Strategy without character is incomplete. Sustainable progress must be guided by integrity, responsibility, and a clear sense of purpose.',
      standard: 'PRINCIPLE-LED',
    },
    {
      icon: Compass,
      tag: 'EXECUTION',
      title: 'Implementation Feasibility',
      desc: 'Ideas create possibilities. Execution creates progress. Recommendations must account for real-world constraints, practical priorities, available resources, and the steps required to move forward.',
      standard: 'BUILT FOR ACTION',
    },
    {
      icon: Shield,
      tag: 'TRANSFER',
      title: 'Capability Development',
      desc: 'The best development work leaves people better equipped to solve problems themselves. We prioritise practical learning, knowledge sharing, and capabilities that continue to grow beyond a single engagement.',
      standard: 'CAPACITY-BUILDING',
    },
    {
      icon: CheckCircle2,
      tag: 'OUTCOMES',
      title: 'Measurable Accountability',
      desc: 'Progress should be visible. Where appropriate, we establish clear objectives, define meaningful measures of success, and review outcomes to understand what is working and what needs to improve.',
      standard: 'OUTCOME-FOCUSED',
    },
  ];

  return (
    <section id="principles" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        82°N
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 07 · 82°N · OPERATIONAL GOVERNANCE
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Trust engineered from <span className="italic text-beacon">first principles</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-3xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Whether developing business strategies, building systems, training people, or addressing audiences, these principles guide every engagement.
          </p>
        </Reveal>

        {/* Three-by-Two Grid of Translucent Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={180 + (idx % 6) * 60}>
                <div
                  className="p-8 rounded-3xl bg-black/60 hover:bg-black/75 border border-white/15 hover:border-beacon/40 card-press flex flex-col justify-between group backdrop-blur-xl shadow-xl h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-beacon group-hover:scale-105 transition-transform duration-200 ease-emil-out">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-beacon font-semibold">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3 group-hover:text-beacon transition-colors drop-shadow-sm">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#e2d8cc] leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe]">
                    <span>STANDARD 0{idx + 1}</span>
                    <span className="text-beacon font-semibold">{item.standard}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={360}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // COVENANT OF ENGAGEMENT
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "A strategy is only as noble as the character of the person executing it. When we partner with an enterprise or mentor a builder, we commit to candor, intellectual rigor, and enduring institutional health."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 82°N</span>
              <span>STANDARD: VERIFIED</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
