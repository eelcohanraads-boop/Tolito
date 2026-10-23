import React from 'react';
import { CheckIcon } from 'lucide-react';
import { passwordRules, passwordScore } from '../../utils/password';

const strength = [
{ label: 'Too weak', bar: 'bg-danger' },
{ label: 'Weak', bar: 'bg-danger' },
{ label: 'Almost there', bar: 'bg-butter-deep' },
{ label: 'Strong', bar: 'bg-leaf' }];


export function PasswordRules({ password }: {password: string;}) {
  const score = passwordScore(password);
  const level = strength[score];

  return (
    <div className="mt-2.5" aria-live="polite">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {[1, 2, 3].map((i) =>
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${i <= score ? level.bar : 'bg-line'}`} />

          )}
        </div>
        <span className="w-[86px] text-right text-[12px] font-extrabold text-muted">{level.label}</span>
      </div>
      <ul className="mt-2 space-y-1">
        {passwordRules.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.id} className={`flex items-center gap-2 text-[13px] font-bold ${ok ? 'text-ink' : 'text-muted'}`}>
              <span
                className={`grid h-4 w-4 place-items-center rounded-full transition-colors duration-150 ${
                ok ? 'bg-leaf text-white' : 'bg-line'}`
                }
                aria-hidden="true">
                
                {ok && <CheckIcon className="h-3 w-3" strokeWidth={4} />}
              </span>
              {rule.label}
              <span className="sr-only">{ok ? '(done)' : '(missing)'}</span>
            </li>);

        })}
      </ul>
    </div>);

}