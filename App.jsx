import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { formatDate } from './utils'; // UNUSED IMPORT

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Claude Code', completed: false },
  ]);

  const [input, setInput] = useState('');
  const debugVar = 'remove me'; // UNUSED VARIABLE

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
    // BUG: This doesn't actually delete the todo
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  useEffect(() => {
    console.log('Todos updated:', todos);
  }, [todos]);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My Todo List</h1>

      <div style={{ marginBottom: '20px' }}>
        {/* ACCESSIBILITY: Missing label for input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <button onClick={addTodo} style={{ width: '100%', padding: '8px' }}>
          Add Todo
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          // BUG: Missing key prop - React will warn
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

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Total: {todos.length}
      </p>
    </div>
  );
}