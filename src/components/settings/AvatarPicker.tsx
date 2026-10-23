import React, { useRef } from 'react';
import { CameraIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { Avatar } from '../Avatar';
import { PrimaryButton } from '../PrimaryButton';
import { useHousehold } from '../../contexts/HouseholdContext';
import { avatarColors } from '../../data/avatarColors';
import { AvatarGallery } from './AvatarGallery';
import type { Member } from '../../types/chores';

interface AvatarPickerProps {
  open: boolean;
  onClose: () => void;
  member: Member;
}

export function AvatarPicker({ open, onClose, member }: AvatarPickerProps) {
  const { updateMember } = useHousehold();
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    updateMember(member.id, { avatarUrl: URL.createObjectURL(file) });
    toast('Photo updated');
    e.target.value = '';
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Your picture">
      <div className="px-5">
        <div className="flex justify-center">
          <Avatar member={member} size="xl" />
        </div>

        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onFile} tabIndex={-1} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[16px] border-2 border-line bg-paper text-[15px] font-extrabold text-ink transition-colors duration-150 hover:border-line-strong">
          
          <CameraIcon className="h-5 w-5" aria-hidden="true" />
          Upload a photo
        </button>

        <AvatarGallery member={member} />

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-extrabold text-muted">Or just a colour</legend>
          <div className="grid grid-cols-6 gap-2">
            {avatarColors.map((c) => {
              const selected = !member.avatarUrl && member.bg === c.bg;
              return (
                <button
                  key={c.bg}
                  type="button"
                  aria-pressed={selected}
                  aria-label={c.label}
                  onClick={() => updateMember(member.id, { bg: c.bg, fg: c.fg, avatarUrl: undefined })}
                  className={`relative grid aspect-square place-items-center rounded-full font-display text-xl font-semibold ring-[2.5px] ring-offset-2 ring-offset-cream transition-[box-shadow,transform] duration-150 active:scale-95 ${
                  selected ? 'ring-cocoa' : 'ring-transparent'}`
                  }
                  style={{ backgroundColor: c.bg, color: c.fg }}>
                  
                  {selected ? <CheckIcon className="h-5 w-5" strokeWidth={3} /> : member.name[0]}
                </button>);

            })}
          </div>
          {member.avatarUrl &&
          <p className="mt-2 text-[13px] font-semibold text-muted">Picking a colour replaces your current picture.</p>
          }
        </fieldset>

        <PrimaryButton className="mt-7" onClick={onClose}>
          Done
        </PrimaryButton>
      </div>
    </BottomSheet>);

}