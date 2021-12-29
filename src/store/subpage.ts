import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { increaseSubpageView } from '@lib'

export type SubpageState = {
  views: string[]
  likes: string[]
}

const LOCAL_STORAGE_SUBPAGE_KEY = 'subpage'

const savedSubpageStorage: SubpageState =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_SUBPAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_SUBPAGE_KEY) as string)
    : { views: [], likes: [] }

const initialState: SubpageState = {
  views: savedSubpageStorage.views,
  likes: savedSubpageStorage.likes,
}

export const viewSubpage = createAsyncThunk(
  'subpage/viewSubpage',
  async (subpage: ISubpage) => {
    return await increaseSubpageView(subpage)
  },
)

export const subpageSlice = createSlice({
  name: 'subpage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(viewSubpage.fulfilled, (state, action) => {
      if (action.meta.arg?.id) {
        state.views.push(action.meta.arg.id)
        localStorage.setItem(LOCAL_STORAGE_SUBPAGE_KEY, JSON.stringify(state))
      }
    })
  },
})

export const { reducer: subpageReducer } = subpageSlice
