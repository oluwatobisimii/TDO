import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Send, Eye, Check, Sparkles, BookOpen, Clock, Tag, Quote, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WysiwygEditor } from '../components/admin/WysiwygEditor';
import { BlogPost, getBlogById, saveStoredBlog } from '../data/blogs';

interface AdminBlogEditorPageProps {
  mode: 'create' | 'edit';
  blogId?: string;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

export const AdminBlogEditorPage: React.FC<AdminBlogEditorPageProps> = ({
  mode,
  blogId,
  onSaveSuccess,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Systems & Africa');
  const [customCategory, setCustomCategory] = useState('');
  const [readTime, setReadTime] = useState('4 min');
  const [excerpt, setExcerpt] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [contentHtml, setContentHtml] = useState('<p></p>');
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // If in edit mode, load existing blog
  useEffect(() => {
    if (mode === 'edit' && blogId) {
      const existing = getBlogById(blogId);
      if (existing) {
        setTitle(existing.title);
        if (['Systems & Africa', 'Strategy & Execution', 'Leadership & Character', 'Technology & Innovation'].includes(existing.category)) {
          setCategory(existing.category);
        } else {
          setCategory('Other');
          setCustomCategory(existing.category);
        }
        setReadTime(existing.readTime || '4 min');
        setExcerpt(existing.excerpt || '');
        setTakeaway(existing.takeaway || '');
        setContentHtml(existing.contentHtml || existing.content || '<p></p>');
      }
    }
  }, [mode, blogId]);

  const categories = [
    'Systems & Africa',
    'Strategy & Execution',
    'Leadership & Character',
    'Technology & Innovation',
    'Other',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an essay title.');
      return;
    }
    if (!excerpt.trim()) {
      setError('Please provide a short excerpt for the card summary.');
      return;
    }
    if (!contentHtml.trim() || contentHtml === '<p></p>') {
      setError('Please write content in the essay editor.');
      return;
    }

    setSaving(true);
    setError('');

    const finalCategory = category === 'Other' && customCategory.trim() ? customCategory.trim() : category;

    saveStoredBlog({
      id: mode === 'edit' ? blogId : undefined,
      title: title.trim(),
      category: finalCategory,
      readTime: readTime.trim() || '4 min',
      excerpt: excerpt.trim(),
      takeaway: takeaway.trim() || excerpt.trim(),
      contentHtml: contentHtml.trim(),
      author: 'Dolapo Olutoye',
    });

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fde047', '#ffedd7', '#ffffff'],
    });

    setTimeout(() => {
      setSaving(false);
      onSaveSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-cream flex flex-col selection:bg-beacon selection:text-black">
      {/* Top Fixed Header */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 bg-surface/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-accent hover:text-white transition-all cursor-pointer"
            title="Cancel and return to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-lg sm:text-xl text-white font-medium">
              {mode === 'edit' ? 'Edit Thought Leadership Essay' : 'Compose New Thought Leadership Essay'}
            </h1>
            <span className="text-[11px] font-mono text-beacon uppercase tracking-wider">
              {mode === 'edit' ? `Updating ID: ${blogId}` : 'WYSIWYG Editorial Publisher'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              previewMode
                ? 'bg-beacon text-black border-beacon font-bold shadow'
                : 'bg-surface-elevated text-stone-accent hover:text-white border-surface-border'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{previewMode ? 'Hide Card Preview' : 'Preview Card'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-lg shadow-beacon/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : mode === 'edit' ? 'Update Essay' : 'Publish Essay'}</span>
          </button>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-12 py-8 sm:py-12">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Card Preview Box */}
        {previewMode && (
          <div className="p-6 rounded-3xl bg-black/60 border border-beacon/30 backdrop-blur-xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-beacon font-semibold">
                LIVE CARD PREVIEW (ON HORIZONTAL DISCOURSE TRACK):
              </span>
              <span className="text-stone-accent text-xs font-mono">Sorted Newest First</span>
            </div>
            
            <div className="w-[320px] sm:w-[380px] p-7 rounded-3xl bg-black/80 border border-white/20">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-beacon font-semibold">
                  {category === 'Other' ? customCategory || 'Custom Category' : category}
                </span>
                <span className="font-mono text-xs text-[#d6cebe]">{readTime} read</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3">
                {title || 'Your Essay Title Appears Here'}
              </h4>

              <p className="text-xs sm:text-sm text-[#e2d8cc] leading-relaxed mb-4 line-clamp-3">
                {excerpt || 'Your short card summary excerpt appears here.'}
              </p>

              <div className="pt-3 border-t border-white/10 font-serif italic text-amber-300 text-xs line-clamp-2">
                "{takeaway || 'Your core takeaway quote.'}"
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-7">
          
          {/* Section 1: Title & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-2">
                Essay Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Architecture of Long-Term Institutional Trust"
                className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-2xl px-4 py-3 text-base text-cream placeholder:text-stone-accent/60 outline-none transition-colors font-serif"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-2">
                Estimated Read Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-stone-accent absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min"
                  className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-2xl pl-10 pr-4 py-3 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Category Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-2">
              Discourse Category Pillar *
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-beacon text-black font-bold shadow-md shadow-beacon/20'
                      : 'bg-surface-elevated text-stone-accent hover:text-white border border-surface-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {category === 'Other' && (
              <input
                type="text"
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter custom category name..."
                className="mt-3 w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2.5 text-xs text-cream outline-none font-mono"
              />
            )}
          </div>

          {/* Section 3: Excerpt */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
              Card Excerpt / Short Summary * (1–2 sentences displayed on carousel card)
            </label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A concise, intellectually engaging synthesis of the essay..."
              className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-2xl px-4 py-3 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Section 4: Key Takeaway Quote */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
              Key Principle / Takeaway Quote (Italicized Callout)
            </label>
            <div className="relative">
              <Quote className="w-4 h-4 text-stone-accent absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                placeholder="e.g. Institutions outlast charisma. Build the tracks before running the train."
                className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-2xl pl-10 pr-4 py-3 text-sm text-amber-200 placeholder:text-stone-accent/60 outline-none transition-colors italic font-serif"
              />
            </div>
          </div>

          {/* Section 5: WYSIWYG Full Essay Body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-accent">
                Full Essay Body (WYSIWYG Rich HTML Editor) *
              </label>
              <span className="text-[11px] font-mono text-beacon">
                Outputs Clean Stringified HTML
              </span>
            </div>

            <WysiwygEditor
              value={contentHtml}
              onChange={(html) => setContentHtml(html)}
              placeholder="Write the full thought leadership essay here... Use headings, bullet lists, blockquotes, and links."
            />
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl bg-surface-elevated hover:bg-white/[0.08] border border-surface-border text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-xl shadow-beacon/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{saving ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Publish Live to Discourse'}</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};
