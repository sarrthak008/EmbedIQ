import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: JSON.parse(localStorage.getItem("USER")) || null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem("USER", JSON.stringify(action.payload))
    },

    logout: (state) => {
      state.user = null
      localStorage.removeItem("USER")
    }

  }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
