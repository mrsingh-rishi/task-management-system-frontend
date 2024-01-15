import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectAuthToken } from "../features/auth/authSlice"

export const Home = () => {
  const storedToken = localStorage.getItem("authToken")
  if (storedToken) return <Navigate to="/dashboard" replace={true} />
  else return <Navigate to="/login" replace={true} />
}
