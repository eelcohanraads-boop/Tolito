import React, { useState } from 'react';
import { KeyRoundIcon } from 'lucide-react';
import { toast } from 'sonner';
import { TextField } from '../auth/TextField';
import { PasswordRules } from '../auth/PasswordRules';
import { ProviderIcon } from '../auth/SsoButtons';
import { PrimaryButton } from '../PrimaryButton';
import { cardClass } from './SettingsLayout';
import { passwordRules, passwordScore } from '../../utils/password';
import { providerNames } from '../../utils/roles';
import type { Member } from '../../types/chores';

interface PasswordSectionProps {
  provider: Member['provider'];
  initialOpen?: boolean;
}

interface Errors {
  current?: string;
  next?: string;
  confirm?: string;
}

export function PasswordSection({ provider, initialOpen = false }: PasswordSectionProps) {
  const [open, setOpen] = useState(initialOpen);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  if (provider && provider !== 'password') {
    const p = providerNames[provider];
    return (
      <div className={cardClass}>
        <div className="flex items-center gap-3 px-4 py-3" aria-disabled="true">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-muted opacity-60" aria-hidden="true">
            <KeyRoundIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1 opacity-60">
            <p className="font-extrabold text-muted">Password</p>
            <p className="text-[13px] font-semibold text-muted">Not used with {p.name} sign-in</p>
          </div>
          <span className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border-2 border-line bg-cream pl-2.5 pr-3 text-[13px] font-extrabold text-ink">
            <ProviderIcon provider={provider} />
            SSO
          </span>
        </div>
        <p className="border-t-2 border-cream px-4 py-3 text-[13px] font-semibold leading-snug text-muted">
          You sign in with {p.name}, so there's no Tolito password to change. To update your password, go to your{' '}
          {p.account} settings.
        </p>
      </div>);

  }

  function reset() {
    setCurrent('');
    setNext('');
    setConfirm('');
    setErrors({});
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (!current) found.current = 'Enter your current password.';
    if (passwordScore(next) < passwordRules.length) found.next = 'Your new password needs to tick all the boxes.';else
    if (next === current) found.next = 'Pick a password different from your current one.';
    if (confirm !== next) found.confirm = "The passwords don't match.";
    setErrors(found);
    if (Object.keys(found).length) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setOpen(false);
      reset();
      toast('Password updated');
    }, 700);
  }

  if (!open) {
    return (
      <div className={`${cardClass} flex items-center gap-3 px-4 py-3`}>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-ink" aria-hidden="true">
          <KeyRoundIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-extrabold text-ink">Password</p>
          <p className="text-[14px] font-bold tracking-widest text-muted" aria-label="Password hidden">
            ••••••••
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="soft-pill h-9 shrink-0 rounded-full bg-butter px-4 text-[14px] font-extrabold text-ink">
          
          Change
        </button>
      </div>);

  }

  return (
    <form noValidate onSubmit={submit} className={`${cardClass} flex flex-col gap-4 p-4`}>
      <TextField
        id="current-password"
        type="password"
        label="Current password"
        autoComplete="current-password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        error={errors.current} />
      
      <div>
        <TextField
          id="new-password"
          type="password"
          label="New password"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          error={errors.next} />
        
        <PasswordRules password={next} />
      </div>
      <TextField
        id="confirm-password"
        type="password"
        label="Repeat new password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm} />
      
      <div className="flex flex-col gap-1">
        <PrimaryButton type="submit" loading={saving}>
          Update password
        </PrimaryButton>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="h-11 text-[15px] font-extrabold text-muted transition-colors duration-150 hover:text-ink">
          
          Cancel
        </button>
      </div>
    </form>);

}