// frontend/src/pages/TodoPage.js
import React, { useState } from 'react';
import useTodos from '../hooks/useTodos'; // ✅ CORRECT for default export
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import TodoFilters from '../components/todo/TodoFilters';
import TodoStats from '../components/todo/TodoStats';
import '../styles/TodoPage.css';

const TodoPage = () => {
  const {
    todos,
    loading,
    stats,
    fetchTodos,
    searchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
  } = useTodos();

  const [currentFilter, setCurrentFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    fetchTodos(filter);
  };

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      searchTodos(keyword);
    } else {
      fetchTodos(currentFilter);
    }
  };

  const handleCreateTodo = async (todoData) => {
    const result = await createTodo(todoData);
    if (result?.success) {
      setShowForm(false);
      // Refresh the current view
      if (currentFilter === 'all') {
        fetchTodos('all');
      }
    }
    return result;
  };

  return (
    <div className="todo-page">
      <div className="todo-container">
        <div className="todo-header">
          <h1>My Todos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary add-todo-btn"
          >
            {showForm ? 'Cancel' : '+ Add Todo'}
          </button>
        </div>

        <TodoStats stats={stats} />

        {showForm && (
          <div className="todo-form-section">
            <TodoForm onSubmit={handleCreateTodo} />
          </div>
        )}

        <TodoFilters
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          currentFilter={currentFilter}
        />

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
};

export default TodoPage;
