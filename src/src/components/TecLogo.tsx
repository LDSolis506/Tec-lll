import React from 'react';

interface TecLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const TecLogo: React.FC<TecLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[9px] min-h-[32px]',
    md: 'px-3 py-1.5 text-xs min-h-[44px]',
    lg: 'px-4 py-2.5 text-sm min-h-[64px]',
    xl: 'px-6 py-4 text-base min-h-[96px]',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subTextSizes = {
    sm: 'text-[7px] sm:text-[8px]',
    md: 'text-[8px] sm:text-[9px]',
    lg: 'text-[10px] sm:text-[11px]',
    xl: 'text-[11px] sm:text-[12px]',
  };

  return (
    <div
      className={`bg-[#08152e] text-white font-serif rounded-2xl flex flex-col items-center justify-center shadow-lg border border-blue-900/60 select-none inline-flex shrink-0 ${sizeStyles[size]} ${className}`}
    >
      <div className="flex items-center gap-2 justify-center w-full px-1">
        <span className={`font-black tracking-wider text-white font-serif leading-none ${textSizes[size]}`}>
          TEC
        </span>
        <div className="w-[2px] h-4 sm:h-5 bg-red-600 rounded-full my-auto shrink-0" />
        <div className={`flex flex-col font-sans font-semibold text-slate-200 leading-tight text-left shrink-0 ${subTextSizes[size]}`}>
          <span>Tecnológico</span>
          <span>de Costa Rica</span>
        </div>
      </div>
      {showSubtitle && (
        <div className={`mt-1 tracking-[0.25em] font-sans font-bold text-slate-300 border-t border-blue-900/80 pt-1 w-full text-center ${subTextSizes[size]}`}>
          FUNDATEC
        </div>
      )}
    </div>
  );
};
