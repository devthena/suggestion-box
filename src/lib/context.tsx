import { createContext, ReactNode, useReducer } from 'react';
import { initialState } from '../constants/initialState';

import { dataReducer } from './reducer';
import { ContextType } from './types';

export const DataContext = createContext<ContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
