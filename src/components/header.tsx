import React from 'react';
import { AddCircleOutline, KeyboardBackspace } from '@mui/icons-material';
import { Button, Container, Stack } from '@mui/material';

import { useDataState } from '../hooks';
import { SuggestionCreate } from './SuggestionCreate';

import styles from '../styles/header.module.scss';

export const Header: React.FC = () => {
  const {
    selected,
    addNewComment,
    addNewSuggestion,
    generateComment,
    generateSuggestion,
    selectSuggestion,
    toggleModal,
  } = useDataState();

  const handleCommentGenerate = () => {
    if (!selected) return;

    const newComment = generateComment(selected.id);
    addNewComment(newComment);
  };

  const handleSuggestionGenerate = () => {
    const newSuggestion = generateSuggestion();
    addNewSuggestion(newSuggestion);
  };

  return (
    <Container className={styles.header}>
      <h1>Suggestion Box</h1>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <Stack
          className={selected ? `${styles.hasSelected}` : ''}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}>
          <Button
            className={styles.button}
            endIcon={<AddCircleOutline />}
            onClick={toggleModal}
            variant="contained"
            size="medium">
            ADD SUGGESTION
          </Button>
          <Button
            className={styles.button_light}
            onClick={handleSuggestionGenerate}
            size="small">
            Generate Suggestion
          </Button>
        </Stack>
        {selected && (
          <Stack
            direction="row"
            justifyContent={selected ? 'space-between' : 'center'}>
            <Button
              className={`${styles.back} ${styles.button_light}`}
              onClick={() => selectSuggestion(null)}
              startIcon={<KeyboardBackspace />}
              size="small">
              Back
            </Button>
            <Button
              className={styles.button_light}
              onClick={handleCommentGenerate}
              size="small">
              Generate Comment
            </Button>
          </Stack>
        )}
      </Stack>
      <SuggestionCreate />
    </Container>
  );
};
