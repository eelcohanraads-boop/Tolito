import React from 'react';
import { CoinsIcon } from 'lucide-react';
import { tokens } from '../../utils/points';

export function TokenBadge({ amount }: {amount: number;}) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-0.5 text-[12px] font-semibold text-muted/80"
      aria-label={tokens(amount)}>
      
      <CoinsIcon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      {amount}
    </span>);

}