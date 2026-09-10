import React, { useState, useEffect } from 'react';
import { startAmbientSound, stopAmbientSound, setAmbientVolume } from '../../utils/audio';

interface ActiveFocusSessionScreenProps {
  onPauseRequest: () => void;
  onEndEarlyRequest: () => void;
  onOpenTool: (tool: 'calculator' | 'lexicon' | 'notebook') => void;
}

export const ActiveFocusSessionScreen: React.FC<ActiveFocusSessionScreenProps> = ({
  onPauseRequest,
  onEndEarlyRequest,
  onOpenTool,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(38 * 60 + 21);
  const [isRunning, setIsRunning] = useState(true);
  const [soundscape, setSoundscape] = useState<'rain' | 'library' | 'breeze'>('rain');
  const [volume, setVolume] = useState(65);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const totalSeconds = 45 * 60;
  const circumference = 628.3;
  const progressRatio = (totalSeconds - secondsLeft) / totalSeconds;
  const strokeDashoffset = circumference * (1 - progressRatio);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Audio control
  const toggleAudio = (type?: 'rain' | 'library' | 'breeze') => {
    const selected = type || soundscape;
    if (type) setSoundscape(type);

    if (isPlayingAudio && !type) {
      stopAmbientSound();
      setIsPlayingAudio(false);
    } else {
      startAmbientSound(selected, volume / 100);
      setIsPlayingAudio(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setAmbientVolume(newVol / 100);
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Top Session Meta Bar */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed-dim opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="font-label-sm text-[11px] font-bold tracking-wider text-primary uppercase">
              Strict Study Shield Active
            </span>
          </div>
          <span className="font-label-md text-xs font-medium text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
            Session 2 of 3
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              Active Target
            </p>
            <h2 className="font-headline-sm text-lg text-on-surface font-bold">
              Mathematics — Calculus Revision
            </h2>
          </div>
          <span className="material-symbols-outlined text-primary p-2 bg-surface-container-low rounded-xl shadow-xs">
            functions
          </span>
        </div>
      </div>

      {/* Central Focus Timer Ring */}
      <div className="px-4 mt-4 flex flex-col items-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-4 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
          
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
            <circle
              className="text-surface-container-high"
              cx="120"
              cy="120"
              fill="transparent"
              r="100"
              stroke="currentColor"
              strokeWidth="12"
            />
            <circle
              className="text-primary transition-all duration-1000 ease-linear"
              cx="120"
              cy="120"
              fill="transparent"
              r="100"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="12"
            />
            <circle className="text-secondary-fixed fill-current" cx="120" cy="20" r="4" />
            <circle className="text-secondary-fixed fill-current" cx="218" cy="100" r="4" />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-on-surface-variant font-medium mb-1">
              Time Remaining
            </span>
            <span className="font-display-lg text-4xl font-extrabold tracking-tight text-on-surface">
              {formatTime(secondsLeft)}
            </span>
            <span className="font-label-md text-xs text-on-surface-variant mt-1">
              Target: 45:00 min
            </span>
          </div>
        </div>

        {/* Protection Pill */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant shadow-xs">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span className="font-label-sm text-xs font-medium">
            Strict Whitelist Enforced • 14 Distracting Apps Blocked
          </span>
        </div>
      </div>

      {/* Realtime Stats Bento Grid */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-2">
        <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs flex flex-col items-center text-center">
          <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary mb-1">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <span className="font-headline-sm text-base font-bold text-on-surface">98%</span>
          <span className="font-label-sm text-[11px] text-on-surface-variant">Focus Score</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs flex flex-col items-center text-center">
          <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-1">
            <span className="material-symbols-outlined text-[18px]">sports_esports</span>
          </div>
          <span className="font-headline-sm text-base font-bold text-secondary">+9.5m</span>
          <span className="font-label-sm text-[11px] text-on-surface-variant">Game Time</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs flex flex-col items-center text-center">
          <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary mb-1">
            <span className="material-symbols-outlined text-[18px]">shield</span>
          </div>
          <span className="font-headline-sm text-base font-bold text-on-surface">0</span>
          <span className="font-label-sm text-[11px] text-on-surface-variant">Interrupted</span>
        </div>
      </div>

      {/* Ambient Soundscape Card */}
      <div className="px-4 mt-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAudio()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isPlayingAudio ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-primary'
                }`}
                aria-label="Toggle ambient sound"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isPlayingAudio ? 'pause' : 'graphic_eq'}
                </span>
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-sm font-semibold text-on-surface capitalize">
                    {soundscape === 'rain' ? 'Rain in Forest' : soundscape === 'library' ? 'Quiet Library' : 'Gentle Breeze'}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-primary animate-pulse' : 'bg-outline-variant'}`}></span>
                </div>
                <p className="font-label-sm text-xs text-on-surface-variant">
                  Binaural Alpha Waves (432Hz)
                </p>
              </div>
            </div>

            {/* Audio Waveform Graphic */}
            <div className="flex items-end gap-1 h-5 px-2">
              <span className={`w-1 bg-primary rounded-full transition-all ${isPlayingAudio ? 'animate-pulse h-3' : 'h-1.5 opacity-40'}`}></span>
              <span className={`w-1 bg-primary rounded-full transition-all ${isPlayingAudio ? 'animate-pulse h-5' : 'h-2 opacity-40'}`} style={{ animationDelay: '150ms' }}></span>
              <span className={`w-1 bg-primary rounded-full transition-all ${isPlayingAudio ? 'animate-pulse h-2' : 'h-1 opacity-40'}`} style={{ animationDelay: '300ms' }}></span>
              <span className={`w-1 bg-primary rounded-full transition-all ${isPlayingAudio ? 'animate-pulse h-4' : 'h-2 opacity-40'}`} style={{ animationDelay: '450ms' }}></span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 pt-1">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">volume_down</span>
            <div className="relative w-full flex items-center">
              <input
                aria-label="Soundscape Volume"
                className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
                max={100}
                min={0}
                type="range"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
              />
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">volume_up</span>
          </div>

          {/* Soundscape Quick Switcher Chips */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => toggleAudio('rain')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
                soundscape === 'rain' && isPlayingAudio
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span>🌧️</span> Soft Rain
            </button>
            <button
              onClick={() => toggleAudio('library')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 transition-all ${
                soundscape === 'library' && isPlayingAudio
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span>☕</span> Quiet Library
            </button>
            <button
              onClick={() => toggleAudio('breeze')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 transition-all ${
                soundscape === 'breeze' && isPlayingAudio
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <span>🍃</span> Gentle Breeze
            </button>
          </div>
        </div>
      </div>

      {/* Allowed Quick-Access Floating Dock */}
      <div className="px-4 mt-4">
        <div className="bg-surface-container-high/60 backdrop-blur-md p-3.5 rounded-2xl shadow-xs flex flex-col gap-2 border border-surface-container-highest">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-sm text-xs font-bold tracking-wider text-on-surface-variant uppercase">
              Whitelist Dock (3 Allowed)
            </span>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">lock_open_right</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onOpenTool('calculator')}
              className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
              type="button"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <span className="font-label-sm text-xs font-medium text-on-surface">Calculator</span>
            </button>

            <button
              onClick={() => onOpenTool('lexicon')}
              className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
              type="button"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <span className="font-label-sm text-xs font-medium text-on-surface">Lexicon</span>
            </button>

            <button
              onClick={() => onOpenTool('notebook')}
              className="bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
              type="button"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
              </div>
              <span className="font-label-sm text-xs font-medium text-on-surface">Notebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="px-4 mt-4 flex flex-col gap-2.5">
        <button
          onClick={onPauseRequest}
          className="w-full py-3.5 px-4 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-primary font-label-lg text-sm font-bold shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">lock_clock</span>
          <span>Pause Session (Student PIN Required)</span>
        </button>

        <button
          onClick={onEndEarlyRequest}
          className="w-full py-3 px-4 rounded-xl bg-transparent text-on-surface-variant hover:bg-surface-container font-label-md text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">key</span>
          <span>End Session Early (Parent PIN Required)</span>
        </button>
      </div>
    </div>
  );
};
