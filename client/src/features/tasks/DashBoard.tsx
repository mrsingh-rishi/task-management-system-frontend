// Dashboard.tsx
import React from "react"

interface Task {
  id: number
  title: string
  status: string
}

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const taskStats = {
    totalTasks: 20,
    tasksCompleted: 8,
    tasksInProgress: 5,
    tasksToDo: 7,
  }

  const recentTasks: Task[] = [
    { id: 1, title: "Task 1", status: "Completed" },
    { id: 2, title: "Task 2", status: "In Progress" },
    { id: 3, title: "Task 3", status: "To Do" },
    // Add more tasks as needed...
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Task Statistics */}
      <div className="bg-blue-200 p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Task Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xl font-bold">{taskStats.totalTasks}</p>
            <p>Total Tasks</p>
          </div>
          <div>
            <p className="text-xl font-bold">{taskStats.tasksCompleted}</p>
            <p>Tasks Completed</p>
          </div>
          <div>
            <p className="text-xl font-bold">{taskStats.tasksInProgress}</p>
            <p>Tasks In Progress</p>
          </div>
          <div>
            <p className="text-xl font-bold">{taskStats.tasksToDo}</p>
            <p>Tasks To Do</p>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-green-200 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Recent Tasks</h3>
        <ul>
          {recentTasks.map((task) => (
            <li key={task.id} className="mb-2">
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
