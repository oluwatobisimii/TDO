import React from 'react';
import { Quote, Star, Compass, CheckCircle2 } from 'lucide-react';
import { TiltedCard } from './reactbits/TiltedCard';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        'Dolapo brought an extraordinary level of intellectual rigor and operational clarity to our executive retreat. Unlike typical speakers who rely on emotional hype, he delivered actionable systems that our leadership team implemented immediately.',
      author: 'Oluwaseun Balogun',
      role: 'Chief Operating Officer',
      org: 'Meridian Logistics Africa',
      category: 'CORPORATE ADVISORY',
    },
    {
      id: 2,
      quote:
        'The highest-rated keynote session of our annual innovation convention. Dolapo captivated over 1,500 builders with his clarity on African leapfrogging and technological discipline. He left our delegates with a lasting standard of excellence.',
      author: 'Dr. Kimberly Ekwueme',
      role: 'Director of Programs',
      org: 'African Builders Forum',
      category: 'KEYNOTE ENGAGEMENT',
    },
    {
      id: 3,
      quote:
        'His mentorship fundamentally rewired how I view data science and strategy. Through Kings Consult, Dolapo showed us that technical skill is incomplete without character, communication, and commercial viability.',
      author: 'Tobi Alabi',
      role: 'Senior Data Architect',
      org: 'Fintech Solutions UK',
      category: 'TRAINING & MENTORSHIP',
    },
    {
      id: 4,
      quote:
        'Working with Dolapo helped us transition from frantic firefighting to structured governance. He has a unique gift for distilling complex data realities into lucid, high-impact business decisions.',
      author: 'Ifeanyi Nwachukwu',
      role: 'Co-Founder & CEO',
      org: 'Nexus Health Systems',
      category: 'VENTURE STRATEGY',
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 border-t border-surface-border/40 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-beacon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border mb-4 font-mono text-xs uppercase tracking-widest text-beacon">
            <Compass className="w-3.5 h-3.5" />
            07 — SOCIAL PROOF & ENDORSEMENTS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream font-normal tracking-tight">
            Endorsements from Builders
          </h2>
          <p className="mt-4 text-stone-accent text-base sm:text-lg">
            Reflections from corporate leaders, event hosts, and professionals who have experienced Dolapo's work.
          </p>
        </div>

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <TiltedCard key={t.id} maxTilt={5}>
              <div className="h-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-surface border border-surface-border hover:border-beacon/40 transition-all duration-300 card-glow">
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-beacon px-2.5 py-1 rounded bg-surface-elevated border border-surface-border">
                      {t.category}
                    </span>
                    <div className="flex items-center gap-1 text-beacon">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-beacon" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-stone-accent/40 mb-4" />

                  <p className="font-serif text-lg sm:text-xl text-cream-muted leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-surface-border/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-cream">
                      {t.author}
                    </h4>
                    <p className="text-xs font-mono text-stone-accent">
                      {t.role} • <span className="text-cream-muted">{t.org}</span>
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-beacon">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </TiltedCard>
          ))}
        </div>

      </div>
    </section>
  );
};
