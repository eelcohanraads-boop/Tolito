import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ShoppingBasketIcon, StoreIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../components/Avatar';
import { Chip } from '../components/Chip';
import { AddItemBar } from '../components/shopping/AddItemBar';
import { ItemSheet } from '../components/shopping/ItemSheet';
import { ShoppingRow, type RowMode } from '../components/shopping/ShoppingRow';
import { useHousehold } from '../contexts/HouseholdContext';
import { useShopping } from '../contexts/ShoppingContext';
import { groupByStore, storeCounts, storeKey, storeLabel } from '../utils/shopping';
import { weekdays } from '../utils/recurrence';
import { useScreenInit } from '../useScreenInit.js';
import type { ShoppingItem } from '../types/shopping';

const listClass =
'relative divide-y-2 divide-cream overflow-hidden rounded-[24px] border-2 border-line bg-paper shadow-[0_3px_0_rgb(var(--line))] card-lift';

type ListView = 'needed' | 'all';

interface ShoppingProps {
  onOpenProfile: () => void;
  focusKey: number;
}

export function Shopping({ onOpenProfile, focusKey }: ShoppingProps) {
  const screenInit = useScreenInit();
  const { memberById, currentUserId } = useHousehold();
  const { items, markBought, setNeeded, restockDay } = useShopping();
  const [view, setView] = useState<ListView>(screenInit.shopView ?? 'needed');
  const [store, setStore] = useState<string>(screenInit.storeFilter ?? 'all');
  const [showBought, setShowBought] = useState(false);
  const [itemId, setItemId] = useState<string | null>(screenInit.itemId ?? null);

  const me = memberById(currentUserId);
  const needed = items.filter((i) => i.needed);
  const base = view === 'needed' ? needed : items;
  const stores = storeCounts(base);
  const activeStore = store !== 'all' && !stores.some((s) => s.key === store) ? 'all' : store;
  const inStore = (i: ShoppingItem) => activeStore === 'all' || storeKey(i.store) === activeStore;
  const groups = groupByStore(base.filter(inStore));
  const bought = items.filter((i) => i.bought && inStore(i));
  const neededStores = storeCounts(needed).length;

  function buy(item: ShoppingItem) {
    markBought(item.id, true);
    toast(item.recurring ? `Got ${item.name}. It's back on the list on ${weekdays[restockDay].label}` : `Got ${item.name}`, {
      action: { label: 'Undo', onClick: () => markBought(item.id, false) }
    });
  }

  function toggleNeeded(item: ShoppingItem) {
    setNeeded(item.id, !item.needed);
  }

  function renderRows(list: ShoppingItem[], mode: RowMode) {
    return (
      <ul className={listClass}>
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((item) =>
          <ShoppingRow
            key={item.id}
            item={item}
            mode={mode}
            onBuy={buy}
            onUnbuy={(i) => markBought(i.id, false)}
            onToggleNeeded={toggleNeeded}
            onOpen={setItemId} />

          )}
        </AnimatePresence>
      </ul>);

  }

  return (
    <div className="px-5 pt-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[26px] font-bold tracking-tight text-cocoa">Tolito</span>
        <button
          type="button"
          onClick={onOpenProfile}
          aria-label="Your settings"
          className="rounded-full transition-transform duration-150 active:scale-95">
          
          <Avatar member={me} size="md" />
        </button>
      </div>

      <header className="mt-3">
        <h1 className="font-display text-[26px] font-semibold leading-[1.15] text-ink">Shopping list</h1>
        <p className="mt-1 text-[15px] font-semibold text-muted">
          {needed.length > 0 ?
          `${needed.length} to buy from ${neededStores} ${neededStores === 1 ? 'place' : 'places'}` :
          'All stocked up for now'}
        </p>
      </header>

      <div className="mt-4">
        <AddItemBar focusKey={focusKey} initialName={screenInit.addDraft} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div role="tablist" aria-label="Show" className="inline-flex rounded-full border-2 border-line bg-paper p-1">
          {(
          [
          { id: 'needed', label: `To buy · ${needed.length}` },
          { id: 'all', label: 'All items' }] as
          const).
          map((t) =>
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={view === t.id}
            onClick={() => setView(t.id)}
            className={`h-9 whitespace-nowrap rounded-full px-4 text-[14px] font-extrabold transition-colors duration-150 ${
            view === t.id ? 'bg-cocoa text-paper' : 'text-muted hover:text-ink'}`
            }>
            
              {t.label}
            </button>
          )}
        </div>
      </div>

      {stores.length > 1 &&
      <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5" role="group" aria-label="Filter by store">
          <Chip selected={activeStore === 'all'} onClick={() => setStore('all')}>
            <StoreIcon className="h-4 w-4" aria-hidden="true" />
            All stores
          </Chip>
          {stores.map((s) =>
        <Chip key={s.key} selected={activeStore === s.key} onClick={() => setStore(s.key)}>
              <span className="pl-1">{storeLabel(s.key)}</span>
              <span className="text-[12px] opacity-70">{s.count}</span>
            </Chip>
        )}
        </div>
      }

      {groups.length === 0 ?
      <div className="mt-10 flex flex-col items-center text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-mint text-ink" aria-hidden="true">
            <ShoppingBasketIcon className="h-9 w-9" strokeWidth={1.75} />
          </span>
          <h2 className="mt-4 font-display text-xl font-semibold text-ink">
            {items.length === 0 ? 'Your list is empty' : 'Nothing to buy right now'}
          </h2>
          <p className="mt-1 max-w-[260px] text-[15px] font-semibold text-muted">
            {items.length === 0 ?
          'Add the first item above. Everyone in the family can add to it.' :
          'Add something above, or pick from items you bought before.'}
          </p>
          {items.length > 0 && view === 'needed' &&
        <button
          type="button"
          onClick={() => setView('all')}
          className="soft-pill mt-4 h-10 rounded-full bg-butter px-4 text-[14px] font-extrabold text-ink">
          
              Show all items
            </button>
        }
        </div> :

      groups.map((g) =>
      <section key={g.key} className="mt-6" aria-labelledby={`store-${g.key}`}>
            <h2
          id={`store-${g.key}`}
          className="mb-2 flex items-center gap-2 px-1 font-display text-[17px] font-semibold text-ink">
          
              {storeLabel(g.key)}
              <span className="text-sm text-muted">{g.items.length}</span>
            </h2>
            {renderRows(g.items, view)}
          </section>
      )
      }

      {view === 'needed' && bought.length > 0 &&
      <section className="mt-6" aria-label="Bought">
          <button
          type="button"
          onClick={() => setShowBought((s) => !s)}
          aria-expanded={showBought}
          className="flex w-full items-center gap-2 px-1 py-1 text-left font-display text-[17px] font-semibold text-muted transition-colors duration-150 hover:text-ink">
          
            In the basket
            <span className="text-sm">{bought.length}</span>
            <ChevronDownIcon
            className={`ml-auto h-5 w-5 transition-transform duration-200 ${showBought ? 'rotate-180' : ''}`}
            aria-hidden="true" />
          
          </button>
          {showBought && <div className="mt-2 opacity-90">{renderRows(bought, 'bought')}</div>}
        </section>
      }

      <ItemSheet itemId={itemId} onClose={() => setItemId(null)} />
    </div>);

}