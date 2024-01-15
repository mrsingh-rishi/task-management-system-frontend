import { UserLogin, UserSignup } from "../../interfaces/User"

// A mock function to mimic making an async request for data
export function Signup(userData: UserSignup) {
  return new Promise<{ data: { token: string } }>(async (resolve) => {
    const response = await fetch("https://task-management-system-backend-production-993d.up.railway.app/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await response.json()

    resolve({ data })
  })
}

export function Login(userData: UserLogin) {
  return new Promise<{ data: { token: string } }>(async (resolve) => {
    const response = await fetch("https://task-management-system-backend-production-993d.up.railway.app/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    })
    const data = await response.json()
    resolve({ data })
  })
}
