import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
};

export const SocketSlice = createSlice({
  name: "Socket",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setStatus } = SocketSlice.actions;

export default SocketSlice.reducer;
