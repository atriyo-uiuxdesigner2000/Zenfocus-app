export type TabType = 'study' | 'parent' | 'work' | 'detox';

export type SubScreenType = 
  | 'none'
  | 'active-session'
  | 'time-bank'
  | 'parent-alerts'
  | 'zen-breaks'
  | 'security-setup';

export interface StudyApp {
  id: string;
  name: string;
  icon: string;
  category: string;
  whitelisted: boolean;
}

export interface BlockedApp {
  id: string;
  name: string;
  icon: string;
  category: string;
  locked: boolean;
  dailyAllowanceMins?: number;
}

export interface LedgerItem {
  id: string;
  title: string;
  time: string;
  type: 'earned' | 'spent';
  minutes: number;
  icon: string;
}

export interface DayUsage {
  day: string;
  shortDay: string;
  hours: number;
  note: string;
  isBest?: boolean;
}
