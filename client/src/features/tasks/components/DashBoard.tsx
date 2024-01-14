// Dashboard.tsx
import React, { useEffect } from "react"
import TaskItem, { Task } from "../../../components/TaskItem"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthToken } from "../../auth/authSlice"
import {
  FetchUserDataAsync,
  selectStatus,
  selectUserData,
} from "../../user/userSlice"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { Loader } from "../../../components/Loader/Loader"

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

const Dashboard: React.FC = () => {
  // Store token in LocalStorage
  const token = useSelector(selectAuthToken)
  useEffect(() => {
    if (token) {
      // console.log({ token, message: "token stored" })

      localStorage.setItem("authToken", token)
    }
  }, [])
  const dispatch: AppDispatch = useDispatch()
  const userData = useSelector(selectUserData)
  const status = useSelector(selectStatus)
  const storedToken = localStorage.getItem("authToken")
  // console.log(storedToken)

  // Fetching User Data
  useEffect(() => {
    if (storedToken) dispatch(FetchUserDataAsync(storedToken))
  }, [])
  // Mock data for demonstration
  const taskStats = {
    totalTasks: 20,
    tasksCompleted: 8,
    tasksInProgress: 5,
    tasksToDo: 7,
  }

  const recentTasks: Task[] = userData.tasks

  // Mock data for task lists by status
  const tasksToDo: Task[] = userData.tasks

  const tasksInProgress: Task[] = userData.tasks

  const tasksCompleted: Task[] = userData.completedTasks

  const handleTaskCreate = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Task created!")
  }

  return (
    <div>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          {/* Task Statistics */}
          <div className="bg-gray-200 p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Task Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xl font-bold">{taskStats.totalTasks}</p>
                <p>Total Tasks</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {tasksCompleted ? tasksCompleted.length : "0"}
                </p>
                <p>Tasks Completed</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {tasksInProgress ? tasksInProgress.length : "0"}
                </p>
                <p>Tasks In Progress</p>
              </div>
              <div>
                <p className="text-xl font-bold">{taskStats.tasksToDo}</p>
                <p>Tasks To Do</p>
              </div>
            </div>
          </div>

          {/* Task Lists by Status */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tasks by Status</h3>

            {/* To Do List */}
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="text-md font-semibold mb-2">To Do</h4>

              <ul>
                {tasksToDo?.map((task) => (
                  <li key={task.id} className="mb-2">
                    <TaskItem task={task} />
                  </li>
                ))}
              </ul>
            </div>

            {/* In Progress List */}
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="text-md font-semibold mb-2">In Progress</h4>
              <ul>
                {tasksInProgress?.map((task) => (
                  <li key={task.id} className="mb-2">
                    <TaskItem task={task} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Completed List */}
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="text-md font-semibold mb-2">Completed</h4>
              <ul>
                {tasksCompleted?.map((task) => (
                  <li key={task.id} className="mb-2">
                    <TaskItem task={task} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-gray-200 p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Recent Tasks</h3>
            <ul>
              {recentTasks?.map((task) => (
                <li key={task.id} className="mb-2">
                  <strong>{task.title}</strong> - {task.status}
                </li>
              ))}
            </ul>
          </div>

          {/* Task Creation Form */}
          <div className="bg-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Create New Task</h3>
            <form onSubmit={handleTaskCreate}>
              <label className="block mb-2">
                Task Title:
                <input
                  type="text"
                  className="border p-2 w-full"
                  name="title"
                  required
                />
              </label>
              <label className="block mb-2">
                Task Description:
                <textarea
                  className="border p-2 w-full"
                  name="description"
                  required
                ></textarea>
              </label>
              <label className="block mb-2">
                Task Priority:
                <select className="border p-2 w-full" name="priority" required>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
