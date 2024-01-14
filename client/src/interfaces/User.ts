import { Task } from "../components/TaskItem"

export interface UserLogin {
  email: string
  password: string
}
export interface UserSignup {
  name: string
  email: string
  password: string
}

export interface UserData {
  userId: string
  name: string
  email: string
  tasks: Task[]
  completedTasks: Task[]
}
