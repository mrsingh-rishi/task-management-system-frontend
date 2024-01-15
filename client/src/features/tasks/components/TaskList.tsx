// TaskListView.tsx
import React, { useEffect, useState } from "react"
import { Task } from "../../../components/TaskItem"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { FetchAllTasksAsync, UpdateTaskAsync, selectTasks } from "../taksSlice"
import { selectAuthToken } from "../../auth/authSlice"
import { UpdateUserDataAsync, selectUserData } from "../../user/userSlice"

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

const TaskListView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const allTasks = useSelector(selectTasks)

  useEffect(() => {
    let inCompleTask: Task[] = allTasks.filter(
      (task) => task.status !== "completed",
    )
    setTasks(inCompleTask)
  }, [])

  const [filterPriority, setFilterPriority] = useState<
    "high" | "medium" | "low" | null
  >(null)
  const handlePriorityFilter = (priority: "high" | "medium" | "low" | null) => {
    setFilterPriority(priority)
  }

  const filteredTasks = filterPriority
    ? tasks.filter((task) => task.priority === filterPriority)
    : tasks

  return (
    <div className="flex">
      <div className="mx-auto w-[60%]">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>

        {/* Priority Filter */}
        <div className="mb-4">
          <label className="mr-2">Filter by Priority:</label>
          <select
            value={filterPriority || ""}
            onChange={(e) => {
              const p = e.target.value
              if (p === "high") {
                handlePriorityFilter("high" || null)
              } else if (p === "medium") {
                handlePriorityFilter("medium" || null)
              } else if (p === "low") {
                handlePriorityFilter("low" || null)
              }
            }}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  )
}

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [tStatus, setStatus] = useState<"todo" | "in progress" | "completed">(
    task.status,
  )
  const token = useSelector(selectAuthToken)
  const storedToken = localStorage.getItem("authToken")
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector(selectUserData)
  const handleTaskStatusChange = (
    status: "in progress" | "todo" | "completed",
  ) => {
    const newTask: Task = { ...task, status }
    task = { ...task, status }
    setStatus(status)
    if (token) {
      dispatch(
        UpdateTaskAsync({
          taskData: newTask,
          taskId: newTask._id,
          token,
        }),
      )
      if (status === "in progress") {
        let userData: string[] = []
        userData = user.tasks.map((task) => task._id)
        userData.push(newTask._id)

        dispatch(UpdateUserDataAsync({ userData, token, type: true }))
      } else if (status === "completed") {
        let userData: string[] = []
        userData = user.completedTasks.map((task) => task._id)
        userData.push(newTask._id)

        dispatch(UpdateUserDataAsync({ userData, token, type: false }))
      }
    } else if (storedToken) {
      dispatch(
        UpdateTaskAsync({
          taskData: task,
          taskId: task._id,
          token: storedToken,
        }),
      )
      if (status === "in progress") {
        let userData: string[] = []
        userData = user.tasks.map((task) => task._id)
        userData.push(newTask._id)
        dispatch(
          UpdateUserDataAsync({ userData, token: storedToken, type: true }),
        )
      } else if (status === "completed") {
        let userData: string[] = []
        // remove task from user.tasks
        // task to remove newTask
        userData = user.completedTasks.map((task) => task._id)
        userData.push(newTask._id)

        dispatch(
          UpdateUserDataAsync({
            userData,
            token: storedToken,
            type: false,
          }),
        )
      }
    }
  }

  return (
    <li className="mb-4 p-4 border rounded-lg shadow-md bg-white">
      <strong className="text-lg font-semibold mb-2">{task.title}</strong>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <span className="text-gray-700">Status: {tStatus}</span>
      <span className="ml-2 text-gray-700">Priority: {task.priority}</span>
      <div className="mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          onClick={() => handleTaskStatusChange("in progress")}
          disabled={tStatus === "in progress"}
        >
          Start
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleTaskStatusChange("completed")}
        >
          Complete
        </button>
      </div>
    </li>
  )
}

export default TaskListView
