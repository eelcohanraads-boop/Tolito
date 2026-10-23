import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, HeartHandshakeIcon } from 'lucide-react';
import { useDesign } from '../contexts/DesignContext';
import { toast } from 'sonner';
import { Avatar } from '../components/Avatar';
import { ChoreRow } from '../components/ChoreRow';
import { MemberFilter } from '../components/MemberFilter';
import { AssignSheet } from '../components/AssignSheet';
import { ChoreDetailSheet } from '../components/ChoreDetailSheet';
import { tokens } from '../utils/points';
import { useHousehold } from '../contexts/HouseholdContext';
import { dueOptions } from '../data/due';
import { mascotImages } from '../data/members';
import { getGreeting, pluralize } from '../utils/greeting';
import type { Chore } from '../types/chores';
import { useScreenInit } from '../useScreenInit.js';

const listClass =
'relative divide-y-2 divide-cream overflow-hidden rounded-[24px] border-2 border-line bg-paper shadow-[0_3px_0_rgb(var(--line))] card-lift';

interface ChoresProps {
  onOpenProfile: () => void;
}

export function Chores({ onOpenProfile }: ChoresProps) {
  const { chores, members, currentUserId, memberById, setDone, features } = useHousehold();
  const screenInit = useScreenInit();
  const design = useDesign();
  const [filter, setFilter] = useState<string>(screenInit.filter ?? currentUserId);
  const [showDone, setShowDone] = useState<boolean>(screenInit.showDone ?? false);
  const [assignFor, setAssignFor] = useState<string | null>(screenInit.assignFor ?? null);
  const [detailId, setDetailId] = useState<string | null>(screenInit.detailId ?? null);

  const me = memberById(currentUserId);

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    members.forEach((m) => {
      result[m.id] = chores.filter((c) => c.assigneeId === m.id && !c.done).length;
    });
    return result;
  }, [chores, members]);

  // "You" shows your own chores plus everything still up for grabs
  const visible =
  filter === 'all' ?
  chores :
  filter === currentUserId ?
  chores.filter((c) => c.assigneeId === currentUserId || c.assigneeId === null || c.doneById === currentUserId) :
  chores.filter((c) => c.assigneeId === filter);
  const open = visible.filter((c) => !c.done);
  const done = visible.filter((c) => c.done);

  const today = visible.filter((c) => c.due === 'today');
  const todayDone = today.filter((c) => c.done).length;
  const progress = today.length ? todayDone / today.length : 0;

  const myTodayOpen = chores.filter((c) => c.assigneeId === currentUserId && c.due === 'today' && !c.done).length;
  const upForGrabs = chores.filter((c) => c.assigneeId === null && !c.done).length;

  const filterMember = memberById(filter);
  const scopeLabel = filter === 'all' ? 'the family' : filter === currentUserId ? 'you' : filterMember?.name ?? '';

  function handleToggle(chore: Chore) {
    if (chore.done) {
      setDone(chore.id, false);
      return;
    }
    setDone(chore.id, true);
    const earned = features.points && chore.points ? ` · +${tokens(chore.points)}` : '';
    toast(`Nice one! "${chore.title}" is done${earned}`, {
      action: { label: 'Undo', onClick: () => setDone(chore.id, false) }
    });
  }

  return (
    <div className="px-5 pt-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[26px] font-bold tracking-tight text-cocoa">Tolito</span>
        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Your settings"
          className="rounded-full transition-transform duration-150 active:scale-95">
          
          <Avatar member={me} size="md" />
        </button>
      </div>

      <header className="mt-3 flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[26px] font-semibold leading-[1.15] text-ink">
            {getGreeting()}, {me?.name}
          </h1>
          <p className="mt-2 text-[15px] font-semibold text-muted">
            {myTodayOpen > 0 ?
            `${pluralize(myTodayOpen, 'chore')} left for you today` :
            'Nothing left for you today!'}
            {upForGrabs > 0 && ` · ${upForGrabs} up for grabs`}
          </p>
        </div>
      </header>

      {today.length > 0 &&
      <div className="mt-4">
          <div className="flex items-baseline justify-between text-[13px] font-bold">
            <span className="text-ink">Today for {scopeLabel}</span>
            <span className="text-muted">
              {todayDone} of {today.length} done
            </span>
          </div>
          <div
          className="mt-1.5 h-3 overflow-hidden rounded-full border-2 border-line bg-paper"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={today.length}
          aria-valuenow={todayDone}
          aria-label="Today's progress">
          
            <div
            className="h-full origin-left rounded-full bg-leaf transition-transform duration-300 ease-out"
            style={{ transform: `scaleX(${progress})` }} />
          
          </div>
        </div>
      }

      <div className="mt-5">
        <MemberFilter value={filter} onChange={setFilter} counts={counts} />
      </div>

      {open.length === 0 ?
      <div className="mt-4 flex flex-col items-center text-center">
          {design === 'brownie' ?
        <img src={mascotImages.relaxing} alt="" className="w-52 mix-blend-multiply" /> :

        <span className="mb-4 mt-6 grid h-28 w-28 place-items-center rounded-full bg-cocoa-soft text-cocoa" aria-hidden="true">
              <HeartHandshakeIcon className="h-12 w-12" strokeWidth={1.75} />
            </span>
        }
          <h2 className="font-display text-2xl font-semibold text-ink">All clear!</h2>
          <p className="mt-1 max-w-[260px] text-[15px] font-semibold text-muted">
            {filter === 'all' ?
          'Every chore is done. Enjoy the calm together.' :
          `Nothing left on ${filter === currentUserId ? 'your' : `${filterMember?.name}'s`} list.`}
          </p>
        </div> :

      dueOptions.map((group) => {
        const items = open.filter((c) => c.due === group.id);
        if (items.length === 0) return null;
        return (
          <section key={group.id} className="mt-6" aria-labelledby={`group-${group.id}`}>
              <h2
              id={`group-${group.id}`}
              className={`mb-2.5 inline-flex items-center gap-2 rounded-full py-1 pl-3.5 pr-1.5 font-display text-[17px] font-semibold text-ink ${group.pill}`}>
              
                {group.label}
                <span className="grid h-6 min-w-[24px] place-items-center rounded-full bg-paper/70 px-1.5 text-[13px]">
                  {items.length}
                </span>
              </h2>
              <ul className={listClass}>
                <AnimatePresence initial={false} mode="popLayout">
                  {items.map((c) =>
                <ChoreRow key={c.id} chore={c} onToggle={handleToggle} onOpen={setDetailId} onAssign={setAssignFor} />
                )}
                </AnimatePresence>
              </ul>
            </section>);

      })
      }

      {done.length > 0 &&
      <section className="mt-6" aria-label="Done">
          <button
          type="button"
          onClick={() => setShowDone((s) => !s)}
          aria-expanded={showDone}
          className="flex w-full items-center gap-2 px-1 py-1 text-left font-display text-[17px] font-semibold text-muted transition-colors duration-150 hover:text-ink">
          
            Done
            <span className="text-sm">{done.length}</span>
            <ChevronDownIcon
            className={`ml-auto h-5 w-5 transition-transform duration-200 ${showDone ? 'rotate-180' : ''}`}
            aria-hidden="true" />
          
          </button>
          {showDone &&
        <ul className={`mt-2 ${listClass} opacity-90`}>
              <AnimatePresence initial={false} mode="popLayout">
                {done.map((c) =>
            <ChoreRow key={c.id} chore={c} onToggle={handleToggle} onOpen={setDetailId} onAssign={setAssignFor} />
            )}
              </AnimatePresence>
            </ul>
        }
        </section>
      }

      <AssignSheet choreId={assignFor} onClose={() => setAssignFor(null)} />
      <ChoreDetailSheet choreId={detailId} onClose={() => setDetailId(null)} onToggle={handleToggle} />
    </div>);

}