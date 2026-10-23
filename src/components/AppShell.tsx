import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { BottomNav, type Tab } from './BottomNav';
import { AddChoreSheet } from './AddChoreSheet';
import { Chores } from '../pages/Chores';
import { Family } from '../pages/Family';
import { Shopping } from '../pages/Shopping';
import { Store } from '../pages/Store';
import { Profile } from '../pages/settings/Profile';
import { FamilySettings } from '../pages/settings/FamilySettings';
import { useHousehold } from '../contexts/HouseholdContext';
import { usePoints } from '../contexts/PointsContext';
import { useScreenInit } from '../useScreenInit.js';

type Overlay = 'profile' | 'family-settings' | null;

interface AppShellProps {
  onSignOut: () => void;
}

/** The signed-in app: tabs, bottom nav, settings and the add-chore sheet */
export function AppShell({ onSignOut }: AppShellProps) {
  const screenInit = useScreenInit();
  const { features, memberById, currentUserId } = useHousehold();
  const isAdmin = memberById(currentUserId)?.role === 'admin';
  const { storeEnabled, myWallet } = usePoints();
  const [tab, setTab] = useState<Tab>(screenInit.view === 'store' ? 'store' : screenInit.tab ?? 'chores');
  const [overlay, setOverlay] = useState<Overlay>(
    screenInit.view === 'profile' || screenInit.view === 'family-settings' ? screenInit.view : null
  );
  const [addOpen, setAddOpen] = useState<boolean>(screenInit.addOpen ?? false);
  const [focusKey, setFocusKey] = useState(0);

  const activeTab: Tab =
  tab === 'shopping' && !features.shopping || tab === 'store' && !features.points ? 'chores' : tab;
  const openProfile = useCallback(() => setOverlay('profile'), []);
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const backToProfile = useCallback(() => setOverlay('profile'), []);

  if (overlay) {
    return (
      <div key={overlay} className="no-scrollbar flex-1 overflow-y-auto">
        {overlay === 'profile' ?
        <Profile onBack={closeOverlay} onSignOut={onSignOut} onManageFamily={() => setOverlay('family-settings')} /> :

        <FamilySettings onBack={backToProfile} />
        }
      </div>);

  }

  // Anyone can add groceries; only admins can create chores
  const addDisabled = activeTab !== 'shopping' && !isAdmin;

  function handleAdd() {
    // On the shopping list, + jumps straight into the "Add an item" field
    if (activeTab === 'shopping') setFocusKey((k) => k + 1);else
    if (addDisabled) toast('Only admins can add chores. Ask an admin to add one for you.');else
    setAddOpen(true);
  }

  return (
    <>
      <main key={activeTab} className="no-scrollbar flex-1 overflow-y-auto pb-32">
        {activeTab === 'chores' && <Chores onOpenProfile={openProfile} />}
        {activeTab === 'shopping' && <Shopping onOpenProfile={openProfile} focusKey={focusKey} />}
        {activeTab === 'family' && <Family onOpenProfile={openProfile} />}
        {activeTab === 'store' && <Store />}
      </main>
      <BottomNav
        tab={activeTab}
        onTab={setTab}
        onAdd={handleAdd}
        addLabel={
        activeTab === 'shopping' ? 'Add shopping item' : addDisabled ? 'Add chore (admins only)' : 'Add chore'
        }
        addDisabled={addDisabled}
        showShopping={features.shopping}
        showStore={features.points}
        storeBalance={myWallet?.spendable ?? 0}
        storeLabel={storeEnabled ? 'Token store' : 'Your tokens'} />
      
      {isAdmin && <AddChoreSheet open={addOpen} onClose={() => setAddOpen(false)} />}
    </>);

}