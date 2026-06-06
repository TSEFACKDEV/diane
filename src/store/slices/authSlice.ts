import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id:    string
  email: string
  name:  string
  role:  'VISITOR' | 'ADMIN' | 'SUPER_ADMIN'
}

interface AuthState {
  user:          User | null
  token:         string | null
  isLoading:     boolean
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user:            null,
  token:           null,
  isLoading:       false,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user            = action.payload.user
      state.token           = action.payload.token
      state.isAuthenticated = true
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    logout(state) {
      state.user            = null
      state.token           = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, setLoading, logout } = authSlice.actions
export default authSlice.reducer