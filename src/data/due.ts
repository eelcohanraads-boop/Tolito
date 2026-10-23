import type { Due } from '../types/chores';

export const dueOptions: {id: Due;label: string;chip: string;pill: string;}[] = [
{ id: 'today', label: 'Today', chip: 'Today', pill: 'bg-butter' },
{ id: 'tomorrow', label: 'Tomorrow', chip: 'Tomorrow', pill: 'bg-mint' },
{ id: 'week', label: 'Later this week', chip: 'This week', pill: 'bg-blush' }];