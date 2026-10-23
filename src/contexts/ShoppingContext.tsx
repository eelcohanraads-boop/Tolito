import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { NewShoppingItem, ShoppingItem } from '../types/shopping';
import type { Weekday } from '../types/chores';

interface ShoppingContextValue {
  items: ShoppingItem[];
  /** Every store used before, most used first — powers store suggestions */
  stores: string[];
  addItem: (input: NewShoppingItem) => void;
  setNeeded: (id: string, needed: boolean) => void;
  markBought: (id: string, bought: boolean) => void;
  updateItem: (id: string, patch: Partial<ShoppingItem>) => void;
  removeItem: (id: string) => void;
  /** Day of the week weekly items go back on the list (set by admins) */
  restockDay: Weekday;
  setRestockDay: (day: Weekday) => void;
}

const ShoppingContext = createContext<ShoppingContextValue | null>(null);

export function ShoppingProvider({ initialItems, children }: {initialItems: ShoppingItem[];children: React.ReactNode;}) {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [restockDay, setRestockDay] = useState<Weekday>(5);

  const stores = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((i) => i.store && counts.set(i.store, (counts.get(i.store) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([s]) => s);
  }, [items]);

  const updateItem = useCallback((id: string, patch: Partial<ShoppingItem>) => {
    setItems((is) => is.map((i) => i.id === id ? { ...i, ...patch } : i));
  }, []);

  const addItem = useCallback((input: NewShoppingItem) => {
    setItems((is) => [{ ...input, id: `i-${Date.now()}`, needed: true, bought: false }, ...is]);
  }, []);

  const setNeeded = useCallback(
    (id: string, needed: boolean) => updateItem(id, { needed, bought: false }),
    [updateItem]
  );

  const markBought = useCallback(
    (id: string, bought: boolean) => updateItem(id, { needed: !bought, bought }),
    [updateItem]
  );

  const removeItem = useCallback((id: string) => {
    setItems((is) => is.filter((i) => i.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, stores, addItem, setNeeded, markBought, updateItem, removeItem, restockDay, setRestockDay }),
    [items, stores, addItem, setNeeded, markBought, updateItem, removeItem, restockDay]
  );

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}

export function useShopping(): ShoppingContextValue {
  const ctx = useContext(ShoppingContext);
  if (!ctx) throw new Error('useShopping must be used inside ShoppingProvider');
  return ctx;
}