import React, { useState } from 'react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const [callingNumber, setCallingNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-3 border-b border-surface-container-highest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">sos</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">Emergency Safe Harbor</h2>
              <p className="font-body-sm text-xs text-on-surface-variant">Permanent Whitelist • Never Blocked</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {callingNumber ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-error/15 text-error flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-[32px]">call</span>
            </div>
            <div>
              <h3 className="font-title-md text-base font-semibold text-on-surface">Connecting Emergency Call...</h3>
              <p className="font-headline-md text-xl font-bold text-error mt-1">{callingNumber}</p>
              <p className="font-body-sm text-xs text-on-surface-variant mt-2">Guaranteed uninterrupted 24/7 safe harbor line.</p>
            </div>
            <button
              onClick={() => setCallingNumber(null)}
              className="mt-4 px-6 py-2.5 rounded-full bg-error text-on-error font-label-md text-sm font-semibold shadow-md active:scale-95 transition-transform"
            >
              End Call Simulator
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Primary Dispatch */}
            <div className="bg-error-container/40 p-4 rounded-xl flex items-center justify-between border border-error/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">e911_emergency</span>
                </div>
                <div>
                  <h4 className="font-title-md text-sm font-bold text-on-surface">Emergency Dispatch (911 / 112)</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">Police, Ambulance, Fire Dispatch</p>
                </div>
              </div>
              <button 
                onClick={() => setCallingNumber('911 / 112 Dispatch')}
                className="px-3.5 py-2 rounded-lg bg-error text-on-error font-label-md text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Dial
              </button>
            </div>

            {/* ICE Contacts */}
            <div className="space-y-2">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
                In Case of Emergency (ICE) Contacts
              </span>
              
              <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </div>
                  <div>
                    <p className="font-title-md text-sm font-semibold text-on-surface">Father</p>
                    <p className="font-body-sm text-xs text-on-surface-variant">+1 555-0192</p>
                  </div>
                </div>
                <button
                  onClick={() => setCallingNumber('+1 555-0192 (Father)')}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-label-sm text-xs font-bold flex items-center gap-1 hover:bg-surface-container-high active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">phone</span>
                  Call
                </button>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </div>
                  <div>
                    <p className="font-title-md text-sm font-semibold text-on-surface">Mother</p>
                    <p className="font-body-sm text-xs text-on-surface-variant">+1 555-0144</p>
                  </div>
                </div>
                <button
                  onClick={() => setCallingNumber('+1 555-0144 (Mother)')}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-label-sm text-xs font-bold flex items-center gap-1 hover:bg-surface-container-high active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">phone</span>
                  Call
                </button>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-center">
              <p className="font-body-sm text-xs text-on-surface-variant">
                Emergency calls bypass ZenFocus strict shielding at all times with zero PIN requirements.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
