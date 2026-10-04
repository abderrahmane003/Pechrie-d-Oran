import React from 'react';

interface StripeDividerProps {
  className?: string;
  variant?: 'cyan' | 'gold' | 'subtle';
}

export const StripeDivider: React.FC<StripeDividerProps> = ({
  className = '',
  variant = 'gold',
}) => {
  return (
    <div className={`relative w-full py-4 overflow-hidden flex items-center justify-center ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <div
          className={`flex-1 h-px ${
            variant === 'cyan'
              ? 'bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-500/10'
              : variant === 'gold'
              ? 'bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/10'
              : 'bg-gradient-to-r from-transparent via-stone-800 to-transparent'
          }`}
        />
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        </div>
        <div
          className={`flex-1 h-px ${
            variant === 'cyan'
              ? 'bg-gradient-to-l from-transparent via-cyan-500/40 to-cyan-500/10'
              : variant === 'gold'
              ? 'bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/10'
              : 'bg-gradient-to-l from-transparent via-stone-800 to-transparent'
          }`}
        />
      </div>
    </div>
  );
};
