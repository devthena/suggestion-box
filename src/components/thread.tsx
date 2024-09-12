import React, { useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';

import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from '@mui/material';

import { useDataState } from '../hooks';
import { generateId } from '../lib/utils';

import { CommentBox } from './comment';

import styles from '../styles/thread.module.scss';

export const SuggestionThread: React.FC = () => {
  const { selected, addNewComment, generateComment } = useDataState();

  const [commentText, setCommentText] = useState('');

  const handleGenerate = () => {
    if (!selected) return;

    const newComment = generateComment(selected.id);
    addNewComment(newComment);
  };

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
      <div>
        <h3>Comments:</h3>
        <Stack direction="row" spacing={2}>
          <OutlinedInput
            fullWidth
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your comment..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSend} color="primary">
                  <Send />
                </IconButton>
              </InputAdornment>
            }
            value={commentText}
          />
          <Button
            className={styles.button_light}
            onClick={handleGenerate}
            size="small">
            Generate Comment
          </Button>
        </Stack>
        <Stack>
          {[...selected.comments].reverse().map(comment => {
            const isOriginalAuthor = selected.author === comment.author;

            return (
              <CommentBox
                comment={comment}
                isOriginalAuthor={isOriginalAuthor}
              />
            );
          })}
        </Stack>
      </div>
    </Container>
  );
};
