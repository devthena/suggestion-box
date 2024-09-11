import React, { useEffect } from 'react';

import {
  Card,
  CardContent,
  Container,
  Grid2,
  Divider,
  Avatar,
} from '@mui/material';

import { Comment } from '@mui/icons-material';

import { useDataState } from '../hooks';
import { Suggestion } from '../lib/types';
import { formatDate } from '../lib/utils';

export const App: React.FC = () => {
  const { suggestions, generateMockData } = useDataState();

  useEffect(() => {
    if (suggestions.size > 0) return;
    generateMockData();
  }, [suggestions.size, generateMockData]);

  if (!suggestions.size) return <main>Loading...</main>;

  return (
    <Container>
      <h1>Suggestion Box</h1>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          {[...suggestions.values()].map((suggestion: Suggestion) => (
            <Card key={suggestion.id}>
              <CardContent>
                <h2>{suggestion.title}</h2>
                <div>
                  <Avatar>{suggestion.author.id}</Avatar>
                  <p>{suggestion.author.name}</p>
                </div>
                <p>
                  {suggestion.comments.length} <Comment />
                </p>
                <Divider />
                Posted on {formatDate(suggestion.created_at)}
              </CardContent>
            </Card>
          ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};
