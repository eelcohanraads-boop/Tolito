import React, { useRef } from 'react';
import { CheckIcon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from './BottomSheet';
import { Avatar } from './Avatar';
import { Chip } from './Chip';
import { StepsChecklist } from './StepsChecklist';
import { useHousehold } from '../contexts/HouseholdContext';
import { areaById } from '../data/areas';
import { dueOptions } from '../data/due';
import { describeRepeat, isRecurring } from '../utils/recurrence';
import { describeExpiry } from '../utils/expiry';
import { tokens } from '../utils/points';
import { MinutesPicker } from './points/MinutesPicker';
import { RotationSchedule } from './RotationSchedule';
import type { Chore } from '../types/chores';

interface ChoreDetailSheetProps {
  choreId: string | null;
  onClose: () => void;
  onToggle: (chore: Chore) => void;
}

export function ChoreDetailSheet({ choreId, onClose, onToggle }: ChoreDetailSheetProps) {
  const { chores, members, currentUserId, memberById, assign, updateChore, removeChore, toggleSubtask, features } =
  useHousehold();
  const live = chores.find((c) => c.id === choreId);
  // Keep last chore around so content stays visible while the sheet slides away
  const lastRef = useRef<Chore | undefined>(live);
  if (live) lastRef.current = live;
  const chore = live ?? lastRef.current;

  const area = chore ? areaById(chore.area) : null;
  const AreaIcon = area?.icon;
  const doneBy = memberById(chore?.doneById);
  const isAdmin = memberById(currentUserId)?.role === 'admin';

  return (
    <BottomSheet open={!!choreId && !!live} onClose={onClose} title={chore?.title ?? 'Chore'}>
      {chore && area && AreaIcon &&
      <div className="px-5">
          <p className="-mt-1 flex items-center gap-1.5 text-sm font-semibold text-muted">
            <AreaIcon className="h-4 w-4" aria-hidden="true" />
            {area.label}
            {features.recurring && isRecurring(chore.repeat) && ` · ${describeRepeat(chore.repeat)}`}
            {features.expiry && !chore.done && chore.expiresInDays != null && ` · ${describeExpiry(chore.expiresInDays)}`}
            {features.points && !!chore.points && ` · ${tokens(chore.points)}`}
            {chore.done && doneBy && ` · Done by ${doneBy.id === currentUserId ? 'you' : doneBy.name}`}
          </p>

          {features.recurring && <RotationSchedule chore={chore} />}

          {chore.note &&
        <p className="mt-4 rounded-[18px] border-2 border-line bg-paper px-4 py-3.5 text-[15px] leading-relaxed text-ink">
              {chore.note}
            </p>
        }

          {features.steps && chore.subtasks && chore.subtasks.length > 0 &&
        <StepsChecklist
          steps={chore.subtasks}
          onToggle={(step) => {
            const subtasks = chore.subtasks ?? [];
            const othersDone = subtasks.every((s) => s.id === step.id || s.done);
            toggleSubtask(chore.id, step.id);
            // Finishing the last step completes the chore; reopening a step reopens it
            if (!step.done && othersDone && !chore.done) onToggle(chore);
            if (step.done && chore.done) onToggle(chore);
          }} />

        }

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-extrabold text-muted">Who's doing it?</legend>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
              <Chip selected={chore.assigneeId === null} onClick={() => assign(chore.id, null)}>
                <Avatar member={null} size="sm" />
                Anyone
              </Chip>
              {members.map((m) =>
            <Chip key={m.id} selected={chore.assigneeId === m.id} onClick={() => assign(chore.id, m.id)}>
                  <Avatar member={m} size="sm" />
                  {m.id === currentUserId ? 'Me' : m.name}
                </Chip>
            )}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-extrabold text-muted">When?</legend>
            <div className="flex gap-2">
              {dueOptions.map((d) =>
            <Chip key={d.id} selected={chore.due === d.id} onClick={() => updateChore(chore.id, { due: d.id })}>
                  <span className="pl-1">{d.chip}</span>
                </Chip>
            )}
            </div>
          </fieldset>

          {features.points && isAdmin && !chore.done &&
        <MinutesPicker value={chore.points ?? null} onChange={(v) => updateChore(chore.id, { points: v })} />
        }

          <div className="mt-7 flex flex-col gap-2">
            <button
            type="button"
            onClick={() => {
              onToggle(chore);
              onClose();
            }}
            className={`flex h-14 w-full items-center justify-center gap-2 rounded-[18px] font-display text-[18px] font-semibold transition-[background-color,transform,box-shadow] duration-150 active:translate-y-[3px] ${
            chore.done ?
            'border-2 border-line bg-paper text-ink' :
            'lift bg-leaf text-white shadow-[0_4px_0_rgb(var(--leaf-deep))] active:shadow-[0_1px_0_rgb(var(--leaf-deep))]'}`
            }>
            
              {chore.done ?
            <>
                  <RotateCcwIcon className="h-5 w-5" aria-hidden="true" /> Mark as not done
                </> :

            <>
                  <CheckIcon className="h-5 w-5" strokeWidth={3} aria-hidden="true" /> Mark as done
                </>
            }
            </button>
            <button
            type="button"
            onClick={() => {
              const removed = chore;
              removeChore(chore.id);
              onClose();
              toast(`Deleted "${removed.title}"`);
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-danger transition-colors duration-150 hover:bg-blush-soft">
            
              <Trash2Icon className="h-4 w-4" aria-hidden="true" /> Delete chore
            </button>
          </div>
        </div>
      }
    </BottomSheet>);

}