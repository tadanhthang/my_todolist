const { poolPromise } = require('../config/dbConfig');

// Lấy danh sách công việc
const getTasks = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Tasks');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Thêm công việc
const addTask = async (req, res) => {
    const { text, datetime, notified } = req.body; // Sử dụng các cột hiện có trong bảng

    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('text', text)
            .input('datetime', datetime)
            .input('notified', notified)
            .query('INSERT INTO Tasks (text, datetime, notified) VALUES (@text, @datetime, @notified)');

        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Cập nhật công việc
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('id', id)
            .input('title', title)
            .input('description', description)
            .query('UPDATE Tasks SET title = @title, description = @description WHERE id = @id');

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Xóa công việc
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        await pool.request().input('id', id).query('DELETE FROM Tasks WHERE id = @id');

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };