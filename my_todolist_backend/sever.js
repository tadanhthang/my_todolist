import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbConfig, jwtSecret } from './config.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API đăng nhập
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`
            SELECT * FROM Users WHERE Username = ${username}
        `;
        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ error: 'Người dùng không tồn tại' });
        }

        // Kiểm tra xem cột Password có hợp lệ không
        if (!user.Password) {
            return res.status(500).json({ error: 'Dữ liệu mật khẩu không hợp lệ, vui lòng liên hệ quản trị hệ thống.' });
        }

        // So sánh mật khẩu người dùng nhập với mật khẩu đã được băm lưu trong cột Password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Sai mật khẩu' });
        }

        // Tạo token với thời hạn 1 ngày
        const token = jwt.sign({ userId: user.UserID }, jwtSecret, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi đăng nhập' });
    }
});

// API đăng ký người dùng
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu' });
    }
    try {
        await sql.connect(dbConfig);
        // Kiểm tra xem người dùng đã tồn tại chưa
        const checkUser = await sql.query`
            SELECT * FROM Users WHERE Username = ${username}
        `;
        if (checkUser.recordset[0]) {
            return res.status(400).json({ error: 'Người dùng đã tồn tại' });
        }

        // Mã hóa mật khẩu (sử dụng salt rounds = 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Chèn người dùng mới vào bảng Users, lưu mật khẩu vào cột Password
        await sql.query`
            INSERT INTO Users (Username, Password)
            VALUES (${username}, ${hashedPassword})
        `;
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).json({ error: 'Đăng ký thất bại' });
    }
});

// Middleware xác thực (JWT)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Không có token' });
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token không hợp lệ' });
        req.userId = decoded.userId;
        next();
    });
};

// API Lấy danh sách công việc của người dùng
app.get('/api/tasks', verifyToken, async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM Tasks WHERE UserID = ${req.userId}`;
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lấy danh sách công việc thất bại' });
    }
});

// API Thêm công việc mới (đã hỗ trợ thêm trường Priority)
app.post('/api/tasks', verifyToken, async (req, res) => {
    const { title, description, dueTime, priority } = req.body;
    try {
        const dueDate = new Date(dueTime);
        if (isNaN(dueDate.getTime())) {
            return res.status(400).json({ error: 'Định dạng ngày không hợp lệ' });
        }
        // Nếu không có giá trị priority nào được truyền lên, mặc định là 'medium'
        const taskPriority = priority || 'medium';

        await sql.connect(dbConfig);
        await sql.query`
            INSERT INTO Tasks (UserID, Title, Description, DueTime, Completed, Priority)
            VALUES (${req.userId}, ${title}, ${description}, ${dueDate}, ${false}, ${taskPriority})
        `;
        res.status(201).json({ message: 'Thêm công việc thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Thêm công việc thất bại' });
    }
});

// API Chỉnh sửa công việc
app.put('/api/tasks/:id', verifyToken, async (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueTime, completed, priority } = req.body;
    try {
        const dueDate = new Date(dueTime);
        if (isNaN(dueDate.getTime())) {
            return res.status(400).json({ error: 'Định dạng ngày không hợp lệ' });
        }
        // Nếu không có giá trị priority nào được truyền lên, mặc định là 'medium'
        const taskPriority = priority || 'medium';

        await sql.connect(dbConfig);
        await sql.query`
            UPDATE Tasks
            SET Title = ${title},
                Description = ${description},
                DueTime = ${dueDate},
                Completed = ${completed},
                Priority = ${taskPriority}
            WHERE TaskID = ${taskId} AND UserID = ${req.userId}
        `;
        res.json({ message: 'Cập nhật công việc thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Cập nhật công việc thất bại' });
    }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
    const taskId = req.params.id;
    try {
        await sql.connect(dbConfig);
        await sql.query`
            DELETE FROM Tasks
            WHERE TaskID = ${taskId} AND UserID = ${req.userId}
        `;
        res.json({ message: 'Xóa công việc thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa công việc:', error);
        res.status(500).json({ error: 'Xóa công việc thất bại' });
    }
});

app.listen(5000, () => console.log('Server chạy trên cổng 5000'));
