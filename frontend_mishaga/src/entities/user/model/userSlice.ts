import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isLogged } from 'shared/model';
import * as userAPI from '../api/userApi'
import { sendPhoto } from 'pages/profile/api';

export interface User {
  id: number;
  password: string;
  fio: string;
  email: string;
  city: string;
  community: string;
  room?: number;
  refresh: string;
  profileImage?: string;
}

export interface CreateUser extends Omit<User, 'id'> {}

export interface UpdateUser extends Partial<CreateUser> {}


interface UserState {
  entities: User | null;
  isAuth: boolean
}

const initialState: UserState = {
  entities: null,
  isAuth: false
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => await userAPI.getUser(),
)

export const fetchUpdateUserImage = createAsyncThunk(
  'user/fetchUpdateUserImage',
  async (formData: FormData) => await sendPhoto(formData),
)

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (data: UpdateUser) => await userAPI.updateUser(data) 
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => { state.isAuth = action.payload || false; isLogged.set(action.payload) }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.entities = action.payload
    }),
    builder.addCase(fetchUpdateUserImage.fulfilled, (state, action) => {
      state.entities = action.payload
    }),
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.entities = action.payload
    })
  },
})

export const { setIsAuth } = userSlice.actions
export default userSlice.reducer