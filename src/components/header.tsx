import React from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Container, Stack } from '@mui/material';

import { useDataState } from '../hooks';
import { SuggestionCreate } from './create';

import styles from '../styles/header.module.scss';

export const Header: React.FC = () => {
  const { addNewSuggestion, generateSuggestion, toggleModal } = useDataState();

  const handleSuggestionGenerate = () => {
    const newSuggestion = generateSuggestion();
    addNewSuggestion(newSuggestion);
  };

  return (
    <Container className={styles.header}>
      <h1>Suggestion Box</h1>
      <Stack direction="row" spacing={2}>
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
      <SuggestionCreate />
    </Container>
  );
};
