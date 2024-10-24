import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type NeedToLoginModal = {
  isOpen: boolean;
  message: string;
} | null;

const initialState: NeedToLoginModal = null as NeedToLoginModal;

export const needToLoginModalSlice = createSlice({
  name: 'needToLoginModal',
  initialState,
  reducers: {
    setNeedToLoginModal: (state, action: PayloadAction<NeedToLoginModal>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { setNeedToLoginModal } = needToLoginModalSlice.actions

export default needToLoginModalSlice.reducer