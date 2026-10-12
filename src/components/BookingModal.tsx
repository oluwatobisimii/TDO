import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calendar, Briefcase, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'speaking' | 'consulting' | 'general';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialType = 'general',
}) => {
  const [inquiryType, setInquiryType] = useState<'speaking' | 'consulting' | 'general'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventDate: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fde047', '#ffedd7', '#ffffff'],
    });

    setTimeout(() => {
      // Optional auto-close or keep success view
    }, 4000);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-surface border border-surface-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden modal-enter">
        {/* Glow ambient header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beacon to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-beacon/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-stone-accent hover:text-cream p-1.5 rounded-lg hover:bg-surface-elevated active:scale-90 transition-[transform,background-color] duration-150 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-beacon/20 text-beacon flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-3xl font-medium text-cream mb-2">
              Message Received
            </h3>
            <p className="text-stone-accent max-w-sm mb-6 text-sm">
              Thank you for reaching out to Dolapo Olutoye. His team will review your inquiry and get back to you shortly.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 bg-surface-elevated border border-surface-border hover:border-beacon/40 rounded-full text-cream text-sm font-medium btn-press cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest font-mono text-beacon flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                INITIATE ENGAGEMENT
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-cream">
                Let's Build Something That Matters
              </h2>
              <p className="text-stone-accent text-xs sm:text-sm mt-1">
                Share details about your event, business advisory, or corporate workshop.
              </p>
            </div>

            {/* Type Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-surface-elevated rounded-xl border border-surface-border mb-3">
              <button
                type="button"
                onClick={() => setInquiryType('speaking')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 btn-press cursor-pointer ${
                  inquiryType === 'speaking'
                    ? 'bg-beacon text-black shadow scale-[1.01] font-semibold'
                    : 'text-stone-accent hover:text-cream'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Speaking
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('consulting')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 btn-press cursor-pointer ${
                  inquiryType === 'consulting'
                    ? 'bg-beacon text-black shadow scale-[1.01] font-semibold'
                    : 'text-stone-accent hover:text-cream'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Advisory
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('general')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 btn-press cursor-pointer ${
                  inquiryType === 'general'
                    ? 'bg-beacon text-black shadow scale-[1.01] font-semibold'
                    : 'text-stone-accent hover:text-cream'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                General
              </button>
            </div>

            {/* Subtle Scope Feedback on Switch */}
            <div key={inquiryType} className="tab-pane-enter text-[11px] font-mono text-beacon mb-5 px-3 py-1.5 rounded-lg bg-surface-elevated/70 border border-beacon/20 flex items-center justify-between">
              <span>
                {inquiryType === 'speaking' && '🎯 Keynote address or conference panel'}
                {inquiryType === 'consulting' && '⚙️ Enterprise workflow or venture strategy audit'}
                {inquiryType === 'general' && '💬 Strategic collaboration or general inquiry'}
              </span>
              <span className="text-[10px] text-stone-accent uppercase tracking-wider">SELECTED SCOPE</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-stone-accent mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adeola Johnson"
                    className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-stone-accent mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="adeola@company.com"
                    className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-stone-accent mb-1.5">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Organization name"
                    className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-stone-accent mb-1.5">
                    Target Date / Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="e.g. Q3 2026 or Nov 15"
                    className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-stone-accent mb-1.5">
                  Scope & Objectives *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your audience, event format, business challenges, or keynote topic..."
                  className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-beacon hover:bg-beacon-light text-black font-medium text-sm rounded-xl flex items-center justify-center gap-2 btn-press shadow-lg shadow-beacon/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry to Dolapo Olutoye
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
