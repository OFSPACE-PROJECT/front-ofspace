import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    name: "",
    id: "",
    role : "",
    status : "",
    token : ""
  },
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      console.log(userData);
      state.isLogin = true;
      state.name = userData.name;
      state.id = 1;
      state.role = "customer";
      state.status = "approved"
      state.token = userData.token;
      // console.log(state);
    },
    logout: (state) => {
      console.log(state);
      state.isLogin = false;
      state.name = "";
      state.id = "";
      state.role = "";
      state.status = "";
      state.token = "";

    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
