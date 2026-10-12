import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, Clock, Calendar, Share2, Check, Sparkles, BookOpen, Compass, ChevronRight 
} from 'lucide-react';
import { BlogPost, getBlogBySlug, getStoredBlogs } from '../data/blogs';

interface BlogReaderPageProps {
  slug: string;
  onBackToHome: () => void;
  onSelectOtherPost?: (slug: string) => void;
}

export const BlogReaderPage: React.FC<BlogReaderPageProps> = ({
  slug,
  onBackToHome,
  onSelectOtherPost,
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const found = getBlogBySlug(slug);
    setPost(found || null);
    setAllBlogs(getStoredBlogs());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#070b12] text-cream flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-12 h-12 text-stone-accent mb-4" />
        <h1 className="font-serif text-3xl text-white mb-2">Essay Not Found</h1>
        <p className="text-stone-accent text-sm mb-6 max-w-sm">
          The requested essay could not be located in the discourse archives.
        </p>
        <button
          onClick={onBackToHome}
          className="px-6 py-2.5 rounded-full bg-beacon text-black font-semibold text-xs font-mono uppercase tracking-wider cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Find 2 other essays for the footer recommendation
  const otherPosts = allBlogs.filter(b => b.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#070b12] text-cream flex flex-col selection:bg-beacon selection:text-black relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-beacon/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beacon to-transparent" />

      {/* Top Sticky Navigation */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 bg-surface/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-beacon transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Discourse</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="font-mono text-xs text-beacon uppercase tracking-wider font-semibold">
            42°N
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-stone-accent hover:text-white transition-all cursor-pointer"
            title="Share article link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-beacon" />
                <span className="text-beacon">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Article Container */}
      <article className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-12 select-text">
        
        {/* Header Metadata & Title */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-beacon/15 border border-beacon/30 font-mono text-xs tracking-widest uppercase text-beacon font-semibold">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-accent">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} read
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-accent">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight drop-shadow-md">
            {post.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/10 text-xs font-mono text-stone-accent">
            <div className="w-9 h-9 rounded-full bg-surface-elevated border border-white/20 flex items-center justify-center">
              <img
                src="/assets/lighthouse_monogram.svg"
                alt="Dolapo Olutoye"
                className="w-5 h-5 filter invert opacity-80"
              />
            </div>
            <div>
              <div className="text-cream font-medium text-sm">{post.author}</div>
              <div className="text-stone-driftwood text-[11px]">Kings Consult · Systems & Strategy</div>
            </div>
          </div>
        </div>

        {/* Core Principle / Takeaway Box */}
        <div className="p-7 sm:p-8 rounded-3xl bg-black/60 border border-beacon/30 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-beacon uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>CORE PRINCIPLE</span>
          </div>
          <p className="font-serif italic text-xl sm:text-2xl text-amber-300 leading-relaxed drop-shadow-sm">
            "{post.takeaway}"
          </p>
        </div>

        {/* Full Essay HTML Body */}
        <div
          className="wysiwyg-content text-left font-serif text-lg sm:text-xl text-[#e2d8cc] leading-[1.85]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* End of Discourse Signoff */}
        <div className="pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-stone-accent">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-beacon animate-pulse" />
            <span>DISCOURSE ARCHIVE // 42°N // RECORD COMPLETE</span>
          </div>

          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white transition-all cursor-pointer font-semibold uppercase tracking-wider flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Main Website</span>
          </button>
        </div>

        {/* Read Next Recommendations */}
        {otherPosts.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-beacon block font-semibold">
              CONTINUE READING FROM DISCOURSE ARCHIVES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {otherPosts.map((other) => (
                <div
                  key={other.id}
                  onClick={() => {
                    if (onSelectOtherPost) onSelectOtherPost(other.slug);
                    else window.location.hash = `#/blog/${other.slug}`;
                  }}
                  className="p-6 rounded-2xl bg-surface/80 border border-surface-border hover:border-beacon/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-beacon mb-2 inline-block font-semibold">
                      {other.category}
                    </span>
                    <h4 className="font-serif text-lg text-white font-medium group-hover:text-beacon transition-colors mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-stone-accent line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-beacon">
                    <span>Read Essay</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Footer */}
      <footer className="px-6 py-6 text-center border-t border-white/10 text-xs font-mono text-stone-driftwood">
        <span>© {new Date().getFullYear()} The Dolapo Olutoye. Built for Purpose.</span>
      </footer>
    </div>
  );
};
