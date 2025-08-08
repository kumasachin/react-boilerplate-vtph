import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
// import { axe, toHaveNoViolations } from 'jest-axe';
import { TodoForm } from '../TodoForm';
import { theme } from '../../styles/theme';
import { useTodoStore } from '../../store';

// expect.extend(toHaveNoViolations);

// Mock the store
vi.mock('../../store', () => ({
  useTodoStore: vi.fn(),
}));

const mockAddTodo = vi.fn();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TodoForm', () => {
  beforeEach(() => {
    mockAddTodo.mockClear();
    (useTodoStore as jest.MockedFunction<typeof useTodoStore>).mockReturnValue({
      addTodo: mockAddTodo,
    });
  });

  it('renders without crashing', () => {
    renderWithTheme(<TodoForm />);
    expect(screen.getByPlaceholderText('What do you need to do?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    renderWithTheme(<TodoForm />);

    // Basic accessibility checks for now
    expect(screen.getByLabelText('New todo item')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
  });

  it('allows user to type in the input field', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    await user.type(input, 'New todo item');

    expect(input).toHaveValue('New todo item');
  });

  it('submits form with valid input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    await user.type(input, 'Valid todo item');
    await user.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalledWith('Valid todo item');
    expect(input).toHaveValue(''); // Input should be cleared after submission
  });

  it('can submit form by pressing Enter', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');

    await user.type(input, 'Todo via Enter key');
    await user.keyboard('{Enter}');

    expect(mockAddTodo).toHaveBeenCalledWith('Todo via Enter key');
  });

  it('shows error for empty input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const submitButton = screen.getByRole('button', { name: 'Add Todo' });
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Come on, type something!');
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('shows error for input that is too short', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    await user.type(input, 'Hi');
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Make it at least 3 characters');
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('shows error for input that is too long', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    const longText = 'a'.repeat(101); // 101 characters
    await user.type(input, longText);
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Whoa there, keep it under 100 characters');
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    // First trigger an error
    await user.click(submitButton);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Then start typing
    await user.type(input, 'Valid todo');

    // Error should be cleared
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('trims whitespace from input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    await user.type(input, '   Trimmed todo   ');
    await user.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalledWith('Trimmed todo');
  });

  it('has proper ARIA labels and descriptions', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TodoForm />);

    const input = screen.getByPlaceholderText('What do you need to do?');
    expect(input).toHaveAttribute('aria-label', 'New todo item');

    // Test aria-describedby when there's an error
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });
    await user.click(submitButton); // This should trigger an error

    expect(input).toHaveAttribute('aria-describedby', 'todo-error');
  });
});
