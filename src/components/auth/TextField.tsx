import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  trailing?: React.ReactNode;
  hint?: React.ReactNode;
}

export function TextField({ id, label, error, trailing, hint, ...rest }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold text-ink">
        {label}
      </label>
      <div
        className={`flex items-center rounded-[16px] border-2 bg-paper transition-colors duration-150 focus-within:border-cocoa ${
        error ? 'border-danger' : 'border-line'}`
        }>
        
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[16px] font-semibold text-ink outline-none placeholder:font-semibold placeholder:text-muted/70"
          {...rest} />
        
        {trailing}
      </div>
      {error ?
      <p id={`${id}-error`} className="mt-1.5 text-[13px] font-bold text-danger">
          {error}
        </p> :

      hint
      }
    </div>);

}