import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useHousehold } from '../../contexts/HouseholdContext';
import { avatarCategories, avatarIllustrations, type AvatarCategory } from '../../data/avatarIllustrations';
import type { Member } from '../../types/chores';

/** Character avatars, browsable by age group */
export function AvatarGallery({ member }: {member: Member;}) {
  const { updateMember } = useHousehold();
  const current = avatarIllustrations.find((a) => a.url === member.avatarUrl);
  // Open on the group the current character belongs to
  const [category, setCategory] = useState<AvatarCategory>(current?.category ?? 'adults');
  const visible = avatarIllustrations.filter((a) => a.category === category);

  return (
    <fieldset className="mt-6">
      <legend className="mb-2 text-sm font-extrabold text-muted">Or pick a character</legend>

      <div role="tablist" aria-label="Character groups" className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5">
        {avatarCategories.map((c) => {
          const selected = c.id === category;
          const hasCurrent = current?.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(c.id)}
              className={`relative h-9 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[14px] font-extrabold transition-colors duration-150 ${
              selected ? 'bg-cocoa text-paper' : 'bg-paper text-muted hover:text-ink'}`
              }>
              
              {c.label}
              {hasCurrent && !selected &&
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cocoa" aria-label="(your current picture)" />
              }
            </button>);

        })}
      </div>

      <div role="tabpanel" className="mt-3 grid grid-cols-5 gap-2.5">
        {visible.map((a) => {
          const selected = member.avatarUrl === a.url;
          return (
            <button
              key={a.url}
              type="button"
              aria-pressed={selected}
              aria-label={a.label}
              title={a.label}
              onClick={() => {
                if (selected) return;
                updateMember(member.id, { avatarUrl: a.url, bg: a.bg, fg: a.fg });
                toast('Picture updated');
              }}
              className={`relative aspect-square rounded-full ring-[2.5px] ring-offset-2 ring-offset-cream transition-[box-shadow,transform] duration-150 active:scale-95 ${
              selected ? 'ring-cocoa' : 'ring-transparent hover:ring-line-strong'}`
              }
              style={{ backgroundColor: a.bg }}>
              
              <img src={a.url} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
              {selected &&
              <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-cream bg-cocoa text-paper">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
              }
            </button>);

        })}
      </div>
    </fieldset>);

}