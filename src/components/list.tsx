import React from 'react';
import { Comment } from '@mui/icons-material';

import { Avatar, Card, CardContent, Container, Divider } from '@mui/material';

import { useDataState } from '../hooks';
import { Suggestion } from '../lib/types';
import { formatDate, getNameInitials } from '../lib/utils';

export const SuggestionList: React.FC = () => {
  const { suggestions, selectSuggestion } = useDataState();

  return (
    <Container>
      {[...suggestions.values()].reverse().map((suggestion: Suggestion) => (
        <Card
          key={suggestion.id}
          onClick={() => selectSuggestion(suggestion.id)}>
          <CardContent>
            <h2>{suggestion.title}</h2>
            <div>
              <Avatar>{getNameInitials(suggestion.author)}</Avatar>
              <p>{suggestion.author}</p>
            </div>
            <p>
              {suggestion.comments.length} <Comment />
            </p>
            <Divider />
            Posted on {formatDate(suggestion.created_at)}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};
