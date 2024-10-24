import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EntrepreneurialExperience } from '../types/enums';

type Sidebar = {
  isOpen: boolean
}

const initialState: Sidebar = {
  isOpen: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<Sidebar>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { setSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer