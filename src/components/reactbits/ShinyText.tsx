import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative text-transparent bg-clip-text bg-[linear-gradient(110deg,#a8a29e,45%,#ffffff,55%,#a8a29e)] bg-[length:250%_100%] ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        animation: disabled
          ? 'none'
          : `shine ${animationDuration} linear infinite`,
      }}
    >
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {text}
    </span>
  );
};
