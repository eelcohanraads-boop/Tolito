import React from 'react';
import { Avatar } from '../Avatar';
import { Chip } from '../Chip';
import { Stepper } from '../Stepper';
import { SettingsSection, cardClass } from './SettingsLayout';
import { useHousehold } from '../../contexts/HouseholdContext';
import { usePoints } from '../../contexts/PointsContext';
import { DEFAULT_GOAL, periodInfo } from '../../utils/points';
import type { PointsPeriod } from '../../types/rewards';

const periods: PointsPeriod[] = ['week', 'fortnight', 'month'];

/** Admin-only: the goal period and each person's token goal */
export function PointsSettings() {
  const { members, currentUserId, updateMember } = useHousehold();
  const { period, setPeriod, walletOf } = usePoints();
  const info = periodInfo[period];

  return (
    <SettingsSection
      title="Token goals"
      description={`How many tokens each person should earn per ${info.noun}. Extra can be spent; falling short costs tokens.`}>
      
      <div role="group" aria-label="Goal period" className="mb-3 flex gap-2">
        {periods.map((p) =>
        <Chip key={p} selected={period === p} onClick={() => setPeriod(p)}>
            <span className="pl-1">Per {periodInfo[p].option.toLowerCase()}</span>
          </Chip>
        )}
      </div>
      <ul className={`${cardClass} divide-y-2 divide-cream`}>
        {members.map((m) => {
          const goal = m.pointsGoal ?? DEFAULT_GOAL;
          const earned = walletOf(m.id)?.earned ?? 0;
          return (
            <li key={m.id} className="flex items-center gap-3 py-2.5 pl-4 pr-2.5">
              <Avatar member={m} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-extrabold text-ink">
                  {m.name}
                  {m.id === currentUserId && <span className="font-semibold text-muted"> (you)</span>}
                </p>
                <p className="text-[13px] font-semibold text-muted">
                  {earned} earned {info.label}
                </p>
              </div>
              <Stepper
                value={goal}
                onChange={(v) => updateMember(m.id, { pointsGoal: v })}
                min={0}
                max={500}
                step={10}
                label={`${m.name}'s goal`} />
              
            </li>);

        })}
      </ul>
    </SettingsSection>);

}