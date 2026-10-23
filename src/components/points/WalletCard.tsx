import React from 'react';
import { CoinsIcon } from 'lucide-react';
import { periodInfo, type Wallet } from '../../utils/points';
import type { PointsPeriod } from '../../types/rewards';

interface WalletCardProps {
  wallet: Wallet;
  period: PointsPeriod;
}

export function WalletCard({ wallet, period }: WalletCardProps) {
  const info = periodInfo[period];
  const reached = wallet.toGo === 0;
  const progress = wallet.goal > 0 ? Math.min(1, wallet.earned / wallet.goal) : 1;

  return (
    <section
      aria-label="Your tokens"
      className="card-lift rounded-[24px] border-2 border-line bg-paper p-5 shadow-[0_3px_0_rgb(var(--line))]">
      
      <p className="text-sm font-extrabold text-muted">You can spend</p>
      <p className="mt-1.5 flex items-center gap-2.5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-butter text-ink" aria-hidden="true">
          <CoinsIcon className="h-6 w-6" strokeWidth={2.25} />
        </span>
        <span className="font-display text-[44px] font-bold leading-none text-ink">{wallet.spendable}</span>
        <span className="self-end pb-1 font-display text-[18px] font-semibold text-muted">tokens</span>
      </p>

      <div className="mt-5">
        <div className="flex items-baseline justify-between text-[13px] font-bold">
          <span className="text-ink">Your goal {info.label}</span>
          <span className="text-muted">
            {wallet.earned} of {wallet.goal}
          </span>
        </div>
        <div
          className="mt-1.5 h-3 overflow-hidden rounded-full border-2 border-line bg-cream"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={wallet.goal}
          aria-valuenow={Math.min(wallet.earned, wallet.goal)}
          aria-label={`Goal ${info.label}`}>
          
          <div
            className={`h-full origin-left rounded-full transition-transform duration-300 ease-out ${reached ? 'bg-leaf' : 'bg-butter-deep'}`}
            style={{ transform: `scaleX(${progress})` }} />
          
        </div>
        <p className="mt-2 text-[13px] font-semibold leading-snug text-muted">
          {reached ?
          wallet.surplus > 0 ?
          `Goal reached! Your ${wallet.surplus} extra tokens are ready to spend.` :
          'Goal reached! Every extra token is yours to spend straight away.' :
          `${wallet.toGo} to go, ${info.daysLeft} days left. If you don't make it, the tokens you're short come off your savings.`}
        </p>
      </div>
    </section>);

}