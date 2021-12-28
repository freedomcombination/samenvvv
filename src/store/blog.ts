import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { decreasePostLike, increasePostLike, increasePostView } from '@lib'

export type BlogState = {
  views: string[]
  likes: string[]
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

export const viewPost = createAsyncThunk(
  'blog/viewPost',
  async (post: IPost) => {
    return await increasePostView(post)
  },
)

export const likePost = createAsyncThunk(
  'blog/likePost',
  async (post: IPost) => {
    return await increasePostLike(post)
  },
)

export const unlikePost = createAsyncThunk(
  'blog/unlikePost',
  async (post: IPost) => {
    return await decreasePostLike(post)
  },
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(viewPost.fulfilled, (state, action) => {
      if (action.meta.arg?.id) {
        state.views.push(action.meta.arg.id)
        localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(state))
      }
    }),
      builder.addCase(likePost.fulfilled, (state, action) => {
        if (action.meta.arg?.id) {
          state.likes.push(action.meta.arg.id)
          localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(state))
        }
      }),
      builder.addCase(unlikePost.fulfilled, (state, action) => {
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
