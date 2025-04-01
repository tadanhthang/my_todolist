import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskList from './components/TaskList';
import TaskPopup from './components/TaskPopup';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks();
        }
    }, [isAuthenticated]);

    const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const toggleTaskPopup = () => {
        setShowTaskPopup(!showTaskPopup);
    };

    return (
        <div className="App">
            {isAuthenticated ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={toggleTaskPopup}>Add Task</button>
                    <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                    {showTaskPopup && <TaskPopup toggleTaskPopup={toggleTaskPopup} fetchTasks={fetchTasks} />}
                </>
            ) : (
                <>
                    <LoginForm onLogin={handleLogin} />
                    <RegisterForm />
                </>
            )}
        </div>
    );
}

export default App;