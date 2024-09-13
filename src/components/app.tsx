import React, { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';

import { useDataState } from '../hooks';

import { Header } from './Header';
import { SuggestionList } from './SuggestionList';
import { SuggestionThread } from './SuggestionThread';

import styles from '../styles/app.module.scss';

export const App: React.FC = () => {
  const { suggestions, generateMockData } = useDataState();
  const [isDataGenerated, setIsDataGenerated] = useState<boolean>(false);

  useEffect(() => {
    if (suggestions.size > 0 || isDataGenerated) return;

    generateMockData();
    setIsDataGenerated(true);
  }, [isDataGenerated, suggestions.size, generateMockData]);

  if (!suggestions.size) return <Container>Loading...</Container>;

  return (
    <Container className={styles.main}>
      <Header />
      <Stack className={styles.body} direction="row">
        <SuggestionList />
        <SuggestionThread />
      </Stack>
    </Container>
  );
};
