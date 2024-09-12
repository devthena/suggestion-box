import { DataState, Suggestion } from '../lib/types';

export const initialState: DataState = {
  isModalOpen: false,
  selected: null,
  suggestions: new Map<string, Suggestion>(),
};
