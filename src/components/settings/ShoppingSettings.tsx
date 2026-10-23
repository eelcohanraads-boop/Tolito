import React from 'react';
import { toast } from 'sonner';
import { SettingsSection, cardClass } from './SettingsLayout';
import { useShopping } from '../../contexts/ShoppingContext';
import { weekdays } from '../../utils/recurrence';

/** Admin-only: which day weekly shopping items go back on the list */
export function ShoppingSettings() {
  const { restockDay, setRestockDay, items } = useShopping();
  const weeklyCount = items.filter((i) => i.recurring).length;
  const dayLabel = weekdays[restockDay].label;

  return (
    <SettingsSection
      title="Weekly shopping"
      description={`Every ${dayLabel}, weekly items go back on the shopping list.`}>
      
      <div className={`${cardClass} p-3`}>
        <div role="radiogroup" aria-label="Weekly restock day" className="grid grid-cols-7 gap-1.5">
          {weekdays.map((d) => {
            const selected = d.id === restockDay;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={d.label}
                onClick={() => {
                  if (selected) return;
                  setRestockDay(d.id);
                  toast(`Weekly items now come back every ${d.label}`);
                }}
                className={`grid h-11 place-items-center rounded-full text-[15px] font-extrabold transition-[background-color,color,transform] duration-150 active:scale-95 ${
                selected ? 'bg-cocoa text-paper' : 'bg-cream text-ink hover:bg-line'}`
                }>
                
                {d.label.slice(0, 2)}
              </button>);

          })}
        </div>
        <p className="mt-3 px-1 text-[13px] font-semibold text-muted">
          {weeklyCount > 0 ?
          `${weeklyCount} weekly ${weeklyCount === 1 ? 'item' : 'items'} on your list, like milk or bread.` :
          'No weekly items yet. Mark an item as "Every week" when adding it.'}
        </p>
      </div>
    </SettingsSection>);

}