import { UserLogin, UserSignup } from "../../interfaces/User"

// A mock function to mimic making an async request for data
export function Signup(userData: UserSignup) {
  return new Promise<{ data: { token: string } }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
    const response = await fetch("http://localhost:8080/auth/login", {
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
