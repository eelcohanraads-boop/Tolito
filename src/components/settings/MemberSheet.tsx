import React, { useEffect, useRef, useState } from 'react';
import { UserMinusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { Avatar } from '../Avatar';
import { useHousehold } from '../../contexts/HouseholdContext';
import { roleInfo } from '../../utils/roles';
import type { Member, Role } from '../../types/chores';

interface MemberSheetProps {
  memberId: string | null;
  onClose: () => void;
}

const roles: Role[] = ['admin', 'contributor'];

export function MemberSheet({ memberId, onClose }: MemberSheetProps) {
  const { memberById, members, currentUserId, updateMember, removeMember } = useHousehold();
  const live = memberById(memberId);
  const lastRef = useRef<Member | null>(live);
  if (live) lastRef.current = live;
  const m = live ?? lastRef.current;
  const [confirming, setConfirming] = useState(false);

  useEffect(() => setConfirming(false), [memberId]);

  if (!m) return null;
  const isMe = m.id === currentUserId;
  const organisers = members.filter((x) => x.role === 'admin').length;
  const lockRole = m.role === 'admin' && organisers === 1;

  function changeRole(role: Role) {
    if (!m || role === m.role) return;
    updateMember(m.id, { role });
    toast(`${isMe ? "You're" : `${m.name} is`} now ${role === 'admin' ? 'an admin' : 'a member'}`);
  }

  function remove() {
    if (!m) return;
    removeMember(m.id);
    onClose();
    toast(`${m.name} was removed from the family`);
  }

  return (
    <BottomSheet open={!!memberId && !!live} onClose={onClose} title={isMe ? `${m.name} (you)` : m.name}>
      <div className="px-5">
        <div className="-mt-1 flex items-center gap-3">
          <Avatar member={m} size="lg" />
          <p className="min-w-0 truncate text-[14px] font-semibold text-muted">{m.email}</p>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-extrabold text-muted">Role</legend>
          <div role="radiogroup" aria-label="Role" className="flex flex-col gap-2">
            {roles.map((r) => {
              const selected = m.role === r;
              const disabled = lockRole && r !== 'admin';
              return (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={disabled}
                  onClick={() => changeRole(r)}
                  className={`flex items-start gap-3 rounded-[18px] border-2 bg-paper p-4 text-left transition-colors duration-150 disabled:opacity-50 ${
                  selected ? 'border-cocoa' : 'border-line hover:border-line-strong'}`
                  }>
                  
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150 ${
                    selected ? 'border-cocoa' : 'border-line-strong'}`
                    }
                    aria-hidden="true">
                    
                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-cocoa" />}
                  </span>
                  <span>
                    <span className="block font-extrabold text-ink">{roleInfo[r].label}</span>
                    <span className="block text-[13px] font-semibold leading-snug text-muted">
                      {roleInfo[r].description}
                    </span>
                  </span>
                </button>);

            })}
          </div>
          {lockRole &&
          <p className="mt-2 text-[13px] font-semibold text-muted">
              Every family needs at least one admin. Make someone else an admin first.
            </p>
          }
        </fieldset>

        {!isMe &&
        <div className="mt-7">
            {confirming ?
          <div className="rounded-[18px] bg-blush-soft p-4">
                <p className="font-extrabold text-ink">Remove {m.name} from the family?</p>
                <p className="mt-0.5 text-[13px] font-semibold text-muted">
                  Their open chores will go back up for grabs.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-11 flex-1 rounded-[14px] bg-paper text-[15px] font-extrabold text-ink">
                
                    Cancel
                  </button>
                  <button
                type="button"
                onClick={remove}
                className="h-11 flex-1 rounded-[14px] bg-danger text-[15px] font-extrabold text-paper">
                
                    Remove
                  </button>
                </div>
              </div> :

          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-danger transition-colors duration-150 hover:bg-blush-soft">
            
                <UserMinusIcon className="h-4 w-4" aria-hidden="true" />
                Remove from family
              </button>
          }
          </div>
        }
      </div>
    </BottomSheet>);

}