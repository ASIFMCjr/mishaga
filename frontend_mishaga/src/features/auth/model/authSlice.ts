import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authAPI from '../api/authApi'
import { Tokens } from 'shared/model'

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (fields: authAPI.SerializedFields) => {
    const res = await authAPI.login(fields)
    if (res.accessToken) localStorage.setItem('accessToken', res.accessToken)
    return res
  },
)

export const fetchSignUp = createAsyncThunk(
    'auth/fetchSignUp',
    async (fields: authAPI.SerializedFields) => {
      const res = await authAPI.signUp(fields)
      if (res.accessToken) localStorage.setItem('accessToken', res.accessToken)
      return res
    },
)

interface AuthState {
  entities: Tokens
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  entities: { accessToken: '', refreshToken: '' },
  loading: 'idle',
}

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.entities = action.payload
    }),
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
        state.entities = action.payload
    })
  },
})

export default authSlice.reducer