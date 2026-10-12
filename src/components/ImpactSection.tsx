import React, { useEffect, useRef } from 'react';
import { Compass, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from './ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

export const ImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: 3000,
      suffix: '+',
      label: 'People Equipped',
      subtext: 'Across masterclasses, analytics bootcamps, and youth summits.',
    },
    {
      value: 50,
      suffix: '+',
      label: 'Advisory Audits',
      subtext: 'Data science models, operational architectures, and strategic roadmaps.',
    },
    {
      value: 10,
      suffix: '+',
      label: 'Teams Led',
      subtext: 'Direct leadership of engineering, data, and operational teams.',
    },
    {
      value: 90,
      suffix: '%+',
      label: 'Efficiency Gain',
      subtext: 'Measured reductions in workflow redundancy across client engagements.',
    },
  ];

  const caseStudies = [
    {
      tag: 'LOGISTICS & DISTRIBUTION',
      title: 'Workflow Automation & Telemetry',
      client: 'Regional Logistics Consortium',
      impact: 'Automated data tracking pipelines, eliminating weekly reporting delays and reducing order friction by 34%.',
      metric: '34% Friction Reduction',
    },
    {
      tag: 'EXECUTIVE CAPACITY',
      title: 'Strategic Leadership Cohort',
      client: 'Financial Services Institution',
      impact: 'Customized 8-week executive development program for 120+ team leads, establishing standardized KPI tracking.',
      metric: '120+ Leaders Certified',
    },
    {
      tag: 'VENTURE STRATEGY',
      title: 'Commercial Model Validation',
      client: 'Kings Consult Portfolio',
      impact: 'Guided 20+ tech founders through unit economic validation, customer discovery, and investor readiness.',
      metric: '20+ Ventures Scaled',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const statElements = containerRef.current.querySelectorAll('.stat-number');

    statElements.forEach((el) => {
      const targetValue = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';

      const counter = { val: 0 };
      gsap.to(counter, {
        val: targetValue,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = Math.floor(counter.val).toLocaleString() + suffix;
        },
      });
    });
  }, []);

  return (
    <section id="impact" ref={containerRef} className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        75°N
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 06 · 75°N · SYSTEMS & PROOF OF IMPACT
            </span>
          </div>
        </Reveal>

        {/* Big Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            We do not trade in vague ambition. We measure durable <span className="italic text-beacon">proof</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Rather than a static CV, this brand is calibrated by tangible shifts in institutional capability, workflow velocity, and individual discipline.
          </p>
        </Reveal>

        {/* Big Bold Uncrowded Animated Stats Grid (Large & Readable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={180 + idx * 70}>
              <div
                className="p-8 sm:p-9 rounded-3xl bg-black/60 hover:bg-black/75 border border-white/15 hover:border-beacon/40 card-press flex flex-col justify-between group backdrop-blur-xl shadow-xl h-full"
              >
                <div>
                  <span className="text-xs font-mono text-stone-accent group-hover:text-beacon transition-colors block mb-4 uppercase tracking-widest font-semibold">
                    METRIC 0{idx + 1}
                  </span>
                  <div
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                    className="stat-number font-serif text-5xl sm:text-6xl text-white font-normal tracking-tight mb-2 drop-shadow-sm"
                  >
                    0{stat.suffix}
                  </div>
                  <h3 className="font-sans text-lg text-white font-medium mb-1">
                    {stat.label}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#e2d8cc] leading-relaxed pt-4 border-t border-white/15">
                  {stat.subtext}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Selected Engagements */}
        <div className="mb-16">
          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/15">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-beacon block mb-1 font-semibold">
                  VERIFIED ARCHIVES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-sm">
                  Solving Operational Complexities
                </h3>
              </div>
              <span className="font-mono text-xs text-[#d6cebe] uppercase tracking-wider mt-2 sm:mt-0">
                KINGS CONSULT FIELD LOGS
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {caseStudies.map((cs, cIdx) => (
              <Reveal key={cIdx} delay={220 + cIdx * 80}>
                <div
                  className="p-7 sm:p-8 rounded-3xl bg-black/60 border border-white/15 hover:border-beacon/30 card-press flex flex-col justify-between group backdrop-blur-xl shadow-xl h-full"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15 font-mono text-[10px] tracking-widest uppercase text-beacon inline-block mb-4 font-semibold">
                      {cs.tag}
                    </span>

                    <h4 className="font-serif text-xl sm:text-2xl text-white font-medium mb-1 group-hover:text-beacon transition-colors drop-shadow-sm">
                      {cs.title}
                    </h4>

                    <p className="text-xs font-mono text-[#d6cebe] mb-3 uppercase tracking-wider">
                      {cs.client}
                    </p>

                    <p className="text-sm text-[#e2d8cc] leading-relaxed mb-6">
                      {cs.impact}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-beacon flex items-center gap-1.5 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{cs.metric}</span>
                    </span>
                    <span className="text-[#d6cebe] text-[11px] uppercase">VERIFIED</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={340}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // SYSTEMS TELEMETRY
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl drop-shadow-sm">
              "Metrics are not vanity trophies. Across 50+ audits, 80% of institutional stagnation traces not to external conditions, but to unmeasured internal friction. When you measure what matters, people build with clarity."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 75°N</span>
              <span>STATUS: REPEATABLE</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
