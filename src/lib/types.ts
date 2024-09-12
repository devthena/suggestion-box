export interface DataState {
  isModalOpen: boolean;
  selected: Suggestion | null;
  suggestions: Map<string, Suggestion>;
}

export interface Suggestion {
  id: string;
  author: string;
  title: string;
  description: string;
  created_at: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  sid: string;
  author: string;
  message: string;
  created_at: Date;
}

export type ActionType =
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'ADD_SUGGESTION'; payload: Suggestion }
  | { type: 'SET_MODAL' }
  | { type: 'SET_SELECTED'; payload: string | null }
  | { type: 'SET_SUGGESTIONS'; payload: Suggestion[] };

export type ContextType = {
  state: DataState;
  dispatch: React.Dispatch<ActionType>;
};
