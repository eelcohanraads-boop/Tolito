import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useHousehold } from './HouseholdContext';
import { starterRewards } from '../data/rewards';
import { walletFor, type Wallet } from '../utils/points';
import type { PointsPeriod, Redemption, Reward } from '../types/rewards';

interface PointsContextValue {
  /** Tokens switched on for the family */
  enabled: boolean;
  /** Store switched on (requires tokens) */
  storeEnabled: boolean;
  period: PointsPeriod;
  setPeriod: (period: PointsPeriod) => void;
  rewards: Reward[];
  addReward: (input: Omit<Reward, 'id'>) => void;
  updateReward: (id: string, patch: Partial<Reward>) => void;
  removeReward: (id: string) => void;
  redemptions: Redemption[];
  /** Spend the current user's tokens on a reward; false if they can't afford it */
  redeem: (rewardId: string) => boolean;
  walletOf: (memberId: string) => Wallet | null;
  myWallet: Wallet | null;
}

const PointsContext = createContext<PointsContextValue | null>(null);

interface PointsProviderProps {
  rewards?: Reward[];
  redemptions?: Redemption[];
  period?: PointsPeriod;
  children: React.ReactNode;
}

export function PointsProvider({ rewards: seedRewards, redemptions: seedRedemptions, period: seedPeriod, children }: PointsProviderProps) {
  const { features, members, chores, currentUserId, memberById, updateMember } = useHousehold();
  const [period, setPeriod] = useState<PointsPeriod>(seedPeriod ?? 'week');
  const [rewards, setRewards] = useState<Reward[]>(seedRewards ?? starterRewards);
  const [redemptions, setRedemptions] = useState<Redemption[]>(seedRedemptions ?? []);

  const enabled = features.points;
  const storeEnabled = features.points && features.store;

  const walletOf = useCallback(
    (memberId: string) => {
      const m = members.find((x) => x.id === memberId);
      return m ? walletFor(m, chores) : null;
    },
    [members, chores]
  );

  const myWallet = useMemo(() => walletOf(currentUserId), [walletOf, currentUserId]);

  const addReward = useCallback((input: Omit<Reward, 'id'>) => {
    setRewards((rs) => [...rs, { ...input, id: `r-${Date.now()}` }].sort((a, b) => a.cost - b.cost));
  }, []);

  const updateReward = useCallback((id: string, patch: Partial<Reward>) => {
    setRewards((rs) => rs.map((r) => r.id === id ? { ...r, ...patch } : r).sort((a, b) => a.cost - b.cost));
  }, []);

  const removeReward = useCallback((id: string) => {
    setRewards((rs) => rs.filter((r) => r.id !== id));
  }, []);

  const redeem = useCallback(
    (rewardId: string) => {
      const reward = rewards.find((r) => r.id === rewardId);
      const me = memberById(currentUserId);
      if (!reward || !me || !myWallet || myWallet.spendable < reward.cost) return false;
      updateMember(me.id, { banked: (me.banked ?? 0) - reward.cost });
      setRedemptions((rs) => [
      { id: `rd-${Date.now()}`, rewardId, title: reward.title, cost: reward.cost, memberId: me.id, when: 'Just now' },
      ...rs]
      );
      return true;
    },
    [rewards, memberById, currentUserId, myWallet, updateMember]
  );

  const value = useMemo(
    () => ({
      enabled,
      storeEnabled,
      period,
      setPeriod,
      rewards,
      addReward,
      updateReward,
      removeReward,
      redemptions,
      redeem,
      walletOf,
      myWallet
    }),
    [enabled, storeEnabled, period, rewards, addReward, updateReward, removeReward, redemptions, redeem, walletOf, myWallet]
  );

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
}

export function usePoints(): PointsContextValue {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error('usePoints must be used inside PointsProvider');
  return ctx;
}