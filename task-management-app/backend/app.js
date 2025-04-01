const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = require('mssql');
db.connect(dbConfig)
    .then(() => console.log('Connected to SQL Server'))
    .catch(err => console.error('Database connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});