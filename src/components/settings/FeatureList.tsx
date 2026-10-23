import React from 'react';
import { Toggle } from './Toggle';
import { cardClass } from './SettingsLayout';
import { useHousehold } from '../../contexts/HouseholdContext';
import { featureDefinitions } from '../../data/features';

export function FeatureList() {
  const { features, setFeature } = useHousehold();

  return (
    <ul className={`${cardClass} divide-y-2 divide-cream`}>
      {featureDefinitions.map((f) => {
        const Icon = f.icon;
        return (
          <li key={f.id} className="flex items-center gap-3 px-4 py-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-ink" aria-hidden="true">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-extrabold text-ink">
                {f.title}
                {f.comingSoon &&
                <span className="rounded-full bg-butter-soft px-2 py-0.5 text-[11px] font-extrabold text-muted">Soon</span>
                }
              </p>
              <p className="text-[13px] font-semibold leading-snug text-muted">{f.description}</p>
            </div>
            <Toggle
              checked={!f.comingSoon && features[f.id] && !(f.id === 'store' && !features.points)}
              disabled={f.comingSoon || f.id === 'store' && !features.points}
              label={f.title}
              onChange={(on) => setFeature(f.id, on)} />
            
          </li>);

      })}
    </ul>);

}