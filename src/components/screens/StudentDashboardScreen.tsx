import React from 'react';

interface StudentDashboardScreenProps {
  timeBankBalance: number;
  onStartSession: () => void;
  onOpenTimeBank: () => void;
  onOpenTool: (tool: 'calculator' | 'lexicon' | 'notebook') => void;
  onOpenSos: () => void;
  onTriggerLockedNotice: (appName: string) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({
  timeBankBalance,
  onStartSession,
  onOpenTimeBank,
  onOpenTool,
  onOpenSos,
  onTriggerLockedNotice,
}) => {
  return (
    <div className="flex flex-col w-full px-4 space-y-4 pb-28 pt-2">
      {/* Status meta tags */}
      <div className="flex items-center justify-between mt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container shadow-xs">
          <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
          <span className="font-label-sm text-[11px] uppercase tracking-wider font-semibold">
            Focus Shield Armed
          </span>
        </div>
        <span className="font-label-md text-xs px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
          Term 2 Exam Prep
        </span>
      </div>

      {/* Greeting headline */}
      <div className="space-y-1">
        <h1 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          Hey Rahul! Ready for focused learning?
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Your study zone is shielded. Quiet ambient mode active.
        </p>
      </div>

      {/* Streak Booster Banner */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary-container text-on-secondary-container shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest/80 flex items-center justify-center shrink-0 shadow-xs text-secondary">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-title-md text-sm font-bold truncate">5 Day Study Streak</p>
            <p className="font-body-sm text-xs opacity-90 truncate">+15m Bonus Unlocked</p>
          </div>
        </div>
        <span className="font-label-md text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 text-on-surface font-semibold shadow-xs shrink-0">
          Boosted
        </span>
      </div>

      {/* Circular Progress Gauge */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-lowest shadow-xs relative overflow-hidden">
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="studyProgressGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#11562a" />
                <stop offset="65%" stopColor="#2e6f40" />
                <stop offset="100%" stopColor="#e7c355" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" fill="transparent" r="42" stroke="#e3f2e3" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="url(#studyProgressGradient)"
              strokeDasharray="264"
              strokeDashoffset="66"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <circle cx="50" cy="8" fill="#ffd969" r="2.5" />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold mb-1">
              75% Target
            </span>
            <span className="font-display-lg text-3xl font-extrabold text-on-surface leading-none tracking-tight">
              2h 15m
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant mt-1 font-medium">
              of 3h Goal
            </span>
          </div>
        </div>

        {/* Dual stat boxes */}
        <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-2">
          <div className="flex flex-col items-center p-3 rounded-xl bg-surface-container-low text-center">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Session Total
            </span>
            <span className="font-title-md text-sm text-primary font-bold mt-1">135 mins focused</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-surface-container-low text-center">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Remaining
            </span>
            <span className="font-title-md text-sm text-secondary font-bold mt-1">45 mins left</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onStartSession}
        className="w-full py-4 px-4 rounded-2xl bg-primary text-on-primary font-title-md text-base font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:bg-primary/90"
        type="button"
      >
        <span className="material-symbols-outlined text-[24px]">play_circle</span>
        <span>Start Study Session</span>
      </button>

      {/* Time Bank Card */}
      <div 
        onClick={onOpenTimeBank}
        className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs space-y-3 cursor-pointer hover:bg-surface-container-lowest/80 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              monetization_on
            </span>
            <h2 className="font-title-md text-sm text-on-surface font-bold">+{timeBankBalance} Mins Time Bank</h2>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold">
            Available Now: {timeBankBalance}m
          </span>
        </div>

        <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
          <div className="bg-secondary h-2.5 rounded-full transition-all" style={{ width: `${Math.min(100, (timeBankBalance / 60) * 100)}%` }}></div>
        </div>

        <div className="flex items-start gap-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] mt-0.5 text-secondary">info</span>
          <p className="font-body-sm text-xs">Rule: 1 hr study = 15 mins game/video time earned</p>
        </div>
      </div>

      {/* Allowed Study Apps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-sm text-on-surface font-bold">Allowed Study Apps</h3>
          <span className="font-label-sm text-xs text-primary font-semibold">4 Whitelisted</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenTool('calculator')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs text-left active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <span className="font-label-lg text-xs text-on-surface font-semibold truncate">Calculator</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </button>

          <button
            onClick={() => onOpenTool('lexicon')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs text-left active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <span className="font-label-lg text-xs text-on-surface font-semibold truncate">Oxford Lexicon</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </button>

          <button
            onClick={() => onOpenTool('notebook')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs text-left active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
              <span className="font-label-lg text-xs text-on-surface font-semibold truncate">Khan Academy</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </button>

          <button
            onClick={() => onOpenTool('notebook')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs text-left active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">domain</span>
              </div>
              <span className="font-label-lg text-xs text-on-surface font-semibold truncate">School Portal</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </button>
        </div>
      </div>

      {/* Locked Distractions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-sm text-on-surface font-bold">Locked Distractions</h3>
          <span className="font-label-sm text-xs text-outline font-medium">Session Restricted</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {['YouTube', 'Free Fire', 'Instagram'].map((app) => (
            <button
              key={app}
              onClick={() => onTriggerLockedNotice(app)}
              className="flex-1 min-w-[100px] flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high opacity-85 shadow-xs active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant mb-1">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <span className="font-label-md text-xs text-on-surface font-medium">{app}</span>
              <span className="font-label-sm text-[11px] text-error font-semibold mt-0.5">Locked</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overnight Lock Card */}
      <div className="p-4 rounded-2xl bg-surface-container text-on-surface shadow-xs flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[22px]">bedtime</span>
        </div>
        <div className="min-w-0">
          <h4 className="font-title-md text-sm font-bold text-on-surface">Overnight Lock at 10:00 PM</h4>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
            Gentle wind-down begins 30m prior to dim visual stimulation.
          </p>
        </div>
      </div>

      {/* SOS Active bar */}
      <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">call</span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant font-medium truncate">
            Emergency Dial Allowed at any time
          </p>
        </div>
        <button
          onClick={onOpenSos}
          className="font-label-sm text-xs font-bold text-error px-2.5 py-1 rounded bg-error-container/40 shrink-0 hover:bg-error-container transition-colors"
          type="button"
        >
          SOS Active
        </button>
      </div>
    </div>
  );
};
