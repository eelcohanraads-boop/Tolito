export type FeatureId = 'shopping' | 'recurring' | 'steps' | 'expiry' | 'points' | 'store';

export type Features = Record<FeatureId, boolean>;

export interface Invite {
  id: string;
  email: string;
}