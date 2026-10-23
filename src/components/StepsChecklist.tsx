import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Subtask } from '../types/chores';

interface StepsChecklistProps {
  steps: Subtask[];
  onToggle: (step: Subtask) => void;
}

export function StepsChecklist({ steps, onToggle }: StepsChecklistProps) {
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <section className="mt-5" aria-labelledby="steps-heading">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 id="steps-heading" className="text-sm font-extrabold text-muted">
          Steps
        </h3>
        <span className="text-[13px] font-bold text-muted">
          {doneCount} of {steps.length} done
        </span>
      </div>
      <ul className="divide-y-2 divide-cream overflow-hidden rounded-[18px] border-2 border-line bg-paper">
        {steps.map((step) =>
        <li key={step.id}>
            <button
            type="button"
            onClick={() => onToggle(step)}
            aria-pressed={step.done}
            className="group flex w-full items-center gap-3 py-2.5 pl-3 pr-4 text-left">
            
              <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-[2.5px] transition-[background-color,border-color,transform] duration-150 group-active:scale-90 ${
              step.done ? 'border-leaf bg-leaf' : 'border-line-strong bg-paper group-hover:border-leaf'}`
              }>
              
                <CheckIcon
                strokeWidth={3.5}
                className={`h-3.5 w-3.5 text-white transition-[transform,opacity] duration-150 ${
                step.done ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`
                } />
              
              </span>
              <span
              className={`text-[15px] font-bold transition-colors duration-150 ${
              step.done ? 'text-muted line-through decoration-line-strong decoration-2' : 'text-ink'}`
              }>
              
                {step.title}
              </span>
            </button>
          </li>
        )}
      </ul>
    </section>);

}