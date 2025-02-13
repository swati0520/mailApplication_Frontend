import { createSlice } from "@reduxjs/toolkit";

let data = JSON.parse(localStorage.getItem("mailApp"));

const initialState = {
  login: data ? data.login : false,
  token: data ? data.token : "",
  userInfo: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem(
        "mailApp",
        JSON.stringify({ login: true, token: action.payload.token })
      );
      // console.log(action);
      state.login = true;
      state.token = action.payload.token;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("mailApp");
      (state.login = false), (state.token = "");
    },
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
