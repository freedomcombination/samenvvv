import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getMentionList, lookupTwitterUsers } from '@lib'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'

const searchedMentionsStorage: ITweetUserData[] =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
    : []

export type PostShareState = {
  postText: string
  postContent: string
  mentionUsernames: string[]
  searchedMentions: ITweetUserData[]
  savedMentions: ITweetUserData[]
  isSearchedMentionsLoading: boolean
  initialMentions: IMention[]
  mentions: IMention[]
  isMentionListLoading: boolean
  trendNames: string[]
  defaultTab: number | null
}

const initialState: PostShareState = {
  postText: '',
  postContent: '',
  mentionUsernames: ['@samenvvv'],
  searchedMentions: [],
  savedMentions: searchedMentionsStorage,
  isSearchedMentionsLoading: false,
  initialMentions: [],
  mentions: [],
  isMentionListLoading: false,
  trendNames: [],
  defaultTab: null,
}

export const fetchSearchedMentions = createAsyncThunk(
  'post-share/searchedMentions',
  async (value: string) => {
    return await lookupTwitterUsers(value)
  },
)

export const fetchMentions = createAsyncThunk(
  'post-share/mentions',
  async () => {
    return await getMentionList()
  },
)

export const postShareSlice = createSlice({
  name: 'post-share',
  initialState,
  reducers: {
    addMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames.push(`@${action.payload}`)
    },

    removeMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames = state.mentionUsernames.filter(
        m => m !== action.payload,
      )
    },
    addTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames.push(action.payload)
    },
    removeTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames = state.trendNames.filter(m => m !== action.payload)
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload
    },
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload
    },
    clearSearchedMentions: state => {
      state.searchedMentions = []
    },
    setMentions: (state, action: PayloadAction<IMention[]>) => {
      state.mentions = action.payload
    },
    resetMentions: state => {
      state.mentions = state.initialMentions
    },
    updateSavedSearchedMentions: (
      state,
      action: PayloadAction<ITweetUserData>,
    ) => {
      state.savedMentions.push(action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(state.savedMentions),
      )
    },
    removeSavedMention: (state, action: PayloadAction<string>) => {
      const savedList = state.savedMentions.filter(
        user => user.screen_name !== action.payload,
      )
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(savedList),
      )
      state.savedMentions = savedList
    },
    setDefaultTab: (state, action: PayloadAction<number>) => {
      state.defaultTab = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchedMentions.fulfilled, (state, action) => {
      state.searchedMentions = action.payload
      state.isSearchedMentionsLoading = false
    }),
      builder.addCase(fetchSearchedMentions.pending, state => {
        state.isSearchedMentionsLoading = true
      }),
      builder.addCase(fetchSearchedMentions.rejected, state => {
        state.isSearchedMentionsLoading = false
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
  addTrendName,
  removeTrendName,
  setPostText,
  setPostContent,
  clearSearchedMentions,
  setMentions,
  resetMentions,
  updateSavedSearchedMentions,
  setDefaultTab,
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
