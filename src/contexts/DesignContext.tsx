import { createContext, useContext } from 'react';

export type Design = 'brownie' | 'hbn';

const DesignContext = createContext<Design>('brownie');

export const DesignProvider = DesignContext.Provider;

export function useDesign(): Design {
  return useContext(DesignContext);
}