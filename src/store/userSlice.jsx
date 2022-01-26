import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    role : "",
    status : "",
    token : ""
  },
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      console.log(userData);
      state.id = userData.id;
      state.name = userData.name;
      state.role = userData.role;
      state.status = userData.status;
      state.token = userData.token;
    },
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.role = "";
      state.status = "";
      state.token = "";

    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
