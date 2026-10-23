import React from 'react';
import { Loader2Icon } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function PrimaryButton({ loading = false, children, disabled, className = '', ...rest }: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`lift flex h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-cocoa font-display text-[18px] font-semibold text-paper shadow-[0_4px_0_rgb(var(--cocoa-deep))] transition-[background-color,transform,box-shadow,opacity] duration-150 active:translate-y-[3px] active:shadow-[0_1px_0_rgb(var(--cocoa-deep))] disabled:opacity-60 ${className}`}>
      
      {loading && <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}