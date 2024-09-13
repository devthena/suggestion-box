import { ActionType, DataState } from './types';

/**
 * Reducer function to manage global state changes
 *
 * @param state - The current state of the data
 * @param action - The action being dispatched to update the state
 * @returns - The updated state based on the action
 */
export const dataReducer = (
  state: DataState,
  action: ActionType
): DataState => {
  switch (action.type) {
    /**
     * Adds a new comment to a suggestion
     * @case 'ADD_COMMENT'
     */
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
    /**
     * Adds a new suggestion to the collection
     * @case 'ADD_SUGGESTION'
     */
    case 'ADD_SUGGESTION':
      if (state.suggestions.has(action.payload.id)) return state;

      return {
        ...state,
        suggestions: new Map(state.suggestions).set(
          action.payload.id,
          action.payload
        ),
      };
    /**
     * Updates the modal state to open or closed
     * @case 'SET_MODAL'
     */
    case 'SET_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    /**
     * Updates the state to the current selected suggestion or to null
     * @case 'SET_SELECTED'
     */
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
    /**
     * For setting suggestions to the collection in bulk
     * @case 'SET_SUGGESTIONS'
     */
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
    // Default case if the action is not recognized
    default:
      return state;
  }
};
