import React from 'react';
import { Play, ArrowUpRight, Youtube, Instagram, Linkedin, Twitter, Compass, Sparkles, Video } from 'lucide-react';
import { TiltedCard } from './reactbits/TiltedCard';

export const FeaturedContentSection: React.FC = () => {
  const contentItems = [
    {
      id: 1,
      title: 'People Build Systems. Systems Build Nations.',
      type: 'VIDEO ESSAY',
      duration: '14 mins',
      channel: 'YouTube Masterclass',
      views: '12K+ views',
      summary: 'A deep-dive analysis on institutional engineering, character discipline, and why superficial political hype cannot replace foundational systems in developing economies.',
      badge: 'POPULAR KEYNOTE',
    },
    {
      id: 2,
      title: 'Stop Being Busy. Start Being Productive.',
      type: 'STRATEGY BREAKDOWN',
      duration: '8 mins',
      channel: 'Executive Series',
      views: '8.5K+ views',
      summary: 'Practical frameworks to conduct an audit of daily cognitive bandwidth, eliminate high-friction vanity activity, and focus on true high-leverage business objectives.',
      badge: 'ACTION FRAMEWORK',
    },
    {
      id: 3,
      title: 'Africa Doesn’t Have a Talent Problem.',
      type: 'FIRESIDE CONVERSATION',
      duration: '22 mins',
      channel: 'Kings Consult Dialogues',
      views: '15K+ views',
      summary: 'Unpacking the structural bottlenecks preventing African tech and business talent from achieving systemic global scale, with concrete recommendations for builders.',
      badge: 'DEEP DIVE',
    },
  ];

  const socialLinks = [
    { name: 'YouTube', handle: '@TheDolapoOlutoye', icon: Youtube, url: 'https://www.youtube.com/@thedolapoolutoye', color: '#ff0000' },
    { name: 'LinkedIn', handle: 'Dolapo Olutoye', icon: Linkedin, url: 'https://www.linkedin.com/in/thedolapoolutoye', color: '#0a66c2' },
    { name: 'Instagram', handle: '@TheDolapoOlutoye', icon: Instagram, url: 'https://www.instagram.com/thedolapoolutoye', color: '#e4405f' },
    { name: 'X / Twitter', handle: '@TheDolapoOlutoye', icon: Twitter, url: 'https://x.com/thedolapoolutoye', color: '#ffffff' },
  ];

  return (
    <section id="media" className="relative py-28 sm:py-36 border-t border-surface-border/40 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-beacon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border mb-4 font-mono text-xs uppercase tracking-widest text-beacon">
              <Compass className="w-3.5 h-3.5" />
              06 — BROADCASTS & DIALOGUES
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream font-normal tracking-tight">
              What I'm Talking About
            </h2>
            <p className="mt-3 text-stone-accent text-base sm:text-lg">
              Long-form visual discourses, keynote recordings, and essays exploring systems, tech, and faith.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href="https://www.youtube.com/@thedolapoolutoye"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-beacon hover:text-beacon-light border-b border-beacon pb-1"
            >
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {contentItems.map((item) => (
            <TiltedCard key={item.id} maxTilt={6}>
              <a
                href="https://www.youtube.com/@thedolapoolutoye"
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col justify-between rounded-3xl bg-surface border border-surface-border hover:border-beacon/40 transition-all duration-300 card-glow overflow-hidden group cursor-pointer block"
              >
                
                {/* Media Thumbnail Container */}
                <div className="relative aspect-video bg-surface-elevated overflow-hidden border-b border-surface-border">
                  {/* Subtle Abstract Waveform Backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface to-black flex items-center justify-center">
                    <img
                      src="/assets/lighthouse_monogram.svg"
                      alt=""
                      className="w-24 h-24 object-contain filter invert opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500"
                    />
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-beacon text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 ml-0.5 fill-black" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-beacon border border-surface-border">
                      {item.badge}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-cream border border-surface-border">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-stone-accent mb-2">
                      <span>{item.channel}</span>
                      <span>{item.views}</span>
                    </div>

                    <h3 className="font-serif text-xl text-cream font-medium leading-snug mb-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-accent leading-relaxed mb-6">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-mono text-beacon group-hover:text-beacon-light">
                    <span>Watch Full Discourse</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              </a>
            </TiltedCard>
          ))}
        </div>

        {/* Social Ecosystem Channels */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-surface-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-beacon block mb-1">
              JOIN THE DIALOGUE
            </span>
            <h3 className="font-serif text-2xl text-cream font-medium">
              Follow Dolapo Olutoye Across Platforms
            </h3>
            <p className="text-stone-accent text-xs sm:text-sm mt-1">
              Daily insights, keynote snippets, and behind-the-scenes thoughts on building systems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            {socialLinks.map((s, idx) => {
              const Icon = s.icon;
              return (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-surface-elevated hover:bg-surface-elevated/80 border border-surface-border hover:border-beacon/40 transition-all flex items-center gap-3 group"
                >
                  <Icon className="w-4 h-4 text-stone-accent group-hover:text-beacon transition-colors" />
                  <div className="text-left">
                    <p className="text-xs font-mono text-cream font-medium">
                      {s.name}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
