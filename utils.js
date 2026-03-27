// This file has some unused code

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// This function is never used but exported
export function calculateStats(todos) {
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };
}

// Dead code - old approach that was replaced
function oldAddTodo(list, item) {
  return [...list, item];
}
