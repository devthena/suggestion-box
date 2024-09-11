import { createContext, ReactNode, useReducer } from 'react';
import { ActionType, DataState, Suggestion } from './types';

const initialState: DataState = {
  suggestions: new Map<string, Suggestion>(),
};

const dataReducer = (state: DataState, action: ActionType) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const selectedSuggestion = state.suggestions.get(action.payload.sid);
      if (selectedSuggestion) {
        selectedSuggestion.comments.push(action.payload);
        return {
          ...state,
          suggestions: new Map(state.suggestions).set(
            action.payload.id,
            selectedSuggestion
          ),
        };
      }
      return state;
    case 'ADD_SUGGESTION':
      return {
        ...state,
        suggestions: new Map(state.suggestions).set(
          action.payload.id,
          action.payload
        ),
      };
    case 'SET_SUGGESTIONS':
      const updatedSuggestions = new Map(state.suggestions);
      action.payload.forEach(suggestion => {
        updatedSuggestions.set(suggestion.id, suggestion);
      });

      return {
        ...state,
        suggestions: updatedSuggestions,
      };
    default:
      return state;
  }
};

export const DataContext = createContext<
  | {
      state: DataState;
      dispatch: React.Dispatch<ActionType>;
    }
  | undefined
>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
