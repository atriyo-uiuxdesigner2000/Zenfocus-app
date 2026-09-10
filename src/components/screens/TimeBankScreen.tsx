import React from 'react';

interface TimeBankScreenProps {
  balance: number;
  onRedeem: (mins: number, appName: string) => void;
  onVaultDeposit: () => void;
}

export const DESK_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR89vqyk1xwnFG2LpyBa4PqnZH3D4djg7Qk9SaJYvaqCwHnyFgD3nRsGPQOqjv08bhxVXuGhqal7yW-5hSSuFH-vBsuu3WupBAvMrFXyI2uCAfMOo1XKVZ0Bju8Gzf__NXZY27eXiFEawf6x0wqga4Jl4H0X5SPqz8wAG4ltiww8L7RRruUWx9V1HmEpkcVQ3oaulScMfbuMeSjIycizrcuviZLRqcdQJZq0b44f_nMgV25qc5WpXL9A';

export const TimeBankScreen: React.FC<TimeBankScreenProps> = ({
  balance,
  onRedeem,
  onVaultDeposit,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4">
      <div className="pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs mb-2 shadow-xs">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
          Reward &amp; Screen Harmony
        </div>
        <h2 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          Entertainment Time Bank
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
          Turn mindful study discipline into earned entertainment &amp; gaming time.
        </p>
      </div>

      {/* Main Bank Balance Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-secondary-container text-on-secondary-container p-6 shadow-sm">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-secondary-fixed/40 blur-xl pointer-events-none"></div>
        <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-primary-fixed/30 blur-lg pointer-events-none"></div>

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-md text-xs font-semibold shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              sports_esports
            </span>
            Earned &amp; Available
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold shadow-xs">
            <span className="material-symbols-outlined text-[13px]">bolt</span>
            1h Study = 15m Fun
          </span>
        </div>

        <div className="relative mt-4 flex items-baseline gap-2">
          <span className="font-display-lg text-5xl font-extrabold text-on-surface tracking-tight">
            {balance}
          </span>
          <span className="font-title-md text-lg text-on-surface-variant font-bold">mins</span>
        </div>

        <div className="relative mt-4">
          <div className="flex items-center justify-between text-on-surface font-label-sm text-xs mb-1.5 font-medium">
            <span>Progress to next 15m credit</span>
            <span className="font-bold text-primary">75% (45/60 min study)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface-container-lowest/60 overflow-hidden p-0.5">
            <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: '75%' }}></div>
          </div>
          <p className="font-body-sm text-xs text-on-secondary-container mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
            15 mins towards next reward milestone
          </p>
        </div>
      </div>

      {/* Overnight sleep notice */}
      <div className="rounded-2xl bg-surface-container-low p-3.5 flex items-start gap-2.5 shadow-xs">
        <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 mt-0.5 text-secondary">
          <span className="material-symbols-outlined text-[18px]">bedtime</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-md text-xs text-on-surface font-bold">Overnight Sleep Protection</p>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            Earned time cannot be redeemed past 10:00 PM. Overnight sleep lock remains active to safeguard your rest cycle.
          </p>
        </div>
      </div>

      {/* Quick Redeem */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-sm text-on-surface font-bold">Quick Redeem</h3>
          <span className="font-label-sm text-xs text-primary flex items-center gap-0.5 font-medium">
            <span className="material-symbols-outlined text-[14px]">timer</span> Instant Pass
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* YouTube Pass */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smart_display
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="font-title-md text-sm font-bold text-on-surface truncate">YouTube Stream</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">15 Mins Focus Break</p>
              </div>
            </div>
            <button
              onClick={() => onRedeem(15, 'YouTube')}
              disabled={balance < 15}
              className={`px-3.5 py-2 rounded-xl font-label-md text-xs font-bold shrink-0 shadow-xs active:scale-95 transition-all flex items-center gap-1 ${
                balance >= 15
                  ? 'bg-primary text-on-primary hover:bg-primary/90'
                  : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">lock_open</span>
              Unlock Now
            </button>
          </div>

          {/* Free Fire Gaming Pass */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stadia_controller
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="font-title-md text-sm font-bold text-on-surface truncate">Free Fire / Gaming</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">30 Mins High Priority</p>
              </div>
            </div>
            <button
              onClick={() => onRedeem(30, 'Free Fire')}
              disabled={balance < 30}
              className={`px-3.5 py-2 rounded-xl font-label-md text-xs font-bold shrink-0 shadow-xs active:scale-95 transition-all flex items-center gap-1 ${
                balance >= 30
                  ? 'bg-primary text-on-primary hover:bg-primary/90'
                  : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">lock_open</span>
              Unlock Now
            </button>
          </div>

          {/* Weekend Vault */}
          <div className="rounded-2xl bg-surface-container-lowest p-4 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  savings
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="font-title-md text-sm font-bold text-on-surface truncate">Weekend Vault</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">Bank time for Saturday</p>
              </div>
            </div>
            <button
              onClick={onVaultDeposit}
              className="px-3.5 py-2 rounded-xl bg-surface-container text-primary font-label-md text-xs font-bold shrink-0 hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
              Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Ledger & History */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-sm text-on-surface font-bold">Weekly Ledger &amp; History</h3>
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">Auto-synced</span>
        </div>
        <div className="rounded-2xl bg-surface-container-lowest p-3 shadow-xs flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-xs text-on-surface truncate font-semibold">60m Math Study session</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant">Today • 4:15 PM</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-xs font-bold shrink-0">
              +15 mins earned
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">videogame_asset</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-xs text-on-surface truncate font-semibold">Free Fire gaming session</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant">Yesterday • 7:00 PM</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-xs font-bold shrink-0">
              -30 mins spent
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">science</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-xs text-on-surface truncate font-semibold">120m Science Lab prep</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant">Yesterday • 3:30 PM</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-xs font-bold shrink-0">
              +30 mins earned
            </span>
          </div>
        </div>
      </div>

      {/* Mindful Habit Tip Card */}
      <div className="rounded-2xl bg-surface-container p-4 flex items-center gap-3.5 shadow-xs">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30">
          <img
            className="w-full h-full object-cover"
            alt="Mindful study desk"
            src={DESK_IMG_URL}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-label-md text-xs text-primary font-bold">Mindful Habit Tip</p>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 line-clamp-2">
            Banking smaller 15-minute intervals boosts deep task focus by 38% compared to unlimited evening use.
          </p>
        </div>
      </div>
    </div>
  );
};
