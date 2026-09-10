import React, { useState, useEffect } from 'react';
import { playSoftChime } from '../../utils/audio';

interface WorkDashboardScreenProps {
  onOpenZenBreaks: () => void;
}

export const WorkDashboardScreen: React.FC<WorkDashboardScreenProps> = ({ onOpenZenBreaks }) => {
  const [secondsLeft, setSecondsLeft] = useState(21 * 60 + 38);
  const [isRunning, setIsRunning] = useState(true);
  const [deepWorkShield, setDeepWorkShield] = useState(true);
  const [afterWorkDisconnect, setAfterWorkDisconnect] = useState(true);
  
  // 20-20-20 eye care timer
  const [eyeSeconds, setEyeSeconds] = useState<number | null>(null);

  const totalSeconds = 25 * 60;
  const circumference = 264;
  const progressFraction = (totalSeconds - secondsLeft) / totalSeconds;
  const strokeDashoffset = circumference * (1 - progressFraction);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Eye Care 20s countdown effect
  useEffect(() => {
    let eyeInterval: NodeJS.Timeout;
    if (eyeSeconds !== null && eyeSeconds > 0) {
      eyeInterval = setInterval(() => {
        setEyeSeconds((prev) => {
          if (prev !== null && prev <= 1) {
            playSoftChime();
            return null;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(eyeInterval);
  }, [eyeSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
  };

  const handleBreak = () => {
    setSecondsLeft(5 * 60);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col w-full px-4 py-2 space-y-4 pb-28">
      {/* Top engine status badge */}
      <div className="flex items-center justify-between bg-surface-container-low px-4 py-2 rounded-full shadow-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-[11px] text-primary uppercase font-bold tracking-wider">
            Deep Work Engine Active
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-0.5 rounded-full">
          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">schedule</span>
          <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">9:00 AM – 6:00 PM</span>
        </div>
      </div>

      {/* Screen Title */}
      <div className="space-y-0.5">
        <h1 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          Work Mode &amp; Focus
        </h1>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Distraction-free environment tailored for deep knowledge work.
        </p>
      </div>

      {/* Main Focus Interval Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full mb-3">
          <span className="material-symbols-outlined text-[15px] text-primary">hourglass_top</span>
          <span className="font-label-md text-xs text-on-surface font-medium">
            25 min Focus Interval • Session 3 of 4
          </span>
        </div>

        {/* Circular SVG Timer */}
        <div className="relative w-52 h-52 my-2 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-surface-container"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              className="text-primary transition-all duration-1000 ease-linear"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeDasharray="264"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <div className="flex items-baseline tracking-tight">
              <span className="font-display-lg text-4xl font-extrabold text-on-surface">
                {formatTime(secondsLeft)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1 bg-surface-container-high text-primary px-2.5 py-0.5 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
              <span className="font-label-sm text-[11px] font-bold">Shield Engaged</span>
            </div>
          </div>
        </div>

        {/* Distraction silence indicator */}
        <div className="w-full bg-surface-container-low rounded-xl p-3 mt-2 flex items-start gap-2 text-left">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            do_not_disturb_on
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-body-sm text-xs text-on-surface leading-snug">
              All distracting apps (<span className="font-semibold text-primary">WhatsApp, Reddit, Twitter</span>) are strictly silenced.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          <button
            onClick={handlePause}
            className="flex items-center justify-center gap-1 py-2.5 bg-surface-container text-on-surface font-label-lg text-xs font-bold rounded-xl shadow-xs hover:bg-surface-container-high transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1 py-2.5 bg-surface-container text-on-surface font-label-lg text-xs font-bold rounded-xl shadow-xs hover:bg-surface-container-high transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>Reset</span>
          </button>

          <button
            onClick={handleBreak}
            className="flex items-center justify-center gap-1 py-2.5 bg-secondary-container text-on-secondary-container font-label-lg text-xs font-bold rounded-xl shadow-xs hover:opacity-90 transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">coffee</span>
            <span>5m Break</span>
          </button>
        </div>
      </div>

      {/* Guardrails & Routines */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-title-md text-sm text-on-surface font-bold">Guardrails &amp; Routines</h2>
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">Automatic Protection</span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-3">
          {/* Deep Work Shield */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">security</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-sm text-on-surface font-bold">Deep Work Shield</span>
                  <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                    Active
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Auto-replies: “Currently in Deep Work. Urgent calls bypass via PIN.”
                </p>
              </div>
            </div>

            <button
              onClick={() => setDeepWorkShield(!deepWorkShield)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
                deepWorkShield ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
              type="button"
            >
              <div
                className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                  deepWorkShield ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-surface-container"></div>

          {/* After-Work Disconnect */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px]">bedtime</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-sm text-on-surface font-bold">After-Work Disconnect</span>
                  <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    6:00 PM
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  Slack, Outlook, and work inboxes automatically mute for intentional family downtime.
                </p>
              </div>
            </div>

            <button
              onClick={() => setAfterWorkDisconnect(!afterWorkDisconnect)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
                afterWorkDisconnect ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
              type="button"
            >
              <div
                className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                  afterWorkDisconnect ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 20-20-20 Eye Care Zen Tip Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">visibility</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs text-primary font-bold tracking-wide uppercase">
                20–20–20 Eye Care Zen Tip
              </span>
              <span className="material-symbols-outlined text-outline-variant text-[18px]">spa</span>
            </div>
            <p className="font-title-md text-sm text-on-surface font-bold mt-1">
              Look at an object 20 feet away for 20 seconds.
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Relaxes ocular muscles, mitigates screen strain, and resets cognitive alertness.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setEyeSeconds(20)}
                disabled={eyeSeconds !== null}
                className="px-3 py-1.5 bg-surface-container-lowest text-primary font-label-md text-xs font-bold rounded-xl shadow-xs hover:bg-surface-bright transition-all inline-flex items-center gap-1 active:scale-95 disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>{eyeSeconds !== null ? `Resting: ${eyeSeconds}s...` : 'Start 20s Reset'}</span>
              </button>

              <button
                onClick={onOpenZenBreaks}
                className="px-3 py-1.5 bg-primary/10 text-primary font-label-md text-xs font-bold rounded-xl hover:bg-primary/20 transition-all inline-flex items-center gap-1 active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">self_improvement</span>
                <span>Open Zen Breaks &amp; Paced Chamber</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Ratio & Clean Blocks */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="min-w-0">
            <p className="font-label-sm text-[11px] text-on-surface-variant font-medium">Focus Ratio</p>
            <p className="font-title-md text-base text-on-surface font-extrabold">94.2%</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <div className="min-w-0">
            <p className="font-label-sm text-[11px] text-on-surface-variant font-medium">Clean Blocks</p>
            <p className="font-title-md text-base text-on-surface font-extrabold">3 of 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};
