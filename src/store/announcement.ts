import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { increaseAnnouncementView } from '@lib'

export type AnnouncementState = {
  views: string[]
  likes: string[]
}

const LOCAL_STORAGE_ANNOUNCEMENT_KEY = 'announcement'

const savedAnnouncementStorage: AnnouncementState =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_ANNOUNCEMENT_KEY) as string)
    : { views: [], likes: [] }

const initialState: AnnouncementState = {
  views: savedAnnouncementStorage.views,
  likes: savedAnnouncementStorage.likes,
}

export const viewAnnouncement = createAsyncThunk(
  'announcement/viewAnnouncement',
  async ({ id, views }: { id: string; views: number }) => {
    return await increaseAnnouncementView({ id, views })
  },
)

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(viewAnnouncement.fulfilled, (state, action) => {
      if (action.meta.arg?.id) {
        state.views.push(action.meta.arg.id)
        localStorage.setItem(
          LOCAL_STORAGE_ANNOUNCEMENT_KEY,
          JSON.stringify(state),
        )
      }
    })
  },
})

export const { reducer: announcementReducer } = announcementSlice
