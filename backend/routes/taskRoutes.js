const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Lấy danh sách công việc
router.get('/', getTasks);

// Thêm công việc
router.post('/', addTask);

// Cập nhật công việc
router.put('/:id', updateTask);

// Xóa công việc
router.delete('/:id', deleteTask);

module.exports = router;