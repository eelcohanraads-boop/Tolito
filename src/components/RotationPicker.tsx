import React from 'react';
import { Avatar } from './Avatar';
import { Chip } from './Chip';
import { weekdays } from '../utils/recurrence';
import type { Member, Rotation, Weekday } from '../types/chores';

interface RotationPickerProps {
  days: Weekday[];
  /** null = same person every time */
  value: Rotation | null;
  onChange: (value: Rotation | null) => void;
  members: Member[];
  currentUserId: string;
  /** Who it's currently assigned to, used to prefill each day */
  fallbackId: string | null;
}

export function RotationPicker({ days, value, onChange, members, currentUserId, fallbackId }: RotationPickerProps) {
  function start() {
    if (value) return;
    const next: Rotation = {};
    days.forEach((d) => next[d] = fallbackId);
    onChange(next);
  }

  function setDay(day: Weekday, memberId: string | null) {
    onChange({ ...(value ?? {}), [day]: memberId });
  }

  return (
    <fieldset className="mt-5">
      <legend className="mb-2 text-sm font-extrabold text-muted">Who does it on which day?</legend>
      <div className="flex gap-2">
        <Chip selected={!value} onClick={() => onChange(null)}>
          <span className="pl-1">Same person</span>
        </Chip>
        <Chip selected={!!value} onClick={start}>
          <span className="pl-1">Take turns by day</span>
        </Chip>
      </div>

      {value &&
      <ul className="mt-3 divide-y-2 divide-cream overflow-hidden rounded-[18px] border-2 border-line bg-paper">
          {days.map((day) => {
          const owner = value[day] ?? null;
          const label = weekdays[day].label;
          return (
            <li key={day} className="flex items-center gap-2 py-2 pl-4">
                <span className="w-11 shrink-0 font-display text-[15px] font-semibold text-ink">{label.slice(0, 3)}</span>
                <div
                role="radiogroup"
                aria-label={`Who does it on ${label}`}
                className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto pr-3">
                
                  {[null, ...members.map((m) => m.id)].map((id) => {
                  const m = members.find((x) => x.id === id) ?? null;
                  const selected = owner === id;
                  const name = m ? m.id === currentUserId ? 'Me' : m.name : 'Anyone';
                  return (
                    <button
                      key={id ?? 'anyone'}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={name}
                      onClick={() => setDay(day, id)}
                      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border-2 pl-0.5 pr-2.5 text-[13px] font-bold transition-[background-color,border-color,color] duration-150 ${
                      selected ? 'border-cocoa bg-cocoa text-cream' : 'border-line bg-paper text-ink hover:border-line-strong'}`
                      }>
                      
                        <Avatar member={m} size="sm" />
                        {name}
                      </button>);

                })}
                </div>
              </li>);

        })}
        </ul>
      }
    </fieldset>);

}