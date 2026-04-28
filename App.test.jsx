import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
  });

  it('renders initial todos', () => {
    render(<App />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Claude Code')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Write tests');
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('adds a todo by pressing Enter', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Via Enter{Enter}');

    expect(screen.getByText('Via Enter')).toBeInTheDocument();
  });

  it('does not add an empty todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const countBefore = screen.getAllByRole('listitem').length;
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getAllByRole('listitem').length).toBe(countBefore);
  });

  it('clears the input after adding a todo', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new todo...');

    await user.type(input, 'New task');
    await user.click(screen.getByText('Add Todo'));

    expect(input).toHaveValue('');
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  it('toggles a todo as completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const todo = screen.getByText('Learn React');
    expect(todo).toHaveStyle({ textDecoration: 'none' });

    await user.click(todo);
    expect(todo).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('shows empty state when all todos are deleted', async () => {
    const user = userEvent.setup();
    render(<App />);

    const deleteButtons = screen.getAllByText('Delete');
    for (const btn of deleteButtons) {
      await user.click(btn);
    }

    expect(screen.getByText('No todos yet. Add one to get started!')).toBeInTheDocument();
  });

  it('displays the total count', () => {
    render(<App />);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  it('updates the total count after adding a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Extra task');
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getByText('Total: 4')).toBeInTheDocument();
  });

  it('filters todos by search text', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'React');

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    expect(screen.queryByText('Master Claude Code')).not.toBeInTheDocument();
  });

  it('search is case-insensitive', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'REACT');

    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  it('shows all todos when search is cleared', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search todos...');
    await user.type(searchInput, 'React');
    await user.clear(searchInput);

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Claude Code')).toBeInTheDocument();
  });

  it('shows no matching message when search has no results', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'xyznotfound');

    expect(screen.getByText('No matching todos.')).toBeInTheDocument();
  });
});
