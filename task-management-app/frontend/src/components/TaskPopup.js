import React, { useState } from 'react';

const TaskPopup = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
        };
        onSave(task ? { ...taskData, id: task.id } : taskData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{task ? 'Edit Task' : 'New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit">{task ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TaskPopup;