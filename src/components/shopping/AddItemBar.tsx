import React, { useEffect, useRef } from 'react';
import { HistoryIcon, PlusIcon, RepeatIcon } from 'lucide-react';
import { Chip } from '../Chip';
import { StoreInput } from './StoreInput';
import { useAddItemBar } from '../../hooks/useAddItemBar';

interface AddItemBarProps {
  /** Increments when the + button asks to focus the field */
  focusKey: number;
  initialName?: string;
}

export function AddItemBar({ focusKey, initialName }: AddItemBarProps) {
  const f = useAddItemBar(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusKey > 0) inputRef.current?.focus();
  }, [focusKey]);

  return (
    <form
      onSubmit={f.submit}
      className="card-lift rounded-[24px] border-2 border-line bg-paper p-1.5 shadow-[0_3px_0_rgb(var(--line))]">
      
      <div className="flex items-center gap-2 pl-3">
        <PlusIcon className="h-5 w-5 shrink-0 text-muted" strokeWidth={2.5} aria-hidden="true" />
        <label htmlFor="add-item" className="sr-only">
          Add an item
        </label>
        <input
          ref={inputRef}
          id="add-item"
          value={f.name}
          onChange={(e) => f.setName(e.target.value)}
          placeholder="Add an item…"
          autoComplete="off"
          enterKeyHint="done"
          className="h-11 min-w-0 flex-1 bg-transparent text-[16px] font-bold text-ink outline-none placeholder:font-semibold placeholder:text-muted" />
        
        {f.q &&
        <button
          type="submit"
          className="h-10 shrink-0 rounded-[16px] bg-cocoa px-4 text-[14px] font-extrabold text-paper transition-transform duration-100 active:scale-95">
          
            {f.exact ? f.exact.needed ? 'Listed' : 'Add' : 'Add'}
          </button>
        }
      </div>

      {f.q &&
      <div className="mt-1.5 border-t-2 border-cream px-1.5 pb-1.5 pt-1.5">
          {f.matches.length > 0 &&
        <ul aria-label="Earlier items">
              {f.matches.map((item) =>
          <li key={item.id}>
                  <button
              type="button"
              onClick={() => f.pick(item)}
              className="flex w-full items-center gap-3 rounded-[14px] px-2 py-2 text-left transition-colors duration-150 hover:bg-cream">
              
                    <HistoryIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">
                      <span className="text-[15px] font-bold text-ink">{item.name}</span>
                      {item.store && <span className="text-[13px] font-semibold text-muted"> · {item.store}</span>}
                    </span>
                    <span className={`shrink-0 text-[13px] font-extrabold ${item.needed ? 'text-muted' : 'text-cocoa'}`}>
                      {item.needed ? 'On the list' : 'Add'}
                    </span>
                  </button>
                </li>
          )}
            </ul>
        }

          {!f.exact &&
        <div className="px-1.5 pb-1 pt-2">
              <p className="mb-3 text-[13px] font-extrabold text-muted">
                New item: <span className="text-ink">“{f.q}”</span>
              </p>
              <StoreInput id="new-item-store" value={f.store} onChange={f.setStore} />
              <div className="mt-3 flex gap-2" role="group" aria-label="How often?">
                <Chip selected={!f.recurring} onClick={() => f.setRecurring(false)}>
                  <span className="pl-1">One time</span>
                </Chip>
                <Chip selected={f.recurring} onClick={() => f.setRecurring(true)}>
                  <RepeatIcon className="h-4 w-4" aria-hidden="true" />
                  Every week
                </Chip>
              </div>
            </div>
        }
        </div>
      }
    </form>);

}