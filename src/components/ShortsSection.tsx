import React, { useState } from 'react';
import { Play, ArrowUpRight, Youtube, FileText, X, Maximize2, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface ShortItem {
  id: number;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
  url: string;
}

export const ShortsSection: React.FC = () => {
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);
  const [theaterShort, setTheaterShort] = useState<ShortItem | null>(null);

  const shorts: ShortItem[] = [
    {
      id: 1,
      youtubeId: 'NkwEzb9BTlQ',
      title: 'How to Make Decisions Without All the Information',
      category: 'DECISION FRAMEWORKS',
      duration: '0:58',
      summary: 'A 4-question practical model for navigating risk and taking action when data is incomplete.',
      url: 'https://www.youtube.com/shorts/NkwEzb9BTlQ',
    },
    {
      id: 2,
      youtubeId: '38E04vTyxHU',
      title: 'The Mistake That Keeps Talented People Stuck',
      category: 'CAREER & EXECUTION',
      duration: '0:52',
      summary: 'Why raw talent alone plateaus without disciplined operational architecture and accountability.',
      url: 'https://www.youtube.com/shorts/38E04vTyxHU',
    },
    {
      id: 3,
      youtubeId: 'cP6_J8TPbXY',
      title: 'Building Systems That Outlast Motivation',
      category: 'BUSINESS ARCHITECTURE',
      duration: '0:56',
      summary: 'Why emotion-driven hustle fails and how structured organizational rhythms create permanence.',
      url: 'https://www.youtube.com/shorts/cP6_J8TPbXY',
    },
    {
      id: 4,
      youtubeId: 'W6CQsXLwT9o',
      title: 'Knowledge vs. Wisdom: What Actually Changes You',
      category: 'LEADERSHIP & MINDSET',
      duration: '0:59',
      summary: 'Information merely informs the intellect; applied wisdom and execution transform character.',
      url: 'https://www.youtube.com/shorts/W6CQsXLwT9o',
    },
  ];

  const handleNextTheater = () => {
    if (!theaterShort) return;
    const currentIndex = shorts.findIndex((s) => s.id === theaterShort.id);
    const nextIndex = (currentIndex + 1) % shorts.length;
    setTheaterShort(shorts[nextIndex]);
  };

  const handlePrevTheater = () => {
    if (!theaterShort) return;
    const currentIndex = shorts.findIndex((s) => s.id === theaterShort.id);
    const prevIndex = (currentIndex - 1 + shorts.length) % shorts.length;
    setTheaterShort(shorts[prevIndex]);
  };

  return (
    <section id="media" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        56°N
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Mono Eyebrow */}
        <Reveal delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-beacon animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
              WAYPOINT 04 · 56°N · BROADCASTS & DIRECT PREVIEW
            </span>
          </div>
        </Reveal>

        {/* Serif Headline with Italic Accent */}
        <Reveal delay={80}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-4 drop-shadow-md">
                Field dispatches & <span className="italic text-beacon">Shorts</span>.
              </h2>
              <p className="max-w-xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65]">
                Preview key mental models, leadership frameworks, and strategic dialogues directly on the page below.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@thedolapoolutoye/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-red-600/30 hover:bg-red-600 text-white border border-red-500/40 text-xs sm:text-sm font-mono uppercase tracking-wider btn-press hover:scale-[1.01] active:scale-[0.97] flex items-center gap-2.5 shrink-0 self-start md:self-auto group shadow-lg backdrop-blur-md cursor-pointer"
            >
              <Youtube className="w-4 h-4 text-red-400 group-hover:text-white transition-colors duration-150" />
              <span>Channel: @thedolapoolutoye</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        {/* 9:16 Shorts Vertical Cards Grid with Interactive Inline Playback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shorts.map((item, idx) => {
            const isPlayingInline = inlinePlayingId === item.youtubeId;

            return (
              <Reveal key={item.id} delay={180 + idx * 70}>
                <div
                  className="rounded-3xl bg-black/60 hover:bg-black/80 border border-white/15 hover:border-beacon/50 card-press overflow-hidden flex flex-col group shadow-xl backdrop-blur-xl transition-[border-color,background-color] h-full"
                >
                  {/* 9:16 Frame Container */}
                  <div className="aspect-[9/15] w-full bg-black relative overflow-hidden flex flex-col justify-between border-b border-white/15">
                    {isPlayingInline ? (
                      /* Active Embedded YouTube Player */
                      <div className="relative w-full h-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                          title={item.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />

                        {/* Floating Top Controls for Active Inline Video */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-beacon/50 text-[10px] font-mono text-beacon uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-beacon animate-ping" />
                            <span>PLAYING</span>
                          </span>

                          <div className="flex items-center gap-1.5 pointer-events-auto">
                            <button
                              onClick={() => setTheaterShort(item)}
                              title="Expand theater view"
                              className="p-1.5 rounded-full bg-black/80 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setInlinePlayingId(null)}
                              title="Close inline preview"
                              className="p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Thumbnail Cover with Direct Play Triggers */
                      <div className="relative w-full h-full group/thumb cursor-pointer" onClick={() => setInlinePlayingId(item.youtubeId)}>
                        {/* High-Resolution Thumbnail from YouTube */}
                        <img
                          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500 opacity-90"
                        />

                        {/* Cinematic Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-beacon uppercase tracking-wider font-semibold">
                            {item.category}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                            <Youtube className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Center Glowing Play Action Pill */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                          <div className="w-14 h-14 rounded-full bg-beacon text-black flex items-center justify-center btn-press shadow-2xl shadow-beacon/40 group-hover/thumb:scale-110 active:scale-95 transition-transform duration-200">
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </div>
                          <span className="font-mono text-[11px] uppercase tracking-widest text-white/90 bg-black/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                            Preview on Page
                          </span>
                        </div>

                        {/* Bottom Duration Badge */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-white/80">
                          <span>{item.duration}</span>
                          <span className="text-beacon font-semibold">HD Short</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Description & Dual Action Controls */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-serif text-lg text-white font-medium group-hover:text-beacon transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#e2d8cc] leading-[1.6]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setInlinePlayingId(isPlayingInline ? null : item.youtubeId)}
                        className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full btn-press transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isPlayingInline
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-beacon/15 hover:bg-beacon text-beacon hover:text-black border border-beacon/30 font-semibold'
                        }`}
                      >
                        {isPlayingInline ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>Play</span>
                          </>
                        )}
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#d6cebe] hover:text-white transition-colors flex items-center gap-1 py-1 px-2"
                      >
                        <span>YouTube</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={380}>
          <div className="p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3">
              <FileText className="w-4 h-4 text-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-beacon font-semibold">
                LOGBOOK // BROADCAST TRANSMISSIONS
              </span>
            </div>

            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed max-w-3xl">
              "We condense complex frameworks into short-form broadcasts because clarity is contagious. If a concept cannot be explained in under sixty seconds, you have not grasped its fundamental essence."
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#d6cebe] uppercase tracking-wider">
              <span>COORDINATE: 56°N</span>
              <span>CHANNEL: @THEDOLAPOOLUTOYE</span>
            </div>
          </div>
        </Reveal>

      </div>

      {/* Theater Mode Fullscreen Lightbox Modal */}
      {theaterShort && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-black/90 border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl modal-enter flex flex-col items-center">
            {/* Header Controls */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-beacon/20 text-beacon border border-beacon/30 font-mono text-xs uppercase tracking-widest font-semibold">
                {theaterShort.category}
              </span>

              <button
                onClick={() => setTheaterShort(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Theater View"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 9:16 Embedded Player */}
            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black mb-4">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${theaterShort.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title={theaterShort.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Title & Navigation */}
            <div className="w-full text-center">
              <h3 className="font-serif text-lg sm:text-xl text-white font-medium mb-1">
                {theaterShort.title}
              </h3>
              <p className="text-xs text-[#a8a29e] mb-4">
                {theaterShort.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/15">
                <button
                  onClick={handlePrevTheater}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1 btn-press cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <a
                  href={theaterShort.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-beacon hover:underline flex items-center gap-1"
                >
                  <span>Open in YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleNextTheater}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1 btn-press cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
