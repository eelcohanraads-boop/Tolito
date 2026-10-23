import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, MailIcon, UserPlusIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../../components/Avatar';
import { FeatureList } from '../../components/settings/FeatureList';
import { InviteSheet } from '../../components/settings/InviteSheet';
import { MemberSheet } from '../../components/settings/MemberSheet';
import { PointsSettings } from '../../components/settings/PointsSettings';
import { ShoppingSettings } from '../../components/settings/ShoppingSettings';
import { SettingsHeader, SettingsSection, cardClass } from '../../components/settings/SettingsLayout';
import { useHousehold } from '../../contexts/HouseholdContext';
import { roleInfo, roleLabel } from '../../utils/roles';
import { useScreenInit } from '../../useScreenInit.js';

interface FamilySettingsProps {
  onBack: () => void;
}

export function FamilySettings({ onBack }: FamilySettingsProps) {
  const screenInit = useScreenInit();
  const { householdName, setHouseholdName, members, currentUserId, invites, cancelInvite, memberById, features } =
  useHousehold();
  const isAdmin = memberById(currentUserId)?.role === 'admin';
  const [name, setName] = useState(householdName);
  const [inviteOpen, setInviteOpen] = useState<boolean>(screenInit.inviteOpen ?? false);
  const [memberId, setMemberId] = useState<string | null>(screenInit.memberId ?? null);

  // If you hand over your organiser role, you no longer have access here
  useEffect(() => {
    if (!isAdmin) onBack();
  }, [isAdmin, onBack]);

  const trimmed = name.trim();
  const changed = !!trimmed && trimmed !== householdName;

  function saveName(e: React.FormEvent) {
    e.preventDefault();
    if (!changed) return;
    setHouseholdName(trimmed);
    toast('Family name updated');
  }

  return (
    <div className="pb-12">
      <SettingsHeader title="Manage family" onBack={onBack} />

      <SettingsSection title="Family name">
        <form onSubmit={saveName} className={`${cardClass} flex items-center gap-2 p-1.5 pl-4`}>
          <label htmlFor="family-name" className="sr-only">
            Family name
          </label>
          <input
            id="family-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className="h-11 min-w-0 flex-1 bg-transparent text-[16px] font-bold text-ink outline-none" />
          
          <button
            type="submit"
            disabled={!changed}
            className="h-10 shrink-0 rounded-[14px] bg-cocoa px-4 text-[14px] font-extrabold text-paper transition-colors duration-150 disabled:bg-line disabled:text-muted">
            
            Save
          </button>
        </form>
      </SettingsSection>

      <SettingsSection
        title="People"
        description={`${members.length} in the family${invites.length ? ` · ${invites.length} invited` : ''}`}
        action={
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="soft-pill flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-butter px-3.5 text-[14px] font-extrabold text-ink">
          
            <UserPlusIcon className="h-4 w-4" aria-hidden="true" />
            Invite
          </button>
        }>
        
        <ul className={`${cardClass} divide-y-2 divide-cream`}>
          {members.map((m) =>
          <li key={m.id}>
              <button
              type="button"
              onClick={() => setMemberId(m.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-cream/60">
              
                <Avatar member={m} size="lg" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-extrabold text-ink">
                    {m.name}
                    {m.id === currentUserId && <span className="font-semibold text-muted"> (you)</span>}
                  </span>
                  <span className="block truncate text-[13px] font-semibold text-muted">{m.email}</span>
                </span>
                <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-extrabold ${
                m.role === 'admin' ? 'bg-mint text-ink' : 'bg-cream text-muted'}`
                }>
                
                  {roleLabel(m.role)}
                </span>
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              </button>
            </li>
          )}
          {invites.map((inv) =>
          <li key={inv.id} className="flex items-center gap-3 px-4 py-3">
              <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-dashed border-line-strong text-muted"
              aria-hidden="true">
              
                <MailIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-extrabold text-ink">{inv.email}</span>
                <span className="block text-[13px] font-semibold text-muted">Invite sent · waiting to join</span>
              </span>
              <button
              type="button"
              onClick={() => {
                cancelInvite(inv.id);
                toast('Invite cancelled');
              }}
              aria-label={`Cancel invite for ${inv.email}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-cream hover:text-ink">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          )}
        </ul>
        <dl className="mt-3 space-y-1 px-1 text-[13px] font-semibold leading-snug text-muted">
          {(['admin', 'contributor'] as const).map((r) =>
          <div key={r}>
              <dt className="inline font-extrabold text-ink">{roleInfo[r].label}s </dt>
              <dd className="inline">
                {roleInfo[r].description.charAt(0).toLowerCase() + roleInfo[r].description.slice(1)}
              </dd>
            </div>
          )}
        </dl>
      </SettingsSection>

      {features.points && <PointsSettings />}

      {features.shopping && <ShoppingSettings />}

      <SettingsSection title="Features" description="Switch parts of Tolito on or off for the whole family.">
        <FeatureList />
      </SettingsSection>

      <InviteSheet open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <MemberSheet memberId={memberId} onClose={() => setMemberId(null)} />
    </div>);

}