import React, { useState, useEffect } from 'react';

function TaskPopup({ onSave, onClose, taskToEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: taskToEdit?.id || Date.now(), title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <div className="popup">
            <form onSubmit={handleSubmit}>
                <h3>{taskToEdit ? 'Edit Task' : 'Add Task'}</h3>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default TaskPopup;