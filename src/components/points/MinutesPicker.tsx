import React from 'react';
import { Chip } from '../Chip';
import { minuteOptions } from '../../utils/points';

interface MinutesPickerProps {
  /** Minutes = tokens; null = no tokens */
  value: number | null;
  onChange: (value: number | null) => void;
}

/** Admin-only: how long a chore takes, which is what it earns */
export function MinutesPicker({ value, onChange }: MinutesPickerProps) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-extrabold text-muted">How long does it take?</legend>
      <p className="mb-2 mt-0.5 text-[13px] font-semibold text-muted">Every minute earns 1 token. Only admins can set this.</p>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        <Chip selected={value === null} onClick={() => onChange(null)}>
          <span className="pl-1">No tokens</span>
        </Chip>
        {minuteOptions.map((m) =>
        <Chip key={m} selected={value === m} onClick={() => onChange(m)}>
            <span className="pl-1">{m} min</span>
          </Chip>
        )}
      </div>
    </fieldset>);

}