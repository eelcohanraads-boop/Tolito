import React from 'react';
import { CheckIcon } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { Avatar } from './Avatar';
import { useHousehold } from '../contexts/HouseholdContext';
import { pluralize } from '../utils/greeting';

interface AssignSheetProps {
  choreId: string | null;
  onClose: () => void;
}

export function AssignSheet({ choreId, onClose }: AssignSheetProps) {
  const { members, chores, currentUserId, assign } = useHousehold();
  const chore = chores.find((c) => c.id === choreId);

  function pick(memberId: string | null) {
    if (choreId) assign(choreId, memberId);
    onClose();
  }

  const options = [
  { id: null, label: 'Anyone', sub: 'Up for grabs', member: null },
  ...members.map((m) => {
    const open = chores.filter((c) => c.assigneeId === m.id && !c.done).length;
    return {
      id: m.id,
      label: m.id === currentUserId ? `${m.name} (you)` : m.name,
      sub: `${pluralize(open, 'chore')} to do`,
      member: m
    };
  })];


  return (
    <BottomSheet open={!!choreId} onClose={onClose} title={chore ? `Who does "${chore.title}"?` : 'Assign chore'}>
      <ul className="px-3">
        {options.map((opt) => {
          const selected = chore?.assigneeId === opt.id;
          return (
            <li key={opt.id ?? 'anyone'}>
              <button
                type="button"
                onClick={() => pick(opt.id)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition-colors duration-150 ${
                selected ? 'bg-paper' : 'hover:bg-paper/60'}`
                }>
                
                <Avatar member={opt.member} size="lg" />
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-ink">{opt.label}</span>
                  <span className="block text-[13px] font-semibold text-muted">{opt.sub}</span>
                </span>
                {selected && <CheckIcon className="h-5 w-5 text-leaf" strokeWidth={3} aria-hidden="true" />}
              </button>
            </li>);

        })}
      </ul>
    </BottomSheet>);

}