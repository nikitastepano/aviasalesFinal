import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sort: 'сheapest'
  }

export const sortSlice = createSlice({
name: 'sort',
initialState,
  reducers: {
    setSort: (state, action) => {
      const value = action.payload;
      state.sort = value;
    }
  },
})

export const { setSort } = sortSlice.actions

export default sortSlice.reducer