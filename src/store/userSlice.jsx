import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    name: "",
    id: "",
    role : "",
    status : ""
  },
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      console.log(userData);
      state.isLogin = true;
      state.name = userData.name;
      state.id = userData.id;
      state.role = userData.role;
      state.status = userData.status;
      console.log(state);
    },
    logout: (state) => {
      state.isLogin = false;
      state.name = "";
      state.id = "";
      state.role = "";
      state.status = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
