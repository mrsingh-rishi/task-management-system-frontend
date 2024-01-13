import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./features/auth/components/Login"
import Signup from "./features/auth/components/Signup"
import Dashboard from "./features/tasks/components/Dashboard"
import TaskListView from "./features/tasks/components/TaskList"
import UserProfile from "./features/user/UserProfile"
import Sidebar from "./components/Sidebar"
import menu from "./assets/menu_b.png"

function App() {
  const [selectedOption, setSelectedOption] = useState<string>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  return (
    <div className="App">
      <Router>
        <div className="flex h-[100vh]">
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
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/task/*" element={<TaskListView />} />
              <Route path="/profile/*" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
