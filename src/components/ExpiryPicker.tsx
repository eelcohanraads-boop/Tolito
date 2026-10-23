import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Chip } from './Chip';
import { describeExpiry } from '../utils/expiry';

interface ExpiryPickerProps {
  /** null = never expires */
  value: number | null;
  onChange: (value: number | null) => void;
}

const MIN_DAYS = 1;
const MAX_DAYS = 30;
const DEFAULT_DAYS = 3;

export function ExpiryPicker({ value, onChange }: ExpiryPickerProps) {
  const days = value ?? DEFAULT_DAYS;

  return (
    <fieldset className="mt-5">
      <legend className="mb-2 text-sm font-extrabold text-muted">Expires?</legend>
      <div className="flex gap-2">
        <Chip selected={value === null} onClick={() => onChange(null)}>
          <span className="pl-1">Never</span>
        </Chip>
        <Chip selected={value !== null} onClick={() => value === null && onChange(DEFAULT_DAYS)}>
          <span className="pl-1">After a few days</span>
        </Chip>
      </div>

      {value !== null &&
      <div className="mt-3 flex items-center justify-between gap-3 rounded-[18px] border-2 border-line bg-paper py-2 pl-4 pr-2">
          <span className="text-[15px] font-bold text-ink">
            Expires after
          </span>
          <div className="flex items-center gap-1">
            <button
            type="button"
            onClick={() => onChange(Math.max(MIN_DAYS, days - 1))}
            disabled={days <= MIN_DAYS}
            aria-label="One day less"
            className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition-[transform,opacity] duration-150 active:scale-95 disabled:opacity-40">
            
              <MinusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
            </button>
            <span className="w-[72px] text-center font-display text-[17px] font-semibold text-ink" aria-live="polite">
              {days} {days === 1 ? 'day' : 'days'}
            </span>
            <button
            type="button"
            onClick={() => onChange(Math.min(MAX_DAYS, days + 1))}
            disabled={days >= MAX_DAYS}
            aria-label="One day more"
            className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition-[transform,opacity] duration-150 active:scale-95 disabled:opacity-40">
            
              <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
            </button>
          </div>
        </div>
      }
      {value !== null &&
      <p className="mt-2 px-1 text-[13px] font-semibold text-muted">{describeExpiry(value)} if nobody does it.</p>
      }
    </fieldset>);

}