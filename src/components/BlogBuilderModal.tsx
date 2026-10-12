import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Key, Sparkles, Send, Download, Copy, Check, 
  Trash2, Eye, Plus, ArrowRight, RefreshCw, BookOpen, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { verifyAdminPassword, isAuthenticated, logoutAdmin } from '../utils/auth';
import { getStoredBlogs, saveStoredBlog, deleteStoredBlog, exportBlogsJson, BlogPost, SEED_BLOGS } from '../data/blogs';

interface BlogBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublished?: (newPost: BlogPost) => void;
}

export const BlogBuilderModal: React.FC<BlogBuilderModalProps> = ({ isOpen, onClose, onPublished }) => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'compose' | 'manage' | 'export'>('compose');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Systems & Africa');
  const [customCategory, setCustomCategory] = useState('');
  const [readTime, setReadTime] = useState('4 min');
  const [excerpt, setExcerpt] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // Management & Export
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAuthed(isAuthenticated());
      refreshList();
    }
  }, [isOpen]);

  const refreshList = () => {
    setBlogsList(getStoredBlogs());
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const valid = await verifyAdminPassword(password);
      if (valid) {
        setAuthed(true);
        setPassword('');
        refreshList();
      } else {
        setAuthError('Incorrect admin key. Please verify credentials.');
      }
    } catch {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
  };

  // Handle Form Publish
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert('Please fill in title, excerpt, and full essay body.');
      return;
    }

    const finalCategory = category === 'Other' && customCategory ? customCategory : category;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const newPost = saveStoredBlog({
      title: title.trim(),
      category: finalCategory,
      readTime: readTime.trim() || '4 min',
      date: dateFormatted,
      excerpt: excerpt.trim(),
      takeaway: takeaway.trim() || excerpt.trim(),
      content: content.trim(),
      author: 'Dolapo Olutoye',
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fde047', '#ffedd7', '#ffffff'],
    });

    setPublishSuccess(true);
    refreshList();
    if (onPublished) onPublished(newPost);

    // Reset Form
    setTitle('');
    setExcerpt('');
    setTakeaway('');
    setContent('');
    setCustomCategory('');

    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('manage');
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this custom essay?')) {
      deleteStoredBlog(id);
      refreshList();
    }
  };

  const handleCopyJson = () => {
    const json = exportBlogsJson();
    navigator.clipboard.writeText(json);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadJson = () => {
    const json = exportBlogsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tdo_blogs_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = ['Systems & Africa', 'Strategy & Execution', 'Leadership & Character', 'Technology & Innovation', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col modal-enter">
        
        {/* Ambient Top Glow Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-beacon to-transparent shrink-0" />

        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-surface-border flex items-center justify-between bg-surface-elevated/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-beacon/20 border border-beacon/30 flex items-center justify-center text-beacon font-mono">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-white font-medium">
                Editorial Studio // Blog Builder
              </h2>
              <span className="font-mono text-[10px] sm:text-xs text-beacon uppercase tracking-wider">
                WP.03 · DISCOURSE CMS // ENCRYPTED DISPATCH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {authed && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-stone-accent hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                Lock Studio
              </button>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-stone-accent hover:text-white transition-colors cursor-pointer text-xs font-mono uppercase tracking-wider"
              title="Return to public portfolio"
            >
              <span className="hidden sm:inline">Exit to Website</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Content Body */}
        {!authed ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-beacon/10 border border-beacon/30 flex items-center justify-center mb-6 text-beacon shadow-lg shadow-beacon/10">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-2">
              Admin Authentication Required
            </h3>
            <p className="text-xs sm:text-sm text-stone-accent mb-8 leading-relaxed">
              Enter the encrypted master key to manage and publish thought leadership essays to the live discourse track.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-3 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors pr-10 font-mono"
                />
                <Key className="w-4 h-4 text-stone-accent absolute right-3.5 top-3.5 pointer-events-none" />
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-lg shadow-beacon/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Unlock Editorial Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-[11px] font-mono text-stone-driftwood">
              Encrypted with SHA-256 (Default: dolapo2026 or tdo2026)
            </p>
          </div>
        ) : (
          /* Authenticated Studio */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="px-6 sm:px-8 pt-4 border-b border-surface-border flex items-center gap-3 bg-surface-elevated/40">
              <button
                onClick={() => setActiveTab('compose')}
                className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'compose'
                    ? 'border-beacon text-beacon font-bold'
                    : 'border-transparent text-stone-accent hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Compose New Essay</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'manage'
                    ? 'border-beacon text-beacon font-bold'
                    : 'border-transparent text-stone-accent hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>All Published ({blogsList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('export')}
                className={`pb-3 px-3 text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'export'
                    ? 'border-beacon text-beacon font-bold'
                    : 'border-transparent text-stone-accent hover:text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Backup / Export JSON</span>
              </button>
            </div>

            {/* Tab 1: Compose New Essay */}
            {activeTab === 'compose' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {publishSuccess ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-beacon/20 text-beacon flex items-center justify-center mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-3xl text-white font-medium mb-2">
                      Essay Published Live!
                    </h3>
                    <p className="text-sm font-mono text-stone-accent">
                      Added to the front of the horizontal discourse track.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePublish} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-beacon">
                        METADATA & DETAILS
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-accent hover:text-beacon transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{previewMode ? 'Hide Card Preview' : 'Show Card Preview'}</span>
                      </button>
                    </div>

                    {/* Card Preview Dropdown */}
                    {previewMode && (
                      <div className="p-6 rounded-2xl bg-black/60 border border-beacon/30 backdrop-blur-md mb-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-beacon block mb-3 font-semibold">
                          LIVE PREVIEW IN HORIZONTAL TRACK:
                        </span>
                        <div className="p-7 rounded-3xl bg-black/80 border border-white/20 max-w-md">
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] font-mono text-[10px] tracking-widest uppercase text-beacon font-semibold">
                              {category === 'Other' ? customCategory || 'Custom' : category}
                            </span>
                            <span className="font-mono text-xs text-[#d6cebe]">{readTime} read</span>
                          </div>
                          <h4 className="font-serif text-xl text-white font-medium mb-2">
                            {title || 'Your Essay Title Appears Here'}
                          </h4>
                          <p className="text-xs text-[#e2d8cc] leading-relaxed mb-4">
                            {excerpt || 'Your short summary excerpt will appear here.'}
                          </p>
                          <div className="pt-3 border-t border-white/10 font-serif italic text-amber-300 text-xs">
                            "{takeaway || 'Your core takeaway quote.'}"
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                      <div className="sm:col-span-8">
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
                          Essay Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. The Architecture of Long-Term Institutional Trust"
                          className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
                          Estimated Read Time
                        </label>
                        <input
                          type="text"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          placeholder="e.g. 5 min"
                          className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-2">
                        Category Pillar *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                              category === cat
                                ? 'bg-beacon text-black font-semibold shadow-md'
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
                          placeholder="Enter custom category name"
                          className="mt-3 w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2 text-xs text-cream outline-none"
                        />
                      )}
                    </div>

                    {/* Excerpt / Summary */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
                        Card Excerpt / Short Summary * (1-2 sentences)
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Condensed summary displayed on the horizontal scroll card..."
                        className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Core Takeaway Quote */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
                        Key Takeaway Quote (Italicized Callout)
                      </label>
                      <input
                        type="text"
                        value={takeaway}
                        onChange={(e) => setTakeaway(e.target.value)}
                        placeholder="e.g. Build the tracks before running the train."
                        className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                      />
                    </div>

                    {/* Full Essay Body */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-1.5">
                        Full Essay Body * (Markdown supported: ### Headings, - Bullets, **Bold**)
                      </label>
                      <textarea
                        required
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write the full essay here... Use blank lines to separate paragraphs. Use ### for subheadings."
                        className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl p-4 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors font-sans leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-xl shadow-beacon/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publish to Live Discourse Track</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 2: Manage All Essays */}
            {activeTab === 'manage' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-accent">
                    {blogsList.length} Total Essays on Display
                  </span>
                  <span className="text-[11px] font-mono text-beacon">
                    Sorted: Newest First
                  </span>
                </div>

                {blogsList.map((post) => {
                  const isSeed = post.id.startsWith('seed-');
                  return (
                    <div
                      key={post.id}
                      className="p-5 rounded-2xl bg-surface-elevated border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-beacon">
                            {post.category}
                          </span>
                          <span className="font-mono text-xs text-stone-accent">
                            {post.readTime} read
                          </span>
                          <span className="font-mono text-xs text-stone-driftwood">
                            · {post.date}
                          </span>
                          {isSeed ? (
                            <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[9px] uppercase tracking-wider text-stone-driftwood">
                              Seed Archive
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-beacon/20 font-mono text-[9px] uppercase tracking-wider text-beacon font-bold">
                              Custom Post
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-lg text-white font-medium">
                          {post.title}
                        </h4>
                        <p className="text-xs text-stone-accent line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!isSeed && (
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                            title="Delete custom essay"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Backup & Export JSON */}
            {activeTab === 'export' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium mb-1">
                    Export All Blog Data as JSON
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-accent leading-relaxed">
                    Download or copy the current state of all blogs (both seed articles and new custom posts). You can paste this directly into <code className="text-beacon font-mono">src/data/blogs.ts</code> to permanently commit changes to GitHub for all visitors worldwide.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadJson}
                    className="px-5 py-2.5 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 btn-press cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download blogs.json</span>
                  </button>

                  <button
                    onClick={handleCopyJson}
                    className="px-5 py-2.5 rounded-xl bg-surface-elevated hover:bg-white/[0.1] border border-surface-border text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 btn-press cursor-pointer"
                  >
                    {copySuccess ? <Check className="w-4 h-4 text-beacon" /> : <Copy className="w-4 h-4" />}
                    <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
                  </button>
                </div>

                <div className="rounded-2xl bg-black/80 border border-surface-border p-4 font-mono text-[11px] text-[#e2d8cc] max-h-80 overflow-y-auto select-all">
                  <pre>{exportBlogsJson()}</pre>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
