import { ReactElement, useState } from "react"
import Sidebar from "../components/Sidebar"
import menu from "../assets/menu_b.png"
import Dashboard from "../features/tasks/components/DashBoard"

interface ChildenType {
  children: ReactElement | ReactElement[]
  page: string,
}

export const SidebarPage: React.FC<ChildenType> = ({ children, page }) => {
  const [selectedOption, setSelectedOption] = useState<string>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  return (
    <div className="flex h-[100vh]">
      <Sidebar
        selectedOption={page}
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

        {children}
      </div>
    </div>
  )
}
