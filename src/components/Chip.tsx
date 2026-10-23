import React from 'react';

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Chip({ selected, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-2 pl-2 pr-3.5 text-sm font-bold transition-[background-color,border-color,color,transform] duration-150 active:scale-95 ${
      selected ?
      'border-cocoa bg-cocoa text-cream' :
      'border-line bg-paper text-ink hover:border-line-strong'}`
      }>
      
      {children}
    </button>);

}