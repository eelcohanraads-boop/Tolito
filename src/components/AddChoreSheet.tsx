import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BottomSheet } from './BottomSheet';
import { Avatar } from './Avatar';
import { Chip } from './Chip';
import { useHousehold } from '../contexts/HouseholdContext';
import { dueOptions } from '../data/due';
import { quickPicks } from '../data/chores';
import { RepeatPicker } from './RepeatPicker';
import { ExpiryPicker } from './ExpiryPicker';
import { StepsEditor } from './StepsEditor';
import { MinutesPicker } from './points/MinutesPicker';
import { RotationPicker } from './RotationPicker';
import { repeatDays, todayWeekday } from '../utils/recurrence';
import type { AreaId, Due, Repeat, Rotation } from '../types/chores';

interface AddChoreSheetProps {
  open: boolean;
  onClose: () => void;
}

export function AddChoreSheet({ open, onClose }: AddChoreSheetProps) {
  const { members, currentUserId, addChore, features } = useHousehold();
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [due, setDue] = useState<Due>('today');
  const [area, setArea] = useState<AreaId>('general');
  const [repeat, setRepeat] = useState<Repeat>({ kind: 'none' });
  const [expiresInDays, setExpiresInDays] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [rotation, setRotation] = useState<Rotation | null>(null);
  const days = features.recurring ? repeatDays(repeat) : null;
  const usesRotation = !!rotation && !!days;
  const isAdmin = members.find((m) => m.id === currentUserId)?.role === 'admin';
  const canAward = features.points && isAdmin;

  useEffect(() => {
    if (open) {
      setMinutes(null);
      setRotation(null);
      setSteps([]);
      setTitle('');
      setAssigneeId(null);
      setDue('today');
      setArea('general');
      setRepeat({ kind: 'none' });
      setExpiresInDays(null);
    }
  }, [open]);

  const trimmed = title.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trimmed) return;
    const stamp = Date.now();
    // Keep only the days the chore actually happens on
    const schedule: Rotation | null = usesRotation && days ? Object.fromEntries(days.map((d) => [d, rotation?.[d] ?? null])) : null;
    addChore({
      title: trimmed,
      area,
      due,
      // With turns by day, today's owner picks it up
      assigneeId: schedule ? schedule[todayWeekday()] ?? null : assigneeId,
      rotation: schedule,
      repeat: features.recurring ? repeat : { kind: 'none' },
      expiresInDays: features.expiry ? expiresInDays : null,
      subtasks: features.steps ? steps.map((s, i) => ({ id: `s-${stamp}-${i}`, title: s, done: false })) : [],
      points: canAward ? minutes : null
    });
    toast(`Added "${trimmed}"`);
    onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="New chore">
      <form onSubmit={handleSubmit} className="px-5">
        <label htmlFor="chore-title" className="sr-only">
          What needs doing?
        </label>
        <input
          id="chore-title"
          autoFocus
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="h-14 w-full rounded-[18px] border-2 border-line bg-paper px-4 text-lg font-bold text-ink outline-none transition-colors duration-150 placeholder:font-semibold placeholder:text-muted focus:border-cocoa" />
        

        {!trimmed &&
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
            {quickPicks.map((pick) =>
          <button
            key={pick.title}
            type="button"
            onClick={() => {
              setTitle(pick.title);
              setArea(pick.area);
              if (pick.steps) setSteps(pick.steps);
              if (pick.minutes) setMinutes(pick.minutes);
            }}
            className="h-8 shrink-0 whitespace-nowrap rounded-full bg-butter-soft px-3 text-[13px] font-bold text-ink transition-transform duration-100 active:scale-95">
            
                {pick.title}
              </button>
          )}
          </div>
        }

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-extrabold text-muted">Who's doing it?</legend>
          {usesRotation ?
          <p className="rounded-[18px] border-2 border-line bg-paper px-4 py-3 text-[14px] font-semibold text-muted">
              Taking turns by day. Set who does it on each day under “Repeat?”.
            </p> :

          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            <Chip selected={assigneeId === null} onClick={() => setAssigneeId(null)}>
              <Avatar member={null} size="sm" />
              Anyone
            </Chip>
            {members.map((m) =>
            <Chip key={m.id} selected={assigneeId === m.id} onClick={() => setAssigneeId(m.id)}>
                <Avatar member={m} size="sm" />
                {m.id === currentUserId ? 'Me' : m.name}
              </Chip>
            )}
          </div>
          }
        </fieldset>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-extrabold text-muted">When?</legend>
          <div className="flex gap-2">
            {dueOptions.map((d) =>
            <Chip key={d.id} selected={due === d.id} onClick={() => setDue(d.id)}>
                <span className="pl-1">{d.chip}</span>
              </Chip>
            )}
          </div>
        </fieldset>

        {canAward && <MinutesPicker value={minutes} onChange={setMinutes} />}

        {features.steps && <StepsEditor steps={steps} onChange={setSteps} />}

        {features.recurring && <RepeatPicker value={repeat} onChange={setRepeat} />}

        {days &&
        <RotationPicker
          days={days}
          value={rotation}
          onChange={setRotation}
          members={members}
          currentUserId={currentUserId}
          fallbackId={assigneeId} />

        }

        {features.expiry && <ExpiryPicker value={expiresInDays} onChange={setExpiresInDays} />}

        <button
          type="submit"
          disabled={!trimmed}
          className="mt-7 h-14 w-full rounded-[18px] bg-cocoa font-display text-[18px] font-semibold text-cream shadow-[0_4px_0_rgb(var(--cocoa-deep))] transition-[background-color,transform,box-shadow] duration-150 active:translate-y-[3px] active:shadow-[0_1px_0_rgb(var(--cocoa-deep))] lift disabled:bg-line disabled:text-muted disabled:shadow-none">
          
          Add chore
        </button>
      </form>
    </BottomSheet>);

}