import React from 'react';
import { Avatar, Chip, Stack } from '@mui/material';

import { Comment } from '../lib/types';
import { formatDate, getNameInitials } from '../lib/utils';

import styles from '../styles/comment.module.scss';

type CommentBoxProps = {
  comment: Comment;
  isOriginalAuthor: boolean;
};

export const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  isOriginalAuthor,
}) => {
  return (
    <Stack className={styles.comment}>
      <Stack alignItems="center" direction="row">
        <Avatar className={styles.avatar}>
          {getNameInitials(comment.author)}
        </Avatar>
        <h4>{comment.author}</h4>
        {isOriginalAuthor && (
          <Chip
            className={styles.chip}
            label="Author"
            variant="outlined"
            size="small"
          />
        )}
        <p className={styles.date}>{formatDate(comment.created_at)}</p>
      </Stack>
      <p>{comment.message}</p>
    </Stack>
  );
};
