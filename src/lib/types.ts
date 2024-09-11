export interface DataState {
  suggestions: Map<string, Suggestion>;
}

export interface Suggestion {
  id: string;
  author: Name;
  title: string;
  description: string;
  created_at: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  sid: string;
  author: Name;
  message: string;
  created_at: Date;
}

export interface Name {
  id: string;
  name: string;
}

export type ActionType =
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'ADD_SUGGESTION'; payload: Suggestion }
  | { type: 'SET_SUGGESTIONS'; payload: Suggestion[] };
