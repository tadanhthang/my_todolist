import React, { useEffect, useState } from 'react';
import TaskPopup from './TaskPopup';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setIsPopupOpen(true);
    };

    const handleDelete = async (taskId) => {
        await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
        fetchTasks();
    };

    const handleComplete = async (taskId) => {
        await fetch(`/api/tasks/${taskId}/complete`, { method: 'PATCH' });
        fetchTasks();
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentTask(null);
        fetchTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span>{task.title}</span>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        <button onClick={() => handleComplete(task.id)}>Complete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsPopupOpen(true)}>Add Task</button>
            {isPopupOpen && <TaskPopup task={currentTask} onClose={closePopup} />}
        </div>
    );
};

export default TaskList;