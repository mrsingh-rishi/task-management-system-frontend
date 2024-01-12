// UserProfile.tsx
import React from "react"

interface User {
  name: string
  email: string
  tasksDone: number
  tasksDoneList: string[] // Array of task names
}

const UserProfile: React.FC = () => {
  // Mock user data
  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    tasksDone: 10,
    tasksDoneList: [
      "Task 1",
      "Task 2",
      "Task 3",
      // Add more task names as needed...
    ],
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
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
          <ul className="list-disc ml-6">
            {user.tasksDoneList.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
