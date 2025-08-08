import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService'; // ✅ correct
import { toast } from 'react-toastify';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

   const updateTodo = async (id, todoData) => {
    try {
      const response = await todoService.updateTodo(id, todoData);
      fetchTodos(); // Refresh list after update
      return response.data; // optionally return updated data
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
      return null;
    }
  };

  // Implement toggleTodo function
  const toggleTodo = async (id) => {
    setLoading(true);
    try {
      const response = await todoService.toggleTodoStatus(id);
      // Update local state after toggle
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? response.data : todo
        )
      );
    } catch (error) {
      toast.error('Failed to toggle todo status');
      console.error('Error toggling todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async (filter = 'all') => {
    setLoading(true);
    try {
      let response;
      switch (filter) {
        case 'pending':
          response = await todoService.getPendingTodos();
          break;
        case 'completed':
          response = await todoService.getCompletedTodos();
          break;
        default:
          response = await todoService.getAllTodos();
      }
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };
   const searchTodos = async (keyword) => {
    if (!keyword.trim()) {
      // If empty keyword, just fetch all todos
      fetchTodos();
      return;
    }

    setLoading(true);
    try {
      const response = await todoService.searchTodos(keyword);
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to search todos');
      console.error('Error searching todos:', error);
    } finally {
      setLoading(false);
    }
  };
  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      // After deletion, refresh the list
      fetchTodos();
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  // optionally call fetchTodos on load:
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    searchTodos,
    toggleTodo,
    deleteTodo,
    fetchTodos,
  };
}

export default useTodos;
