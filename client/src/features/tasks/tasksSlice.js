import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TASK_URL } from "../../api/index";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
