import React, { useEffect, useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { BottomSheet } from '../BottomSheet';
import { PrimaryButton } from '../PrimaryButton';
import { Stepper } from '../Stepper';
import { TextField } from '../auth/TextField';
import { usePoints } from '../../contexts/PointsContext';

interface RewardSheetProps {
  /** "new" to add a reward, an id to edit one, null when closed */
  rewardId: string | null;
  onClose: () => void;
}

const suggestions = ['Movie night pick', 'Choose Friday dinner', 'Extra pocket money', 'Day out of your choice'];

/** Admin-only: add or edit a reward in the store */
export function RewardSheet({ rewardId, onClose }: RewardSheetProps) {
  const { rewards, addReward, updateReward, removeReward } = usePoints();
  const isNew = rewardId === 'new';
  const existing = rewards.find((r) => r.id === rewardId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(50);

  useEffect(() => {
    if (!rewardId) return;
    setTitle(existing?.title ?? '');
    setDescription(existing?.description ?? '');
    setCost(existing?.cost ?? 50);
    // Reset only when a different reward is opened
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardId]);

  const trimmed = title.trim();

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!trimmed) return;
    const input = { title: trimmed, cost, description: description.trim() || undefined };
    if (isNew) addReward(input);else
    if (existing) updateReward(existing.id, input);
    toast(isNew ? `Added "${trimmed}" to the store` : 'Reward saved');
    onClose();
  }

  return (
    <BottomSheet open={isNew || !!existing} onClose={onClose} title={isNew ? 'New reward' : 'Edit reward'}>
      <form noValidate onSubmit={save} className="flex flex-col gap-5 px-5">
        <div>
          <TextField
            id="reward-title"
            label="Reward"
            placeholder="e.g. Movie night pick"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off" />
          
          {isNew && !trimmed &&
          <div className="no-scrollbar -mx-5 mt-2 flex gap-1.5 overflow-x-auto px-5">
              {suggestions.map((s) =>
            <button
              key={s}
              type="button"
              onClick={() => setTitle(s)}
              className="h-8 shrink-0 whitespace-nowrap rounded-full bg-butter-soft px-3 text-[13px] font-bold text-ink transition-transform duration-100 active:scale-95">
              
                  {s}
                </button>
            )}
            </div>
          }
        </div>
        <TextField
          id="reward-description"
          label="Details (optional)"
          placeholder="Any rules, like “not on school nights”"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="off" />
        
        <div className="flex items-center justify-between gap-3 rounded-[18px] border-2 border-line bg-paper py-2 pl-4 pr-2">
          <span className="text-[15px] font-bold text-ink">Costs (tokens)</span>
          <Stepper value={cost} onChange={setCost} min={10} max={1000} step={10} label="the cost" valueClassName="w-14" />
        </div>
        <div className="mt-1 flex flex-col gap-2">
          <PrimaryButton type="submit" disabled={!trimmed}>
            {isNew ? 'Add to store' : 'Save'}
          </PrimaryButton>
          {existing &&
          <button
            type="button"
            onClick={() => {
              removeReward(existing.id);
              onClose();
              toast(`Removed "${existing.title}"`);
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-bold text-danger transition-colors duration-150 hover:bg-blush-soft">
            
              <Trash2Icon className="h-4 w-4" aria-hidden="true" />
              Remove from store
            </button>
          }
        </div>
      </form>
    </BottomSheet>);

}