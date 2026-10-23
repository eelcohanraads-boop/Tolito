import type { Repeat, Weekday } from '../types/chores';

export const weekdays: {id: Weekday;short: string;label: string;}[] = [
{ id: 0, short: 'M', label: 'Monday' },
{ id: 1, short: 'T', label: 'Tuesday' },
{ id: 2, short: 'W', label: 'Wednesday' },
{ id: 3, short: 'T', label: 'Thursday' },
{ id: 4, short: 'F', label: 'Friday' },
{ id: 5, short: 'S', label: 'Saturday' },
{ id: 6, short: 'S', label: 'Sunday' }];


/** Today's weekday as 0 = Monday … 6 = Sunday */
export function todayWeekday(date: Date = new Date()): Weekday {
  return (date.getDay() + 6) % 7 as Weekday;
}

/** The weekdays a repeating chore happens on, or null when it has no fixed days */
export function repeatDays(repeat: Repeat | undefined): Weekday[] | null {
  if (!repeat) return null;
  if (repeat.kind === 'daily') return weekdays.map((d) => d.id);
  if (repeat.kind === 'custom') return [...repeat.days].sort((a, b) => a - b);
  return null;
}

export function isRecurring(repeat: Repeat | undefined): boolean {
  return !!repeat && repeat.kind !== 'none';
}

export function describeRepeat(repeat: Repeat | undefined): string {
  if (!repeat || repeat.kind === 'none') return '';
  if (repeat.kind === 'daily') return 'Every day';
  if (repeat.kind === 'weekly') return 'Every week';
  const sorted = [...repeat.days].sort((a, b) => a - b);
  if (sorted.length === 7) return 'Every day';
  return `Every ${sorted.map((d) => weekdays[d].label.slice(0, 3)).join(', ')}`;
}