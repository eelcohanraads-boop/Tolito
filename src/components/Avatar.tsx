import React from 'react';
import { UsersIcon } from 'lucide-react';
import type { Member } from '../types/chores';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  member: Member | null;
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 text-[11px]',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-[88px] w-[88px] text-[34px]'
};

const iconSizes: Record<AvatarSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-8 w-8'
};

export function Avatar({ member, size = 'md' }: AvatarProps) {
  if (!member) {
    return (
      <span
        aria-hidden="true"
        className={`inline-grid shrink-0 place-items-center rounded-full border-2 border-dashed border-line-strong bg-paper text-muted ${sizes[size]}`}>
        
        <UsersIcon className={iconSizes[size]} />
      </span>);

  }
  if (!member.avatarUrl) {
    return (
      <span
        aria-hidden="true"
        className={`inline-grid shrink-0 place-items-center rounded-full border-2 border-paper font-display font-semibold ${sizes[size]}`}
        style={{ backgroundColor: member.bg, color: member.fg }}>
        
        {member.name[0]?.toUpperCase()}
      </span>);

  }
  return (
    <img
      src={member.avatarUrl}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`inline-block shrink-0 rounded-full border-2 border-paper object-cover ${sizes[size]}`}
      style={{ backgroundColor: member.bg }} />);


}