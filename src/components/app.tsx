import React, { useEffect } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Container, Stack } from '@mui/material';

import { useDataState } from '../hooks';

import { SuggestionCreate } from './create';
import { SuggestionList } from './list';
import { SuggestionThread } from './thread';

export const App: React.FC = () => {
  const {
    suggestions,
    addNewSuggestion,
    generateMockData,
    generateSuggestion,
    toggleModal,
  } = useDataState();

  const handleSuggestionGenerate = () => {
    const newSuggestion = generateSuggestion();
    addNewSuggestion(newSuggestion);
  };

  useEffect(() => {
    if (suggestions.size > 0) return;
    generateMockData();
  }, [suggestions.size, generateMockData]);

  if (!suggestions.size) return <Container>Loading...</Container>;

  return (
    <Container>
      <Container>
        <h1>Suggestion Box</h1>
        <Stack direction="row" spacing={2}>
          <Button
            endIcon={<AddCircleOutline />}
            onClick={toggleModal}
            variant="contained"
            size="large">
            NEW SUGGESTION
          </Button>
          <Button onClick={handleSuggestionGenerate} size="small">
            Generate Suggestion
          </Button>
        </Stack>
        <SuggestionCreate />
      </Container>
      <Stack direction="row">
        <SuggestionList />
        <SuggestionThread />
      </Stack>
    </Container>
  );
};
