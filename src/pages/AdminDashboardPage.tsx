import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, ExternalLink, Search, Download, Copy, 
  Check, ArrowLeft, LogOut, BookOpen, Layers, Clock, Sparkles, Filter
} from 'lucide-react';
import { BlogPost, getStoredBlogs, deleteStoredBlog, exportBlogsJson } from '../data/blogs';
import { logoutAdmin } from '../utils/auth';

interface AdminDashboardPageProps {
  onCreateNew: () => void;
  onEditBlog: (id: string) => void;
  onViewBlog: (slug: string) => void;
  onBackToHome: () => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onCreateNew,
  onEditBlog,
  onViewBlog,
  onBackToHome,
  onLogout,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    refreshList();
    window.addEventListener('tdo_blogs_updated', refreshList);
    return () => window.removeEventListener('tdo_blogs_updated', refreshList);
  }, []);

  const refreshList = () => {
    setBlogs(getStoredBlogs());
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteStoredBlog(id);
      refreshList();
    }
  };

  const handleCopyJson = () => {
    const json = exportBlogsJson();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const customCount = blogs.filter(b => !b.id.startsWith('seed-')).length;

  return (
    <div className="min-h-screen bg-[#070b12] text-cream flex flex-col selection:bg-beacon selection:text-black">
      {/* Top Navbar */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 bg-surface/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/lighthouse_monogram.svg"
            alt="Dolapo Olutoye Monogram"
            className="w-7 h-7 filter invert opacity-90"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-white font-medium">Dolapo Olutoye</span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-xs text-beacon uppercase tracking-wider font-semibold">CMS Dashboard</span>
            </div>
            <span className="text-[11px] font-mono text-stone-accent hidden sm:block">
              Waypoint 03 // Discourse & Intellectual Frameworks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Website</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 transition-all cursor-pointer"
            title="Log out and lock studio"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-8 sm:py-12 space-y-8">
        
        {/* Top Header & Actions Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border mb-3 font-mono text-xs uppercase tracking-widest text-beacon">
              <Sparkles className="w-3.5 h-3.5" />
              EDITORIAL REPOSITORY
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Published Essays & Dispatches
            </h1>
            <p className="text-stone-accent text-sm sm:text-base mt-1">
              Manage articles, draft new perspectives, edit HTML content, or export repository backups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadJson}
              className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-white/[0.1] border border-surface-border text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              title="Download blogs.json backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-white/[0.1] border border-surface-border text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              title="Copy JSON data to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-beacon" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Data'}</span>
            </button>

            <button
              onClick={onCreateNew}
              className="px-5 py-2.5 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-lg shadow-beacon/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Essay</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-beacon/15 border border-beacon/30 flex items-center justify-center text-beacon">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-stone-accent uppercase tracking-wider block">Total Essays</span>
              <span className="font-serif text-3xl text-white font-normal">{blogs.length}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-stone-accent uppercase tracking-wider block">Custom Authored</span>
              <span className="font-serif text-3xl text-white font-normal">{customCount}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-stone-accent uppercase tracking-wider block">Categories</span>
              <span className="font-serif text-3xl text-white font-normal">{categories.length - 1}</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-surface/80 border border-surface-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-accent absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays by title or keyword..."
              className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-beacon text-black font-bold shadow'
                    : 'bg-surface-elevated text-stone-accent hover:text-white border border-surface-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Table / Cards */}
        <div className="space-y-3">
          {filteredBlogs.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-white/10 bg-surface/40">
              <BookOpen className="w-10 h-10 text-stone-accent/50 mx-auto mb-3" />
              <h3 className="font-serif text-xl text-white mb-1">No essays found</h3>
              <p className="text-xs sm:text-sm text-stone-accent max-w-sm mx-auto mb-4">
                No articles matched your search criteria. Try a different query or clear filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                className="px-4 py-2 rounded-xl bg-surface-elevated text-xs font-mono uppercase text-beacon border border-beacon/30 hover:bg-surface"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredBlogs.map((post) => {
              const isSeed = post.id.startsWith('seed-');
              return (
                <div
                  key={post.id}
                  className="p-5 sm:p-6 rounded-2xl bg-surface/90 border border-surface-border hover:border-beacon/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-beacon font-semibold">
                        {post.category}
                      </span>
                      <span className="text-stone-accent text-xs font-mono">{post.readTime} read</span>
                      <span className="text-stone-driftwood text-xs font-mono">· {post.date}</span>
                      {isSeed ? (
                        <span className="px-2 py-0.5 rounded bg-white/[0.06] text-stone-driftwood text-[9px] font-mono uppercase tracking-wider">
                          Seed Archive
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-beacon/20 text-beacon text-[9px] font-mono uppercase tracking-wider font-bold">
                          Custom Published
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-beacon transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-accent line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* View Live */}
                    <button
                      onClick={() => onViewBlog(post.slug)}
                      className="px-3 py-2 rounded-xl bg-surface-elevated hover:bg-white/[0.1] border border-surface-border text-stone-accent hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Read full article"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    {/* Edit Blog */}
                    <button
                      onClick={() => onEditBlog(post.id)}
                      className="px-3.5 py-2 rounded-xl bg-beacon/15 hover:bg-beacon/25 border border-beacon/30 text-beacon text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer font-semibold"
                      title="Edit article with WYSIWYG editor"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Custom Blog */}
                    {!isSeed && (
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                        title="Delete essay"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
};
