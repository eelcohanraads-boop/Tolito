import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useShopping } from '../contexts/ShoppingContext';
import { capitalize } from '../utils/shopping';
import type { ShoppingItem } from '../types/shopping';

export function useAddItemBar(initialName = '') {
  const { items, addItem, setNeeded } = useShopping();
  const [name, setName] = useState(initialName);
  const [store, setStore] = useState('');
  const [recurring, setRecurring] = useState(false);

  const q = name.trim();
  const ql = q.toLowerCase();

  // Earlier listed items that match what's typed; "starts with" first
  const matches = useMemo(() => {
    if (!ql) return [];
    return items.
    filter((i) => i.name.toLowerCase().includes(ql)).
    sort(
      (a, b) =>
      Number(b.name.toLowerCase().startsWith(ql)) - Number(a.name.toLowerCase().startsWith(ql)) ||
      a.name.localeCompare(b.name)
    ).
    slice(0, 4);
  }, [items, ql]);

  const exact = items.find((i) => i.name.toLowerCase() === ql);

  function reset() {
    setName('');
    setStore('');
    setRecurring(false);
  }

  function pick(item: ShoppingItem) {
    if (item.needed) {
      toast(`${item.name} is already on the list`);
    } else {
      setNeeded(item.id, true);
      toast(`${item.name} is on the list`);
    }
    reset();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q) return;
    if (exact) {
      pick(exact);
      return;
    }
    const itemName = capitalize(q);
    addItem({ name: itemName, store: store.trim() || null, recurring });
    toast(`${itemName} is on the list`);
    reset();
  }

  return { name, setName, store, setStore, recurring, setRecurring, q, matches, exact, pick, submit };
}