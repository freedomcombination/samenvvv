import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getMentionList, lookupTwitterUsers } from '@lib'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'

const twitterUsersStorage: ITweetUserData[] =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
    : []

export type PostShareState = {
  postText: string
  postContent: string
  mentionUsernames: string[]
  twitterUsers: ITweetUserData[]
  savedTwitterUsers: ITweetUserData[]
  isTwitterUsersLoading: boolean
  initialMentions: IMention[]
  mentions: IMention[]
  isMentionListLoading: boolean
  trends: string[]
  mentionSearchKey: string
}

const initialState: PostShareState = {
  postText: '',
  postContent: '',
  mentionUsernames: ['@samenvvv'],
  twitterUsers: [],
  savedTwitterUsers: twitterUsersStorage,
  isTwitterUsersLoading: false,
  initialMentions: [],
  mentions: [],
  isMentionListLoading: false,
  trends: [],
  mentionSearchKey: '',
}

export const fetchTwitterUsers = createAsyncThunk(
  'mention/twitterUsers',
  async (value: string) => {
    return await lookupTwitterUsers(value)
  },
)

export const fetchMentions = createAsyncThunk('mention/mentions', async () => {
  return await getMentionList()
})

export const postShareSlice = createSlice({
  name: 'post-share',
  initialState,
  reducers: {
    addMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames.push(`@${action.payload}`)
    },
    setMentionSearchKey: (state, action: PayloadAction<string>) => {
      state.mentionSearchKey = action.payload
    },
    clearMentionSearchKey: state => {
      state.mentionSearchKey = ''
    },
    removeMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames = state.mentionUsernames.filter(
        m => m !== action.payload,
      )
    },
    addTrend: (state, action: PayloadAction<string>) => {
      state.trends.push(action.payload)
    },
    removeTrend: (state, action: PayloadAction<string>) => {
      state.trends = state.trends.filter(m => m !== action.payload)
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload
    },
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload
    },
    clearTwitterUsers: state => {
      state.twitterUsers = []
    },
    setMentions: (state, action: PayloadAction<IMention[]>) => {
      state.mentions = action.payload
    },
    resetMentions: state => {
      state.mentions = state.initialMentions
    },
    updateSaveTwitterUsers: (state, action: PayloadAction<ITweetUserData>) => {
      state.savedTwitterUsers.push(action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(state.savedTwitterUsers),
      )
    },
    removeSavedMention: (state, action: PayloadAction<string>) => {
      const savedList = state.savedTwitterUsers.filter(
        user => user.screen_name !== action.payload,
      )
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(savedList),
      )
      state.savedTwitterUsers = savedList
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTwitterUsers.fulfilled, (state, action) => {
      state.twitterUsers = action.payload
      state.isTwitterUsersLoading = false
    }),
      builder.addCase(fetchTwitterUsers.pending, state => {
        state.isTwitterUsersLoading = true
      }),
      builder.addCase(fetchTwitterUsers.rejected, state => {
        state.isTwitterUsersLoading = false
      }),
      builder.addCase(fetchMentions.fulfilled, (state, action) => {
        state.initialMentions = action.payload
        state.mentions = action.payload
        state.isMentionListLoading = false
      }),
      builder.addCase(fetchMentions.pending, state => {
        state.isMentionListLoading = true
      }),
      builder.addCase(fetchMentions.rejected, state => {
        state.isMentionListLoading = false
      })
  },
})

export const {
  addMentionUsername,
  removeSavedMention,
  removeMentionUsername,
  addTrend,
  removeTrend,
  setPostText,
  setPostContent,
  setMentionSearchKey,
  clearMentionSearchKey,
  clearTwitterUsers,
  setMentions,
  resetMentions,
  updateSaveTwitterUsers,
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
