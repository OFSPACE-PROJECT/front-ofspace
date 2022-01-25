import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    role : "",
    status : "",
    token : ""
  },
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      console.log(userData);
      state.id = userData.id;
      state.role = "consultan";
      state.status = userData.status;
      state.token = userData.token;
      // console.log(state);
    },
    logout: (state) => {
      console.log(state);
      state.id = "";
      state.role = "";
      state.status = "";
      state.token = "";

    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
