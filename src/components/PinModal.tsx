import React, { useState } from 'react';

interface PinModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  expectedPin?: string;
  mode?: 'verify' | 'change';
  onSuccess: (newPin?: string) => void;
  onClose: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  title = 'Enter 4-Digit Master PIN',
  subtitle = 'Security authorization required',
  expectedPin = '2468',
  mode = 'verify',
  onSuccess,
  onClose,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [confirmingNewPin, setConfirmingNewPin] = useState(false);
  const [firstNewPin, setFirstNewPin] = useState('');

  if (!isOpen) return null;

  const handleKeyClick = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(null);

      if (nextPin.length === 4) {
        if (mode === 'verify') {
          if (nextPin === expectedPin || expectedPin === 'ANY') {
            setTimeout(() => {
              onSuccess();
              setPin('');
              setError(null);
            }, 250);
          } else {
            setError('Incorrect PIN. Try again (Default: 2468)');
            setTimeout(() => setPin(''), 500);
          }
        } else if (mode === 'change') {
          if (!confirmingNewPin) {
            setFirstNewPin(nextPin);
            setConfirmingNewPin(true);
            setPin('');
          } else {
            if (nextPin === firstNewPin) {
              onSuccess(nextPin);
              setPin('');
              setConfirmingNewPin(false);
            } else {
              setError('PINs do not match. Restarting.');
              setConfirmingNewPin(false);
              setPin('');
              setFirstNewPin('');
            }
          }
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xs bg-surface rounded-3xl p-6 shadow-2xl border border-outline-variant/30 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed mx-auto flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[24px]">lock</span>
        </div>

        <h3 className="font-headline-sm text-base font-bold text-on-surface">
          {confirmingNewPin ? 'Confirm New 4-Digit PIN' : title}
        </h3>
        <p className="font-body-sm text-xs text-on-surface-variant mt-1">
          {confirmingNewPin ? 'Re-enter your 4 digits to confirm' : subtitle}
        </p>

        {/* PIN visual dots */}
        <div className="flex items-center justify-center gap-3 my-5">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled ? 'bg-primary scale-110' : 'bg-surface-container-highest border border-outline-variant'
                }`}
              />
            );
          })}
        </div>

        {error && (
          <p className="font-label-sm text-xs text-error font-medium mb-3 animate-shake">
            {error}
          </p>
        )}

        {/* Numerical Keypad */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyClick(digit)}
              className="h-12 rounded-xl bg-surface-container text-on-surface font-headline-sm text-lg font-semibold hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center shadow-xs"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => {
              setPin('');
              setError(null);
              onClose();
            }}
            className="h-12 rounded-xl text-on-surface-variant font-label-md text-xs hover:bg-surface-container transition-colors flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={() => handleKeyClick('0')}
            className="h-12 rounded-xl bg-surface-container text-on-surface font-headline-sm text-lg font-semibold hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center shadow-xs"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-12 rounded-xl text-on-surface-variant hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center"
            aria-label="Delete last digit"
          >
            <span className="material-symbols-outlined text-[20px]">backspace</span>
          </button>
        </div>

        <p className="font-label-sm text-[11px] text-on-surface-variant/80 mt-4">
          Demo Default PIN is <span className="font-bold text-primary">2468</span>
        </p>
      </div>
    </div>
  );
};
