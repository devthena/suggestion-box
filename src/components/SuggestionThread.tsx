import React, { useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';

import {
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from '@mui/material';

import { useDataState } from '../hooks';
import { generateId } from '../lib/utils';

import { CommentBox } from './CommentBox';

import styles from '../styles/thread.module.scss';

export const SuggestionThread: React.FC = () => {
  const { selected, addNewComment } = useDataState();

  const [commentText, setCommentText] = useState('');

  const handleSend = useCallback(() => {
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

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      event.preventDefault();
      handleSend();
    },
    [handleSend]
  );

  if (!selected) return null;

  return (
    <Container className={styles.thread}>
      <Stack className={styles.suggestion}>
        <h2>{selected.title}</h2>
        <p>{selected.description}</p>
      </Stack>
      <Stack>
        <h3>Comments:</h3>
        <Stack direction="row" spacing={2}>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSend} color="primary">
                  <Send />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your comment..."
            value={commentText}
          />
        </Stack>
        <Stack>
          {[...selected.comments].reverse().map(comment => {
            const isOriginalAuthor = selected.author === comment.author;

            return (
              <CommentBox
                comment={comment}
                isOriginalAuthor={isOriginalAuthor}
                key={comment.id}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};
