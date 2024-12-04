import { createSlice } from "@reduxjs/toolkit"
import { User } from "../app/types"
import { userApi } from "../app/services/userApi"
import { RootState } from "../app/store"

interface InitialState {
  user: User | null
  users: User[] | null
  isAuthenticated: boolean
  current: User | null
  token?: string
}

const initialState: InitialState = {
  user: null,
  users: null,
  isAuthenticated: false,
  current: null,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const { logout, resetUser } = userSlice.actions
export default userSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectCurrent = (state: RootState) => state.user.current
export const selectUser = (state: RootState) => state.user.user
