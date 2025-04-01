const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Task;