import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TASK_URL } from "../../api/index";

const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // fetch tasks from api
  // return tasks as payload
  const response = await axios.get(TASK_URL);
  return response.data;
});

const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  // delete task from api
  // return deleted task id as payload
  await axios.delete(`${TASK_URL}/${id}`);
  return id;
});

const createTask = createAsyncThunk("tasks/createTask", async (task) => {
  // create task in api
  // return created task as payload
  const response = await axios.post(TASK_URL, task);
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
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
export { fetchTasks, deleteTask, createTask };
