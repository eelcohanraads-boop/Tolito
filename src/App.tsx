import React, { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { HouseholdProvider } from './contexts/HouseholdContext';
import { DesignProvider } from './contexts/DesignContext';
import { ShoppingProvider } from './contexts/ShoppingContext';
import { PointsProvider } from './contexts/PointsContext';
import { defaultFeatures } from './data/features';
import { WELCOME_BONUS } from './utils/points';
import { AppShell } from './components/AppShell';
import { SignIn } from './pages/auth/SignIn';
import { JoinFamily } from './pages/auth/JoinFamily';
import { CreateFamily } from './pages/auth/CreateFamily';
import { demoHousehold, demoNewUser, inviterId } from './data/households';
import { starterChores } from './data/starterChores';
import { createHousehold, joinHousehold, suggestedHomeName } from './utils/household';
import { useScreenInit } from './useScreenInit.js';
import type { AuthUser, HouseholdSeed } from './types/auth';

type Stage = 'auth' | 'join' | 'create' | 'app';

interface AppProps {
  /** brownie = warm cartoon style · hbn = HBN Au Pair style guide */
  design?: 'brownie' | 'hbn';
  /** How the user arrives: fresh sign-up, via a family invite link, or already signed in */
  entry?: 'signUp' | 'inviteLink' | 'signedIn';
}

const inviter = demoHousehold.members.find((m) => m.id === inviterId)!;

function initialHousehold(kind: string | undefined): HouseholdSeed {
  if (kind === 'joined') return joinHousehold(demoHousehold, demoNewUser);
  if (kind === 'new')
  return createHousehold(
    suggestedHomeName(demoNewUser),
    demoNewUser,
    starterChores.filter((s) => s.suggested)
  );
  return demoHousehold;
}

export function App({ design = 'brownie', entry = 'signUp' }: AppProps) {
  const screenInit = useScreenInit();
  const invited: boolean = screenInit.invited ?? entry === 'inviteLink';
  const [stage, setStage] = useState<Stage>(screenInit.stage ?? (entry === 'signedIn' ? 'app' : 'auth'));
  const [user, setUser] = useState<AuthUser>(demoNewUser);
  const [household, setHousehold] = useState<HouseholdSeed>(() => initialHousehold(screenInit.household));
  const [householdKey, setHouseholdKey] = useState(0);

  function handleAuthenticated(nextUser: AuthUser, mode: 'signup' | 'signin') {
    setUser(nextUser);
    if (invited) setStage('join');
    // Returning users go straight back to their family
    else if (mode === 'signin')
    enter(
      {
        ...demoHousehold,
        // Reflect how they just signed in, so settings show SSO vs password correctly
        members: demoHousehold.members.map((m) =>
        m.id === demoHousehold.currentUserId ? { ...m, provider: nextUser.provider, email: nextUser.email } : m
        )
      },
      false
    );else
    setStage('create');
  }

  function enter(seed: HouseholdSeed, greet = true) {
    setHousehold(seed);
    setHouseholdKey((k) => k + 1);
    setStage('app');
    if (greet)
    toast(
      (seed.features ?? defaultFeatures).points ?
      `Welcome to ${seed.name}! Here are ${WELCOME_BONUS} tokens to get you started` :
      `Welcome to ${seed.name}!`
    );
  }

  return (
    <DesignProvider value={design}>
      <MotionConfig reducedMotion="user">
        <div data-theme={design} className="flex min-h-[100dvh] w-full justify-center bg-backdrop font-sans text-ink">
          <div className="relative flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-cream sm:shadow-[0_0_0_1px_rgba(43,37,32,0.06),0_20px_50px_-20px_rgba(43,37,32,0.25)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stage}
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}>
                
                {stage === 'app' ?
                <HouseholdProvider key={householdKey} seed={household}>
                    <PointsProvider
                    key={householdKey}
                    rewards={household.rewards}
                    redemptions={household.redemptions}
                    period={household.pointsPeriod}>
                    
                      <ShoppingProvider key={householdKey} initialItems={household.shopping ?? []}>
                        <AppShell onSignOut={() => setStage('auth')} />
                      </ShoppingProvider>
                    </PointsProvider>
                  </HouseholdProvider> :

                <div className="no-scrollbar flex-1 overflow-y-auto">
                    {stage === 'auth' &&
                  <SignIn
                    invite={invited ? { householdName: demoHousehold.name, inviter } : null}
                    initialMode={screenInit.authMode ?? 'signup'}
                    onAuthenticated={handleAuthenticated} />

                  }
                    {stage === 'join' &&
                  <JoinFamily
                    household={demoHousehold}
                    inviter={inviter}
                    user={user}
                    onJoin={() => enter(joinHousehold(demoHousehold, user))}
                    onStartOwn={() => setStage('create')} />

                  }
                    {stage === 'create' && <CreateFamily user={user} onCreate={(seed) => enter(seed)} />}
                  </div>
                }
              </motion.div>
            </AnimatePresence>
          </div>
          <Toaster
            position="bottom-center"
            offset={96}
            mobileOffset={{ bottom: 96 }}
            duration={3000}
            toastOptions={{
              style: {
                background: 'rgb(var(--cocoa))',
                color: 'rgb(var(--paper))',
                border: 'none',
                borderRadius: '20px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700
              },
              classNames: {
                actionButton: '!bg-butter !text-ink !font-extrabold !rounded-full !px-3'
              }
            }} />
          
        </div>
      </MotionConfig>
    </DesignProvider>);

}