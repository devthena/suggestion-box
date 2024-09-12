import React, { useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';

import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from '@mui/material';

import { useDataState } from '../hooks';
import { formatDate, generateId, getNameInitials } from '../lib/utils';

export const SuggestionThread: React.FC = () => {
  const { selected, addNewComment, generateComment } = useDataState();

  const [commentText, setCommentText] = useState('');

  const handleCommentGenerate = () => {
    if (!selected) return;

    const newComment = generateComment(selected.id);
    addNewComment(newComment);
  };

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

  const handleCommentKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      handleCommentSend();
    },
    [handleCommentSend]
  );

  if (!selected) return null;

  return (
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
  );
};
