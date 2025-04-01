class TaskController {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }

    async createTask(req, res) {
        try {
            const taskData = req.body;
            const newTask = await this.taskModel.create(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedTask = await this.taskModel.update(id, updatedData);
            if (updatedTask) {
                res.status(200).json(updatedTask);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const deletedTask = await this.taskModel.delete(id);
            if (deletedTask) {
                res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    }

    async completeTask(req, res) {
        try {
            const { id } = req.params;
            const completedTask = await this.taskModel.complete(id);
            if (completedTask) {
                res.status(200).json(completedTask);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error completing task', error });
        }
    }
}

module.exports = TaskController;