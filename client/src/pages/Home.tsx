import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectAuthToken } from "../features/auth/authSlice"

export const Home = () => {
  const storedToken = localStorage.getItem("authToken")
  const token = useSelector(selectAuthToken)
  if (storedToken || token) return <Navigate to="/dashboard" replace={true} />
  else return <Navigate to="/login" replace={true} />
}
