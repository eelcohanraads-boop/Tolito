import React, { useEffect, useState } from 'react';
import { CheckIcon, CopyIcon, Share2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { PrimaryButton } from '../PrimaryButton';
import { TextField } from '../auth/TextField';
import { useHousehold } from '../../contexts/HouseholdContext';
import { isValidEmail } from '../../utils/password';

interface InviteSheetProps {
  open: boolean;
  onClose: () => void;
}

export function InviteSheet({ open, onClose }: InviteSheetProps) {
  const { householdName, inviteLink, addInvite, invites, members } = useHousehold();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setError(undefined);
      setCopied(false);
    }
  }, [open]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!isValidEmail(value)) return setError("That doesn't look like an email address.");
    if (members.some((m) => m.email?.toLowerCase() === value)) return setError("They're already in your family.");
    if (invites.some((i) => i.email === value)) return setError("You've already invited them.");
    setError(undefined);
    setSending(true);
    window.setTimeout(() => {
      addInvite(value);
      setSending(false);
      setEmail('');
      toast(`Invite sent to ${value}`);
    }, 600);
  }

  function copy() {
    navigator.clipboard?.writeText(inviteLink).catch(() => undefined);
    setCopied(true);
    toast('Invite link copied');
    window.setTimeout(() => setCopied(false), 2000);
  }

  function share() {
    if (typeof navigator.share === 'function') {
      navigator.
      share({ title: 'Join our family on Tolito', text: `Join ${householdName} on Tolito`, url: inviteLink }).
      catch(() => undefined);
    } else {
      copy();
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Invite someone">
      <div className="px-5">
        <p className="-mt-1 text-[14px] font-semibold leading-snug text-muted">
          New people join {householdName} as members. You can make them admins later.
        </p>

        <form noValidate onSubmit={send} className="mt-5">
          <TextField
            id="invite-email"
            type="email"
            inputMode="email"
            label="Send an email invite"
            placeholder="name@example.com"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error} />
          
          <PrimaryButton type="submit" loading={sending} className="mt-3">
            Send invite
          </PrimaryButton>
        </form>

        <div className="my-6 flex items-center gap-3 text-[13px] font-bold text-muted">
          <span className="h-0.5 flex-1 rounded-full bg-line" aria-hidden="true" />
          or share a link
          <span className="h-0.5 flex-1 rounded-full bg-line" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-2 rounded-[18px] border-2 border-line bg-paper p-1.5 pl-4">
          <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-muted">{inviteLink}</span>
          <button
            type="button"
            onClick={copy}
            className="soft-pill flex h-10 shrink-0 items-center gap-1.5 rounded-[14px] bg-butter px-3.5 text-[14px] font-extrabold text-ink">
            
            {copied ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : <CopyIcon className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <button
          type="button"
          onClick={share}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[16px] border-2 border-line bg-paper text-[15px] font-extrabold text-ink transition-colors duration-150 hover:border-line-strong">
          
          <Share2Icon className="h-5 w-5" aria-hidden="true" />
          Share via WhatsApp, Messages…
        </button>
      </div>
    </BottomSheet>);

}