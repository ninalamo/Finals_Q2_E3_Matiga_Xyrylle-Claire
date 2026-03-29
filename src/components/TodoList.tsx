import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import EditTodoModal from './EditTodoModal';
import { Todo } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const { todos, loading, error, updateTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = async (id: string, newTitle: string) => {
    await updateTodo(id, { title: newTitle });
  };

  if (loading) return <div className="text-center py-10 text-text-muted animate-pulse">Loading tasks...</div>;
  if (error) return <div className="text-center py-10 text-red-500 bg-red-500/10 rounded-xl">{error}</div>;

  return (
    <>
      <div className="space-y-1">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-text-muted glass rounded-xl">
            <p className="text-xl mb-2">No tasks yet.</p>
            <p className="opacity-70">Add a task above to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          isOpen={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default TodoList;
