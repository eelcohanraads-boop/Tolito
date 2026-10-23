import React, { useState } from 'react';
import { HandHeartIcon } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import { PrimaryButton } from '../../components/PrimaryButton';
import { firstName } from '../../utils/household';
import type { AuthUser, HouseholdSeed } from '../../types/auth';
import type { Member } from '../../types/chores';

interface JoinFamilyProps {
  household: HouseholdSeed;
  inviter: Member;
  user: AuthUser;
  onJoin: () => void;
  onStartOwn: () => void;
}

export function JoinFamily({ household, inviter, user, onJoin, onStartOwn }: JoinFamilyProps) {
  const [joining, setJoining] = useState(false);
  const admins = household.members.filter((m) => m.role === 'admin').map((m) => m.name);
  const names = household.members.map((m) => m.name);

  function join() {
    setJoining(true);
    window.setTimeout(onJoin, 600);
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
      <span className="font-display text-[30px] font-bold tracking-tight text-cocoa">tolito</span>

      <p className="mt-8 text-[15px] font-bold text-muted">Hi {firstName(user.name)}!</p>
      <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">Join {household.name}</h1>
      <p className="mt-1.5 text-[15px] font-semibold text-muted">
        {inviter.name} invited you to share the chores with the family.
      </p>

      <div className="card-lift mt-6 rounded-[24px] border-2 border-line bg-paper p-5 shadow-[0_3px_0_rgb(var(--line))]">
        <div className="flex -space-x-2.5">
          {household.members.map((m) =>
          <Avatar key={m.id} member={m} size="lg" />
          )}
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-dashed border-leaf bg-paper font-display text-lg font-semibold text-leaf">
            {firstName(user.name)[0]}
          </span>
        </div>
        <p className="mt-3 text-[15px] font-bold text-ink">
          {names.slice(0, -1).join(', ')} and {names[names.length - 1]}
          <span className="font-semibold text-muted">, and soon you</span>
        </p>

        <div className="my-4 h-0.5 rounded-full bg-cream" aria-hidden="true" />

        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint text-ink" aria-hidden="true">
            <HandHeartIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-extrabold text-ink">You'll join as a member</p>
            <p className="mt-0.5 text-[14px] font-semibold leading-snug text-muted">
              Pick up chores, hand them to others and tick them off. {admins.join(' and ')}{' '}
              {admins.length === 1 ? 'is the admin' : 'are the admins'} and can change roles and settings.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={join} loading={joining}>
          Join the family
        </PrimaryButton>
        <button
          type="button"
          onClick={onStartOwn}
          disabled={joining}
          className="mt-3 h-12 w-full text-[15px] font-extrabold text-muted transition-colors duration-150 hover:text-ink">
          
          Not your family? Start your own
        </button>
      </div>
    </div>);

}