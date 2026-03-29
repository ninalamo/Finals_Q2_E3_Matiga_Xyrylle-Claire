# Finals_Q2 - Todo Management System Frontend

This is the React + Vite frontend for the Todo Management System.

## Features
- **Modern UI**: Built with React, Tailwind CSS, and Lucide React icons.
- **State Management**: Uses React Context API for themes and todo data.
- **Routing**: Implemented with `react-router-dom` for navigation between Tasks and About pages.
- **Form Handling**: Efficient forms with validation using `react-hook-form`.
- **API Synchronization**: Full CRUD operations connected to the `Finals_Q1` backend via Axios.
- **Technical Debt Resolved**:
  1. Fixed defective filter logic (ID vs Title mismatch) in `deleteTodo`.
  2. Fixed defective update logic (Filter used instead of Map) in `updateTodo`.
  3. Fixed defective reconciliation (Index used as key -> `todo.id` used as key) in `TodoList`.

## Setup & Execution
1. Ensure the Backend (Finals_Q1) is running on `http://localhost:5000` or `http://localhost:5074`.
2. Navigate to the `Finals_Q2` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`.

## Architectural Patterns
- **Context Provider Pattern**: For global state (Theme and Todos).
- **Custom Hooks**: Abstracting context access (`useTodos` and `useTheme`).
- **Component Decomposition**: Forms, Lists, Items, and Modals are separated for maintainability.
- **Immutability**: React state is updated immutably using `setTodos(prev => ...)`.
