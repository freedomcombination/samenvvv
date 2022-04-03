import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { likeBlogMutation, unlikeBlogMutation, viewBlogMutation } from '@lib'

export type BlogState = {
  views: number[]
  likes: number[]
}

const LOCAL_STORAGE_BLOG_KEY = 'blog'

const savedBlogStorage: BlogState =
  typeof window !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_BLOG_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_BLOG_KEY) as string)
    : { views: [], likes: [] }

const initialState: BlogState = {
  views: savedBlogStorage.views,
  likes: savedBlogStorage.likes,
}

export const viewBlog = createAsyncThunk(
  'blog/viewBlog',
  async (blog: Blog) => {
    return await viewBlogMutation(blog)
  },
)

export const likeBlog = createAsyncThunk(
  'blog/likeBlog',
  async (blog: Blog) => {
    return await likeBlogMutation(blog)
  },
)

export const unlikeBlog = createAsyncThunk(
  'blog/unlikeBlog',
  async (blog: Blog) => {
    return await unlikeBlogMutation(blog)
  },
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(viewBlog.fulfilled, (state, action) => {
      if (action.meta.arg?.id) {
        state.views.push(action.meta.arg.id)
        localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(state))
      }
    }),
      builder.addCase(likeBlog.fulfilled, (state, action) => {
        if (action.meta.arg?.id) {
          state.likes.push(action.meta.arg.id)
          localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(state))
        }
      }),
      builder.addCase(unlikeBlog.fulfilled, (state, action) => {
        if (action.meta.arg?.id) {
          const filteredLikes = state.likes.filter(
            id => id !== action.meta.arg?.id,
          )
          state.likes = filteredLikes
          localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(state))
        }
      })
  },
})

export const { reducer: blogReducer } = blogSlice
