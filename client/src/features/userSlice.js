import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_URL } from "../api/index";

const createUser = createAsyncThunk("users/createUser", async (user) => {
  const response = await axios.post(`${AUTH_URL}/signup`, user, {
    withCredentials: true,
  });
  console.log("---");
  console.log(response);
  return response.data;
});

const loginUser = createAsyncThunk("users/loginUser", async (user) => {
  const response = await axios.post(`${AUTH_URL}/signin`, user);
  return response.data;
});

const initialState = {
  username: "",
  cookie: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.cookie = "";
      // redirect to sign in page
      window.location.href = "/signin";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.user.username;
        // navigate to tasks page
        window.location.href = "/board";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
export { createUser, loginUser };
