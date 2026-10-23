import React, { useRef } from 'react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { PrimaryButton } from '../PrimaryButton';
import { usePoints } from '../../contexts/PointsContext';
import type { Reward } from '../../types/rewards';

interface RedeemSheetProps {
  rewardId: string | null;
  onClose: () => void;
}

export function RedeemSheet({ rewardId, onClose }: RedeemSheetProps) {
  const { rewards, redeem, myWallet } = usePoints();
  const live = rewards.find((r) => r.id === rewardId);
  const lastRef = useRef<Reward | undefined>(live);
  if (live) lastRef.current = live;
  const reward = live ?? lastRef.current;
  // Freeze the numbers once confirmed so they don't jump while the sheet closes
  const balanceRef = useRef(myWallet?.spendable ?? 0);
  if (rewardId && live) balanceRef.current = myWallet?.spendable ?? 0;

  if (!reward) return null;
  const have = balanceRef.current;
  const left = have - reward.cost;

  function confirm() {
    if (!reward) return;
    if (redeem(reward.id)) {
      toast(`Enjoy! "${reward.title}" is yours. The admins have been told.`);
      onClose();
    } else {
      toast("You don't have enough tokens for this yet");
    }
  }

  const rows = [
  { label: 'Costs', value: reward.cost },
  { label: 'You have', value: have },
  { label: 'Left after', value: left }];


  return (
    <BottomSheet open={!!rewardId && !!live} onClose={onClose} title={reward.title}>
      <div className="px-5">
        {reward.description &&
        <p className="-mt-1 text-[15px] font-semibold leading-snug text-muted">{reward.description}</p>
        }
        <dl className="mt-4 divide-y-2 divide-cream rounded-[18px] border-2 border-line bg-paper">
          {rows.map((r) =>
          <div key={r.label} className="flex items-center justify-between px-4 py-3">
              <dt className="text-[15px] font-bold text-muted">{r.label}</dt>
              <dd className="font-display text-[17px] font-semibold text-ink">{r.value} tokens</dd>
            </div>
          )}
        </dl>
        <p className="mt-3 px-1 text-[13px] font-semibold text-muted">The admins get a message so they can make it happen.</p>
        <PrimaryButton type="button" onClick={confirm} disabled={left < 0} className="mt-5">
          Get it for {reward.cost} tokens
        </PrimaryButton>
      </div>
    </BottomSheet>);

}