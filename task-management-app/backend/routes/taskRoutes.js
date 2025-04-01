const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

const taskController = new TaskController();

// Route to create a new task
router.post('/tasks', taskController.createTask);

// Route to update an existing task
router.put('/tasks/:id', taskController.updateTask);

// Route to delete a task
router.delete('/tasks/:id', taskController.deleteTask);

// Route to mark a task as completed
router.patch('/tasks/:id/complete', taskController.completeTask);

// Route to get all tasks
router.get('/tasks', taskController.getAllTasks);

// Route to get a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

module.exports = router;