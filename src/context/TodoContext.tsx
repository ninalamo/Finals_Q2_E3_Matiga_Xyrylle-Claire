import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = 'http://localhost:5003/api/todos'; // Update to port 5003 based on user environment

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Todo[]>(API_URL);
      setTodos(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const res = await axios.post<Todo>(API_URL, { title, completed: false });
      // Correct immutability pattern
      setTodos(prev => [...prev, res.data]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedData = { ...todo, ...updates };
      await axios.put(`${API_URL}/${id}`, updatedData);

      setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };


  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const newStatus = !todo.completed;
      await updateTodo(id, { completed: newStatus });
      
      // Bonus: Shadow Archive (Ghosting)
      if (newStatus) {
        setTimeout(async () => {
          try {
            await deleteTodo(id);
          } catch (e) {
            console.error("Ghosting deletion failed", e);
          }
        }, 15000); // 15 seconds
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      fetchTodos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodoProvider');
  return context;
};
