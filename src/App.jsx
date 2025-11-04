import React, { useState, useCallback, useMemo } from 'react';
import { Plus, Trash2, CheckCircle, Database } from 'lucide-react';
import { cleanTodoTitle } from './utils';

// --- MongoDB API Simulation ---
// In a real application, this URL would point to your Node/Express backend
// which handles the connection to the MongoDB cluster.
const BASE_API_URL = 'http://localhost:3008/api/todos';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Setup GitHub Repo', completed: true },
    { id: 2, title: 'Write unit tests', completed: false },
    { id: 3, title: 'Configure Vercel deployment', completed: false },
  ]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // Function to add a new todo, using the testable utility
  const addTodo = useCallback(() => {
    const cleanedTitle = cleanTodoTitle(newTodoTitle);
    
    if (cleanedTitle) {
      const newTodo = {
        id: Date.now(), // Use timestamp for unique ID in this demo
        title: cleanedTitle,
        completed: false,
      };
      // In a real app, you would send a POST request to BASE_API_URL here
      console.log(`[API CALL SIMULATION] POST to ${BASE_API_URL} with:`, newTodo);
      
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setNewTodoTitle('');
    }
  }, [newTodoTitle]);

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const removeTodo = useCallback((id) => {
    // In a real app, you would send a DELETE request here
    console.log(`[API CALL SIMULATION] DELETE from ${BASE_API_URL}/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // Compute number of tasks remaining
  const remainingTasks = useMemo(() => todos.filter(t => !t.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center flex items-center justify-center gap-3">
          <CheckCircle className="w-8 h-8"/> My Todo List
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 justify-between">
            <span className="flex items-center gap-1 font-semibold">
                <Database className="w-4 h-4 text-green-500"/> 
                Backend API: <code className="text-xs text-gray-600 truncate">{BASE_API_URL}</code>
            </span>
            <span className="font-medium text-indigo-500">
                {remainingTasks} tasks remaining
            </span>
        </div>

        {/* Input Field */}
        <div className="flex space-x-3">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add a new task..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            aria-label="New task title"
          />
          <button
            onClick={addTodo}
            className="p-3 bg-indigo-600 text-gray-500 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md flex items-center gap-1"
            aria-label="Add todo"
            disabled={!newTodoTitle.trim()}
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-lg transition duration-150 ${
                todo.completed
                  ? 'bg-green-50 border-l-4 border-green-500 opacity-70'
                  : 'bg-white shadow border border-gray-100'
              }`}
            >
              <span
                className={`flex-grow cursor-pointer text-gray-800 ${
                  todo.completed ? 'line-through text-gray-500 italic' : ''
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.title}
              </span>

              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`p-1 rounded-full ${
                    todo.completed 
                      ? 'text-gray-400 hover:text-green-600' 
                      : 'text-green-500 hover:text-green-700'
                  } transition duration-150`}
                  aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>

                <button
                  onClick={() => removeTodo(todo.id)}
                  className="p-1 rounded-full text-red-500 hover:text-red-700 transition duration-150"
                  aria-label="Delete todo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        {todos.length === 0 && (
            <p className="text-center text-gray-500 italic pt-4">No tasks yet! Time to add one.</p>
        )}
      </div>
    </div>
  );
}

export default App;
