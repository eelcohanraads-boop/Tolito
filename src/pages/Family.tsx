import React, { useState } from 'react';
import { UserPlusIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { InviteSheet } from '../components/settings/InviteSheet';
import { useHousehold } from '../contexts/HouseholdContext';
import { roleLabel } from '../utils/roles';
import { usePoints } from '../contexts/PointsContext';
import { DEFAULT_GOAL } from '../utils/points';

interface FamilyProps {
  onOpenProfile: () => void;
}

export function Family({ onOpenProfile }: FamilyProps) {
  const { householdName, members, chores, currentUserId, memberById } = useHousehold();
  const [inviteOpen, setInviteOpen] = useState(false);
  const { enabled, walletOf } = usePoints();
  const me = memberById(currentUserId);
  const isAdmin = me?.role === 'admin';

  const stats = members.map((m) => {
    const doneNow = chores.filter((c) => c.done && c.doneById === m.id).length;
    const open = chores.filter((c) => !c.done && c.assigneeId === m.id).length;
    return { member: m, done: m.weekDone + doneNow, open };
  });
  const total = stats.reduce((sum, s) => sum + s.done, 0);
  const max = Math.max(1, ...stats.map((s) => s.done));

  return (
    <div className="px-5 pt-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[26px] font-bold tracking-tight text-cocoa">tolito</span>
        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Your settings"
          className="rounded-full transition-transform duration-150 active:scale-95">
          
          <Avatar member={me} size="md" />
        </button>
      </div>

      <header className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 truncate rounded-full bg-mint px-3.5 py-1 font-display text-[15px] font-semibold text-ink">
            {householdName}
          </span>
        </div>
        <h1 className="mt-3 font-display text-[30px] font-semibold leading-[1.1] text-ink">
          {total > 0 ? `${total} chores done together this week` : 'Your family, all in one place'}
        </h1>
      </header>

      <ul className="card-lift mt-6 divide-y-2 divide-cream overflow-hidden rounded-[24px] border-2 border-line bg-paper shadow-[0_3px_0_rgb(var(--line))]">
        {stats.map(({ member, done, open }) =>
        <li key={member.id} className="flex items-center gap-3.5 px-4 py-4">
            <Avatar member={member} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate font-display text-[17px] font-semibold text-ink">
                  {member.name}
                  {member.id === currentUserId && <span className="font-sans text-sm font-semibold text-muted"> (you)</span>}
                </span>
                <span className="shrink-0 text-sm font-extrabold text-ink">{done} done</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream">
                <div
                className="h-full origin-left rounded-full transition-transform duration-300 ease-out"
                style={{ backgroundColor: member.fg, transform: `scaleX(${done / max})` }} />
              
              </div>
              <p className="mt-1.5 text-[13px] font-semibold text-muted">
                {roleLabel(member.role)} · {open} to do
                {enabled && ` · ${walletOf(member.id)?.earned ?? 0}/${member.pointsGoal ?? DEFAULT_GOAL} tokens`}
              </p>
            </div>
          </li>
        )}
      </ul>

      {isAdmin ?
      <button
        type="button"
        onClick={() => setInviteOpen(true)}
        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-line-strong font-display text-[16px] font-semibold text-ink transition-colors duration-150 hover:bg-paper">
        
          <UserPlusIcon className="h-5 w-5" aria-hidden="true" />
          Invite someone
        </button> :

      <p className="mt-4 px-1 text-[14px] font-semibold text-muted">
          Want to add someone? Ask an admin to send them an invite.
        </p>
      }

      {isAdmin && <InviteSheet open={inviteOpen} onClose={() => setInviteOpen(false)} />}
    </div>);

}