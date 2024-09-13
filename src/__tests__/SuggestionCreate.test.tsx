import { fireEvent, render, screen } from '@testing-library/react';

import { SuggestionCreate } from '../components/SuggestionCreate';
import { useDataState } from '../hooks';

jest.mock('../hooks', () => ({
  useDataState: jest.fn(),
}));

const mockUseDataState = useDataState as jest.Mock;

describe('SuggestionCreate Component', () => {
  const mockAddNewSuggestion = jest.fn();
  const mockToggleModal = jest.fn();

  beforeEach(() => {
    mockUseDataState.mockReturnValue({
      isModalOpen: true,
      addNewSuggestion: mockAddNewSuggestion,
      toggleModal: mockToggleModal,
    });
  });

  it('should render the modal with input fields and submit button', () => {
    render(<SuggestionCreate />);

    const headlineElement = screen.getByText('Add Suggestion');
    const titleElement = screen.getByPlaceholderText('Enter your title...');
    const descriptionElement = screen.getByPlaceholderText(
      'Enter your description...'
    );
    const buttonElement = screen.getByText('SUBMIT');

    expect(headlineElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update state on input change', () => {
    render(<SuggestionCreate />);

    const titleElement = screen.getByPlaceholderText('Enter your title...');
    const descriptionElement = screen.getByPlaceholderText(
      'Enter your description...'
    );

    fireEvent.change(titleElement, {
      target: { value: 'This is a test title.' },
    });

    fireEvent.change(descriptionElement, {
      target: { value: 'This is a test description.' },
    });

    expect(titleElement).toHaveValue('This is a test title.');
    expect(descriptionElement).toHaveValue('This is a test description.');
  });

  it('should disable the submit button when title or description is empty', () => {
    render(<SuggestionCreate />);

    const submitButton = screen.getByText('SUBMIT');
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('Enter your title...'), {
      target: { value: 'This is a test title.' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your description...'), {
      target: { value: '' },
    });

    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('Enter your description...'), {
      target: { value: 'This is a test description.' },
    });

    expect(submitButton).toBeEnabled();
  });

  it('should call addNewSuggestion then reset fields and call toggleModal on submit', () => {
    const mockAddNewSuggestion = mockUseDataState().addNewSuggestion;
    const mockToggleModal = mockUseDataState().toggleModal;

    render(<SuggestionCreate />);

    const titleElement = screen.getByPlaceholderText('Enter your title...');
    const descriptionElement = screen.getByPlaceholderText(
      'Enter your description...'
    );

    fireEvent.change(titleElement, {
      target: { value: 'This is a test title.' },
    });

    fireEvent.change(descriptionElement, {
      target: { value: 'This is a test description.' },
    });

    fireEvent.click(screen.getByText('SUBMIT'));

    expect(mockAddNewSuggestion).toHaveBeenCalledWith({
      id: expect.any(String),
      author: 'Community Member',
      title: 'This is a test title.',
      description: 'This is a test description.',
      created_at: expect.any(Date),
      comments: [],
    });

    expect(titleElement).toHaveValue('');
    expect(descriptionElement).toHaveValue('');
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
