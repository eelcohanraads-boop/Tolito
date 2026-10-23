import React, { useState } from 'react';
import { CoinsIcon, GiftIcon, PencilIcon, PlusIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { RedeemSheet } from '../components/points/RedeemSheet';
import { RewardSheet } from '../components/points/RewardSheet';
import { WalletCard } from '../components/points/WalletCard';
import { SettingsHeader, SettingsSection, cardClass } from '../components/settings/SettingsLayout';
import { useHousehold } from '../contexts/HouseholdContext';
import { usePoints } from '../contexts/PointsContext';
import { WELCOME_BONUS, periodInfo } from '../utils/points';
import { useScreenInit } from '../useScreenInit.js';

interface StoreProps {
  /** Omit when shown as a bottom-nav tab */
  onBack?: () => void;
}

export function Store({ onBack }: StoreProps) {
  const screenInit = useScreenInit();
  const { memberById, currentUserId } = useHousehold();
  const { storeEnabled, rewards, redemptions, myWallet, period } = usePoints();
  const [redeemId, setRedeemId] = useState<string | null>(screenInit.redeemId ?? null);
  const [editId, setEditId] = useState<string | null>(screenInit.editReward ?? null);
  const isAdmin = memberById(currentUserId)?.role === 'admin';

  if (!myWallet) return null;
  const info = periodInfo[period];

  return (
    <div className="pb-12">
      <SettingsHeader title={storeEnabled ? 'Token store' : 'Your tokens'} onBack={onBack} />

      <div className="px-5 pt-1">
        <WalletCard wallet={myWallet} period={period} />
      </div>

      {storeEnabled ?
      <SettingsSection
        title="Rewards"
        action={
        isAdmin &&
        <button
          type="button"
          onClick={() => setEditId('new')}
          className="soft-pill flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-butter px-3.5 text-[14px] font-extrabold text-ink">
          
                <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                Add
              </button>

        }>
        
          {rewards.length === 0 ?
        <div className={`${cardClass} flex flex-col items-center px-6 py-8 text-center`}>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-mint text-ink" aria-hidden="true">
                <GiftIcon className="h-6 w-6" />
              </span>
              <p className="mt-3 font-display text-[17px] font-semibold text-ink">No rewards yet</p>
              <p className="mt-0.5 text-[14px] font-semibold text-muted">
                {isAdmin ? 'Add the first treat your family can save up for.' : 'Ask an admin to add some treats.'}
              </p>
            </div> :

        <ul className={`${cardClass} divide-y-2 divide-cream`}>
              {rewards.map((r) => {
            const short = r.cost - myWallet.spendable;
            const affordable = short <= 0;
            const details =
            <>
                    <span className="flex items-center gap-1.5 font-extrabold text-ink">
                      <span className="truncate">{r.title}</span>
                      {isAdmin && <PencilIcon className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />}
                    </span>
                    <span className="block text-[13px] font-semibold leading-snug text-muted">
                      {affordable ? r.description ?? 'You can get this now' : `${short} more tokens needed`}
                    </span>
                  </>;

            return (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                    {isAdmin ?
                <button
                  type="button"
                  onClick={() => setEditId(r.id)}
                  aria-label={`Edit ${r.title}`}
                  className="min-w-0 flex-1 text-left">
                  
                        {details}
                      </button> :

                <div className="min-w-0 flex-1">{details}</div>
                }
                    <button
                  type="button"
                  onClick={() => setRedeemId(r.id)}
                  disabled={!affordable}
                  aria-label={`Get ${r.title} for ${r.cost} tokens`}
                  className={`flex h-10 shrink-0 items-center gap-1 rounded-full px-3.5 text-[14px] font-extrabold transition-transform duration-100 active:scale-95 ${
                  affordable ?
                  'soft-pill bg-butter text-ink shadow-[0_2px_0_rgb(var(--butter-deep))]' :
                  'border-2 border-line bg-cream text-muted'}`
                  }>
                  
                      <CoinsIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                      {r.cost}
                    </button>
                  </li>);

          })}
            </ul>
        }
        </SettingsSection> :

      <p className="mx-6 mt-5 text-[14px] font-semibold text-muted">
          The store is switched off for now. Admins can turn it on in Manage family.
        </p>
      }

      {storeEnabled && redemptions.length > 0 &&
      <SettingsSection title="Recently claimed">
          <ul className={`${cardClass} divide-y-2 divide-cream`}>
            {redemptions.slice(0, 5).map((rd) => {
            const m = memberById(rd.memberId);
            return (
              <li key={rd.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar member={m} size="md" />
                  <p className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-muted">
                    <span className="font-extrabold text-ink">{m?.id === currentUserId ? 'You' : m?.name ?? 'Someone'}</span>{' '}
                    got {rd.title.charAt(0).toLowerCase() + rd.title.slice(1)}
                    <span className="block text-[12px]">{rd.when}</span>
                  </p>
                  <span className="shrink-0 text-[13px] font-extrabold text-muted">−{rd.cost}</span>
                </li>);

          })}
          </ul>
        </SettingsSection>
      }

      <SettingsSection title="How it works">
        <ul className="list-disc space-y-1.5 pl-6 pr-1 text-[14px] font-semibold leading-snug text-muted marker:text-line-strong">
          <li>Finish chores to earn tokens. Every minute of work is worth 1 token.</li>
          <li>
            Reach your goal of {myWallet.goal} each {info.noun}. Anything above it is yours to spend straight away.
          </li>
          <li>Fall short, and the tokens you missed come off your savings.</li>
          <li>Everyone starts with {WELCOME_BONUS} tokens as a welcome bonus.</li>
        </ul>
      </SettingsSection>

      <RedeemSheet rewardId={redeemId} onClose={() => setRedeemId(null)} />
      {isAdmin && <RewardSheet rewardId={editId} onClose={() => setEditId(null)} />}
    </div>);

}