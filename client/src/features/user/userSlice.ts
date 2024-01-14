import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { FetchUserData } from "./userAPI"
import { UserData } from "../../interfaces/User"

export interface UserState {
  userData: UserData
  status: "idle" | "loading" | "failed"
}

const initialState: UserState = {
  userData: { userId: "", name: "", email: "", tasks: [], completedTasks: [] },
  status: "idle",
}

export const FetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (token: string) => {
    // console.log(token);
    const response = await FetchUserData(token)
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
      })
  },
})

export const selectStatus = (state: RootState) => state.user.status
export const selectUserData = (state: RootState) => state.user.userData

export default userSlice.reducer
