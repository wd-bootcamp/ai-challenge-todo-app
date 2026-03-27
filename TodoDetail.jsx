import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, calculateStats } from './utils.js';

export default function TodoDetail({ todos, onDelete, onToggle }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find(t => String(t.id) === id);

  if (!todo) {
    return (
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <p>Todo not found.</p>
        <button onClick={() => navigate('/')}>Back to list</button>
      </div>
    );
  }

  const stats = calculateStats(todos);

  const handleDelete = () => {
    onDelete(todo.id);
    navigate('/');
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Back
      </button>
      <h2>{todo.text}</h2>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>
        Status: <strong>{todo.completed ? 'Completed' : 'Active'}</strong>
      </p>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Created: {formatDate(new Date(todo.createdAt))}
      </p>
      <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '20px' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          <strong>Stats:</strong> Total: {stats.total} | Completed: {stats.completed} | Pending: {stats.pending}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
          onClick={handleToggle}
          style={{ flex: 1, padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Mark as {todo.completed ? 'Active' : 'Complete'}
        </button>
      </div>
      <button
        onClick={handleDelete}
        style={{ width: '100%', padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
}
