import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, Bookmark, Share2, Check, ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { BlogPost } from '../data/blogs';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#' + post.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render markdown-like sections cleanly
  const renderFormattedContent = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, idx) => {
      // Subheading (### or ##)
      if (para.startsWith('### ') || para.startsWith('## ')) {
        const title = para.replace(/^#+\s*/, '');
        return (
          <h3 key={idx} className="font-serif text-2xl sm:text-3xl text-white font-normal mt-10 mb-4 pt-4 border-t border-white/10">
            {title}
          </h3>
        );
      }

      // Bullet list
      if (para.includes('\n- ') || para.startsWith('- ')) {
        const items = para.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <ul key={idx} className="space-y-3 my-6 pl-2">
            {items.map((item, itemIdx) => {
              const cleanItem = item.replace(/^-\s*/, '');
              // Check for bold lead
              const parts = cleanItem.split('**');
              return (
                <li key={itemIdx} className="flex items-start gap-3 text-base sm:text-lg text-[#e6ded3] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-beacon shrink-0 mt-2.5" />
                  <span>
                    {parts.map((p, pIdx) =>
                      pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{p}</strong> : p
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Normal paragraph (with optional drop cap on first paragraph)
      const isFirst = idx === 0;
      return (
        <p
          key={idx}
          className={`text-base sm:text-lg text-[#e2d8cc] leading-[1.8] mb-6 ${
            isFirst ? 'first-letter:text-5xl first-letter:font-serif first-letter:text-beacon first-letter:float-left first-letter:mr-3 first-letter:leading-none' : ''
          }`}
        >
          {para}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col modal-enter">
        
        {/* Ambient Top Glow Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-beacon to-transparent shrink-0" />

        {/* Top Navbar */}
        <div className="px-6 sm:px-8 py-5 border-b border-surface-border flex items-center justify-between bg-surface-elevated/70 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-beacon transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Discourse Archive</span>
            </button>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-beacon uppercase tracking-wider font-semibold">
              42°N
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-stone-accent hover:text-white transition-all cursor-pointer"
              title="Share essay link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-beacon" />
                  <span className="text-beacon">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-accent hover:text-white rounded-full hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Canvas */}
        <div className="overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 space-y-8 select-text">
          {/* Header Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-beacon/15 border border-beacon/30 font-mono text-xs tracking-widest uppercase text-beacon font-semibold">
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

            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.15] tracking-tight mb-6 drop-shadow-md">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-stone-accent">
              <span className="text-cream font-medium">{post.author}</span>
              <span className="text-white/20">·</span>
              <span>Kings Consult Dialogues & Systems</span>
            </div>
          </div>

          {/* Pull-Quote Takeaway Box */}
          <div className="p-6 rounded-2xl bg-black/60 border border-beacon/30 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-beacon uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE PRINCIPLE</span>
            </div>
            <p className="font-serif italic text-lg sm:text-xl text-amber-300 leading-relaxed">
              "{post.takeaway}"
            </p>
          </div>

          {/* Formatted Body */}
          <div className="prose prose-invert max-w-none text-left">
            {renderFormattedContent(post.content)}
          </div>

          {/* End of Essay Note */}
          <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-accent">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-beacon" />
              <span>DISCOURSE COMPLETE // RETURN TO ORIGIN</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white transition-all cursor-pointer font-semibold uppercase tracking-wider"
            >
              Close Essay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
