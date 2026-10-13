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
      label: 'Students Trained',
      subtext: 'Data analytics, business intelligence, cloud, AI & ML programs led at New Horizons.',
    },
    {
      value: 20,
      suffix: '+',
      label: 'Founders Supported',
      subtext: 'Unit economics validation, investor readiness, and commercial modeling with Kings Consult.',
    },
    {
      value: 10000,
      suffix: '+',
      label: 'Social Audience',
      subtext: 'Founders, builders, and professionals engaged across digital media and thought leadership.',
    },
    {
      value: 7000,
      suffix: '+',
      label: 'Summit & Award Reach',
      subtext: 'Tech Impact Award recipient (Tech Cirvee); keynotes across Nigeria, Africa & Europe.',
    },
  ];

  const caseStudies = [
    {
      tag: 'VENTURE STRATEGY',
      title: 'Commercial Model Validation',
      client: 'KINGS CONSULT PORTFOLIO',
      impact: 'Guided 20+ tech founders through unit economics validation, customer discovery, and investor readiness—helping them examine the commercial viability of their ideas and build stronger foundations for growth.',
      metric: '20+ Founders Supported',
    },
    {
      tag: 'CAPACITY BUILDING',
      title: 'Technology Education & Workforce Development',
      client: 'NEW HORIZONS',
      impact: "Led technology training and educational initiatives, developing people's capabilities across data analytics, business intelligence, cloud computing, AI, and machine learning. Trained thousands of learners and supported their professional development.",
      metric: '3,000+ Students Trained',
    },
    {
      tag: 'MEDIA & INFLUENCE',
      title: 'Digital Storytelling & Thought Leadership',
      client: 'THE DOLAPO OLUTOYE BRAND',
      impact: 'Building an audience around business, technology, leadership, and purpose through content creation, public speaking, and community engagement. Spoken at university conferences in Nigeria, Africa and Europe, convened technology conferences attracting 1,500+ participants, and honored with the Tech Impact Award from Tech Cirvee with 7,000+ attendees.',
      metric: '10,000+ Social Audience',
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

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 06 · 75°N · VERIFIED SELECTED IMPACT
            </span>
          </div>
        </Reveal>

        {/* Big Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-8 max-w-4xl drop-shadow-md">
            Building Businesses. Developing People. Creating <span className="italic text-beacon">Influence</span>.
          </h2>
        </Reveal>

        {/* Short Paragraph */}
        <Reveal delay={160}>
          <p className="max-w-3xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] mb-14 drop-shadow-sm">
            Through business strategy, technology, leadership, and digital storytelling, Dolapo Olutoye helps founders and organisations turn ideas into action, strengthen their operations, and connect knowledge with opportunity.
          </p>
        </Reveal>

        {/* Big Bold Uncrowded Animated Stats Grid (Large & Readable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={180 + idx * 70}>
              <div
                className="p-6 sm:p-7 rounded-3xl bg-black/60 hover:bg-black/75 border border-white/15 hover:border-beacon/40 card-press flex flex-col justify-between group backdrop-blur-xl shadow-xl h-full"
              >
                <div>
                  <span className="text-xs font-mono text-stone-accent group-hover:text-beacon transition-colors block mb-3 uppercase tracking-widest font-semibold">
                    METRIC 0{idx + 1}
                  </span>
                  <div
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                    className="stat-number font-serif text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] text-white font-normal tracking-tight mb-2 drop-shadow-sm whitespace-nowrap"
                  >
                    0{stat.suffix}
                  </div>
                  <h3 className="font-sans text-base sm:text-lg text-white font-medium mb-1">
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
                  VERIFIED SELECTED IMPACT
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-sm">
                  Solving Operational Complexities
                </h3>
              </div>
              <span className="font-mono text-xs text-[#d6cebe] uppercase tracking-wider mt-2 sm:mt-0">
                STRATEGY × SYSTEMS × INFLUENCE
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
              <span>COORDINATE: 75°N · STRATEGY × SYSTEMS × INFLUENCE</span>
              <span>STATUS: BUILDING FORWARD</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
