import React, { useState } from 'react';
import { ChevronRightIcon, GlobeIcon, HouseIcon, LogOutIcon, PencilIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../../components/Avatar';
import { TextField } from '../../components/auth/TextField';
import { AvatarPicker } from '../../components/settings/AvatarPicker';
import { PasswordSection } from '../../components/settings/PasswordSection';
import { SettingsHeader, SettingsSection, cardClass } from '../../components/settings/SettingsLayout';
import { useHousehold } from '../../contexts/HouseholdContext';
import { isValidEmail } from '../../utils/password';
import { providerNames, roleLabel } from '../../utils/roles';
import { useScreenInit } from '../../useScreenInit.js';

interface ProfileProps {
  onBack?: () => void;
  onSignOut: () => void;
  onManageFamily: () => void;
}

export function Profile({ onBack, onSignOut, onManageFamily }: ProfileProps) {
  const screenInit = useScreenInit();
  const { memberById, currentUserId, updateMember, householdName } = useHousehold();
  const me = memberById(currentUserId);
  const isOrganiser = me?.role === 'admin';
  const [name, setName] = useState(me?.name ?? '');
  const [email, setEmail] = useState(me?.email ?? '');
  const [errors, setErrors] = useState<{name?: string;email?: string;}>({});
  const [avatarOpen, setAvatarOpen] = useState<boolean>(screenInit.avatarOpen ?? false);

  if (!me) return null;
  const sso = !!me.provider && me.provider !== 'password';
  const changed = name.trim() !== me.name || !sso && email.trim() !== (me.email ?? '');

  function save(e: React.FormEvent) {
    e.preventDefault();
    const found: typeof errors = {};
    if (!name.trim()) found.name = 'Your name can’t be empty.';
    if (!sso && !isValidEmail(email)) found.email = "That doesn't look like an email address.";
    setErrors(found);
    if (Object.keys(found).length || !me) return;
    updateMember(me.id, { name: name.trim(), ...(sso ? {} : { email: email.trim() }) });
    toast('Details saved');
  }

  return (
    <div className="pb-12">
      <SettingsHeader title="Your settings" onBack={onBack} />

      <div className="flex flex-col items-center px-5 pt-2 text-center">
        <button
          type="button"
          onClick={() => setAvatarOpen(true)}
          aria-label="Change your picture"
          className="relative rounded-full transition-transform duration-150 active:scale-95">
          
          <Avatar member={me} size="xl" />
          <span className="absolute -bottom-0.5 -right-0.5 grid h-8 w-8 place-items-center rounded-full border-[3px] border-cream bg-cocoa text-paper">
            <PencilIcon className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden="true" />
          </span>
        </button>
        <p className="mt-3 font-display text-[22px] font-semibold text-ink">{me.name}</p>
        <span className="mt-1 rounded-full bg-mint px-3 py-0.5 text-[13px] font-extrabold text-ink">
          {roleLabel(me.role)}
        </span>
      </div>

      <SettingsSection title="Family">
        {isOrganiser ?
        <button
          type="button"
          onClick={onManageFamily}
          className={`${cardClass} flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-cream/60`}>
          
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint text-ink" aria-hidden="true">
              <HouseIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold text-ink">Manage family</span>
              <span className="block truncate text-[13px] font-semibold text-muted">
                {householdName} · people, invites & features
              </span>
            </span>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          </button> :

        <div className={`${cardClass} flex items-center gap-3 px-4 py-3`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint text-ink" aria-hidden="true">
              <HouseIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-extrabold text-ink">{householdName}</span>
              <span className="block text-[13px] font-semibold text-muted">
                Admins manage people, invites and features.
              </span>
            </span>
          </div>
        }
      </SettingsSection>

      <SettingsSection title="Personal details">
        <form noValidate onSubmit={save} className={`${cardClass} flex flex-col gap-4 p-4`}>
          <TextField
            id="profile-name"
            label="Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name} />
          
          <TextField
            id="profile-email"
            type="email"
            label="Email"
            autoComplete="email"
            value={email}
            readOnly={sso}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            hint={
            sso && me.provider !== 'password' && me.provider ?
            <p className="mt-1.5 text-[13px] font-semibold text-muted">
                  Managed by your {providerNames[me.provider].account}.
                </p> :
            null
            } />
          
          <button
            type="submit"
            disabled={!changed}
            className="h-11 self-end rounded-[14px] bg-cocoa px-5 text-[15px] font-extrabold text-paper transition-colors duration-150 disabled:bg-line disabled:text-muted">
            
            Save
          </button>
        </form>
      </SettingsSection>

      <SettingsSection title="Sign-in & security">
        <PasswordSection provider={me.provider} initialOpen={screenInit.passwordOpen ?? false} />
      </SettingsSection>

      <SettingsSection title="Language" description="More languages are on the way.">
        <div className={`${cardClass} flex items-center gap-3 px-4 py-3`}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-ink" aria-hidden="true">
            <GlobeIcon className="h-5 w-5" />
          </span>
          <label htmlFor="language" className="flex-1 font-extrabold text-ink">
            App language
          </label>
          <select
            id="language"
            disabled
            className="appearance-none rounded-full bg-cream px-3 py-1.5 text-[14px] font-bold text-muted">
            
            <option>English</option>
          </select>
        </div>
      </SettingsSection>

      <button
        type="button"
        onClick={onSignOut}
        className="mx-auto mt-8 flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-extrabold text-muted transition-colors duration-150 hover:text-ink">
        
        <LogOutIcon className="h-4 w-4" aria-hidden="true" />
        Sign out
      </button>

      <AvatarPicker open={avatarOpen} onClose={() => setAvatarOpen(false)} member={me} />
    </div>);

}