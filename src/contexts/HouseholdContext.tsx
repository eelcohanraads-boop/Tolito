import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { defaultFeatures } from '../data/features';
import type { Chore, Member, NewChore } from '../types/chores';
import type { HouseholdSeed } from '../types/auth';
import type { FeatureId, Features, Invite } from '../types/settings';

interface HouseholdContextValue {
  householdName: string;
  setHouseholdName: (name: string) => void;
  members: Member[];
  currentUserId: string;
  updateMember: (id: string, patch: Partial<Member>) => void;
  removeMember: (id: string) => void;
  invites: Invite[];
  inviteLink: string;
  addInvite: (email: string) => void;
  cancelInvite: (id: string) => void;
  features: Features;
  setFeature: (id: FeatureId, on: boolean) => void;
  chores: Chore[];
  memberById: (id: string | null | undefined) => Member | null;
  setDone: (id: string, done: boolean) => void;
  assign: (id: string, memberId: string | null) => void;
  updateChore: (id: string, patch: Partial<Chore>) => void;
  addChore: (input: NewChore) => void;
  removeChore: (id: string) => void;
  toggleSubtask: (choreId: string, subtaskId: string) => void;
}

const HouseholdContext = createContext<HouseholdContextValue | null>(null);

interface HouseholdProviderProps {
  seed: HouseholdSeed;
  children: React.ReactNode;
}

export function HouseholdProvider({ seed, children }: HouseholdProviderProps) {
  const { currentUserId } = seed;
  const [householdName, setHouseholdName] = useState(seed.name);
  const [members, setMembers] = useState<Member[]>(seed.members);
  const [invites, setInvites] = useState<Invite[]>(seed.invites ?? []);
  const [features, setFeatures] = useState<Features>(seed.features ?? defaultFeatures);
  const [chores, setChores] = useState<Chore[]>(seed.chores);

  const inviteLink = useMemo(
    () => `https://tolito.app/join/${householdName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-7k2f`,
    [householdName]
  );

  const memberById = useCallback(
    (id: string | null | undefined) => members.find((m) => m.id === id) ?? null,
    [members]
  );

  const updateMember = useCallback((id: string, patch: Partial<Member>) => {
    setMembers((ms) => ms.map((m) => m.id === id ? { ...m, ...patch } : m));
  }, []);

  const removeMember = useCallback((id: string) => {
    setMembers((ms) => ms.filter((m) => m.id !== id));
    // Their open chores go back up for grabs
    setChores((cs) => cs.map((c) => c.assigneeId === id && !c.done ? { ...c, assigneeId: null } : c));
  }, []);

  const addInvite = useCallback((email: string) => {
    setInvites((is) => [...is, { id: `inv-${Date.now()}`, email }]);
  }, []);

  const cancelInvite = useCallback((id: string) => {
    setInvites((is) => is.filter((i) => i.id !== id));
  }, []);

  const setFeature = useCallback((id: FeatureId, on: boolean) => {
    setFeatures((f) => ({ ...f, [id]: on }));
  }, []);

  const updateChore = useCallback((id: string, patch: Partial<Chore>) => {
    setChores((cs) => cs.map((c) => c.id === id ? { ...c, ...patch } : c));
  }, []);

  const setDone = useCallback(
    (id: string, done: boolean) => updateChore(id, { done, doneById: done ? currentUserId : undefined }),
    [updateChore, currentUserId]
  );

  const assign = useCallback(
    (id: string, memberId: string | null) => updateChore(id, { assigneeId: memberId }),
    [updateChore]
  );

  const addChore = useCallback((input: NewChore) => {
    setChores((cs) => [{ ...input, id: `c-${Date.now()}`, done: false }, ...cs]);
  }, []);

  const removeChore = useCallback((id: string) => {
    setChores((cs) => cs.filter((c) => c.id !== id));
  }, []);

  const toggleSubtask = useCallback((choreId: string, subtaskId: string) => {
    setChores((cs) =>
    cs.map((c) =>
    c.id === choreId ?
    { ...c, subtasks: (c.subtasks ?? []).map((s) => s.id === subtaskId ? { ...s, done: !s.done } : s) } :
    c
    )
    );
  }, []);

  const value = useMemo(
    () => ({
      householdName,
      setHouseholdName,
      members,
      currentUserId,
      updateMember,
      removeMember,
      invites,
      inviteLink,
      addInvite,
      cancelInvite,
      features,
      setFeature,
      chores,
      memberById,
      setDone,
      assign,
      updateChore,
      addChore,
      removeChore,
      toggleSubtask
    }),
    [
    householdName,
    members,
    currentUserId,
    updateMember,
    removeMember,
    invites,
    inviteLink,
    addInvite,
    cancelInvite,
    features,
    setFeature,
    chores,
    memberById,
    setDone,
    assign,
    updateChore,
    addChore,
    removeChore,
    toggleSubtask]

  );

  return <HouseholdContext.Provider value={value}>{children}</HouseholdContext.Provider>;
}

export function useHousehold(): HouseholdContextValue {
  const ctx = useContext(HouseholdContext);
  if (!ctx) throw new Error('useHousehold must be used inside HouseholdProvider');
  return ctx;
}