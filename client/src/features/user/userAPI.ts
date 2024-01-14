import { UserData } from "../../interfaces/User"

// A mock function to mimic making an async request for data
export function FetchUserData(token: string) {
  return new Promise<{ data: UserData }>(async (resolve) => {
    // console.log({token})
    const response = await fetch("http://localhost:8080/users/", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    resolve({ data })
  })
}
