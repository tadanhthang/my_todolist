document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const taskPopup = document.getElementById('task-popup');
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskNameInput = document.getElementById('task-name');
    const taskStatusInput = document.getElementById('task-status');

    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = '';
                data.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = `${task.name} - ${task.status}`;
                    taskItem.appendChild(createEditButton(task));
                    taskItem.appendChild(createDeleteButton(task.id));
                    taskList.appendChild(taskItem);
                });
            });
    }

    function createEditButton(task) {
        const button = document.createElement('button');
        button.textContent = 'Edit';
        button.onclick = () => openTaskPopup(task);
        return button;
    }

    function createDeleteButton(taskId) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.onclick = () => deleteTask(taskId);
        return button;
    }

    function openTaskPopup(task) {
        taskIdInput.value = task.id;
        taskNameInput.value = task.name;
        taskStatusInput.value = task.status;
        taskPopup.style.display = 'block';
    }

    function closeTaskPopup() {
        taskPopup.style.display = 'none';
        taskForm.reset();
    }

    function deleteTask(taskId) {
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        }).then(() => fetchTasks());
    }

    taskForm.onsubmit = function(event) {
        event.preventDefault();
        const taskId = taskIdInput.value;
        const method = taskId ? 'PUT' : 'POST';
        const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: taskNameInput.value,
                status: taskStatusInput.value
            })
        }).then(() => {
            closeTaskPopup();
            fetchTasks();
        });
    };

    document.getElementById('close-popup').onclick = closeTaskPopup;

    fetchTasks();
});