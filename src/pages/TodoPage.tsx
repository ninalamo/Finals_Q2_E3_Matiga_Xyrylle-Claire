import React from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

const TodoPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Manage Your <span className="gradient-text">Goals</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Stay organized, focused, and achieve more with this simple yet powerful task manager.
        </p>
      </header>
      
      <div className="card shadow-2xl">
        <AddTodoForm />
        
        <div className="mt-8 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
