import React, { useState } from 'react';

interface ToolDockModalProps {
  tool: 'calculator' | 'lexicon' | 'notebook' | null;
  onClose: () => void;
}

export const ToolDockModal: React.FC<ToolDockModalProps> = ({ tool, onClose }) => {
  // Calculator state
  const [calcInput, setCalcInput] = useState('0');
  const [calcPrev, setCalcPrev] = useState('');
  
  // Lexicon state
  const [searchTerm, setSearchTerm] = useState('');
  const [terms] = useState([
    { term: 'Calculus', def: 'The mathematical study of continuous change, encompassing differential and integral calculus.' },
    { term: 'Derivative', def: 'Measures the sensitivity to change of a function value with respect to a change in its argument.' },
    { term: 'Integral', def: 'Assigns numbers to functions in a way that describes displacement, area, volume, and other concepts that arise by combining infinitesimal data.' },
    { term: 'Limit', def: 'The value that a function approaches as the input approaches some value.' },
    { term: 'Chain Rule', def: 'Formula to compute the derivative of a composite function: (f ∘ g)\'(x) = f\'(g(x)) · g\'(x).' },
  ]);

  // Notebook state
  const [notes, setNotes] = useState('• Calculus integration review chapter 4\n• Practice limits problem set 12-18\n• Prepare formula cheat sheet for Thursday quiz');

  if (!tool) return null;

  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcInput('0');
      setCalcPrev('');
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math
        const sanitized = calcInput.replace(/×/g, '*').replace(/÷/g, '/');
        if (/^[0-9+\-*/. ]+$/.test(sanitized)) {
          // eslint-disable-next-line no-eval
          const res = Function(`'use strict'; return (${sanitized})`)();
          setCalcPrev(calcInput + ' =');
          setCalcInput(String(res));
        }
      } catch {
        setCalcInput('Error');
      }
    } else {
      if (calcInput === '0' && !isNaN(Number(val))) {
        setCalcInput(val);
      } else {
        setCalcInput((prev) => prev + val);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-surface rounded-3xl p-5 shadow-2xl border border-outline-variant/30 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">
                {tool === 'calculator' ? 'calculate' : tool === 'lexicon' ? 'menu_book' : 'edit_note'}
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-base font-semibold text-on-surface capitalize">
                Whitelisted {tool}
              </h3>
              <p className="font-label-sm text-[11px] text-primary font-medium">Study Shield Approved</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 flex-1 overflow-y-auto">
          {tool === 'calculator' && (
            <div className="flex flex-col gap-3">
              <div className="bg-surface-container-lowest p-3 rounded-2xl text-right shadow-inner border border-outline-variant/20">
                <div className="font-label-sm text-xs text-on-surface-variant h-4">{calcPrev}</div>
                <div className="font-headline-md text-2xl font-bold text-on-surface font-mono overflow-x-auto">{calcInput}</div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '00', '='].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleCalcButton(btn)}
                    className={`h-11 rounded-xl font-headline-sm text-base font-semibold flex items-center justify-center shadow-xs active:scale-95 transition-transform ${
                      btn === '='
                        ? 'bg-primary text-on-primary'
                        : ['÷', '×', '-', '+'].includes(btn)
                        ? 'bg-secondary-container text-on-secondary-container'
                        : btn === 'C'
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool === 'lexicon' && (
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Calculus terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-lowest px-3 py-2 pl-9 rounded-xl border border-outline-variant/30 text-sm focus:outline-none focus:border-primary"
                />
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-2.5 top-2.5">
                  search
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {terms
                  .filter((t) => t.term.toLowerCase().includes(searchTerm.toLowerCase()) || t.def.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => (
                    <div key={item.term} className="bg-surface-container-lowest p-3 rounded-xl shadow-xs">
                      <h4 className="font-title-md text-sm font-bold text-primary">{item.term}</h4>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">{item.def}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {tool === 'notebook' && (
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-xs text-on-surface-variant font-medium">Quick Study Scratchpad</label>
              <textarea
                rows={8}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 text-sm font-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
                placeholder="Write your study notes and key formulas..."
              />
              <span className="font-label-sm text-[11px] text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">save</span>
                Auto-saved locally during this focus session
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
