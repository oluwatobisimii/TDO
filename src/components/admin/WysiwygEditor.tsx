import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, Link2, Undo, Redo, 
  RemoveFormatting, CodeXml, Eye, Minus
} from 'lucide-react';

interface WysiwygEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your thought leadership essay here...',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceValue, setSourceValue] = useState(value);

  // Sync external value to contentEditable when not focused
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setSourceValue(value);
  }, [value, isSourceMode]);

  const exec = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setSourceValue(html);
    }
  };

  const handleLink = () => {
    const url = prompt('Enter link URL (e.g. https://...):');
    if (url) {
      exec('createLink', url);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    setSourceValue(html);
    onChange(html);
  };

  const toolbarButtons = [
    { label: 'Bold', icon: Bold, action: () => exec('bold') },
    { label: 'Italic', icon: Italic, action: () => exec('italic') },
    { label: 'Underline', icon: Underline, action: () => exec('underline') },
    { label: 'Strike', icon: Strikethrough, action: () => exec('strikeThrough') },
    { type: 'separator' },
    { label: 'Heading 2', icon: Heading2, action: () => exec('formatBlock', '<h2>') },
    { label: 'Heading 3', icon: Heading3, action: () => exec('formatBlock', '<h3>') },
    { type: 'separator' },
    { label: 'Bullet List', icon: List, action: () => exec('insertUnorderedList') },
    { label: 'Numbered List', icon: ListOrdered, action: () => exec('insertOrderedList') },
    { label: 'Quote', icon: Quote, action: () => exec('formatBlock', '<blockquote>') },
    { label: 'Divider', icon: Minus, action: () => exec('insertHorizontalRule') },
    { label: 'Link', icon: Link2, action: handleLink },
    { type: 'separator' },
    { label: 'Clear Style', icon: RemoveFormatting, action: () => exec('removeFormat') },
    { label: 'Undo', icon: Undo, action: () => exec('undo') },
    { label: 'Redo', icon: Redo, action: () => exec('redo') },
  ];

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden shadow-lg focus-within:border-beacon/50 transition-colors">
      {/* Sticky WYSIWYG Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-black/60 border-b border-surface-border backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarButtons.map((btn, idx) => {
            if (btn.type === 'separator') {
              return <div key={idx} className="w-px h-5 bg-white/10 mx-1" />;
            }
            const Icon = btn.icon!;
            return (
              <button
                key={idx}
                type="button"
                onClick={btn.action}
                disabled={isSourceMode}
                title={btn.label}
                className="p-2 rounded-lg text-stone-accent hover:text-white hover:bg-white/[0.08] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Source Mode Toggle */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <button
            type="button"
            onClick={() => setIsSourceMode(!isSourceMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isSourceMode
                ? 'bg-beacon text-black font-bold shadow'
                : 'text-stone-accent hover:text-white hover:bg-white/[0.08]'
            }`}
            title="Toggle Raw HTML Source Code"
          >
            {isSourceMode ? <Eye className="w-3.5 h-3.5" /> : <CodeXml className="w-3.5 h-3.5" />}
            <span>{isSourceMode ? 'Visual Mode' : 'HTML Source'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {isSourceMode ? (
        <textarea
          value={sourceValue}
          onChange={handleSourceChange}
          placeholder="Paste or write raw HTML code here..."
          className="w-full min-h-[420px] p-6 bg-black/80 font-mono text-xs text-amber-200 focus:outline-none resize-y leading-relaxed"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          className="wysiwyg-content min-h-[420px] p-6 text-white focus:outline-none prose prose-invert max-w-none text-base sm:text-lg leading-[1.8] font-serif cursor-text"
        />
      )}
    </div>
  );
};
