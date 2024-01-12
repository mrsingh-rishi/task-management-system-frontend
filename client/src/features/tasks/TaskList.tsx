// TaskListView.tsx
import React, { useState } from "react"

interface Task {
  id: number
  title: string
  description: string
  status: string
  priority: "high" | "medium" | "low"
}

const TaskListView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
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
  ])

  const [filterPriority, setFilterPriority] = useState<string | null>(null)

  const handleTaskStatusChange = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    )
  }

  const handlePriorityFilter = (priority: string | null) => {
    setFilterPriority(priority)
  }

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks

  return (
    <div>
      <h2>Task List</h2>

      {/* Priority Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by Priority:</label>
        <select
          value={filterPriority || ""}
          onChange={(e) => handlePriorityFilter(e.target.value || null)}
        >
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`mb-4 p-4 border rounded ${getPriorityColor(
              task.priority,
            )}`}
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <span>Status: {task.status}</span>
            <span className="ml-2">Priority: {task.priority}</span>
            <div className="mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                onClick={() => handleTaskStatusChange(task.id, "In Progress")}
              >
                Start
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleTaskStatusChange(task.id, "Completed")}
              >
                Complete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-red-500"
    case "medium":
      return "border-yellow-500"
    case "low":
      return "border-green-500"
    default:
      return ""
  }
}

export default TaskListView
