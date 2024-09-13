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

export const useDataState = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useDataState must be used within a Provider');
  }

  const { state, dispatch } = context;

  const addNewComment = useCallback(
    async (comment: Comment) => {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
    },
    [dispatch]
  );

  const addNewSuggestion = useCallback(
    async (suggestion: Suggestion) => {
      await dispatch({ type: 'ADD_SUGGESTION', payload: suggestion });
      dispatch({ type: 'SET_SELECTED', payload: suggestion.id });
    },
    [dispatch]
  );

  const generateComment = useCallback((sid: string): Comment => {
    return {
      id: generateId(),
      sid: sid,
      author: getRandomElement(NameList),
      message: chance.sentence({ words: 10 }),
      created_at: new Date(),
    };
  }, []);

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

  const generateMockData = useCallback(() => {
    const suggestionCount = getRandomNumber(3, 7);
    const mockData = Array.from({ length: suggestionCount }, () =>
      generateSuggestion()
    );

    dispatch({ type: 'SET_SUGGESTIONS', payload: mockData });
  }, [dispatch, generateSuggestion]);

  const selectSuggestion = useCallback(
    (id: string | null) => {
      dispatch({ type: 'SET_SELECTED', payload: id });
    },
    [dispatch]
  );

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
