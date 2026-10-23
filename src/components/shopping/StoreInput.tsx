import React from 'react';
import { StoreIcon, XIcon } from 'lucide-react';
import { useShopping } from '../../contexts/ShoppingContext';

interface StoreInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function StoreInput({ id, value, onChange }: StoreInputProps) {
  const { stores } = useShopping();
  const q = value.trim().toLowerCase();
  const suggestions = stores.filter((s) => s.toLowerCase() !== q && (!q || s.toLowerCase().includes(q))).slice(0, 6);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold text-muted">
        Store <span className="font-semibold">(optional)</span>
      </label>
      <div className="flex items-center gap-2 rounded-[16px] border-2 border-line bg-paper pl-3 pr-1.5 transition-colors duration-150 focus-within:border-cocoa">
        <StoreIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Albert Heijn"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 bg-transparent text-[15px] font-bold text-ink outline-none placeholder:font-semibold placeholder:text-muted/70" />
        
        {value &&
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear store"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-cream hover:text-ink">
          
            <XIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        }
      </div>
      {suggestions.length > 0 &&
      <div className="no-scrollbar -mx-1 mt-2 flex gap-1.5 overflow-x-auto px-1" aria-label="Earlier stores">
          {suggestions.map((s) =>
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className="h-8 shrink-0 whitespace-nowrap rounded-full bg-butter-soft px-3 text-[13px] font-bold text-ink transition-transform duration-100 active:scale-95">
          
              {s}
            </button>
        )}
        </div>
      }
    </div>);

}