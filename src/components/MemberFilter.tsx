import React from 'react';
import { UsersIcon } from 'lucide-react';
import { Avatar } from './Avatar';
import { useHousehold } from '../contexts/HouseholdContext';

interface MemberFilterProps {
  value: string;
  onChange: (value: string) => void;
  counts: Record<string, number>;
}

export function MemberFilter({ value, onChange, counts }: MemberFilterProps) {
  const { members, currentUserId } = useHousehold();
  const others = members.filter((m) => m.id !== currentUserId);
  const options = [
  { id: 'all', label: 'Everyone' },
  { id: currentUserId, label: 'You' },
  ...others.map((m) => ({ id: m.id, label: m.name }))];


  return (
    <div role="tablist" aria-label="Show chores for" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-4">
      {options.map((opt) => {
        const selected = value === opt.id;
        const member = members.find((m) => m.id === opt.id) ?? null;
        const count = counts[opt.id] ?? 0;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.id)}
            className="flex w-[68px] shrink-0 flex-col items-center gap-1.5 py-1.5">
            
            <span
              className={`relative rounded-full ring-[2.5px] ring-offset-2 ring-offset-cream transition-shadow duration-150 ${
              selected ? 'ring-cocoa' : 'ring-transparent'}`
              }>
              
              {member ?
              <Avatar member={member} size="lg" /> :

              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-paper bg-butter text-ink" aria-hidden="true">
                  <UsersIcon className="h-5 w-5" />
                </span>
              }
              {member && count > 0 &&
              <span className="absolute -right-1.5 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full border-2 border-cream bg-cocoa px-1 text-[11px] font-extrabold text-cream">
                  {count}
                </span>
              }
            </span>
            <span className={`text-xs ${selected ? 'font-extrabold text-ink' : 'font-semibold text-muted'}`}>
              {opt.label}
            </span>
          </button>);

      })}
    </div>);

}