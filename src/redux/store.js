import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice
  }
});

export default store;
