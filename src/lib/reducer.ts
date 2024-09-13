import { ActionType, DataState } from './types';

export const dataReducer = (
  state: DataState,
  action: ActionType
): DataState => {
  switch (action.type) {
    case 'ADD_COMMENT':
      const suggestion = state.suggestions.get(action.payload.sid);

      if (!suggestion) return state;

      const commentExists = suggestion.comments.some(
        comment => comment.id === action.payload.id
      );

      if (commentExists) return state;

      const updatedComments = [...suggestion.comments, action.payload];
      const updatedSuggestion = { ...suggestion, comments: updatedComments };

      return {
        ...state,
        selected: updatedSuggestion,
        suggestions: new Map(state.suggestions).set(
          action.payload.sid,
          updatedSuggestion
        ),
      };
    case 'ADD_SUGGESTION':
      if (state.suggestions.has(action.payload.id)) return state;

      return {
        ...state,
        suggestions: new Map(state.suggestions).set(
          action.payload.id,
          action.payload
        ),
      };
    case 'SET_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case 'SET_SELECTED':
      if (action.payload) {
        let newSelected = null;
        const suggestion = state.suggestions.get(action.payload);

        if (suggestion && suggestion.id !== state.selected?.id) {
          newSelected = suggestion;
        }

        return {
          ...state,
          selected: newSelected,
        };
      }

      return {
        ...state,
        selected: null,
      };
    case 'SET_SUGGESTIONS':
      if (state.suggestions.size > 0) return state;

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
