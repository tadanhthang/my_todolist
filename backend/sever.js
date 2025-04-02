const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000', // URL của frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Nếu cần gửi cookie
};
app.use(cors(corsOptions));
app.use(express.json()); // Xử lý dữ liệu JSON từ req.body
app.use(bodyParser.urlencoded({ extended: true })); // Nếu bạn cần xử lý dữ liệu từ form

// Routes
app.use('/api', require('./routes/authRoutes')); // Đảm bảo route được cấu hình đúng
app.use('/api/tasks', require('./routes/taskRoutes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});