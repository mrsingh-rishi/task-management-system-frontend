import { Task, Task2 } from "../../components/TaskItem"

// A mock function to mimic making an async request for data
export function FetchAllTasks(token: string) {
  return new Promise<{ data: { allTasks: Task[] } }>(
    async (resolve, reject) => {
      try {
        const response = await fetch("http://localhost:8080/tasks/", {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          reject({
            error: "Failed to fetch user data",
            status: response.status,
          })
          return
        }
        const data = await response.json()

        resolve({ data })
      } catch (error) {
        console.log({ message: error })
      }
    },
  )
}

export function CreateTask(Data: { taskData: Task2; token: string }) {
  return new Promise<{ data: Task }>(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/tasks/", {
        method: "POST",
        body: JSON.stringify(Data.taskData),
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${Data.token}`,
        },
      })
      if (!response.ok) {
        reject({
          error: "Failed to fetch user data",
          status: response.status,
        })
        return
      }
      const data = await response.json()

      resolve({ data })
    } catch (error) {
      console.log({ message: error })
    }
  })
}

export function UpdateTask(Data: {
  taskData: Task
  taskId: string
  token: string
}) {
  return new Promise<{ data: Task }>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/tasks/${Data.taskId}`,
        {
          method: "PATCH",
          body: JSON.stringify(Data.taskData),
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${Data.token}`,
          },
        },
      )
      if (!response.ok) {
        reject({
          error: "Failed to fetch user data",
          status: response.status,
        })
        return
      }
      const data = await response.json()

      resolve({ data })
    } catch (error) {
      console.log({ message: error })
    }
  })
}
