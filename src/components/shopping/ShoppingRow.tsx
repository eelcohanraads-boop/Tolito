import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, PlusIcon, RepeatIcon } from 'lucide-react';
import type { ShoppingItem } from '../../types/shopping';

export type RowMode = 'needed' | 'all' | 'bought';

interface ShoppingRowProps {
  item: ShoppingItem;
  mode: RowMode;
  onBuy: (item: ShoppingItem) => void;
  onUnbuy: (item: ShoppingItem) => void;
  onToggleNeeded: (item: ShoppingItem) => void;
  onOpen: (id: string) => void;
}

export function ShoppingRow({ item, mode, onBuy, onUnbuy, onToggleNeeded, onOpen }: ShoppingRowProps) {
  const [pending, setPending] = useState(false);
  const checked = mode === 'bought' || pending;

  function handleCheck() {
    if (mode === 'bought') {
      onUnbuy(item);
      return;
    }
    if (pending) return;
    setPending(true);
    window.setTimeout(() => onBuy(item), 240);
  }

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-1 bg-paper py-1 pl-1.5 pr-2.5">
      
      {mode !== 'all' &&
      <button
        type="button"
        onClick={handleCheck}
        aria-label={mode === 'bought' ? `Put ${item.name} back on the list` : `Mark ${item.name} as bought`}
        className="group grid h-12 w-12 shrink-0 place-items-center">
        
          <span
          className={`grid h-7 w-7 place-items-center rounded-full border-[2.5px] transition-[background-color,border-color,transform] duration-150 group-active:scale-90 ${
          checked ? 'border-leaf bg-leaf' : 'border-line-strong bg-paper group-hover:border-leaf'}`
          }>
          
            <CheckIcon
            strokeWidth={3.5}
            className={`h-4 w-4 text-white transition-[transform,opacity] duration-150 ${
            checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`
            } />
          
          </span>
        </button>
      }

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className={`flex min-w-0 flex-1 items-center gap-1.5 py-2.5 text-left ${mode === 'all' ? 'pl-2.5' : ''}`}>
        
        <span
          className={`truncate text-[16px] font-bold transition-colors duration-150 ${
          checked ? 'text-muted line-through decoration-line-strong decoration-2' : 'text-ink'}`
          }>
          
          {item.name}
        </span>
        {item.recurring &&
        <RepeatIcon className="h-3.5 w-3.5 shrink-0 text-muted" strokeWidth={2.5} aria-label="Every week" />
        }
      </button>

      {mode === 'all' && (
      item.needed ?
      <button
        type="button"
        aria-pressed="true"
        onClick={() => onToggleNeeded(item)}
        aria-label={`${item.name} is on the list. Remove`}
        className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-mint px-3 text-[13px] font-extrabold text-ink transition-transform duration-100 active:scale-95">
        
            <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            On list
          </button> :

      <button
        type="button"
        aria-pressed="false"
        onClick={() => onToggleNeeded(item)}
        aria-label={`Add ${item.name} to the list`}
        className="soft-pill flex h-9 shrink-0 items-center gap-1 rounded-full bg-butter px-3 text-[13px] font-extrabold text-ink shadow-[0_2px_0_rgb(var(--butter-deep))] transition-transform duration-100 active:scale-95">
        
            <PlusIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            Need
          </button>)
      }
    </motion.li>);

}