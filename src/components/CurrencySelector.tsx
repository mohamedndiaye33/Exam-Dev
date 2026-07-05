import { useEffect, useRef, useState } from 'react';
import { CURRENCIES, CURRENCY_META } from '../services/currency';
import type { Currency } from '../services/currency'; // ✅ import type séparé

interface Props {
  selected: Currency;
  onChange: (c: Currency) => void;
  loading: boolean;
}

export default function CurrencySelector({ selected, onChange, loading }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = CURRENCY_META[selected];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-red-600 hover:bg-white/10 border border-white/10 hover:border-red-600/50 rounded-lg px-4 py-2 transition-all text-sm"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className="text-base">{current.flag}</span>
        )}
        <span className="font-black text-white uppercase text-[11px] tracking-widest">
          {current.symbol}
        </span>
        <svg
          className={`w-3 h-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          {CURRENCIES.map((c) => {
            const meta = CURRENCY_META[c];
            const isActive = c === selected;
            return (
              <button
                key={c}
                onClick={() => { onChange(c); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                  ${isActive
                    ? 'bg-red-600/20 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className="text-base">{meta.flag}</span>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest">{meta.symbol}</p>
                  <p className="text-[10px] text-slate-500">{meta.label}</p>
                </div>
                {isActive && <span className="ml-auto text-red-500 text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
