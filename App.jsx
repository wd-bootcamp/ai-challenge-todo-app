import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Claude Code', completed: false },
  ]);

  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo = {
      id: nanoid(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My Todo List</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="todo-input" style={{ display: 'none' }}>New todo</label>
        <input
          id="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          aria-label="New todo"
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <button onClick={addTodo} style={{ width: '100%', padding: '8px' }}>
          Add Todo
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
        aria-label="Search todos"
        style={{ padding: '8px', width: '100%', marginBottom: '16px', boxSizing: 'border-box' }}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <span
              onClick={() => toggleComplete(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No todos yet. Add one to get started!
        </p>
      )}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No matching todos.
        </p>
      )}

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Total: {todos.length}
      </p>
    </div>
  );
}