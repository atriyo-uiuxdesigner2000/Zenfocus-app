import React from 'react';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onOpenSos: () => void;
  onOpenProfile?: () => void;
}

export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UcJTNveyNpEqYQUDhHHWUDICp7pyifInpcKPBd6DXa0OOJqUIMF69eo0u9gblyoPQ4gW_CcCpMuZpQfGGcsBHLUXqVmAZJhkJ__n0KMs7DCMrI11QP7MNC6acnrvEc6WfH9EofPZsz_pdYvaWvlGNplQUWtzxHPeVVdXXzr3PlN4nKDPRkkc5kFSo3OPP68QWJA9Mua-4z4SaW5iZgwWwwS4Q8Mu5u2qFhtipBVT0Z1l9wMqhaydS3llk';

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'ZenFocus',
  subtitle,
  onBack,
  onOpenSos,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {onBack ? (
            <button
              aria-label="Go Back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shrink-0"
              onClick={onBack}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <img
            alt="ZenFocus Logo"
            className="h-7 w-auto object-contain shrink-0"
            src={BRAND_LOGO_URL}
          />
          <h1 className="font-title-md text-base font-semibold text-on-surface tracking-tight truncate max-w-[190px]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {subtitle && (
            <span className="font-label-md text-xs text-on-surface-variant hidden sm:inline-block">
              {subtitle}
            </span>
          )}

          <button
            aria-label="Emergency SOS Contact"
            className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error hover:bg-error/20 transition-colors active:scale-95"
            type="button"
            onClick={onOpenSos}
          >
            <span className="material-symbols-outlined text-[20px]">sos</span>
          </button>

          <button
            aria-label="Profile and settings"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary active:scale-95 transition-transform"
            onClick={onOpenProfile}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
