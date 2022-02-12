import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getMentionList, lookupTwitterUsers } from '@lib'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'

const searchedMentionsStorage: ITweetUserData[] =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
    : []

export const updatePostContent = (state: PostShareState): void => {
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link

  const mentionsStr = state.mentionUsernames.join('\n')

  const trendsStr =
    (state.defaultHashtags[0] ?? '') +
    (state.defaultHashtags[1] ?? '') +
    (state.trendNames.length > 0 ? `\n${state.trendNames.join('\n')}` : '')
  const postContent = `${state.postText}\n\n${mentionsStr}\n\n${trendsStr}`

  const count = linkCharCount + postContent.length
  const isExceeded = count > twitterCharLimit

  state.count = count
  state.isExceeded = isExceeded
  state.postContent = postContent
}

export type PostShareState = {
  postText: string
  postContent: string
  defaultMention: string | null
  mentionUsernames: string[]
  searchedMentions: ITweetUserData[]
  savedMentions: ITweetUserData[]
  isSearchedMentionsLoading: boolean
  initialMentions: IMention[]
  mentions: IMention[]
  isMentionListLoading: boolean
  trendNames: string[]
  defaultTab: number | null
  isPostModalOpen: boolean
  defaultHashtags: string[]
  count: number
  isExceeded: boolean
}

const initialState: PostShareState = {
  postText: '',
  postContent: '',
  defaultMention: null,
  mentionUsernames: [],
  searchedMentions: [],
  savedMentions: searchedMentionsStorage,
  isSearchedMentionsLoading: false,
  initialMentions: [],
  mentions: [],
  isMentionListLoading: false,
  trendNames: [],
  defaultTab: null,
  isPostModalOpen: false,
  defaultHashtags: [],
  count: 0,
  isExceeded: false,
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
      updatePostContent(state)
    },
    setDefaultMention: (state, action: PayloadAction<string>) => {
      state.defaultMention = '@' + action.payload
    },
    removeDefaultMention: state => {
      state.defaultMention = null
    },
    removeMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames = state.mentionUsernames.filter(
        m => m !== action.payload,
      )
      updatePostContent(state)
    },
    addTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames.push(action.payload)
      updatePostContent(state)
    },
    removeTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames = state.trendNames.filter(m => m !== action.payload)
      updatePostContent(state)
    },
    setDefaultHashtags: (state, action: PayloadAction<string[]>) => {
      state.defaultHashtags = action.payload
      updatePostContent(state)
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload
      updatePostContent(state)
    },
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload
      updatePostContent(state)
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
    togglePostModal: state => {
      state.isPostModalOpen = !state.isPostModalOpen
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
  setDefaultMention,
  removeDefaultMention,
  removeSavedMention,
  removeMentionUsername,
  addTrendName,
  removeTrendName,
  setDefaultHashtags,
  setPostText,
  setPostContent,
  clearSearchedMentions,
  setMentions,
  resetMentions,
  updateSavedSearchedMentions,
  setDefaultTab,
  togglePostModal,
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
