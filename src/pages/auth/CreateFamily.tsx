import React, { useState } from 'react';
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/auth/TextField';
import { areaById } from '../../data/areas';
import { starterChores } from '../../data/starterChores';
import { createHousehold, firstName, suggestedHomeName } from '../../utils/household';
import { describeRepeat } from '../../utils/recurrence';
import { useScreenInit } from '../../useScreenInit.js';
import type { AuthUser, HouseholdSeed } from '../../types/auth';

interface CreateFamilyProps {
  user: AuthUser;
  onCreate: (seed: HouseholdSeed) => void;
}

export function CreateFamily({ user, onCreate }: CreateFamilyProps) {
  const screenInit = useScreenInit();
  const [step, setStep] = useState<0 | 1>(screenInit.createStep ?? 0);
  const [homeName, setHomeName] = useState(() => suggestedHomeName(user));
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(starterChores.filter((s) => s.suggested).map((s) => s.id))
  );
  const [creating, setCreating] = useState(false);

  const trimmed = homeName.trim();
  const count = selected.size;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else
      next.add(id);
      return next;
    });
  }

  function create() {
    setCreating(true);
    window.setTimeout(() => {
      onCreate(createHousehold(trimmed, user, starterChores.filter((s) => selected.has(s.id))));
    }, 600);
  }

  if (step === 0) {
    return (
      <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
        <span className="font-display text-[30px] font-bold tracking-tight text-cocoa">tolito</span>
        <p className="mt-8 text-[15px] font-bold text-muted">Hi {firstName(user.name)}!</p>
        <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">Let's set up your home</h1>
        <p className="mt-1.5 text-[15px] font-semibold text-muted">
          You'll be the admin. Invite your family once you're in.
        </p>

        <form
          className="mt-7 flex flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            if (trimmed) setStep(1);
          }}>
          
          <TextField
            id="home-name"
            label="What should we call it?"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            autoComplete="off" />
          
          <div className="mt-auto pt-8">
            <PrimaryButton type="submit" disabled={!trimmed}>
              Next
            </PrimaryButton>
          </div>
        </form>
      </div>);

  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-6">
      <button
        type="button"
        onClick={() => setStep(0)}
        className="-ml-2 flex h-10 items-center gap-1.5 self-start rounded-full px-2 text-[15px] font-extrabold text-muted transition-colors duration-150 hover:text-ink">
        
        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        Back
      </button>

      <h1 className="mt-4 font-display text-[28px] font-semibold leading-tight text-ink">Pick a few chores to start with</h1>
      <p className="mt-1.5 text-[15px] font-semibold text-muted">
        We picked some common ones for {trimmed}. You can change or add more anytime.
      </p>

      <ul className="card-lift mt-6 divide-y-2 divide-cream overflow-hidden rounded-[24px] border-2 border-line bg-paper shadow-[0_3px_0_rgb(var(--line))]">
        {starterChores.map((s) => {
          const on = selected.has(s.id);
          const meta = [
          areaById(s.area).label,
          s.repeat ? describeRepeat(s.repeat) : null,
          s.steps ? `${s.steps.length} steps` : null].

          filter(Boolean).
          join(' · ');
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={on}
                className="group flex w-full items-center gap-3 py-3 pl-4 pr-4 text-left">
                
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-[2.5px] transition-[background-color,border-color,transform] duration-150 group-active:scale-90 ${
                  on ? 'border-leaf bg-leaf' : 'border-line-strong bg-paper group-hover:border-leaf'}`
                  }>
                  
                  <CheckIcon
                    strokeWidth={3.5}
                    className={`h-4 w-4 text-white transition-[transform,opacity] duration-150 ${
                    on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`
                    } />
                  
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-bold text-ink">{s.title}</span>
                  <span className="block truncate text-[13px] font-semibold text-muted">{meta}</span>
                </span>
              </button>
            </li>);

        })}
      </ul>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={create} loading={creating}>
          {count > 0 ? `Start with ${count} ${count === 1 ? 'chore' : 'chores'}` : 'Start with an empty list'}
        </PrimaryButton>
      </div>
    </div>);

}