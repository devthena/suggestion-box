import { useCallback, useContext } from 'react';

import { NameList } from '../constants/names';
import { DataContext } from '../lib/context';
import { Comment, Suggestion } from '../lib/types';

import {
  chance,
  generateId,
  getRandomElement,
  getRandomNumber,
} from '../lib/utils';

/**
 * Custom hook that provides state management and utility functions to interact
 * with suggestions and comments in the application
 *
 * @throws Will throw an error if not used within a `DataProvider`
 * @returns Current state and functions to manage comments, suggestions, and the modal
 */
export const useDataState = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useDataState must be used within a Provider');
  }

  const { state, dispatch } = context;

  /**
   * Adds a new comment to the selected suggestion
   * @param comment - The comment to be added
   */
  const addNewComment = useCallback(
    async (comment: Comment) => {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
    },
    [dispatch]
  );

  /**
   * Adds a new suggestion to the collection and selects it
   * @param suggestion - The suggestion to be added
   */
  const addNewSuggestion = useCallback(
    async (suggestion: Suggestion) => {
      await dispatch({ type: 'ADD_SUGGESTION', payload: suggestion });
      dispatch({ type: 'SET_SELECTED', payload: suggestion.id });
    },
    [dispatch]
  );

  /**
   * Generates a new comment with random data for a specific suggestion
   * @param sid - The ID of the suggestion the comment belongs to
   * @returns A new randomly generated comment
   */
  const generateComment = useCallback((sid: string): Comment => {
    return {
      id: generateId(),
      sid: sid,
      author: getRandomElement(NameList),
      message: chance.sentence({ words: 10 }),
      created_at: new Date(),
    };
  }, []);

  /**
   * Generates a new suggestion with random data and associated comments
   * @returns A new randomly generated suggestion
   */
  const generateSuggestion = useCallback((): Suggestion => {
    const sid = generateId();
    const commentCount = getRandomNumber(2, 4);

    const comments = Array.from({ length: commentCount }, () =>
      generateComment(sid)
    );

    return {
      id: sid,
      author: getRandomElement(NameList),
      title: chance.sentence({ words: 7 }),
      description: chance.paragraph({ sentences: 3 }),
      created_at: new Date(),
      comments: comments,
    };
  }, [generateComment]);

  // Generates random suggestions and updates the global state
  const generateMockData = useCallback(() => {
    const suggestionCount = getRandomNumber(3, 7);
    const mockData = Array.from({ length: suggestionCount }, () =>
      generateSuggestion()
    );

    dispatch({ type: 'SET_SUGGESTIONS', payload: mockData });
  }, [dispatch, generateSuggestion]);

  /**
   * Selects a suggestion by its ID or clears the selection
   * @param id - The ID of the suggestion to select, or null to clear selection
   */
  const selectSuggestion = useCallback(
    (id: string | null) => {
      dispatch({ type: 'SET_SELECTED', payload: id });
    },
    [dispatch]
  );

  // Updates the modal state to open or closed
  const toggleModal = useCallback(() => {
    dispatch({ type: 'SET_MODAL' });
  }, [dispatch]);

  return {
    ...state,
    addNewComment,
    addNewSuggestion,
    generateComment,
    generateMockData,
    generateSuggestion,
    selectSuggestion,
    toggleModal,
  };
};
