import React from 'react';
import { Todo } from '../context/TodoContext';
import { useTodos } from '../hooks/useTodos';
import { CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <div className={`todo-list-item glass ${todo.completed ? 'opacity-70' : ''}`}>
      <div 
        className="flex items-center gap-4 cursor-pointer flex-1"
        onClick={() => toggleTodo(todo.id)}
      >
        <button className="text-primary hover:scale-110 transition-transform focus:outline-none">
          {todo.completed ? (
            <CheckCircle2 size={24} className="text-secondary" />
          ) : (
            <Circle size={24} />
          )}
        </button>
        <span className={`text-lg transition-all duration-300 ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(todo);
          }}
          className="p-2 text-text-muted hover:text-accent hover:bg-white/10 rounded-full transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
          }}
          className="p-2 text-text-muted hover:text-red-400 hover:bg-white/10 rounded-full transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
