// Home.tsx
import { useState } from "react"
import TaskListView from "../features/tasks/components/TaskList"
import UserProfile from "../features/user/UserProfile"
import Dashboard from "../features/tasks/components/DashBoard"
import Sidebar from "../components/Sidebar"
import menu from "../assets/menu.png"
export const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

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
      <Sidebar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={`w-3/4 p-4 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Button to open the sidebar */}
        {!sidebarOpen && (
          <button
            className="text-black focus:outline-none fixed top-4 left-4"
            onClick={() => setSidebarOpen(true)}
          >
            <img src={menu} className="w-8" alt="" />
          </button>
        )}

        {renderComponent()}
      </div>
    </div>
  )
}
