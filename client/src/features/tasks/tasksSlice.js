import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TASK_URL } from "../../api/index";

const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // fetch tasks from api
  // return tasks as payload
  const response = await axios.get(TASK_URL);
  return response.data;
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
export { fetchTasks };
