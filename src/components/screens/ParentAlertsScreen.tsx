import React, { useState } from 'react';

interface ParentAlertsScreenProps {
  onGrantTime: (mins: number) => void;
}

export const RAHUL_PORTRAIT_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrn5qhKsiuDR5B5ZlBJLAhVztG7q8Gpef916deOkclOW6RYeSE56G1wXUvUYH_grr5Kg0A50ktMMlYdOpzbiCxNje9Xia8ASd6VBJFqDpcnNYYkcikoQfwvo-eyvdvIJibmpNuI4MaPTIwMRhjVUCbTqkg8RqZUjhEJFQjuR4k05rv7lZFeZILvpmztP2xusxC3Iv1gMbTVijKazvFxI-D6nWSowflJrIcH_fBxopxgAehD8HD_kIfmg';

export const ParentAlertsScreen: React.FC<ParentAlertsScreenProps> = ({ onGrantTime }) => {
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'locked' } | null>(null);
  const [hasResolved, setHasResolved] = useState(false);

  const handleGrant = (minutes: number) => {
    onGrantTime(minutes);
    setHasResolved(true);
    setFeedback({
      type: 'success',
      text: `Granted +${minutes} minutes gaming reward extension to Rahul!`,
    });
  };

  const handleKeepLocked = () => {
    setHasResolved(true);
    setFeedback({
      type: 'locked',
      text: 'Limit maintained. Rahul was notified to resume deep focus.',
    });
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 space-y-4">
      <div className="space-y-1">
        <h2 className="font-headline-md text-2xl font-bold text-on-surface">Remote Alerts &amp; Approvals</h2>
        <p className="font-body-md text-sm text-on-surface-variant">
          Review real-time student limit requests and incoming smart action notifications.
        </p>
      </div>

      {/* Live Breach Alert Banner */}
      {!hasResolved && (
        <div className="relative overflow-hidden rounded-2xl bg-secondary-container p-4 shadow-xs transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary text-[22px]">bolt</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container bg-surface-container-lowest/80 px-2.5 py-0.5 rounded-full font-bold">
                  Urgent
                </span>
                <span className="font-label-sm text-xs text-on-secondary-container">Just now</span>
              </div>
              <p className="font-title-md text-sm font-bold text-on-secondary-container mt-1">
                Live Time Breach Request
              </p>
              <p className="font-body-sm text-xs text-on-secondary-container mt-0.5">
                Rahul is asking for 15m Gaming extension.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('emailPreviewCard');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-xs font-bold hover:bg-surface-container transition-colors flex items-center gap-1 shadow-xs"
              type="button"
            >
              <span>Review Request</span>
              <span className="material-symbols-outlined text-[16px]">south</span>
            </button>
          </div>
        </div>
      )}

      {/* Student Visual Context Card */}
      <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-xs flex items-center gap-3.5">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-surface-container-highest border border-outline-variant/30">
          <img
            className="w-full h-full object-cover"
            alt="Rahul Sharma"
            src={RAHUL_PORTRAIT_URL}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-base font-bold text-on-surface">Rahul Sharma</span>
            <span className="font-label-sm text-[11px] text-primary font-bold bg-primary-fixed/50 px-2 py-0.5 rounded-full">
              Grade 10 • In Focus Mode
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-xs mt-0.5">
            <span className="material-symbols-outlined text-[16px] text-tertiary">sports_esports</span>
            <span className="truncate">Current App: Free Fire (Locked)</span>
          </div>
        </div>
      </div>

      {/* Smart Email Preview Card */}
      <div
        id="emailPreviewCard"
        className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm space-y-4 relative overflow-hidden border border-outline-variant/20"
      >
        <div className="bg-surface-container-low -mx-4 -mt-4 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
            </div>
            <div className="truncate min-w-0">
              <p className="font-label-sm text-xs text-on-surface-variant truncate">
                From: alerts@zenfocus.app • To: parent.care@gmail.com
              </p>
            </div>
          </div>
          <span className="font-label-sm text-[11px] text-on-surface-variant shrink-0 ml-2">Today, 4:18 PM</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0"></span>
            <h3 className="font-title-md text-base font-bold text-on-surface">
              Rahul&apos;s Free Fire daily time limit reached
            </h3>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Rahul has completed <strong className="text-on-surface font-semibold">1 hr 15 mins of Math Study</strong> and is requesting <strong className="text-on-surface font-semibold">15 mins</strong> of his earned game reward.
          </p>
        </div>

        {/* Live Streak / Earned Reward Stat Strip */}
        <div className="rounded-xl bg-surface-container p-3 flex items-center justify-around text-center">
          <div>
            <span className="block font-headline-sm text-lg text-primary font-bold">75m</span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">Math Deep Work</span>
          </div>
          <div className="w-px h-8 bg-outline-variant"></div>
          <div>
            <span className="block font-headline-sm text-lg text-secondary font-bold">15m</span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">Banked Balance</span>
          </div>
          <div className="w-px h-8 bg-outline-variant"></div>
          <div>
            <span className="block font-headline-sm text-lg text-tertiary font-bold">4 Days</span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">Healthy Streak</span>
          </div>
        </div>

        {/* Feedback block */}
        {feedback && (
          <div
            className={`p-3 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              feedback.type === 'success'
                ? 'bg-primary-fixed text-on-primary-fixed'
                : 'bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {feedback.type === 'success' ? 'verified' : 'lock'}
            </span>
            {feedback.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className={`space-y-2 pt-1 ${hasResolved ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            onClick={() => handleGrant(15)}
            className="w-full py-3.5 px-4 rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-sm font-bold shadow-xs active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-secondary-container/90"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">timer</span>
            <span>Grant +15 Mins</span>
          </button>

          <button
            onClick={handleKeepLocked}
            className="w-full py-3 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-sm font-bold shadow-xs active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-primary-container/90"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>Keep Locked</span>
          </button>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => handleGrant(30)}
              className="font-label-md text-xs font-semibold text-primary hover:underline"
              type="button"
            >
              +30m Extension
            </button>
            <span className="text-outline-variant font-label-md">•</span>
            <button
              onClick={() => handleGrant(45)}
              className="font-label-md text-xs font-semibold text-primary hover:underline"
              type="button"
            >
              +45m Extension
            </button>
          </div>
        </div>
      </div>

      {/* Recent Notification Logs */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-sm text-on-surface font-bold">Recent Notification Logs</h3>
          <span className="font-label-md text-xs text-primary font-semibold cursor-pointer hover:underline">
            View History
          </span>
        </div>

        <div className="space-y-2">
          {/* Log Item 1 */}
          <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]">bedtime</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body-md text-xs font-semibold text-on-surface truncate">
                Overnight lock engaged at 10:00 PM
              </p>
              <span className="font-label-sm text-[11px] text-on-surface-variant">Yesterday • Auto Scheduled</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
          </div>

          {/* Log Item 2 */}
          <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-error text-[20px]">gpp_maybe</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body-md text-xs font-semibold text-on-surface truncate">
                Uninstall attempt prevented (Wrong PIN entered)
              </p>
              <span className="font-label-sm text-[11px] text-on-surface-variant">2 days ago • Security Alert</span>
            </div>
            <span className="material-symbols-outlined text-error text-[18px]">warning</span>
          </div>

          {/* Log Item 3 */}
          <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary text-[20px]">menu_book</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body-md text-xs font-semibold text-on-surface truncate">
                Study session completed: 60 mins Calculus
              </p>
              <span className="font-label-sm text-[11px] text-on-surface-variant">3 days ago • +15m bank credited</span>
            </div>
            <span className="material-symbols-outlined text-tertiary text-[18px]">add_circle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
