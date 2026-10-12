import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: 'fade-up' | 'scale' | 'fade';
  as?: 'div' | 'span' | 'section' | 'article' | 'h2' | 'h3' | 'p' | 'li';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  type = 'fade-up',
  as: Component = 'div',
}) => {
  const ref = useRef<any>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in initial viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      // Small timeout to allow mount styles to establish
      const timer = setTimeout(() => setIsRevealed(true), 40 + delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  let typeClass = 'scroll-reveal';
  if (type === 'scale') typeClass = 'scale-reveal';
  if (type === 'fade') typeClass = 'fade-reveal';

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`${typeClass} ${isRevealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};
