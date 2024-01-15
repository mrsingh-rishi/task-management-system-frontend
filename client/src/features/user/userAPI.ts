import { Task } from "../../components/TaskItem"
import { UserData } from "../../interfaces/User"

// A mock function to mimic making an async request for data
export function FetchUserData(token: string) {
  return new Promise<{
    data: UserData
  }>(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://task-management-system-backend-production-993d.up.railway.app/users/",
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        // Check if the response status is not OK (e.g., 404 Not Found, 500 Internal Server Error)
        reject({ error: "Failed to fetch user data", status: response.status })
        return
      }

      const data = await response.json()
      resolve({ data })
    } catch (error) {
      console.log(error)
      reject({ error: "An error occurred while fetching user data" })
    }
  })
}

export function UpdateUserData(Data: {
  userData: string[]
  token: string
  type: boolean
}) {
  return new Promise<{
    data: UserData
  }>(async (resolve, reject) => {
    try {
      let reqBody
      if (Data.type) {
        reqBody = { tasks: Data.userData }
      } else {
        reqBody = { completedTasks: Data.userData }
      }
      const response = await fetch(
        "https://task-management-system-backend-production-993d.up.railway.app/users/",
        {
          method: "PATCH",
          body: JSON.stringify(reqBody),
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${Data.token}`,
          },
        },
      )

      if (!response.ok) {
        // Check if the response status is not OK (e.g., 404 Not Found, 500 Internal Server Error)
        reject({ error: "Failed to fetch user data", status: response.status })
        return
      }

      const data = await response.json()
      resolve({ data })
    } catch (error) {
      console.log(error)
      reject({ error: "An error occurred while fetching user data" })
    }
  })
}
