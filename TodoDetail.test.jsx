import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TodoDetail from './TodoDetail';

const mockTodos = [
  { id: 1, text: 'Learn React', completed: false, createdAt: new Date().toISOString() },
  { id: 2, text: 'Build a Todo App', completed: true, createdAt: new Date().toISOString() },
  { id: 3, text: 'Master Claude Code', completed: false, createdAt: new Date().toISOString() },
];

const renderTodoDetail = (id, todos = mockTodos, onDelete = () => {}, onToggle = () => {}) => {
  render(
    <MemoryRouter initialEntries={[`/todo/${id}`]}>
      <Routes>
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onDelete={onDelete} onToggle={onToggle} />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('TodoDetail', () => {
  it('renders todo text, status, and created date', () => {
    renderTodoDetail(1);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
  });

  it('displays completed status for a completed todo', () => {
    renderTodoDetail(2);
    const statusText = screen.getByText(/Status:/).textContent;
    expect(statusText).toContain('Completed');
  });

  it('renders stats from calculateStats', () => {
    renderTodoDetail(1);
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Pending: 2/)).toBeInTheDocument();
  });

  it('renders "Todo not found" when todo does not exist', () => {
    renderTodoDetail(999);
    expect(screen.getByText('Todo not found.')).toBeInTheDocument();
  });

  it('renders Back button', () => {
    renderTodoDetail(1);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('calls onToggle when Mark as Complete is clicked', async () => {
    const user = userEvent.setup();
    const onToggleMock = (id) => {};
    const toggleSpy = { called: false, id: null };
    const onToggleSpied = (id) => {
      toggleSpy.called = true;
      toggleSpy.id = id;
    };

    render(
      <MemoryRouter initialEntries={['/todo/1']}>
        <Routes>
          <Route
            path="/todo/:id"
            element={<TodoDetail todos={mockTodos} onDelete={() => {}} onToggle={onToggleSpied} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const toggleButton = screen.getByText(/Mark as/);
    await user.click(toggleButton);

    expect(toggleSpy.called).toBe(true);
    expect(toggleSpy.id).toBe(1);
  });

  it('shows Mark as Complete button for active todos', () => {
    renderTodoDetail(1);
    expect(screen.getByText('Mark as Complete')).toBeInTheDocument();
  });

  it('shows Mark as Active button for completed todos', () => {
    renderTodoDetail(2);
    expect(screen.getByText('Mark as Active')).toBeInTheDocument();
  });

  it('renders Delete button', () => {
    renderTodoDetail(1);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onDelete when Delete is clicked', async () => {
    const user = userEvent.setup();
    const deleteSpy = { called: false, id: null };
    const onDeleteSpied = (id) => {
      deleteSpy.called = true;
      deleteSpy.id = id;
    };

    render(
      <MemoryRouter initialEntries={['/todo/1']}>
        <Routes>
          <Route
            path="/todo/:id"
            element={<TodoDetail todos={mockTodos} onDelete={onDeleteSpied} onToggle={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);

    expect(deleteSpy.called).toBe(true);
    expect(deleteSpy.id).toBe(1);
  });
});
