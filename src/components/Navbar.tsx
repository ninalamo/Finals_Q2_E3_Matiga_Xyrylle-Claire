import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ListTodo, Info } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="text-primary w-8 h-8" />
          <span className="text-2xl font-bold gradient-text">TodoMaster</span>
        </div>
        
        <div className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-2 font-medium transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'}`
            }
          >
            <ListTodo size={20} /> Tasks
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `flex items-center gap-2 font-medium transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'}`
            }
          >
            <Info size={20} /> About
          </NavLink>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-accent"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
