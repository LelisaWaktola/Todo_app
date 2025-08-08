// frontend/src/components/todo/TodoItem.js
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import '../../styles/TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const handleUpdate = async (formData) => {
    const result = await onUpdate(todo.id, formData);
    if (result?.success) {
      setIsEditing(false);
    }
    return result;
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <TodoForm
          todo={todo}
          onSubmit={handleUpdate}
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
            />
            <span className="checkmark"></span>
          </label>
          <h4 className="todo-title">{todo.title}</h4>
        </div>
        
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        
        <div className="todo-meta">
          <span className="todo-date">
            Created: {formatDate(todo.createdAt)}
          </span>
          {todo.updatedAt !== todo.createdAt && (
            <span className="todo-date">
              Updated: {formatDate(todo.updatedAt)}
            </span>
          )}
        </div>
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit"
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-delete"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
