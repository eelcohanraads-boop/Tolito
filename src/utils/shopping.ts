import type { ShoppingItem } from '../types/shopping';

/** Filter key used for items without a store */
export const NO_STORE = '__none__';

export function storeKey(store: string | null): string {
  return store ?? NO_STORE;
}

export function storeLabel(key: string): string {
  return key === NO_STORE ? 'Any store' : key;
}

function compareKeys(a: string, b: string): number {
  if (a === NO_STORE) return 1;
  if (b === NO_STORE) return -1;
  return a.localeCompare(b);
}

/** Counts per store key, sorted alphabetically with "Any store" last */
export function storeCounts(items: ShoppingItem[]): {key: string;count: number;}[] {
  const map = new Map<string, number>();
  items.forEach((i) => map.set(storeKey(i.store), (map.get(storeKey(i.store)) ?? 0) + 1));
  return [...map.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => compareKeys(a.key, b.key));
}

export function groupByStore(items: ShoppingItem[]): {key: string;items: ShoppingItem[];}[] {
  const map = new Map<string, ShoppingItem[]>();
  items.forEach((i) => {
    const k = storeKey(i.store);
    map.set(k, [...(map.get(k) ?? []), i]);
  });
  return [...map.entries()].
  map(([key, list]) => ({ key, items: list.sort((a, b) => a.name.localeCompare(b.name)) })).
  sort((a, b) => compareKeys(a.key, b.key));
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}