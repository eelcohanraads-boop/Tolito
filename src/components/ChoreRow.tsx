import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, RepeatIcon } from 'lucide-react';
import { describeRepeat, isRecurring } from '../utils/recurrence';
import { Avatar } from './Avatar';
import { TokenBadge } from './points/TokenBadge';
import { useHousehold } from '../contexts/HouseholdContext';
import type { Chore } from '../types/chores';

interface ChoreRowProps {
  chore: Chore;
  onToggle: (chore: Chore) => void;
  onOpen: (id: string) => void;
  onAssign: (id: string) => void;
}

export function ChoreRow({ chore, onToggle, onOpen, onAssign }: ChoreRowProps) {
  const { memberById, assign, currentUserId, features } = useHousehold();
  const [pending, setPending] = useState(false);
  const checked = chore.done || pending;
  const assignee = memberById(chore.assigneeId);
  const steps = chore.subtasks ?? [];
  const stepsDone = steps.filter((s) => s.done).length;

  function handleCheck() {
    if (chore.done) {
      onToggle(chore);
      return;
    }
    if (pending) return;
    // Brief beat so the check registers before the row moves to "Done"
    setPending(true);
    window.setTimeout(() => onToggle(chore), 240);
  }

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-1 bg-paper py-1 pl-1.5 pr-2.5">
      
      <button
        type="button"
        onClick={handleCheck}
        aria-label={chore.done ? `Mark "${chore.title}" as not done` : `Mark "${chore.title}" as done`}
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

      <button
        type="button"
        onClick={() => onOpen(chore.id)}
        className="flex min-w-0 flex-1 items-center gap-1.5 py-2.5 text-left">
        
        <span
          className={`truncate text-[16px] font-bold transition-colors duration-150 ${
          checked ? 'text-muted line-through decoration-line-strong decoration-2' : 'text-ink'}`
          }>
          
          {chore.title}
        </span>
        {features.steps && steps.length > 0 && !chore.done &&
        <span
          className="shrink-0 rounded-full bg-cream px-2 py-0.5 text-[12px] font-extrabold text-muted"
          aria-label={`${stepsDone} of ${steps.length} steps done`}>
          
            {stepsDone}/{steps.length}
          </span>
        }
        {features.recurring && isRecurring(chore.repeat) &&
        <RepeatIcon
          className="h-3.5 w-3.5 shrink-0 text-muted"
          strokeWidth={2.5}
          aria-label={describeRepeat(chore.repeat)} />

        }
        {features.points && !!chore.points && <TokenBadge amount={chore.points} />}
      </button>

      {!chore.done && (
      assignee ?
      <button
        type="button"
        onClick={() => onAssign(chore.id)}
        aria-label={`Assigned to ${assignee.id === currentUserId ? 'you' : assignee.name}. Change`}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-100 active:scale-95">
        
            <Avatar member={assignee} size="md" />
          </button> :

      <button
        type="button"
        onClick={() => assign(chore.id, currentUserId)}
        className="h-9 shrink-0 whitespace-nowrap rounded-full bg-butter px-3.5 font-display text-[14px] font-semibold text-ink soft-pill shadow-[0_2px_0_rgb(var(--butter-deep))] transition-[transform,box-shadow] duration-100 active:translate-y-[2px] active:shadow-none">
        
            I'll do it
          </button>)
      }
    </motion.li>);

}