import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { decreaseBlogLike, increaseBlogLike, increaseBlogView } from '@lib'

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
  async (blog: BlogEntity) => {
    return await increaseBlogView({
      id: blog.id as string,
      views: (blog.attributes?.views as number) + 1,
    })
  },
)

export const likePost = createAsyncThunk(
  'blog/likePost',
  async (blog: BlogEntity) => {
    return await increaseBlogLike({
      id: blog.id as string,
      likes: (blog.attributes?.likes as number) + 1,
    })
  },
)

export const unlikePost = createAsyncThunk(
  'blog/unlikePost',
  async (blog: BlogEntity) => {
    return await decreaseBlogLike({
      id: blog.id as string,
      likes: (blog.attributes?.likes as number) - 1,
    })
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
