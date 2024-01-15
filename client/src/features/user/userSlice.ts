import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { FetchUserData, UpdateUserData } from "./userAPI"
import { UserData } from "../../interfaces/User"
import { Task } from "../../components/TaskItem"

export interface UserState {
  userData: UserData
  status: "idle" | "loading" | "failed"
  error: boolean
}

export interface errorData {
  message: string
  error: string
  statusCode: number
}

const initialState: UserState = {
  userData: { userId: "", name: "", email: "", tasks: [], completedTasks: [] },
  status: "idle",
  error: false,
}

export const FetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (token: string) => {
    // console.log(token);
    const response = await FetchUserData(token)
    return response.data
  },
)

export const UpdateUserDataAsync = createAsyncThunk(
  "user/updateUser",
  async (Data: { userData: string[]; token: string, type: boolean }) => {
    // console.log(token);
    const response = await UpdateUserData(Data)
    return response.data
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(FetchUserDataAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(FetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userData = action.payload
      })
      .addCase(FetchUserDataAsync.rejected, (state) => {
        state.status = "failed"
        state.error = true
      })
      .addCase(UpdateUserDataAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(UpdateUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userData = action.payload
      })
      .addCase(UpdateUserDataAsync.rejected, (state) => {
        state.status = "failed"
        state.error = true
      })
  },
})

export const selectStatus = (state: RootState) => state.user.status
export const selectUserData = (state: RootState) => state.user.userData
export const selectError = (state: RootState) => state.user.error

export default userSlice.reducer
