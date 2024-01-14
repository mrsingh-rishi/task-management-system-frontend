import React, { ReactElement } from "react"
import { useSelector } from "react-redux"
import { selectAuthToken } from "../authSlice"
import { Navigate } from "react-router-dom"

interface ProtectedType {
  children: ReactElement | ReactElement[]
}

export const Protected: React.FC<ProtectedType> = ({ children }) => {
  const storedToken = localStorage.getItem("authToken")
  if (!storedToken) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}
