import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50 ${
      checked ? 'bg-leaf' : 'bg-line-strong'}`
      }>
      
      <span
        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-paper shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        checked ? 'translate-x-5' : 'translate-x-0'}`
        } />
      
    </button>);

}