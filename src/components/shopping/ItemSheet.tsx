import React, { useEffect, useRef, useState } from 'react';
import { RepeatIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { Chip } from '../Chip';
import { PrimaryButton } from '../PrimaryButton';
import { TextField } from '../auth/TextField';
import { StoreInput } from './StoreInput';
import { useShopping } from '../../contexts/ShoppingContext';
import type { ShoppingItem } from '../../types/shopping';

interface ItemSheetProps {
  itemId: string | null;
  onClose: () => void;
}

export function ItemSheet({ itemId, onClose }: ItemSheetProps) {
  const { items, updateItem, removeItem } = useShopping();
  const live = items.find((i) => i.id === itemId);
  const lastRef = useRef<ShoppingItem | undefined>(live);
  if (live) lastRef.current = live;
  const item = live ?? lastRef.current;

  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    if (live) {
      setName(live.name);
      setStore(live.store ?? '');
      setRecurring(live.recurring);
    }
    // Only reset the form when another item is opened
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!item || !name.trim()) return;
    updateItem(item.id, { name: name.trim(), store: store.trim() || null, recurring });
    toast('Item saved');
    onClose();
  }

  return (
    <BottomSheet open={!!itemId && !!live} onClose={onClose} title="Edit item">
      {item &&
      <form noValidate onSubmit={save} className="flex flex-col gap-5 px-5">
          <TextField id="item-name" label="Item" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          <StoreInput id="item-store" value={store} onChange={setStore} />
          <fieldset>
            <legend className="mb-2 text-sm font-extrabold text-muted">How often?</legend>
            <div className="flex gap-2">
              <Chip selected={!recurring} onClick={() => setRecurring(false)}>
                <span className="pl-1">One time</span>
              </Chip>
              <Chip selected={recurring} onClick={() => setRecurring(true)}>
                <RepeatIcon className="h-4 w-4" aria-hidden="true" />
                Every week
              </Chip>
            </div>
          </fieldset>
          <div className="mt-2 flex flex-col gap-2">
            <PrimaryButton type="submit" disabled={!name.trim()}>
              Save
            </PrimaryButton>
            <button
            type="button"
            onClick={() => {
              removeItem(item.id);
              onClose();
              toast(`Deleted ${item.name}`);
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-danger transition-colors duration-150 hover:bg-blush-soft">
            
              <Trash2Icon className="h-4 w-4" aria-hidden="true" />
              Delete item
            </button>
          </div>
        </form>
      }
    </BottomSheet>);

}