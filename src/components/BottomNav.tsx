import React from "react";
import { CoinsIcon, ListChecksIcon, PlusIcon, ShoppingBasketIcon, UsersIcon, BoxIcon } from "lucide-react";
export type Tab = 'chores' | 'shopping' | 'family' | 'store';
interface BottomNavProps {
  tab: Tab;
  onTab: (tab: Tab) => void;
  onAdd: () => void;
  addLabel: string;
  /** Shown faded for members — only admins can create chores */
  addDisabled?: boolean;
  showShopping: boolean;
  showStore: boolean;
  /** Spendable token balance shown on the store icon */
  storeBalance: number;
  storeLabel: string;
}
export function BottomNav({
  tab,
  onTab,
  onAdd,
  addLabel,
  addDisabled = false,
  showShopping,
  showStore,
  storeBalance,
  storeLabel
}: BottomNavProps) {
  const item = (id: Tab, label: string, Icon: BoxIcon, badge?: React.ReactNode, ariaLabel?: string) => {
    const active = tab === id;
    return <button key={id} type="button" onClick={() => onTab(id)} aria-current={active ? 'page' : undefined} aria-label={ariaLabel} className={`flex h-full flex-1 flex-col items-center justify-center gap-1 font-display text-[12px] font-semibold transition-colors duration-150 ${active ? 'text-cocoa' : 'text-muted hover:text-ink'}`}>
        <span className="relative">
          <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
          {badge}
        </span>
        {label}
      </button>;
  };
  const canSpend = storeBalance > 0;
  const storeBadge = <span className={`absolute -right-3.5 -top-1.5 grid h-5 min-w-[22px] place-items-center rounded-full border-2 border-paper px-1 font-sans text-[11px] font-extrabold leading-none ${canSpend ? 'bg-butter text-ink' : 'bg-line text-muted'}`} aria-hidden="true">
      {storeBalance > 999 ? '999+' : storeBalance}
    </span>;
  return <nav aria-label="Main" className="absolute inset-x-0 bottom-0 z-30 rounded-t-[28px] border-t-2 border-line bg-paper pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-[70px] items-center">
        <div className="flex h-full flex-1">
          {item('chores', 'Chores', ListChecksIcon)}
          {showShopping && item('shopping', 'Shopping', ShoppingBasketIcon)}
        </div>
        <div className="flex w-[76px] shrink-0 justify-center">
          <button type="button" onClick={onAdd} aria-label={addLabel} aria-disabled={addDisabled || undefined} className={`-mt-9 grid h-16 w-16 place-items-center rounded-full border-[3px] transition-[transform,box-shadow,opacity] duration-150 ${addDisabled ? 'border-line-strong bg-cream text-muted opacity-60' : 'lift fab border-cocoa bg-butter text-cocoa shadow-[0_4px_0_rgb(var(--cocoa))] active:translate-y-[3px] active:shadow-[0_1px_0_rgb(var(--cocoa))]'}`}>
            <PlusIcon className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
        <div className="flex h-full flex-1">
          {showStore && item('store', 'Tolitokens', CoinsIcon, storeBadge, `${storeLabel}, ${storeBalance} tokens to spend`)}
          {item('family', 'Family', UsersIcon)}
        </div>
      </div>
    </nav>;
}