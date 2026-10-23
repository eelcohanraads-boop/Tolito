import {
  CoinsIcon,
  HourglassIcon,
  ListOrderedIcon,
  RepeatIcon,
  ShoppingBasketIcon,
  StoreIcon,
  type LucideIcon } from
'lucide-react';
import type { FeatureId, Features } from '../types/settings';

export interface FeatureDefinition {
  id: FeatureId;
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export const featureDefinitions: FeatureDefinition[] = [
{
  id: 'shopping',
  title: 'Shopping list',
  description: 'A shared list of things to buy, sorted by store.',
  icon: ShoppingBasketIcon
},
{
  id: 'recurring',
  title: 'Repeating chores',
  description: 'Let chores come back daily, weekly or on set days.',
  icon: RepeatIcon
},
{
  id: 'steps',
  title: 'Chore steps',
  description: 'Break bigger chores into smaller steps to tick off.',
  icon: ListOrderedIcon
},
{
  id: 'expiry',
  title: 'Expiring chores',
  description: "Chores disappear when they're not done in time.",
  icon: HourglassIcon
},
{
  id: 'points',
  title: 'Tolitokens',
  description: 'Earn tokens for chores and set a goal per person.',
  icon: CoinsIcon
},
{
  id: 'store',
  title: 'Token store',
  description: 'Swap tokens for treats like screen time or a movie night.',
  icon: StoreIcon
}];


export const defaultFeatures: Features = {
  shopping: true,
  recurring: true,
  steps: true,
  expiry: true,
  points: true,
  store: true
};