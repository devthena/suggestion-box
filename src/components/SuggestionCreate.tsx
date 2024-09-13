import React, { useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';
import { Box, Button, Container, Modal, TextField } from '@mui/material';

import { useDataState } from '../hooks';
import { generateId } from '../lib/utils';

import styles from '../styles/create.module.scss';

/**
 * The modal component for users to create and submit new suggestions. It includes
 * input fields for a title and a description, and a submit button to send the
 * suggestion. Users can also submit the suggestion by pressing the "Enter" key.
 * @component
 */
export const SuggestionCreate: React.FC = () => {
  const { isModalOpen, addNewSuggestion, toggleModal } = useDataState();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const handleSend = useCallback(() => {
    addNewSuggestion({
      id: generateId(),
      author: 'Community Member',
      title: title.trim(),
      description: description.trim(),
      created_at: new Date(),
      comments: [],
    });

    setTitle('');
    setDescription('');
    toggleModal();
  }, [title, description, addNewSuggestion, toggleModal]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      if (!title.length || !description.length) return;

      event.preventDefault();
      handleSend();
    },
    [description.length, title.length, handleSend]
  );

  return (
    <Modal open={isModalOpen} onClose={toggleModal}>
      <Container className={styles.modal}>
        <h2>Add Suggestion</h2>
        <Box>
          <h3>Title</h3>
          <TextField
            fullWidth
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your title..."
            value={title}
            variant="outlined"
          />
          <h3>Description</h3>
          <TextField
            fullWidth
            multiline
            onChange={e => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your description..."
            rows={3}
            value={description}
            variant="outlined"
          />
        </Box>
        <Box className={styles.buttonGroup}>
          <Button
            className={styles.button}
            disabled={!title.length || !description.length}
            endIcon={<Send />}
            onClick={handleSend}
            variant="contained"
            size="medium">
            SUBMIT
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};
