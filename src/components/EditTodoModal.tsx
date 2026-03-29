import React, { useState, useEffect } from 'react';
import { Todo } from '../context/TodoContext';

interface EditTodoModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, newTitle: string) => Promise<void>;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
  }, [todo.title, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (title.trim() === '') return;
    setIsSaving(true);
    await onSave(todo.id, title);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Edit Task</h2>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field mb-6 w-full text-lg"
          autoFocus
        />
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="btn bg-white/10 hover:bg-white/20 text-white"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-primary"
            disabled={isSaving || title.trim() === ''}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
