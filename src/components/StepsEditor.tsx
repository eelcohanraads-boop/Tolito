import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';

interface StepsEditorProps {
  steps: string[];
  onChange: (steps: string[]) => void;
}

export function StepsEditor({ steps, onChange }: StepsEditorProps) {
  const [draft, setDraft] = useState('');
  const trimmed = draft.trim();

  function addStep() {
    if (!trimmed) return;
    onChange([...steps, trimmed]);
    setDraft('');
  }

  return (
    <fieldset className="mt-5">
      <legend className="mb-2 text-sm font-extrabold text-muted">
        Steps <span className="font-semibold">(optional)</span>
      </legend>

      <div className="overflow-hidden rounded-[18px] border-2 border-line bg-paper">
        {steps.length > 0 &&
        <ol className="divide-y-2 divide-cream">
            {steps.map((step, i) =>
          <li key={`${step}-${i}`} className="flex items-center gap-3 py-1 pl-4 pr-1.5">
                <span className="w-4 shrink-0 text-center text-[13px] font-extrabold text-muted">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-ink">{step}</span>
                <button
              type="button"
              onClick={() => onChange(steps.filter((_, idx) => idx !== i))}
              aria-label={`Remove step "${step}"`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-cream hover:text-ink">
              
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
          )}
          </ol>
        }

        <div className={`flex items-center gap-2 py-1.5 pl-4 pr-1.5 ${steps.length > 0 ? 'border-t-2 border-cream' : ''}`}>
          <label htmlFor="new-step" className="sr-only">
            Add a step
          </label>
          <input
            id="new-step"
            value={draft}
            autoComplete="off"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addStep();
              }
            }}
            placeholder={steps.length ? 'Add another step' : 'e.g. Put it in the machine'}
            className="h-10 min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:text-muted" />
          
          <button
            type="button"
            onClick={addStep}
            disabled={!trimmed}
            aria-label="Add step"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-butter text-ink transition-[transform,opacity] duration-150 active:scale-95 disabled:opacity-40">
            
            <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </div>
    </fieldset>);

}