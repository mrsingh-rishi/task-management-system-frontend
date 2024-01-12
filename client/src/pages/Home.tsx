import { useState } from "react"
import TaskListView from "../features/tasks/TaskList"
import UserProfile from "../features/user/UserProfile"
import Dashboard from "../features/tasks/DashBoard"

export const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string>("dashboard")

  const renderComponent = () => {
    switch (selectedOption) {
      case "task":
        return <TaskListView />
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <UserProfile />
      default:
        return null
    }
  }

  return (
    <div className="flex h-[100vh] ">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
        <ul>
          <li
            className={`cursor-pointer mb-2 ${
              selectedOption === "task" ? "text-green-500" : "text-white"
            }`}
            onClick={() => setSelectedOption("task")}
          >
            Task
          </li>
          <li
            className={`cursor-pointer mb-2 ${
              selectedOption === "dashboard" ? "text-green-500" : "text-white"
            }`}
            onClick={() => setSelectedOption("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer mb-2 ${
              selectedOption === "profile" ? "text-green-500" : "text-white"
            }`}
            onClick={() => setSelectedOption("profile")}
          >
            Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">{renderComponent()}</div>
    </div>
  )
}
