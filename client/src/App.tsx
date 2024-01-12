import "./App.css"
import { Login } from "./features/auth/components/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Singup } from "./features/auth/components/Signup"
import TaskListView from "./features/tasks/TaskList"
import UserProfile from "./features/user/UserProfile"
import { Home } from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singup",
    element: <Singup />,
  },
  {
    path: "/task",
    element: <TaskListView />,
  },
  {
    path: "/",
    element: <Home />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
