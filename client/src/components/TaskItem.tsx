// TaskItem.tsx
import React from "react"

export interface Task {
  id: number
  title: string
  description: string
  status: string
  priority: "high" | "medium" | "low"
}

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => (
  <li className="mb-4 p-4 border rounded-lg shadow-md bg-white">
    <strong className="text-lg font-semibold mb-2">{task.title}</strong>
    <p className="text-gray-600 mb-2">{task.description}</p>
    <span className="text-gray-700">Status: {task.status}</span>
    <span className="ml-2 text-gray-700">Priority: {task.priority}</span>
  </li>
)

export default TaskItem
