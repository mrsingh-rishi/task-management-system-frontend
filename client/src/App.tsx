import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./features/auth/components/Login"
import Signup from "./features/auth/components/Signup"

import { SidebarPage } from "./pages/SidebarPage"
import Dashboard from "./features/tasks/components/DashBoard"
import TaskListView from "./features/tasks/components/TaskList"
import UserProfile from "./features/user/UserProfile"
import { Home } from "./pages/Home"
import { Protected } from "./features/auth/components/Protector"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <SidebarPage page="dashboard">
                  <Dashboard />
                </SidebarPage>
              </Protected>
            }
          />
          <Route
            path="/task"
            element={
              <Protected>
                <SidebarPage page="task">
                  <TaskListView />
                </SidebarPage>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <SidebarPage page="profile">
                  <UserProfile />
                </SidebarPage>
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
