import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const initialState: { pop: boolean } = {
    pop: false
}

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    changePop: (state, action: PayloadAction<boolean>) => {state.pop = action.payload; setTimeout(() => {state.pop = false},5000)}
  }
})

export const { changePop } = sharedSlice.actions
export default sharedSlice.reducer