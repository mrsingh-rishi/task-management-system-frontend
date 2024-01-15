import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { UserLogin, UserSignup } from "../../interfaces/User"
import { Login, Signup } from "./authAPI"

export interface AuthState {
  token: string
  status: "idle" | "loading" | "failed"
  error: boolean
}

const initialState: AuthState = {
  status: "idle",
  token: "",
  error: false,
}

export const SignupAsync = createAsyncThunk(
  "auth/Signup",
  async (userData: UserSignup) => {
    const response = await Signup(userData)
    return response.data?.token
  },
)

export const LoginAsync = createAsyncThunk(
  "auth/Login",
  async (userData: UserLogin) => {
    const response = await Login(userData)
    return response.data?.token
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add reset action if needed
    resetAuthState: (state) => {
      state.status = "idle"
      state.token = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignupAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(SignupAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.token = action.payload
      })
      .addCase(SignupAsync.rejected, (state) => {
        state.status = "failed"
        state.error = true
      })
      .addCase(LoginAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.token = action.payload
      })
      .addCase(LoginAsync.rejected, (state) => {
        state.status = "failed"
        state.error = true
      })
  },
})

export const { resetAuthState } = authSlice.actions

export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
