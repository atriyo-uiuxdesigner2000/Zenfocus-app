import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { tab: TabType; label: string; icon: string }[] = [
    { tab: 'study', label: 'Study', icon: 'school' },
    { tab: 'parent', label: 'Parent', icon: 'shield_person' },
    { tab: 'work', label: 'Work', icon: 'timer' },
    { tab: 'detox', label: 'Detox', icon: 'spa' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)] border-t border-surface-container-high/40">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
