// Sidebar.tsx
import React from "react"
import { Link } from "react-router-dom"
import menu from "../assets/menu_w.png"
interface SidebarProps {
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedOption,
  setSelectedOption,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div
      className={`w-1/4 bg-gray-800 p-4 text-white ${
        sidebarOpen ? "fixed h-full" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <img src={menu} className="w-8 test-white" alt="" />
        </button>
      </div>
      <ul>
        <li
          className={`cursor-pointer mb-2 ${
            selectedOption === "dashboard" ? "text-green-500" : "text-white"
          }`}
          onClick={() => setSelectedOption("dashboard")}
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`cursor-pointer mb-2 ${
            selectedOption === "task" ? "text-green-500" : "text-white"
          }`}
          onClick={() => setSelectedOption("task")}
        >
          <Link to="/task">Task</Link>
        </li>

        <li
          className={`cursor-pointer mb-2 ${
            selectedOption === "profile" ? "text-green-500" : "text-white"
          }`}
          onClick={() => setSelectedOption("profile")}
        >
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
