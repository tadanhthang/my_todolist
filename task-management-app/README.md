# Task Management App

## Overview
This project is a personal task management application that allows users to manage their tasks effectively. Users can register, log in, create, update, delete, and complete tasks through a user-friendly interface.

## Features
- User authentication (registration and login)
- CRUD operations for tasks (Create, Read, Update, Delete)
- Mark tasks as complete
- Responsive design with a popup for task management

## Technologies Used
- **Backend**: Node.js, Express.js, SQL Server
- **Frontend**: HTML, CSS, JavaScript (React)
- **Database**: SQL Server

## Project Structure
```
task-management-app
├── backend
│   ├── controllers
│   │   └── taskController.js
│   ├── models
│   │   └── taskModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── app.js
│   └── config
│       └── dbConfig.js
├── frontend
│   ├── public
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── scripts.js
│   ├── src
│   │   ├── components
│   │   │   ├── LoginForm.js
│   │   │   ├── RegisterForm.js
│   │   │   ├── TaskPopup.js
│   │   │   └── TaskList.js
│   │   └── App.js
│   └── index.html
├── package.json
└── .env
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your database connection in the `.env` file.
4. Start the server:
   ```
   node app.js
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Usage
- Visit the application in your browser.
- Register a new account or log in with an existing account.
- Use the task management features to create, edit, delete, and complete tasks.

## License
This project is licensed under the MIT License.