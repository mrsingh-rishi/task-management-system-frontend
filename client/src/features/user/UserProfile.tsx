// UserProfile.tsx
import React from "react"
import TaskItem, { Task } from "../../components/TaskItem"

interface User {
  name: string
  email: string
  tasksDone: number
  tasksDoneList: Task[] // Array of task names
}

const UserProfile: React.FC = () => {
  // Mock user data
  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    tasksDone: 10,
    tasksDoneList: [
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        status: "To Do",
        priority: "high",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        status: "In Progress",
        priority: "medium",
      },
    ],
  }

  return (
    <div className="mx-auto p-6 w-[60%] bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div>
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Total Tasks Done:</strong> {user.tasksDone}
        </p>
        <div className="mb-2">
          <strong>Tasks Done:</strong>

          {user.tasksDoneList.map((task, index) => (
            <TaskItem task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
