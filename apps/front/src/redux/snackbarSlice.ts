import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type SnackBar = {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
} | null;

const initialState: SnackBar = null as SnackBar;

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackBar: (state, action: PayloadAction<SnackBar>) => {
      state = action.payload;
      return state;
    },
  },
})

export const { setSnackBar } = snackbarSlice.actions

export default snackbarSlice.reducer