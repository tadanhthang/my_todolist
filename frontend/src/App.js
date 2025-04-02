import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskPopup from './components/TaskPopup';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { login, register } from './services/authService';
import { getTasks, addTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddOrEditTask = async (task) => {
    try {
      if (taskToEdit) {
        await updateTask(task.id, task);
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      } else {
        const newTask = await addTask(task);
        setTasks([...tasks, newTask]);
      }
      setShowPopup(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      console.log('Logged in user:', user);
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  const handleRegister = async (credentials) => {
    try {
      await register(credentials);
      alert('Registration successful! Please login.');
      setShowRegister(false);
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h1>Task Management App</h1>
      {!isLoggedIn ? (
        <div>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowRegister(true)}>Register</button>
        </div>
      ) : (
        <div>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={setTaskToEdit} />
          <button onClick={() => setShowPopup(true)}>Add Task</button>
        </div>
      )}
      {showPopup && (
        <TaskPopup
          onSave={handleAddOrEditTask}
          onClose={() => setShowPopup(false)}
          taskToEdit={taskToEdit}
        />
      )}
      {showLogin && <LoginForm onLogin={handleLogin} />}
      {showRegister && <RegisterForm onRegister={handleRegister} />}
    </div>
  );
}

export default App;