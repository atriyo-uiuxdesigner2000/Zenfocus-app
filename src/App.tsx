import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabType } from './types';
import { AppHeader } from './components/AppHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { SosModal } from './components/SosModal';
import { PinModal } from './components/PinModal';
import { ToolDockModal } from './components/ToolDockModal';

// Screens
import { AppShieldingSetupScreen } from './components/screens/AppShieldingSetupScreen';
import { StudentDashboardScreen } from './components/screens/StudentDashboardScreen';
import { ActiveFocusSessionScreen } from './components/screens/ActiveFocusSessionScreen';
import { TimeBankScreen } from './components/screens/TimeBankScreen';
import { ParentalControlsScreen } from './components/screens/ParentalControlsScreen';
import { ParentAlertsScreen } from './components/screens/ParentAlertsScreen';
import { WorkDashboardScreen } from './components/screens/WorkDashboardScreen';
import { ZenBreaksScreen } from './components/screens/ZenBreaksScreen';
import { DigitalDetoxScreen } from './components/screens/DigitalDetoxScreen';

export type ScreenId =
  | 'shielding-setup'
  | 'student-dashboard'
  | 'active-session'
  | 'time-bank'
  | 'parent-controls'
  | 'parent-alerts'
  | 'work-dashboard'
  | 'zen-breaks'
  | 'digital-detox';

const SCREEN_ORDER: ScreenId[] = [
  'student-dashboard',
  'active-session',
  'time-bank',
  'parent-controls',
  'parent-alerts',
  'shielding-setup',
  'work-dashboard',
  'zen-breaks',
  'digital-detox',
];

const TAB_ORDER: TabType[] = ['study', 'parent', 'work', 'detox'];

// Subtle slide-in animation variants for fluid navigation
const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

const screenTransition = {
  x: {
    type: 'spring',
    stiffness: 350,
    damping: 32,
    mass: 0.8,
  },
  opacity: {
    duration: 0.18,
    ease: 'easeInOut',
  },
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('study');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('student-dashboard');
  const [navDirection, setNavDirection] = useState<number>(1);

  // Shared state
  const [bankBalance, setBankBalance] = useState<number>(45);
  const [masterPin, setMasterPin] = useState<string>('1234');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [sosOpen, setSosOpen] = useState<boolean>(false);
  const [pinModal, setPinModal] = useState<{
    open: boolean;
    title: string;
    subtitle: string;
    onSuccess: () => void;
  } | null>(null);
  const [toolModal, setToolModal] = useState<'calculator' | 'lexicon' | 'notebook' | null>(null);

  // Scroll to top on screen change for clean visual presentation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeScreen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const getTabForScreen = (screen: ScreenId, current: TabType): TabType => {
    switch (screen) {
      case 'student-dashboard':
      case 'active-session':
      case 'time-bank':
        return 'study';
      case 'parent-controls':
      case 'parent-alerts':
      case 'shielding-setup':
        return 'parent';
      case 'work-dashboard':
        return 'work';
      case 'zen-breaks':
        return current === 'detox' ? 'detox' : 'work';
      case 'digital-detox':
        return 'detox';
      default:
        return 'study';
    }
  };

  // Navigates to a new screen with directional slide tracking
  const navigateTo = (targetScreen: ScreenId, forceDirection?: number) => {
    if (targetScreen === activeScreen) return;
    const currentIndex = SCREEN_ORDER.indexOf(activeScreen);
    const nextIndex = SCREEN_ORDER.indexOf(targetScreen);
    const dir = forceDirection !== undefined ? forceDirection : (nextIndex >= currentIndex ? 1 : -1);
    setNavDirection(dir);
    setActiveScreen(targetScreen);
    setCurrentTab((prev) => getTabForScreen(targetScreen, prev));
  };

  // Tab selection router
  const handleSelectTab = (tab: TabType) => {
    if (tab === currentTab) return;
    const currentTabIdx = TAB_ORDER.indexOf(currentTab);
    const nextTabIdx = TAB_ORDER.indexOf(tab);
    const dir = nextTabIdx >= currentTabIdx ? 1 : -1;
    setNavDirection(dir);
    setCurrentTab(tab);

    if (tab === 'study') setActiveScreen('student-dashboard');
    else if (tab === 'parent') setActiveScreen('parent-controls');
    else if (tab === 'work') setActiveScreen('work-dashboard');
    else if (tab === 'detox') setActiveScreen('digital-detox');
  };

  // PIN validation
  const handleVerifyPin = (pin: string) => {
    if (pin === masterPin) {
      if (pinModal) {
        pinModal.onSuccess();
      }
      setPinModal(null);
      return true;
    }
    return false;
  };

  // Time Bank handlers
  const handleRedeem = (mins: number, appName: string) => {
    if (bankBalance >= mins) {
      setBankBalance((prev) => prev - mins);
      showToast(`Pass Unlocked! +${mins}m granted for ${appName}.`);
    } else {
      showToast(`Insufficient bank balance. Complete study sessions to earn more.`);
    }
  };

  const handleVaultDeposit = () => {
    setBankBalance((prev) => prev + 15);
    showToast(`+15m deposited into Saturday Weekend Vault!`);
  };

  const handleGrantTimeFromParent = (mins: number) => {
    setBankBalance((prev) => prev + mins);
    showToast(`Approved +${mins}m Gaming extension for Rahul.`);
  };

  // Screen breadcrumbs & back handlers with reverse slide direction (-1)
  const getBackButton = () => {
    if (activeScreen === 'active-session' || activeScreen === 'time-bank') {
      return () => navigateTo('student-dashboard', -1);
    }
    if (activeScreen === 'parent-alerts' || activeScreen === 'shielding-setup') {
      return () => navigateTo('parent-controls', -1);
    }
    if (activeScreen === 'zen-breaks') {
      return () => {
        if (currentTab === 'work') navigateTo('work-dashboard', -1);
        else navigateTo('digital-detox', -1);
      };
    }
    return undefined;
  };

  // Screen meta titles for header
  const getHeaderTitle = () => {
    switch (activeScreen) {
      case 'shielding-setup':
        return { title: 'App Shielding Setup', subtitle: 'Tamper & Security Engine' };
      case 'student-dashboard':
        return { title: 'ZenFocus', subtitle: 'Focus Shield Armed' };
      case 'active-session':
        return { title: 'Active Focus Session', subtitle: 'Calculus Revision' };
      case 'time-bank':
        return { title: 'Entertainment Bank', subtitle: '45 mins available' };
      case 'parent-controls':
        return { title: 'Parent Supervision', subtitle: 'Supervised: Rahul' };
      case 'parent-alerts':
        return { title: 'Remote Approvals', subtitle: '1 Live Request' };
      case 'work-dashboard':
        return { title: 'Deep Work Mode', subtitle: '25m Pomodoro' };
      case 'zen-breaks':
        return { title: 'Zen Breaks & Eye Health', subtitle: '20-20-20 Sanctuary' };
      case 'digital-detox':
        return { title: 'Digital Detox Analytics', subtitle: 'Weekly Balance' };
      default:
        return { title: 'ZenFocus', subtitle: 'Digital Wellness' };
    }
  };

  const headerMeta = getHeaderTitle();

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface font-body antialiased flex flex-col items-center">
      {/* Container Frame max-w-md (Mobile-first applet experience) */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-surface shadow-2xl overflow-x-hidden">
        {/* Persistent App Header */}
        <AppHeader
          title={headerMeta.title}
          subtitle={headerMeta.subtitle}
          onBack={getBackButton()}
          onOpenSos={() => setSosOpen(true)}
          onOpenProfile={() => navigateTo('shielding-setup', 1)}
        />

        {/* Quick Screen Explorer Bar (Sticky below header for effortless inspection of all 9 screens) */}
        <div className="pt-20 px-4 pb-1 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-surface/95 z-30">
          {[
            { id: 'student-dashboard', label: 'Study Home', tab: 'study' },
            { id: 'active-session', label: 'Focus Timer', tab: 'study' },
            { id: 'time-bank', label: 'Time Bank', tab: 'study' },
            { id: 'parent-controls', label: 'Parent Limits', tab: 'parent' },
            { id: 'parent-alerts', label: 'Alerts', tab: 'parent' },
            { id: 'shielding-setup', label: 'Shielding Setup', tab: 'parent' },
            { id: 'work-dashboard', label: 'Work Pomodoro', tab: 'work' },
            { id: 'zen-breaks', label: 'Breathing & Eyes', tab: 'work' },
            { id: 'digital-detox', label: 'Detox Analytics', tab: 'detox' },
          ].map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id as ScreenId);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1 shadow-2xs ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                type="button"
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse"></span>}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-full px-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="bg-inverse-surface text-inverse-on-surface text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xl flex items-center justify-between gap-2 border border-outline-variant/30">
              <span className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-[18px] text-primary-fixed">info</span>
                <span className="truncate">{toastMessage}</span>
              </span>
              <button
                onClick={() => setToastMessage(null)}
                className="text-inverse-on-surface/70 hover:text-inverse-on-surface"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area Routing with Fluid Slide-In Transition */}
        <main className="flex-1 w-full flex flex-col relative overflow-x-hidden">
          <AnimatePresence mode="wait" custom={navDirection} initial={false}>
            <motion.div
              key={activeScreen}
              custom={navDirection}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={screenTransition}
              className="flex-1 w-full flex flex-col"
            >
              {activeScreen === 'shielding-setup' && (
                <AppShieldingSetupScreen
                  onContinueToPin={() => {
                    setPinModal({
                      open: true,
                      title: 'Confirm Security PIN',
                      subtitle: 'Enter 4-digit Master PIN to arm ZenFocus Shield',
                      onSuccess: () => {
                        showToast('ZenFocus Shield Armed successfully!');
                        navigateTo('student-dashboard', -1);
                      },
                    });
                  }}
                />
              )}

              {activeScreen === 'student-dashboard' && (
                <StudentDashboardScreen
                  timeBankBalance={bankBalance}
                  onStartSession={() => navigateTo('active-session', 1)}
                  onOpenTimeBank={() => navigateTo('time-bank', 1)}
                  onOpenTool={(tool) => setToolModal(tool)}
                  onOpenSos={() => setSosOpen(true)}
                  onTriggerLockedNotice={(appName) => {
                    showToast(`App "${appName}" is locked by Focus Shield. Earn time to unlock.`);
                  }}
                />
              )}

              {activeScreen === 'active-session' && (
                <ActiveFocusSessionScreen
                  onPauseRequest={() => {
                    setPinModal({
                      open: true,
                      title: 'Student PIN Required',
                      subtitle: 'Enter 4-digit PIN to pause the active study session',
                      onSuccess: () => showToast('Session paused for 5 minutes.'),
                    });
                  }}
                  onEndEarlyRequest={() => {
                    setPinModal({
                      open: true,
                      title: 'Parent PIN Required',
                      subtitle: 'Early session termination requires Guardian Master PIN',
                      onSuccess: () => {
                        showToast('Session ended by guardian authorization.');
                        navigateTo('student-dashboard', -1);
                      },
                    });
                  }}
                  onOpenTool={(tool) => setToolModal(tool)}
                />
              )}

              {activeScreen === 'time-bank' && (
                <TimeBankScreen
                  balance={bankBalance}
                  onRedeem={handleRedeem}
                  onVaultDeposit={handleVaultDeposit}
                />
              )}

              {activeScreen === 'parent-controls' && (
                <ParentalControlsScreen
                  onOpenAlerts={() => navigateTo('parent-alerts', 1)}
                  onOpenSecuritySetup={() => navigateTo('shielding-setup', 1)}
                  onChangePin={() => {
                    setPinModal({
                      open: true,
                      title: 'Change Master PIN',
                      subtitle: 'Enter current PIN to update security credentials',
                      onSuccess: () => {
                        const newPin = prompt('Enter new 4-digit PIN:', '1234');
                        if (newPin && newPin.length === 4) {
                          setMasterPin(newPin);
                          showToast('Master PIN updated successfully!');
                        }
                      },
                    });
                  }}
                />
              )}

              {activeScreen === 'parent-alerts' && (
                <ParentAlertsScreen onGrantTime={handleGrantTimeFromParent} />
              )}

              {activeScreen === 'work-dashboard' && (
                <WorkDashboardScreen onOpenZenBreaks={() => navigateTo('zen-breaks', 1)} />
              )}

              {activeScreen === 'zen-breaks' && <ZenBreaksScreen />}

              {activeScreen === 'digital-detox' && (
                <DigitalDetoxScreen
                  onStartMindfulReset={() => navigateTo('zen-breaks', 1)}
                  onBankToSaturday={() => {
                    setBankBalance((prev) => prev + 180); // 3 hours
                    showToast('+3 Hours added to Saturday Bank Vault!');
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Persistent Bottom Navigation Bar */}
        <BottomNavBar currentTab={currentTab} onSelectTab={handleSelectTab} />

        {/* Global Modals */}
        <SosModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />

        {pinModal && (
          <PinModal
            isOpen={pinModal.open}
            title={pinModal.title}
            subtitle={pinModal.subtitle}
            onClose={() => setPinModal(null)}
            onVerifyPin={handleVerifyPin}
          />
        )}

        <ToolDockModal
          tool={toolModal}
          onClose={() => setToolModal(null)}
        />
      </div>
    </div>
  );
}
