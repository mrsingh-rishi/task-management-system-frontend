# Task Management System

Welcome to the Task Management System! This application is designed to help you manage your tasks efficiently. Whether you need to keep track of personal to-dos or organize team projects, this system has got you covered. The system is built with a modern tech stack, combining the power of React.js for the frontend, NestJS for the backend, and various other tools for a seamless experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authentication](#authentication)
- [Database](#database)
- [Styling](#styling)

## Features

1. **Login/Signup:** Users can securely sign in or create a new account to access the full functionality of the Task Management System.

2. **Dashboard:** The dashboard provides an overview of all tasks, allowing users to easily manage and organize their workload. Users can also create new tasks directly from the dashboard.

3. **User Profile Page:** Users can view and edit their profiles, ensuring that personal information is up-to-date.

4. **Tasks Page:** This page allows users to filter tasks based on priority, helping them focus on what matters most.

5. **Task Filtering:** Users can efficiently filter tasks based on priority, ensuring that urgent tasks are addressed promptly.

## Tech Stack

- **Frontend:**
  - React.js
  - React Router DOM
  - Tailwind CSS
  - Redux for state management
  - TypeScript

- **Backend:**
  - NestJS
  - JSON Web Token (JWT) for authentication
  - MongoDB with Mongoose library for database
  - Bcrypt for password hashing

## Demo

Explore a live demo of the Task Management System:

- [Task Management System Demo](https://task-management-system-by-rishi.netlify.app/)


https://github.com/mrsingh-rishi/task-management-system-frontend/assets/59289499/ed9c59d2-93ea-4b6a-a31e-1c11032dcc38


Please note that this is a demo environment, and any data entered may be periodically reset.

## Backend Repository

The backend of the Task Management System is implemented in a separate repository. You can find the backend source code, documentation, and setup instructions in the following repository:

- [Task Management System Backend](https://github.com/mrsingh-rishi/task-management-system-backend)

## Backend Endpoints

### Auth Endpoints

- **Login:**
  - Endpoint: `/auth/login`
  - Method: `POST`
  - Description: Perform user login.

- **Signup:**
  - Endpoint: `/auth/signup`
  - Method: `POST`
  - Description: Register a new user.

### Tasks Endpoints

- **Get All Tasks:**
  - Endpoint: `/tasks`
  - Method: `GET`
  - Description: Retrieve all tasks.

- **Update Task by ID:**
  - Endpoint: `/tasks/:id`
  - Method: `PATCH`
  - Description: Update a specific task by ID.

- **Create Task:**
  - Endpoint: `/tasks`
  - Method: `POST`
  - Description: Create a new task.

### User Endpoints

- **Get User Data:**
  - Endpoint: `/users/`
  - Method: `GET`
  - Description: Retrieve user data.

- **Update User Data:**
  - Endpoint: `/users/`
  - Method: `POST`
  - Description: Update user data.

Feel free to explore and interact with these endpoints for authentication, task management, and user-related operations. Refer to the backend repository's documentation for detailed information on request payloads and responses.


## Getting Started

To get started with the Task Management System, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/mrsingh-rishi/task-management-system-frontend
   git clone https://github.com/mrsingh-rishi/task-management-system-backend
2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Configure the environment variables:
Create a .env file in the backend directory and add necessary configurations, including MongoDB connection string and JWT secret.

   ```bash
   # Run frontend
   cd ../client
   npm run dev
   # Run backend
   cd ../server
   npm run start:dev

## Usage

To access the Task Management System, open your web browser and navigate to [http://localhost:3000](http://localhost:3000). Log in or sign up to initiate effective task management.

## Authentication

The Task Management System incorporates JSON Web Token (JWT) for authentication. Users can securely log in and create accounts, ensuring the protection of their data.

## Database

The system utilizes MongoDB with the Mongoose library for efficient and flexible data storage.

## Styling

Tailwind CSS is employed for styling, offering a clean user interface.

