import { createContext, ReactNode, useReducer } from 'react';
import { initialState } from '../constants/initialState';

import { dataReducer } from './reducer';
import { ContextType } from './types';

// Gives access to the global state and the dispatch function
export const DataContext = createContext<ContextType | undefined>(undefined);

/**
 * Provider that wraps the application and supplies the state and dispatch to any
 * components that need access to the global state
 *
 * @param children - The children components that will have access to the context
 * @returns The provider component that wraps children in the global state context
 */
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
