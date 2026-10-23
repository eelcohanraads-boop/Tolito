import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** Used for the − / + button labels, e.g. "Emma's goal" */
  label: string;
  /** Width of the value readout */
  valueClassName?: string;
}

export function Stepper({ value, onChange, min, max, step, label, valueClassName = 'w-12' }: StepperProps) {
  const btn =
  'grid h-9 w-9 place-items-center rounded-full bg-cream text-ink transition-[transform,opacity] duration-150 active:scale-95 disabled:opacity-40';
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        aria-label={`Lower ${label}`}
        className={btn}>
        
        <MinusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
      </button>
      <span className={`${valueClassName} text-center font-display text-[17px] font-semibold text-ink`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        aria-label={`Raise ${label}`}
        className={btn}>
        
        <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
      </button>
    </div>);

}