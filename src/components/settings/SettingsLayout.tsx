import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';

export const cardClass =
'card-lift overflow-hidden rounded-[24px] border-2 border-line bg-paper shadow-[0_3px_0_rgb(var(--line))]';

interface SettingsHeaderProps {
  title: string;
  /** Omit when the page is a top-level tab */
  onBack?: () => void;
}

export function SettingsHeader({ title, onBack }: SettingsHeaderProps) {
  return (
    <header className={`sticky top-0 z-10 flex items-center gap-1 bg-cream pb-2 pt-4 ${onBack ? 'px-3' : 'px-6'}`}>
      {onBack &&
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors duration-150 hover:bg-paper">
        
          <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      }
      <h1 className="font-display text-[22px] font-semibold text-ink">{title}</h1>
    </header>);

}

interface SettingsSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, action, children }: SettingsSectionProps) {
  const id = `section-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <section className="mt-7 px-5" aria-labelledby={id}>
      <div className="mb-2 flex items-end justify-between gap-3 px-1">
        <div>
          <h2 id={id} className="font-display text-[17px] font-semibold text-ink">
            {title}
          </h2>
          {description && <p className="mt-0.5 text-[13px] font-semibold text-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>);

}