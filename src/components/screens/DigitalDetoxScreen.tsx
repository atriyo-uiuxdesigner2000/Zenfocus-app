import React, { useState } from 'react';
import { DayUsage } from '../../types';

interface DigitalDetoxScreenProps {
  onStartMindfulReset: () => void;
  onBankToSaturday: () => void;
}

export const DigitalDetoxScreen: React.FC<DigitalDetoxScreenProps> = ({
  onStartMindfulReset,
  onBankToSaturday,
}) => {
  const daysData: DayUsage[] = [
    { day: 'Monday', shortDay: 'Mon', hours: 3.2, note: 'Light study shield active. 45m deep focus blocks.' },
    { day: 'Tuesday', shortDay: 'Tue', hours: 4.1, note: 'Social leakage peak. Evening study extended.' },
    { day: 'Wednesday', shortDay: 'Wed', hours: 3.5, note: 'Balanced homework flow and calculus practice.' },
    { day: 'Thursday', shortDay: 'Thu', hours: 2.8, note: 'Zenith Peak: Target beat by 45 mins! Deep focus streak!', isBest: true },
    { day: 'Friday', shortDay: 'Fri', hours: 3.9, note: 'Evening entertainment unlock after exams.' },
    { day: 'Saturday', shortDay: 'Sat', hours: 2.2, note: 'Outdoor & family balance with guilt-free bank.' },
    { day: 'Sunday', shortDay: 'Sun', hours: 1.8, note: 'Unplugged family day with sleep curfew.' },
  ];

  const [selectedDay, setSelectedDay] = useState<DayUsage>(daysData[3]); // Thursday by default
  const [claimedReward, setClaimedReward] = useState(false);

  const maxHours = 4.1;

  const handleClaim = () => {
    setClaimedReward(true);
    onBankToSaturday();
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-4 pb-28 pt-2">
      {/* Title Header */}
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed">
            <span className="material-symbols-outlined text-[16px]">nature_people</span>
          </span>
          <span className="font-label-md text-xs text-primary font-bold tracking-wide uppercase">
            Weekly Health Check
          </span>
        </div>
        <h1 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          Digital Detox Analytics
        </h1>
        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
          Weekly screen wellness, focus ratio, and distraction leakage breakdown.
        </p>
      </div>

      {/* Hero Metric Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-label-md text-xs text-on-surface-variant font-medium">Daily Average Screen Time</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display-lg text-4xl font-extrabold text-on-surface tracking-tight">3h 42m</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-bold shadow-xs">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            -24% vs last week
          </span>
        </div>

        {/* Dual Stat Pills */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-surface-container-low p-3 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span className="font-label-sm text-xs font-bold">Productive Time</span>
            </div>
            <p className="font-title-md text-base text-on-surface mt-2 font-extrabold">5h 15m</p>
            <span className="font-label-sm text-[11px] text-on-surface-variant">Active study &amp; work</span>
          </div>

          <div className="bg-secondary-container/40 p-3 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-1 text-on-secondary-container">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
              <span className="font-label-sm text-xs font-bold">Mindful Score</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-title-md text-base text-on-surface font-extrabold">88</span>
              <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">/ 100</span>
            </div>
            <span className="font-label-sm text-[11px] text-secondary font-bold">Mindful High</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-1">
          <div className="flex justify-between items-center text-label-sm text-xs text-on-surface-variant mb-1 font-medium">
            <span>Restorative Balance Ratio</span>
            <span className="font-bold text-primary">74% Mindful Living</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden flex">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '74%' }}></div>
            <div className="h-full bg-secondary-fixed transition-all duration-500" style={{ width: '26%' }}></div>
          </div>
        </div>
      </div>

      {/* Weekly Usage Bar Chart */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="font-title-md text-sm text-on-surface font-bold">Weekly Usage Cadence</h2>
            <p className="font-body-sm text-xs text-on-surface-variant">Screen exposure across past 7 days</p>
          </div>
          <span className="inline-flex items-center gap-1 font-label-sm text-xs text-primary px-2.5 py-1 rounded-full bg-surface-container-high font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Best day: Thu
          </span>
        </div>

        {/* Interactive Bar Chart */}
        <div className="w-full pt-4">
          <div className="flex items-end justify-between h-40 px-1 gap-1">
            {daysData.map((d) => {
              const heightPercent = Math.round((d.hours / maxHours) * 100);
              const isSelected = selectedDay.day === d.day;
              return (
                <div
                  key={d.day}
                  onClick={() => setSelectedDay(d)}
                  className="flex flex-col items-center flex-1 group cursor-pointer relative"
                >
                  {d.isBest && (
                    <div className="absolute -top-6 bg-primary text-on-primary text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                      ★ Lowest
                    </div>
                  )}
                  <span
                    className={`font-label-sm text-[11px] mb-1.5 transition-colors font-semibold ${
                      isSelected || d.isBest ? 'text-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    {d.hours}h
                  </span>
                  <div
                    style={{ height: `${heightPercent}px` }}
                    className={`w-7 rounded-t-xl transition-all duration-300 ${
                      d.isBest
                        ? 'bg-primary shadow-xs'
                        : isSelected
                        ? 'bg-primary-container'
                        : d.hours >= 3.9
                        ? 'bg-secondary-fixed'
                        : 'bg-surface-container-high group-hover:bg-primary-container'
                    } ${isSelected ? 'ring-2 ring-primary/40 ring-offset-1' : ''}`}
                  />
                  <span
                    className={`font-label-sm text-xs mt-2 font-medium ${
                      isSelected || d.isBest ? 'text-primary font-bold' : 'text-on-surface-variant'
                    }`}
                  >
                    {d.shortDay}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Detail Box */}
        <div className="mt-2 bg-surface-container-low rounded-2xl p-3 flex items-center justify-between transition-all">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">verified</span>
            <span className="font-label-sm text-xs text-on-surface truncate">
              {selectedDay.day}: {selectedDay.hours}h screen-time. {selectedDay.note}
            </span>
          </div>
          <span className="font-label-sm text-xs text-primary font-bold shrink-0">Healthy</span>
        </div>
      </div>

      {/* Top Distraction Leakage */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-title-md text-sm text-on-surface font-bold">Top Distraction Leakage</h2>
            <p className="font-body-sm text-xs text-on-surface-variant">Non-study time arrested by ZenFocus shields</p>
          </div>
          <span className="material-symbols-outlined text-outline-variant">shield_lock</span>
        </div>

        <div className="space-y-2.5">
          {/* Item 1 */}
          <div className="bg-surface-container-low rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container font-extrabold text-lg">
              1
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <h3 className="font-label-lg text-xs text-on-surface font-bold truncate">Free Fire / Mobile Games</h3>
                <span className="font-label-md text-xs text-on-surface font-extrabold ml-2 shrink-0">1h 10m</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">savings</span>
                <p className="font-body-sm text-xs text-primary font-semibold truncate">
                  -45m saved by ZenFocus Time Bank
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-surface-container-low rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface-variant font-extrabold text-lg">
              2
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <h3 className="font-label-lg text-xs text-on-surface font-bold truncate">Instagram &amp; TikTok</h3>
                <span className="font-label-md text-xs text-on-surface font-extrabold ml-2 shrink-0">52m</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Controlled by study shield during 4pm–7pm
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-surface-container-low rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-on-surface-variant font-extrabold text-lg">
              3
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <h3 className="font-label-lg text-xs text-on-surface font-bold truncate">
                  Slack / Work Chat (After Hours)
                </h3>
                <span className="font-label-md text-xs text-on-surface font-extrabold ml-2 shrink-0">35m</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary">bedtime</span>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Reduced by After-Work Disconnect schedule
                </p>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-outline h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Badge & Reward Card */}
      <div className="bg-secondary-container rounded-3xl p-5 shadow-xs relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-secondary-fixed/50 pointer-events-none"></div>
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-xs flex items-center justify-center shrink-0 text-secondary text-2xl">
            🏅
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold text-on-secondary-container">
                Detox Milestone
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-sm text-[11px] font-bold text-primary">Unlocked</span>
            </div>
            <h3 className="font-title-md text-base font-extrabold text-on-surface mt-0.5">
              Screen Balance Champion
            </h3>
            <p className="font-body-sm text-xs text-on-secondary-container mt-1 leading-relaxed">
              Rahul earned <strong className="font-bold text-on-surface">3 hours of guilt-free weekend gaming</strong> for maintaining a 70%+ focus ratio through Thursday!
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleClaim}
                disabled={claimedReward}
                className={`px-4 py-2 rounded-xl font-label-lg text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 ${
                  claimedReward
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-primary text-on-primary hover:bg-primary/90'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {claimedReward ? 'check_circle' : 'redeem'}
                </span>
                <span>{claimedReward ? 'Stored in Time Bank!' : 'Bank To Saturday'}</span>
              </button>

              <button
                onClick={() => alert('Champion link copied to clipboard! Share with family & guardians.')}
                className="px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-xs font-semibold shadow-xs hover:bg-surface-container-low transition-colors"
                type="button"
              >
                Share Win
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mindful Breathing Quick Tile */}
      <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">self_improvement</span>
          </div>
          <div>
            <h4 className="font-title-md text-sm text-on-surface font-bold">2-Minute Mindful Reset</h4>
            <p className="font-body-sm text-xs text-on-surface-variant">Release optical strain before your next session</p>
          </div>
        </div>
        <button
          onClick={onStartMindfulReset}
          aria-label="Start Quick Reset"
          className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs active:scale-90 transition-transform hover:bg-surface-bright"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
        </button>
      </div>
    </div>
  );
};
