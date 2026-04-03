import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTodos } from '../hooks/useTodos';
import { PlusCircle } from 'lucide-react';

interface FormInputs {
  title: string;
}

const AddTodoForm: React.FC = () => {
  const { addTodo, todos } = useTodos();
  const activeCount = todos.filter(t => !t.completed).length;
  const isMaxCapacity = activeCount >= 5;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.title.trim()) {
      await addTodo(data.title);
      reset();
    }
  };



  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex flex-col gap-2 relative">
        <div className="flex gap-4">
          <input
            {...register('title', { required: isMaxCapacity ? false : 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
            placeholder={isMaxCapacity ? "Capacity Reached" : "What needs to be done?"}
            className={`input-field flex-1 px-4 py-3 text-lg ${isMaxCapacity ? 'opacity-50 cursor-not-allowed' : ''}`}
            autoComplete="off"
            disabled={isMaxCapacity}
          />
          <button type="submit" className={`btn btn-primary px-8 ${isMaxCapacity ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isMaxCapacity}>
            <PlusCircle size={20} />
            Add Task
          </button>
        </div>
        {isMaxCapacity ? (
          <span className="text-yellow-500 text-sm absolute -bottom-6 left-2 font-bold animate-pulse">
            ⚠️ Focus-Flow: Max 5 active tasks reached. Complete a task first!
          </span>
        ) : errors.title && (
          <span className="text-red-400 text-sm absolute -bottom-6 left-2">{errors.title.message}</span>
        )}
      </div>
    </form>
  );
};

export default AddTodoForm;
