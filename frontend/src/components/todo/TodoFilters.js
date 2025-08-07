// frontend/src/components/todo/TodoFilters.js
import React, { useState } from 'react';
import '../../styles/TodoFilters.css';

const TodoFilters = ({ onFilterChange, onSearch, currentFilter = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filter) => {
    onFilterChange(filter);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="todo-filters">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange('all')}
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('pending')}
          className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
        >
          Pending
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilters;
