// frontend/src/services/todoService.js
import apiClient from './apiClient';

export const todoService = {
  getAllTodos: () => {
    return apiClient.get('/todos');
  },

  getPendingTodos: () => {
    return apiClient.get('/todos/pending');
  },

  getCompletedTodos: () => {
    return apiClient.get('/todos/completed');
  },

  searchTodos: (keyword) => {
    return apiClient.get(`/todos/search?keyword=${encodeURIComponent(keyword)}`);
  },

  getTodoById: (id) => {
    return apiClient.get(`/todos/${id}`);
  },

  createTodo: (todoData) => {
    return apiClient.post('/todos', todoData);
  },

  updateTodo: (id, todoData) => {
    return apiClient.put(`/todos/${id}`, todoData);
  },

  toggleTodoStatus: (id) => {
    return apiClient.patch(`/todos/${id}/toggle`);
  },

  deleteTodo: (id) => {
    return apiClient.delete(`/todos/${id}`);
  },

  getTodoStats: () => {
    return apiClient.get('/todos/stats');
  }
};
