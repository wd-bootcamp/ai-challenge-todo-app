import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { formatDate, calculateStats } from './utils';
import TodoDetail from './TodoDetail.jsx';

export default function App() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: 'Build a Todo App', completed: false, createdAt: new Date().toISOString() },
    { id: 3, text: 'Master Claude Code', completed: false, createdAt: new Date().toISOString() },
  ]);

  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const debugVar = 'remove me'; // UNUSED VARIABLE

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo = {
      id: nanoid(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
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

  const listView = (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>My Todo List</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
        style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
      />

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
        {filteredTodos.map((todo) => (
          // BUG: Missing key prop - React will warn
          <li key={todo.id} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <span
              onClick={() => navigate(`/todo/${todo.id}`)}
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

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {todos.length === 0 ? 'No todos yet. Add one to get started!' : 'No todos match your search.'}
        </p>
      )}

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Total: {todos.length}
      </p>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={listView} />
      <Route
        path="/todo/:id"
        element={<TodoDetail todos={todos} onDelete={deleteTodo} onToggle={toggleComplete} />}
      />
    </Routes>
  );
}