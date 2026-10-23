import { todayWeekday } from '../utils/recurrence';
import type { AreaId, Chore, Rotation } from '../types/chores';

/** Emma and Daan take turns setting the table, parents cover the weekend */
const tableRotation: Rotation = { 0: 'emma', 1: 'daan', 2: 'emma', 3: 'daan', 4: 'emma', 5: 'mark', 6: 'sanne' };

export const initialChores: Chore[] = [
{
  id: 'c14',
  title: 'Set the table',
  area: 'kitchen',
  due: 'today',
  assigneeId: tableRotation[todayWeekday()] ?? null,
  done: false,
  repeat: { kind: 'daily' },
  rotation: tableRotation,
  points: 10
},
{ id: 'c1', title: 'Empty the dishwasher', area: 'kitchen', due: 'today', assigneeId: 'emma', done: false, repeat: { kind: 'daily' }, points: 10 },
{ id: 'c2', title: 'Feed Pip', area: 'pets', due: 'today', assigneeId: 'daan', done: true, doneById: 'daan', repeat: { kind: 'daily' }, note: 'One scoop of dry food in the morning, half a pouch in the evening.', points: 5 },
{ id: 'c3', title: 'Take out the bins', area: 'outside', due: 'today', assigneeId: null, done: false, repeat: { kind: 'custom', days: [1, 4] }, note: 'Green bin goes out tonight. Pickup is before 7:30 tomorrow.', points: 10 },
{ id: 'c4', title: 'Wipe kitchen counters', area: 'kitchen', due: 'today', assigneeId: 'sanne', done: false, points: 10 },
{
  id: 'c5',
  title: 'Do the laundry',
  area: 'laundry',
  due: 'today',
  assigneeId: 'sanne',
  done: false,
  repeat: { kind: 'custom', days: [0, 3, 5] },
  points: 45,
  subtasks: [
  { id: 'c5-1', title: 'Put it in the machine', done: true },
  { id: 'c5-2', title: 'Hang it out to dry', done: false },
  { id: 'c5-3', title: 'Fold it', done: false },
  { id: 'c5-4', title: 'Put it away in the closets', done: false }]

},
{ id: 'c6', title: 'Clean the bathroom sink', area: 'bathroom', due: 'today', assigneeId: 'mark', done: false, points: 15 },
{ id: 'c7', title: 'Walk Pip after dinner', area: 'pets', due: 'today', assigneeId: null, done: false, points: 20 },
{ id: 'c8', title: 'Vacuum the living room', area: 'general', due: 'tomorrow', assigneeId: 'mark', done: false, points: 20 },
{ id: 'c9', title: 'Change the bed sheets', area: 'laundry', due: 'tomorrow', assigneeId: 'sanne', done: false, repeat: { kind: 'weekly' }, points: 15 },
{ id: 'c10', title: 'Water the plants', area: 'outside', due: 'tomorrow', assigneeId: 'emma', done: false, points: 10 },
{ id: 'c11', title: 'Clean out the fridge', area: 'kitchen', due: 'week', assigneeId: null, done: false, expiresInDays: 4, points: 30 },
{ id: 'c12', title: 'Mow the lawn', area: 'outside', due: 'week', assigneeId: 'mark', done: false, points: 45 },
{ id: 'c13', title: 'Tidy the shoe rack', area: 'general', due: 'week', assigneeId: 'daan', done: false, points: 10 }];


export const quickPicks: {title: string;area: AreaId;steps?: string[];minutes?: number;}[] = [
{ title: 'Empty the dishwasher', area: 'kitchen', minutes: 10 },
{
  title: 'Do the laundry',
  area: 'laundry',
  minutes: 45,
  steps: ['Put it in the machine', 'Hang it out to dry', 'Fold it', 'Put it away in the closets']
},
{ title: 'Take out the bins', area: 'outside', minutes: 10 },
{ title: 'Feed Pip', area: 'pets', minutes: 5 },
{ title: 'Vacuum upstairs', area: 'general', minutes: 20 }];