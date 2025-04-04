import React from 'react';

function TaskList({ tasks, onDelete, onEdit }) {
    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.title}</span>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;