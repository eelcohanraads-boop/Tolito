import React from 'react';
import { Chip } from './Chip';
import { describeRepeat, todayWeekday, weekdays } from '../utils/recurrence';
import type { Repeat, Weekday } from '../types/chores';

interface RepeatPickerProps {
  value: Repeat;
  onChange: (value: Repeat) => void;
}

const kinds: {id: Repeat['kind'];label: string;}[] = [
{ id: 'none', label: 'Once' },
{ id: 'daily', label: 'Daily' },
{ id: 'weekly', label: 'Weekly' },
{ id: 'custom', label: 'Custom' }];


export function RepeatPicker({ value, onChange }: RepeatPickerProps) {
  function pickKind(kind: Repeat['kind']) {
    if (kind === value.kind) return;
    if (kind === 'custom') onChange({ kind: 'custom', days: [todayWeekday()] });else
    onChange({ kind } as Repeat);
  }

  function toggleDay(day: Weekday) {
    if (value.kind !== 'custom') return;
    const has = value.days.includes(day);
    // Keep at least one day selected
    if (has && value.days.length === 1) return;
    onChange({ kind: 'custom', days: has ? value.days.filter((d) => d !== day) : [...value.days, day] });
  }

  return (
    <fieldset className="mt-5">
      <legend className="mb-2 text-sm font-extrabold text-muted">Repeat?</legend>
      <div className="flex flex-wrap gap-2">
        {kinds.map((k) =>
        <Chip key={k.id} selected={value.kind === k.id} onClick={() => pickKind(k.id)}>
            <span className="pl-1">{k.label}</span>
          </Chip>
        )}
      </div>

      {value.kind === 'custom' &&
      <div className="mt-3 rounded-[18px] border-2 border-line bg-paper p-3">
          <div className="flex justify-between gap-1" role="group" aria-label="Repeat on">
            {weekdays.map((d) => {
            const selected = value.days.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={selected}
                aria-label={d.label}
                onClick={() => toggleDay(d.id)}
                className={`grid h-10 w-10 place-items-center rounded-full font-display text-[15px] font-semibold transition-[background-color,color,transform] duration-150 active:scale-95 ${
                selected ? 'bg-butter text-ink' : 'bg-cream text-muted hover:text-ink'}`
                }>
                
                  {d.short}
                </button>);

          })}
          </div>
          <p className="mt-2.5 px-1 text-[13px] font-semibold text-muted">{describeRepeat(value)}</p>
        </div>
      }
    </fieldset>);

}