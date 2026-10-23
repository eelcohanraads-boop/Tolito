import React from 'react';
import { Avatar } from './Avatar';
import { useHousehold } from '../contexts/HouseholdContext';
import { repeatDays, todayWeekday, weekdays } from '../utils/recurrence';
import type { Chore } from '../types/chores';

/** Read-only "who does it when" list for chores with turns by day */
export function RotationSchedule({ chore }: {chore: Chore;}) {
  const { memberById, currentUserId } = useHousehold();
  const days = repeatDays(chore.repeat);
  if (!chore.rotation || !days) return null;
  const today = todayWeekday();

  return (
    <section className="mt-5" aria-labelledby="rotation-title">
      <h3 id="rotation-title" className="mb-2 text-sm font-extrabold text-muted">
        Taking turns
      </h3>
      <ul className="divide-y-2 divide-cream overflow-hidden rounded-[18px] border-2 border-line bg-paper">
        {days.map((day) => {
          const m = memberById(chore.rotation?.[day]);
          const isToday = day === today;
          return (
            <li key={day} className="flex items-center gap-3 px-4 py-2">
              <span className={`w-24 text-[15px] ${isToday ? 'font-extrabold text-ink' : 'font-bold text-muted'}`}>
                {weekdays[day].label}
                {isToday && <span className="sr-only"> (today)</span>}
              </span>
              <Avatar member={m} size="sm" />
              <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-ink">
                {m ? m.id === currentUserId ? 'You' : m.name : 'Anyone'}
              </span>
              {isToday &&
              <span className="shrink-0 rounded-full bg-butter-soft px-2 py-0.5 text-[12px] font-extrabold text-ink">
                  Today
                </span>
              }
            </li>);

        })}
      </ul>
    </section>);

}