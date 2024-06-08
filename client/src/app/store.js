// redux store instance
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasksSlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
});
