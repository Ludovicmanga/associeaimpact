import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type UserType = {
  email: string
} | null;

const initialState: UserType = null as UserType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer