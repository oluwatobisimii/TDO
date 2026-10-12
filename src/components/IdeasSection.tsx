import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, BookOpen, ArrowUpRight, Sparkles, FileText, 
  ChevronLeft, ChevronRight, PenTool, Lock 
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { BlogPost, getStoredBlogs } from '../data/blogs';
import { BlogReaderModal } from './BlogReaderModal';
import { BlogBuilderModal } from './BlogBuilderModal';

export const IdeasSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Load and subscribe to real-time blog updates
  useEffect(() => {
    const loadBlogs = () => {
      setBlogs(getStoredBlogs());
    };
    loadBlogs();

    window.addEventListener('tdo_blogs_updated', loadBlogs);
    return () => window.removeEventListener('tdo_blogs_updated', loadBlogs);
  }, []);

  // Keyboard shortcut Cmd+Shift+B / Ctrl+Shift+B to open Admin Blog Builder
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsBuilderOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredIdeas =
    activeCategory === 'All'
      ? blogs
      : blogs.filter((idea) => idea.category === activeCategory);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="discourse" className="relative py-32 sm:py-44 overflow-hidden">
      {/* Ghosted Giant Watermark Coordinates */}
      <div className="absolute top-12 -left-6 font-serif text-[22vw] leading-none text-white/[0.035] select-none pointer-events-none font-bold">
        42°N
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Top Eyebrow with Secret / Discreet Studio Trigger */}
        <Reveal delay={0}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-beacon" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-beacon font-semibold">
                WAYPOINT 03 · 42°N · INTELLECT & DISCOURSE
              </span>
            </div>

            {/* Subtle Admin Studio Trigger */}
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-accent hover:text-beacon font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer group"
              title="Open Admin Blog Builder (or press Cmd+Shift+B)"
            >
              <PenTool className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              <span>Admin Studio</span>
            </button>
          </div>
        </Reveal>

        {/* Section Headline & Narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal delay={80}>
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.08] text-white tracking-tight mb-4 max-w-4xl drop-shadow-md">
                Ideas worth <span className="italic text-beacon">building</span>.
              </h2>
              <p className="max-w-2xl text-lg sm:text-xl text-[#f3ece2] font-normal leading-[1.65] drop-shadow-sm">
                Perspectives on enterprise architectures, technological leaps, disciplined leadership, and faith in the marketplace.
              </p>
            </div>
          </Reveal>

          {/* Carousel Scroll Arrow Controls */}
          <Reveal delay={120}>
            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="text-xs font-mono text-stone-accent uppercase tracking-wider mr-2 hidden sm:inline">
                Scroll Track
              </span>
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-surface-elevated hover:bg-surface border border-surface-border hover:border-beacon/40 text-stone-accent hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-surface-elevated hover:bg-surface border border-surface-border hover:border-beacon/40 text-stone-accent hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Category Filter Pills */}
        <Reveal delay={180}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
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

        {/* Horizontal Scrolling Track (Latest First) */}
        <Reveal delay={220}>
          <div className="relative -mx-6 sm:-mx-8 px-6 sm:px-8">
            <div
              ref={scrollTrackRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
            >
              {filteredIdeas.map((idea, idx) => (
                <div
                  key={idea.id}
                  onClick={() => setSelectedPost(idea)}
                  className="w-[310px] sm:w-[380px] md:w-[420px] shrink-0 snap-start h-full group cursor-pointer"
                >
                  <div className="p-8 sm:p-9 rounded-3xl bg-black/60 hover:bg-black/80 border border-white/15 hover:border-beacon/50 transition-all duration-300 card-glow flex flex-col justify-between backdrop-blur-xl shadow-xl h-full min-h-[380px] relative overflow-hidden">
                    
                    {/* Top Glow Edge on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beacon/0 to-transparent group-hover:via-beacon transition-all duration-300" />

                    <div>
                      {/* Meta Tags */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 font-mono text-[11px] tracking-widest uppercase text-beacon font-semibold">
                          {idea.category}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-xs text-[#d6cebe]">
                          <span>{idea.readTime} read</span>
                          {idea.date && <span className="opacity-40">· {idea.date}</span>}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3 group-hover:text-beacon transition-colors leading-snug drop-shadow-sm">
                        {idea.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-[#e2d8cc] leading-[1.65] mb-6 line-clamp-3">
                        {idea.excerpt}
                      </p>
                    </div>

                    <div>
                      {/* Takeaway Quote */}
                      <div className="pt-4 border-t border-white/15 mb-4">
                        <div className="font-serif italic text-amber-300 text-xs sm:text-sm line-clamp-2">
                          "{idea.takeaway}"
                        </div>
                      </div>

                      {/* Interactive Read Link Indicator */}
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-stone-accent group-hover:text-beacon transition-colors pt-2">
                        <span className="font-semibold">Read Full Discourse</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Translucent Glass Field Note Card */}
        <Reveal delay={340}>
          <div className="mt-8 p-7 sm:p-9 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
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

      {/* Full Article Reader Modal */}
      <BlogReaderModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Admin Blog Builder Studio */}
      <BlogBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onPublished={(newPost) => {
          setSelectedPost(newPost);
        }}
      />
    </section>
  );
};
