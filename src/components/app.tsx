import React, { useCallback, useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Divider,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Stack,
} from '@mui/material';

import { AddCircleOutline, Comment, Send } from '@mui/icons-material';

import { useDataState } from '../hooks';
import { Suggestion } from '../lib/types';
import { formatDate, generateId, getNameInitials } from '../lib/utils';

export const App: React.FC = () => {
  const [commentText, setCommentText] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');
  const [suggestionTitle, setSuggestionTitle] = useState('');

  const {
    selected,
    suggestions,
    addNewComment,
    addNewSuggestion,
    generateComment,
    generateMockData,
    generateSuggestion,
    selectSuggestion,
  } = useDataState();

  const handleCommentSend = useCallback(() => {
    if (!selected) return;

    const newComment = commentText.trim();
    if (newComment.length === 0) return;

    addNewComment({
      id: generateId(),
      sid: selected.id,
      author: 'Community Member',
      message: newComment,
      created_at: new Date(),
    });

    setCommentText('');
  }, [commentText, selected, addNewComment]);

  const handleCommentGenerate = () => {
    if (!selected) return;

    const newComment = generateComment(selected.id);
    addNewComment(newComment);
  };

  const handleSuggestionSend = useCallback(() => {
    const newSuggestionTitle = suggestionTitle.trim();
    const newSuggestionDescription = suggestionDescription.trim();

    if (
      newSuggestionTitle.length === 0 ||
      newSuggestionDescription.length === 0
    )
      return;

    addNewSuggestion({
      id: generateId(),
      author: 'Community Member',
      title: newSuggestionTitle,
      description: newSuggestionDescription,
      created_at: new Date(),
      comments: [],
    });

    setSuggestionTitle('');
    setSuggestionDescription('');
  }, [suggestionTitle, suggestionDescription, addNewSuggestion]);

  const handleSuggestionGenerate = () => {
    const newSuggestion = generateSuggestion();
    addNewSuggestion(newSuggestion);
  };

  const handleCommentKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      handleCommentSend();
    },
    [handleCommentSend]
  );

  useEffect(() => {
    if (suggestions.size > 0) return;
    generateMockData();
  }, [suggestions.size, generateMockData]);

  if (!suggestions.size) return <main>Loading...</main>;

  return (
    <Container>
      <Stack>
        <h1>Suggestion Box</h1>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            endIcon={<AddCircleOutline />}
            size="large">
            NEW SUGGESTION
          </Button>
          <Button onClick={handleSuggestionGenerate} size="small">
            Generate Suggestion
          </Button>
        </Stack>
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
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
        </Grid2>
        {selected && (
          <Grid2 size={6}>
            <Container>
              <div>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
              </div>
              <div>
                <h4>Comments:</h4>
                <Stack direction="row" spacing={2}>
                  <OutlinedInput
                    fullWidth
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={handleCommentKeyPress}
                    placeholder="Type your message..."
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleCommentSend} color="primary">
                          <Send />
                        </IconButton>
                      </InputAdornment>
                    }
                    value={commentText}
                  />
                  <Button onClick={handleCommentGenerate} size="small">
                    Generate Comment
                  </Button>
                </Stack>
                <Stack>
                  {[...selected.comments].reverse().map(comment => (
                    <div key={comment.id}>
                      <Avatar>{getNameInitials(comment.author)}</Avatar>
                      <h5>{comment.author}</h5>
                      {formatDate(comment.created_at)}
                      <p>{comment.message}</p>
                    </div>
                  ))}
                </Stack>
              </div>
            </Container>
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};
