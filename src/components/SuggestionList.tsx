import React from 'react';
import { Comment } from '@mui/icons-material';

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
} from '@mui/material';

import { useDataState } from '../hooks';
import { Suggestion } from '../lib/types';
import { formatDate, getNameInitials } from '../lib/utils';

import styles from '../styles/list.module.scss';

/**
 * The component that displays the collection of suggestions. Each suggestion is
 * shown in a card format with its title, author, comment count, and posting date.
 * The component allows users to select a suggestion by clicking on the card.
 */
export const SuggestionList: React.FC = () => {
  const { selected, suggestions, selectSuggestion } = useDataState();

  return (
    <Container
      className={
        selected ? `${styles.list} ${styles.hasSelected}` : styles.list
      }>
      {[...suggestions.values()].reverse().map((suggestion: Suggestion) => {
        const isSelected = selected?.id === suggestion.id;

        return (
          <Card
            className={
              isSelected
                ? `${styles.cardBox} ${styles.selected}`
                : styles.cardBox
            }
            key={suggestion.id}
            onClick={() => selectSuggestion(suggestion.id)}>
            <CardContent className={styles.card}>
              <h2>{suggestion.title}</h2>
              <Stack direction="row" justifyContent="space-between">
                <Stack alignItems="center" direction="row">
                  <Avatar className={styles.avatar}>
                    {getNameInitials(suggestion.author)}
                  </Avatar>
                  <p>{suggestion.author}</p>
                </Stack>
                <Stack alignItems="center" direction="row">
                  <p className={styles.commentCount}>
                    {suggestion.comments.length}
                  </p>
                  <Comment />
                </Stack>
              </Stack>
              <Divider />
              <p className={styles.date}>
                Posted on {formatDate(suggestion.created_at)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};
