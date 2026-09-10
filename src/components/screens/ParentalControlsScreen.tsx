import React, { useState } from 'react';

interface ParentalControlsScreenProps {
  onOpenAlerts: () => void;
  onOpenSecuritySetup: () => void;
  onChangePin: () => void;
}

export const YOUTUBE_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOA8NyNgS5dzgNlNcxhHs8SJGPvRGVl8AZbBuGlifuqnK6XDcXgoDZdO7CQgKZ32tEacUN_XhAMEJwJoYnVixzXfs0devUIz9thZMs3LMY1i6O9QTXRZj7P5-YXTE6PV-Xi1pww6LPG7vFcFkgxI4GPQYX3sFaQbwRX09xFliwVuQGzkN2an3k0GmXTBRHrhNPCrolhejOaXabdRUVWQP6NbMtUhjOZOtSY7ALA7w3aMBmjBjvDTxVkA';
export const GAMING_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVt_VzZBtRUCp83_jnUMu67TxOpubWYlwFUKuQ5EQdTZeZV6iA4r6xgar8Dzz-q06jyetw0BmJDMaccpatZl5r8ShFka-SVF0WiGkPDNLfI7nslLobEo0OsFrJ9aDwvND35et1FC54MbgWw-MQx-wGA-hvIlGXtk73A0NHMZy-RNfY72yeKhY4qAQFlsj4yAQkc9LVAIPbY_3JxHupe6hKpIyXGpbx6H12_LTVDGPxtBG6uTyfN_Ze7A';
export const SOCIAL_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAbjyDdkOFRAcJo6Q-9gYIA6FcnXiYnGvwe8xN28Sn_aB_ZAt6ojJfbSGvDCwTvczRkq52AG2rwDTk9GqE9H9orx5bnYsw1dwDK9z-vlJx2WZSDxpXnGv71m8ClliPuSAU3oEu-7qbibrROJc06o7XuXYyf7ClChZCljehGvL-WmsgfC93Q0DaACss22SPi-TICpLztjvPt1Xrc3s4ccNV6rrFdOTO2F2XJfNOADHq8FE0mCJ8HmmMHg';

export const ParentalControlsScreen: React.FC<ParentalControlsScreenProps> = ({
  onOpenAlerts,
  onOpenSecuritySetup,
  onChangePin,
}) => {
  const [ytMinutes, setYtMinutes] = useState(30);
  const [gamingMinutes, setGamingMinutes] = useState(15);
  const [socialEnabled, setSocialEnabled] = useState(true);
  const [instantBreachAlerts, setInstantBreachAlerts] = useState(true);

  const formatMins = (val: number) => {
    if (val === 0) return 'Off';
    if (val >= 60) {
      const h = Math.floor(val / 60);
      const m = val % 60;
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${val}m`;
  };

  return (
    <div className="flex flex-col w-full px-4 py-2 space-y-4 pb-28">
      {/* Supervised Profile Status */}
      <div className="flex items-center justify-between bg-surface-container-low rounded-2xl px-4 py-2.5 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-primary font-bold">
            Supervised Profile • Rahul
          </span>
        </div>
        <div className="inline-flex items-center gap-1 bg-surface-container-highest text-on-surface px-2.5 py-0.5 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
          <span className="font-label-sm text-[11px] font-bold">PIN Active</span>
        </div>
      </div>

      {/* Screen Title */}
      <div className="flex flex-col space-y-0.5">
        <h1 className="font-headline-sm text-xl font-bold text-on-surface tracking-tight">
          Parental Supervision &amp; Limits
        </h1>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Gentle non-intrusive guardrails to nurture mindful screen habits.
        </p>
      </div>

      {/* Quick Action to View Incoming Alerts Banner */}
      <button
        onClick={onOpenAlerts}
        className="w-full text-left relative overflow-hidden rounded-2xl bg-secondary-container p-3.5 shadow-xs hover:opacity-95 transition-all flex items-center justify-between active:scale-[0.99]"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shrink-0">
            <span className="material-symbols-outlined text-[22px]">notifications_active</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-title-md text-sm font-bold text-on-secondary-container">
                Remote Alerts &amp; Approvals
              </span>
              <span className="px-1.5 py-0.2 bg-error text-white text-[10px] font-bold rounded-full uppercase animate-pulse">
                1 Urgent
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-secondary-container mt-0.5">
              Rahul requested +15m Gaming extension
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-on-secondary-container">chevron_right</span>
      </button>

      {/* Emergency Safe Bypass Callout */}
      <div className="relative overflow-hidden bg-error-container/40 rounded-2xl p-4 shadow-xs border border-error/15">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-error text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              emergency_home
            </span>
          </div>
          <div className="flex flex-col space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-title-md text-sm font-bold text-on-surface">Emergency Safe Bypass</span>
              <span className="bg-surface-container-lowest text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                Always On
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Emergency dialer &amp; ICE numbers bypass all locks without PIN at all times.
            </p>
          </div>
        </div>
      </div>

      {/* Per-App Daily Rhythms Section */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            <h2 className="font-title-md text-sm text-on-surface font-bold">Per-App Daily Rhythms</h2>
          </div>
          <span className="font-label-sm text-xs text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-full">
            3 Rules Live
          </span>
        </div>

        {/* App Item 1: YouTube & Video */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center overflow-hidden shrink-0 shadow-xs border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="YouTube Allowance"
                  src={YOUTUBE_IMG_URL}
                />
              </div>
              <div>
                <span className="font-title-md text-sm font-bold text-on-surface block">YouTube &amp; Video</span>
                <span className="font-label-sm text-xs text-on-surface-variant">Daily Entertainment Allowance</span>
              </div>
            </div>
            <span className="font-title-md text-sm font-bold text-primary bg-surface-container-low px-2.5 py-0.5 rounded-lg">
              {formatMins(ytMinutes)}
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="relative flex items-center">
              <input
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                max={120}
                min={0}
                step={5}
                type="range"
                value={ytMinutes}
                onChange={(e) => setYtMinutes(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between font-label-sm text-[11px] text-on-surface-variant px-1 font-medium">
              <span>0m (Off)</span>
              <span>1h</span>
              <span>2 hrs cap</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-low text-on-surface px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
            <span className="font-label-sm text-xs">
              Study hours: <span className="font-bold text-primary">Locked</span> • Evening:{' '}
              <span className="font-bold text-secondary">Allowed</span>
            </span>
          </div>
        </div>

        {/* App Item 2: Free Fire & Gaming */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center overflow-hidden shrink-0 shadow-xs border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="Gaming Allowance"
                  src={GAMING_IMG_URL}
                />
              </div>
              <div>
                <span className="font-title-md text-sm font-bold text-on-surface block">Free Fire &amp; Gaming</span>
                <span className="font-label-sm text-xs text-on-surface-variant">Weekday Study Cap</span>
              </div>
            </div>
            <span className="font-title-md text-sm font-bold text-primary bg-surface-container-low px-2.5 py-0.5 rounded-lg">
              {formatMins(gamingMinutes)}
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="relative flex items-center">
              <input
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                max={60}
                min={0}
                step={5}
                type="range"
                value={gamingMinutes}
                onChange={(e) => setGamingMinutes(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between font-label-sm text-[11px] text-on-surface-variant px-1 font-medium">
              <span>0m</span>
              <span>Study Cap: 15m</span>
              <span>60m max weekend bank</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low text-on-surface px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                savings
              </span>
              <span className="font-label-sm text-xs font-medium">Weekend Bank Accumulator</span>
            </div>
            <span className="font-label-sm text-xs font-bold text-primary">+45m reserved</span>
          </div>
        </div>

        {/* App Item 3: Instagram & Snapchat */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center overflow-hidden shrink-0 shadow-xs border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="Social Media Allowance"
                  src={SOCIAL_IMG_URL}
                />
              </div>
              <div>
                <span className="font-title-md text-sm font-bold text-on-surface block">Instagram &amp; Snapchat</span>
                <span className="font-label-sm text-xs text-on-surface-variant">Social Media &amp; Feeds</span>
              </div>
            </div>

            <button
              onClick={() => setSocialEnabled(!socialEnabled)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center ${
                socialEnabled ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
              type="button"
            >
              <span
                className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform duration-200 ${
                  socialEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-sm text-xs font-bold">Strict Lock active during 8:00 AM – 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Smart Alert Trigger Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">notifications_active</span>
          </div>
          <div>
            <h3 className="font-title-md text-sm text-on-surface font-bold">Smart Alert Trigger</h3>
            <span className="font-label-sm text-xs text-on-surface-variant">Real-time guardian safety updates</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-xl">
          <div className="flex flex-col pr-2">
            <span className="font-label-lg text-xs text-on-surface font-bold">Instant Breach Alerts</span>
            <span className="font-body-sm text-xs text-on-surface-variant">Send notification immediately upon limit breach</span>
          </div>
          <button
            onClick={() => setInstantBreachAlerts(!instantBreachAlerts)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center shrink-0 ${
              instantBreachAlerts ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <span
              className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform duration-200 ${
                instantBreachAlerts ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="space-y-1">
          <label className="font-label-sm text-xs text-on-surface-variant font-medium">Guardian Contact Email</label>
          <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
              <span className="font-body-md text-xs font-semibold text-on-surface">parent.care@gmail.com</span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span className="font-label-sm text-[11px] font-bold text-primary">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overnight Sleep Shield */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bedtime
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-sm font-bold text-on-surface">Overnight Sleep Shield</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">Entertainment &amp; feeds shut off at 10:00 PM</p>
            </div>
          </div>
          <span className="font-label-sm text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            Active
          </span>
        </div>
        <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-2.5">
          <span className="font-label-sm text-xs text-on-surface-variant">Curfew Schedule</span>
          <span className="font-label-sm text-xs font-bold text-on-surface">10:00 PM – 6:30 AM Daily</span>
        </div>
      </div>

      {/* Tamper & Uninstall Protection Card */}
      <div className="bg-surface-container rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-sm font-bold text-on-surface">Tamper &amp; Uninstall Protection</h3>
              <span className="w-2 h-2 rounded-full bg-primary"></span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Device Admin Active. ZenFocus cannot be force-stopped or uninstalled without 4-digit Master PIN.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">security</span>
            <span className="font-label-sm text-xs font-semibold">Master PIN: ••••</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onChangePin}
              className="bg-surface-container-lowest text-primary hover:bg-surface-container-high font-label-md text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors"
              type="button"
            >
              Change PIN
            </button>
            <button
              onClick={onOpenSecuritySetup}
              className="bg-primary text-on-primary font-label-md text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs hover:bg-primary/90 transition-colors"
              type="button"
            >
              Security Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
