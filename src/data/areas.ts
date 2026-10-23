import {
  BathIcon,
  HouseIcon,
  PawPrintIcon,
  ShirtIcon,
  TreesIcon,
  UtensilsCrossedIcon,
  type LucideIcon } from
'lucide-react';
import type { AreaId } from '../types/chores';

export interface Area {
  id: AreaId;
  label: string;
  icon: LucideIcon;
}

export const areas: Area[] = [
{ id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossedIcon },
{ id: 'bathroom', label: 'Bathroom', icon: BathIcon },
{ id: 'laundry', label: 'Laundry', icon: ShirtIcon },
{ id: 'outside', label: 'Outside', icon: TreesIcon },
{ id: 'pets', label: 'Pets', icon: PawPrintIcon },
{ id: 'general', label: 'Around the house', icon: HouseIcon }];


export function areaById(id: AreaId): Area {
  return areas.find((a) => a.id === id) ?? areas[areas.length - 1];
}