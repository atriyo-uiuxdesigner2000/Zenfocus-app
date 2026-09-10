import React, { useState } from 'react';

interface AppShieldingSetupScreenProps {
  onContinueToPin: () => void;
}

export const AppShieldingSetupScreen: React.FC<AppShieldingSetupScreenProps> = ({
  onContinueToPin,
}) => {
  const [accessibilityActive, setAccessibilityActive] = useState(true);
  const [usageAccessActive, setUsageAccessActive] = useState(true);
  const [displayOverActive, setDisplayOverActive] = useState(true);
  const [deviceAdminActive, setDeviceAdminActive] = useState(true);

  return (
    <div className="flex flex-col w-full px-4 py-2 space-y-4 pb-28">
      {/* Step Header */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-label-sm text-xs font-bold text-primary tracking-wide uppercase bg-primary-fixed/50 px-2.5 py-0.5 rounded-full">
          Step 2 of 2 • Shield Setup
        </span>
        <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
          Final Verification
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
          App Shielding &amp; Security Setup
        </h1>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Enable hardware-level safeguards to keep Focus Shield strictly enforced and tamper-proof.
        </p>
      </div>

      {/* Permissions List */}
      <div className="space-y-3">
        {/* Permission 1 */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">accessibility_new</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-sm font-bold text-on-surface">Accessibility Service</h3>
                <span className="font-label-sm text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.2 rounded font-bold uppercase">
                  Required
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Required for instant distraction detection &amp; locking foreground app attempts.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAccessibilityActive(!accessibilityActive)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
              accessibilityActive ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <div
              className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                accessibilityActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Permission 2 */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">query_stats</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-sm font-bold text-on-surface">Usage Access</h3>
                <span className="font-label-sm text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.2 rounded font-bold uppercase">
                  Active
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Monitors screen time intervals, app sessions, and calculates Time Bank earnings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setUsageAccessActive(!usageAccessActive)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
              usageAccessActive ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <div
              className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                usageAccessActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Permission 3 */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">layers</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-sm font-bold text-on-surface">Display Over Other Apps</h3>
                <span className="font-label-sm text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.2 rounded font-bold uppercase">
                  Active
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Enables floating mindful break reminders and the Emergency SOS overlay.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDisplayOverActive(!displayOverActive)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
              displayOverActive ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <div
              className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                displayOverActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Permission 4 */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex items-start justify-between gap-3 border border-secondary-fixed/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">security</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-sm font-bold text-on-surface">Device Admin &amp; Uninstall Defense</h3>
                <span className="font-label-sm text-[10px] bg-secondary text-on-secondary px-1.5 py-0.2 rounded font-bold uppercase">
                  Enforced
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Prevents unauthorized uninstallation, clearing app cache, or force-stopping without Master PIN.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDeviceAdminActive(!deviceAdminActive)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shrink-0 flex items-center ${
              deviceAdminActive ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <div
              className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-xs transform transition-transform ${
                deviceAdminActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Emergency Assurance Banner */}
      <div className="bg-surface-container-low rounded-2xl p-3.5 flex items-start gap-2.5 shadow-xs">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified_user
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-label-md text-xs font-bold text-on-surface">Safe Emergency Bypass Assurance</span>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            Emergency Call (112, 108) and ICE contacts remain 100% accessible at all times without PIN or delay.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="pt-2">
        <button
          onClick={onContinueToPin}
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-sm font-bold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-primary/95"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Complete Setup &amp; Arm Shield</span>
        </button>
      </div>
    </div>
  );
};
