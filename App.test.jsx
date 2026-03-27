import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
  });

  it('renders initial todos', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Claude Code')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Write tests');
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('adds a todo by pressing Enter', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Via Enter{Enter}');

    expect(screen.getByText('Via Enter')).toBeInTheDocument();
  });

  it('does not add an empty todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const countBefore = screen.getAllByRole('listitem').length;
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getAllByRole('listitem').length).toBe(countBefore);
  });

  it('clears the input after adding a todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);
    const input = screen.getByPlaceholderText('Add a new todo...');

    await user.type(input, 'New task');
    await user.click(screen.getByText('Add Todo'));

    expect(input).toHaveValue('');
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  it('navigates to detail view when clicking a todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const todo = screen.getByText('Learn React');
    await user.click(todo);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search todos...')).not.toBeInTheDocument();
  });

  it('shows empty state when all todos are deleted', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const deleteButtons = screen.getAllByText('Delete');
    for (const btn of deleteButtons) {
      await user.click(btn);
    }

    expect(screen.getByText('No todos yet. Add one to get started!')).toBeInTheDocument();
  });

  it('displays the total count', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  it('updates the total count after adding a todo', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Extra task');
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getByText('Total: 4')).toBeInTheDocument();
  });

  it('filters todos by search query', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'React');

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    expect(screen.queryByText('Master Claude Code')).not.toBeInTheDocument();
  });

  it('search is case-insensitive', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'react');

    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  it('shows no todos when search has no match', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText('Search todos...'), 'xyz');

    expect(screen.getByText('No todos match your search.')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('clears filter when search is cleared', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const searchInput = screen.getByPlaceholderText('Search todos...');
    await user.type(searchInput, 'React');
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();

    await user.clear(searchInput);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Claude Code')).toBeInTheDocument();
  });

  it('total count stays unchanged while searching', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    expect(screen.getByText('Total: 3')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Search todos...'), 'React');

    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });
});
