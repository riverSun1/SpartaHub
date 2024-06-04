import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    { id: 1, title: "1 번째 게시물", date: "2024-06-01", nickname: "사용자1" },
    { id: 2, title: "2 번째 게시물", date: "2024-06-02", nickname: "사용자1" },
    { id: 3, title: "3 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 4, title: "4 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 5, title: "5 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 6, title: "6 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 7, title: "7 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 8, title: "8 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 9, title: "9 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 10, title: "10 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 11, title: "11 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 12, title: "12 번째 게시물", date: "2024-06-03", nickname: "사용자1" },
    { id: 13, title: "13 번째 게시물", date: "2024-06-03", nickname: "사용자1" }
  ]
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    deletePost(state, action) {
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post.id !== id);
    }
  }
});

export const { updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
