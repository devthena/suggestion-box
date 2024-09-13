import { render, screen } from '@testing-library/react';
import { CommentBox } from '../components/CommentBox';

import { Comment } from '../lib/types';
import { generateId } from '../lib/utils';

const comment: Comment = {
  id: generateId(),
  sid: generateId(),
  author: 'Angela Ziegler',
  message: 'This is a comment message.',
  created_at: new Date(),
};

describe('CommentBox Component', () => {
  it('should render the author avatar with initials', () => {
    render(<CommentBox comment={comment} isOriginalAuthor={false} />);

    const avatarElement = screen.getByText('AZ');
    expect(avatarElement).toBeInTheDocument();
  });

  it('should render the author name', () => {
    render(<CommentBox comment={comment} isOriginalAuthor={false} />);

    const authorElement = screen.getByText('Angela Ziegler');
    expect(authorElement).toBeInTheDocument();
  });

  it('should render the comment message', () => {
    render(<CommentBox comment={comment} isOriginalAuthor={false} />);

    const messageElement = screen.getByText('This is a comment message.');
    expect(messageElement).toBeInTheDocument();
  });
});
