import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_URL } from "../api/index";

const createUser = createAsyncThunk("users/createUser", async (user) => {
  const response = await axios.post(`${AUTH_URL}/signup`, user, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
});

const loginUser = createAsyncThunk("users/loginUser", async (user) => {
  const response = await axios.post(`${AUTH_URL}/signin`, user, {
    withCredentials: true,
  });
  return response.data;
});

const initialState = {
  authData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      return { ...state, authData: null };
    },
    refresh: (state) => {
      state.username = "";
      state.cookie = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.success) {
          console.log(state.error);
          state.error = action.payload.message;
        } else {
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...action.payload })
          );
          state.authData = action.payload;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.success) {
          // set timeout for error
          state.error = action.payload.message;
        } else {
          localStorage.setItem(
            "profile",
            JSON.stringify({ ...action.payload })
          );
          state.authData = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, refresh } = userSlice.actions;
export default userSlice.reducer;
export { createUser, loginUser };
