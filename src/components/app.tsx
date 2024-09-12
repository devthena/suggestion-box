import React, { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';

import { useDataState } from '../hooks';

import { SuggestionList } from './list';
import { SuggestionThread } from './thread';

import styles from '../styles/app.module.scss';
import { Header } from './header';

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
