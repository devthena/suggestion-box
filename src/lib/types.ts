// Global state of the application
export interface DataState {
  isModalOpen: boolean; // Determines if a modal is open or closed
  selected: Suggestion | null; // The suggestion selected by the user
  suggestions: Map<string, Suggestion>; // A collection of all the suggestions
}

// Represents a Suggestion object
export interface Suggestion {
  id: string; // Identifier for the suggestion
  author: string; // Name of the author of the suggestion
  title: string; // Title of the suggestion
  description: string; // Description of the suggestion
  created_at: Date; // Date when the suggestion was created
  comments: Comment[]; // A collection of all the comments of the suggestion
}

// Represents a Comment object
export interface Comment {
  id: string; // Identifier for the comment
  sid: string; // Identifier for the suggestion the comment is posted
  author: string; // Name of the author of the comment
  message: string; // Content of the comment
  created_at: Date; // Date when the comment was created
}

// Represents the possible actions to update he state of the application
export type ActionType =
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'ADD_SUGGESTION'; payload: Suggestion }
  | { type: 'SET_MODAL' }
  | { type: 'SET_SELECTED'; payload: string | null }
  | { type: 'SET_SUGGESTIONS'; payload: Suggestion[] };

// Represents the context object used in the state management of the application
export type ContextType = {
  state: DataState;
  dispatch: React.Dispatch<ActionType>;
};
