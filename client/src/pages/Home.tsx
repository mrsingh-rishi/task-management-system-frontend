import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectAuthToken } from "../features/auth/authSlice"

export const Home = () => {
  return <Navigate to="/dashboard" />
}
