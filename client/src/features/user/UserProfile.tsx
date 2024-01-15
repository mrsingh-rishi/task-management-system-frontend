// UserProfile.tsx
import React from "react"
import TaskItem, { Task } from "../../components/TaskItem"
import { useSelector } from "react-redux"
import { selectUserData } from "./userSlice"

interface User {
  name: string
  email: string
  tasksDone: number
  tasksDoneList: Task[] // Array of task names
}

const UserProfile: React.FC = () => {
  // Mock user data
  const user = useSelector(selectUserData)

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
          <strong>Total Tasks Done:</strong> {user.completedTasks.length}
        </p>
        <div className="mb-2">
          <strong>Tasks Done:</strong>

          {user.completedTasks &&
            user.completedTasks.map((task, index) => <TaskItem task={task} />)}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
