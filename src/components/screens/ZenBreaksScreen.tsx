import React, { useState, useEffect } from 'react';
import { playTempleBell } from '../../utils/audio';

export const ZenBreaksScreen: React.FC = () => {
  // Paced Breathing State (Inhale 4s, Hold 4s, Exhale 4s)
  const phases = [
    { text: 'Inhale', desc: 'Breathe In (4s)', scale: 'scale-110' },
    { text: 'Hold', desc: 'Hold Stillness (4s)', scale: 'scale-110' },
    { text: 'Exhale', desc: 'Slowly Exhale (4s)', scale: 'scale-90' },
  ];
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [breathCount, setBreathCount] = useState(4);

  // 20-20-20 Timer state
  const [eyeRestSeconds, setEyeRestSeconds] = useState(14 * 60 + 20);
  const [isRestingEarly, setIsRestingEarly] = useState(false);

  // Micro habits check state
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const breathInterval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => (p + 1) % phases.length);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breathInterval);
  }, [phases.length]);

  useEffect(() => {
    const eyeInterval = setInterval(() => {
      setEyeRestSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(eyeInterval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSnooze = () => {
    setEyeRestSeconds((prev) => prev + 5 * 60);
  };

  const handlePauseNow = () => {
    setIsRestingEarly(true);
    setEyeRestSeconds(20);
  };

  const currentPhase = phases[phaseIndex];

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4">
      {/* Intro Header */}
      <section className="flex flex-col pt-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[18px]">spa</span>
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold">
            Mindful Recovery
          </span>
        </div>
        <h2 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          Zen Break &amp; Eye Health
        </h2>
        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
          Prevent optical strain, mental fatigue, and sustain natural energy during long screen hours.
        </p>
      </section>

      {/* Paced Breathing Chamber */}
      <section className="flex flex-col bg-surface-container-low rounded-3xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              air
            </span>
            <span className="font-label-lg text-sm font-bold text-on-surface">Paced Breathing Chamber</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-[11px] font-semibold">
            Coherence Mode
          </span>
        </div>

        {/* Animated Breathing Sphere */}
        <div className="flex flex-col items-center justify-center my-6 relative py-4">
          <div
            className={`absolute w-52 h-52 rounded-full bg-primary-fixed/30 transition-all duration-1000 ease-in-out ${
              phaseIndex === 2 ? 'scale-90 opacity-40' : 'scale-125 opacity-70'
            }`}
          />
          <div
            className={`absolute w-40 h-40 rounded-full bg-primary-fixed-dim/40 transition-all duration-1000 ease-in-out ${
              phaseIndex === 2 ? 'scale-90' : 'scale-110'
            }`}
          />
          
          <div
            className={`relative z-10 w-28 h-28 rounded-full bg-primary flex flex-col items-center justify-center text-center shadow-lg transition-all duration-1000 ease-in-out select-none ${currentPhase.scale}`}
          >
            <span className="font-headline-sm text-lg font-bold text-on-primary tracking-tight">
              {currentPhase.text}
            </span>
            <span className="font-label-sm text-xs text-on-primary-container font-semibold">
              {breathCount}s
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 z-10 bg-surface-container/80 py-1.5 px-4 rounded-full self-center">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <p className="font-body-sm text-xs text-on-surface-variant font-semibold text-center">
            {currentPhase.desc}
          </p>
        </div>
      </section>

      {/* The 20-20-20 Sanctuary */}
      <section className="flex flex-col bg-surface-container-lowest rounded-3xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                visibility
              </span>
              <span className="font-label-md text-xs uppercase tracking-wider text-secondary font-bold">
                Optic Rhythm
              </span>
            </div>
            <h3 className="font-title-md text-base font-bold text-on-surface">The 20-20-20 Sanctuary</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold">
            Active Cycle
          </span>
        </div>

        {/* Big Countdown */}
        <div className="flex items-baseline gap-2 mt-4 mb-2">
          <span className="font-display-lg text-4xl font-extrabold text-primary tracking-tight">
            {formatTime(eyeRestSeconds)}
          </span>
          <span className="font-body-md text-xs text-on-surface-variant font-medium">until rest</span>
        </div>

        {/* Visual Progress Line */}
        <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden mb-3">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(5, (eyeRestSeconds / (20 * 60)) * 100))}%` }}
          />
        </div>

        {/* Educational Note */}
        <div className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded-xl">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            Every 20 minutes, look at an object at least 20 feet away for at least 20 seconds to soften eye strain and reset ocular lens tension.
          </p>
        </div>

        {/* Interactive Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handlePauseNow}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container text-primary font-label-lg text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRestingEarly ? 'check' : 'play_arrow'}
            </span>
            <span>{isRestingEarly ? 'Resting (20s)' : 'Pause Now'}</span>
          </button>

          <button
            onClick={handleSnooze}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container text-on-surface-variant font-label-lg text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">update</span>
            <span>+5m Snooze</span>
          </button>
        </div>
      </section>

      {/* Mindful Micro-Habits */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Mindful Micro-Habits</h3>
          </div>
          <span className="font-label-sm text-xs text-on-surface-variant">Tap to complete</span>
        </div>

        {/* Habit 1 */}
        <div
          onClick={() => toggleHabit('optic')}
          className="flex items-center gap-3 p-3.5 bg-surface-container-lowest rounded-2xl shadow-xs cursor-pointer select-none active:scale-[0.99] transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">eye_tracking</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-title-md text-sm font-bold text-on-surface truncate">Optic Stretch &amp; Blink</h4>
              <span className="font-label-sm text-[10px] bg-surface-container px-2 py-0.5 rounded text-primary font-bold">
                30s
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
              30-second eye roll, horizon trace, and warm palming exercise.
            </p>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              completedHabits['optic']
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">done</span>
          </div>
        </div>

        {/* Habit 2 */}
        <div
          onClick={() => toggleHabit('posture')}
          className="flex items-center gap-3 p-3.5 bg-surface-container-lowest rounded-2xl shadow-xs cursor-pointer select-none active:scale-[0.99] transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">accessibility_new</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-title-md text-sm font-bold text-on-surface truncate">Desk Posture Reset</h4>
              <span className="font-label-sm text-[10px] bg-surface-container px-2 py-0.5 rounded text-primary font-bold">
                15s
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
              Align cervical neck, roll back scapulae, drop shoulders.
            </p>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              completedHabits['posture']
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">done</span>
          </div>
        </div>

        {/* Habit 3 */}
        <div
          onClick={() => toggleHabit('water')}
          className="flex items-center gap-3 p-3.5 bg-surface-container-lowest rounded-2xl shadow-xs cursor-pointer select-none active:scale-[0.99] transition-transform"
        >
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-title-md text-sm font-bold text-on-surface truncate">Hydration Pulse</h4>
              <span className="font-label-sm text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold">
                +1 Cup
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
              Drink 200ml cool water to revitalize cellular cognition.
            </p>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              completedHabits['water']
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">done</span>
          </div>
        </div>
      </div>

      {/* Reminder Cadence & Sound Settings */}
      <section className="flex flex-col bg-surface-container-low rounded-2xl p-4 shadow-xs gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
          <h3 className="font-title-md text-sm font-bold text-on-surface">Reminder Cadence &amp; Sound</h3>
        </div>

        {/* Chime row */}
        <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-on-surface font-bold">Sound Chime</span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">Soft Temple Bell</span>
            </div>
          </div>
          <button
            onClick={() => playTempleBell(528)}
            className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">volume_up</span>
            <span>Preview</span>
          </button>
        </div>

        {/* Frequency row */}
        <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-on-surface font-bold">Interval Frequency</span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">Every 20 Mins (Standard)</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
        </div>
      </section>
    </div>
  );
};
