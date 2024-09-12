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
    (comment: Comment) => {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
    },
    [dispatch]
  );

  const addNewSuggestion = useCallback(
    (suggestion: Suggestion) => {
      dispatch({ type: 'ADD_SUGGESTION', payload: suggestion });
    },
    [dispatch]
  );

  const generateComment = useCallback((sid: string): Comment => {
    return {
      id: generateId(),
      sid: sid,
      author: getRandomElement(NameList),
      message: chance.paragraph({ sentences: 1 }),
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
    const suggestionCount = getRandomNumber(7, 10);
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

  return {
    ...state,
    addNewComment,
    addNewSuggestion,
    generateComment,
    generateMockData,
    generateSuggestion,
    selectSuggestion,
  };
};
