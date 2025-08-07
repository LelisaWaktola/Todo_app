import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService'; // ✅ correct
import { toast } from 'react-toastify';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // optionally call fetchTodos on load:
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    fetchTodos,
  };
}

export default useTodos;
