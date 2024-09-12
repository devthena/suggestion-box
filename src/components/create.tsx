import React, { useCallback, useState } from 'react';
import { Send } from '@mui/icons-material';
import { Box, Button, Container, Modal, TextField } from '@mui/material';

import { useDataState } from '../hooks';
import { generateId } from '../lib/utils';

export const SuggestionCreate: React.FC = () => {
  const { isModalOpen, addNewSuggestion, toggleModal } = useDataState();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const handleSuggestionSend = useCallback(() => {
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

  return (
    <Modal open={isModalOpen} onClose={toggleModal}>
      <Container>
        <h1>Add Suggestion</h1>
        <Box>
          <h2>Title</h2>
          <TextField
            fullWidth
            onChange={e => setTitle(e.target.value)}
            variant="outlined"
          />
          <h2>Description</h2>
          <TextField
            fullWidth
            multiline
            onChange={e => setDescription(e.target.value)}
            rows={5}
            variant="outlined"
          />
        </Box>
        <Button
          disabled={!title.length || !description.length}
          endIcon={<Send />}
          onClick={handleSuggestionSend}
          variant="contained"
          size="large">
          SUBMIT
        </Button>
      </Container>
    </Modal>
  );
};
