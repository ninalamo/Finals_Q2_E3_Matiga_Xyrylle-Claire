import { useContext } from 'react';
import { TodoContext, TodoContextType } from '../context/TodoContext';

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
