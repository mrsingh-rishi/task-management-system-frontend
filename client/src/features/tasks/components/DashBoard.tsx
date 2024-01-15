// Dashboard.tsx
import React, { useEffect, useState } from "react"
import TaskItem, { Task, Task2 } from "../../../components/TaskItem"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthToken } from "../../auth/authSlice"
import {
  FetchUserDataAsync,
  selectError,
  selectStatus,
  selectUserData,
} from "../../user/userSlice"
import { Loader } from "../../../components/Loader/Loader"
import { Navigate } from "react-router-dom"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { CreateTaskAsync, FetchAllTasksAsync, selectTasks } from "../taksSlice"

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")
  const token = useSelector(selectAuthToken)
  const storedToken = localStorage.getItem("authToken")
  const authError = useSelector(selectError)
  const userData = useSelector(selectUserData)
  const status = useSelector(selectStatus)
  const dispatch: AppDispatch = useDispatch()
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = e.target.value
    console.log(p)

    if (p === "high") {
      setPriority("high")
    } else if (p === " medium") {
      setPriority("medium")
    } else if (p === " low") {
      setPriority("low")
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token)
    }
  }, [token])

  // useEffect(() => {
  //   if (authError) {
  //     localStorage.removeItem("authToken")
  //   }
  // }, [authError])

  // if (authError) {
  //   return <Navigate to="/login" replace />
  // }

  const recentTasks: Task[] = userData.tasks

  // const tasksToDo: Task[] = userData.tasks

  const tasksInProgress: Task[] = userData.tasks

  const tasksCompleted: Task[] = userData.completedTasks

  const handleTaskCreate = (event: React.FormEvent) => {
    event.preventDefault()
    let taskData: Task2 = {
      title: title,
      description: desc,
      status: "todo",
      priority: priority,
    }
    if (token) dispatch(CreateTaskAsync({ taskData, token }))
    else if (storedToken) {
      dispatch(CreateTaskAsync({ taskData, token: storedToken }))
    }

    setTitle("")
    setDesc("")
  }
  const allTasks = useSelector(selectTasks)
  useEffect(() => {
    if (token) {
      dispatch(FetchUserDataAsync(token))
      dispatch(FetchAllTasksAsync(token))
    } else if (storedToken) {
      dispatch(FetchUserDataAsync(storedToken))
      dispatch(FetchAllTasksAsync(storedToken))
    }
  }, [dispatch, token])
  function calcTodoTasks(): Task[] {
    let todoTasks: Task[] = []
    allTasks.map((task) => {
      if (task.status === "todo") {
        todoTasks.push(task)
      }
    })
    return todoTasks
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
                <p className="text-xl font-bold">{allTasks.length}</p>
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
                <p className="text-xl font-bold">{calcTodoTasks().length}</p>
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
                {calcTodoTasks()?.map((task) => (
                  <li key={task._id} className="mb-2">
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
                  <li key={task._id} className="mb-2">
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
                  <li key={task._id} className="mb-2">
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
                <li key={task._id} className="mb-2">
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
                  onChange={handleTitleChange}
                  required
                />
              </label>
              <label className="block mb-2">
                Task Description:
                <textarea
                  className="border p-2 w-full"
                  name="description"
                  onCanPlay={handleDescChange}
                  required
                ></textarea>
              </label>
              <label className="block mb-2">
                Task Priority:
                <select
                  className="border p-2 w-full"
                  name="priority"
                  required
                  onChange={handlePriorityChange}
                >
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
