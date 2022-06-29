import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { request } from '@lib'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'

const searchedMentionsStorage: TweetUserData[] =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
    : []

export const updatePostContent = (state: postState): void => {
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link

  const mentionsStr = [state.defaultMention, ...state.mentionUsernames]
    .filter(a => !!a)
    .join('\n')

  const trendsStr = [...state.defaultHashtags, ...state.trendNames]
    .filter(a => !!a)
    .join('\n')

  const postContent = [state.postText, mentionsStr, trendsStr]
    .filter(a => !!a)
    .join('\n\n')

  const count = linkCharCount + postContent.length
  const isExceeded = count > twitterCharLimit
  const exceededCharacters =
    count - twitterCharLimit > 0 ? count - twitterCharLimit : 0

  state.count = count
  state.isExceeded = isExceeded
  state.postContent = postContent
  state.threshold = state.postText.length - exceededCharacters
}

export type postState = {
  postText: string
  postContent: string
  defaultMention: string | null
  mentionUsernames: string[]
  searchedMentions: TweetUserData[]
  savedMentions: TweetUserData[]
  isSearchedMentionsLoading: boolean
  initialMentions: Mention[]
  mentions: Mention[]
  isMentionListLoading: boolean
  trendNames: string[]
  defaultTab: number | null
  isPostModalOpen: boolean
  defaultHashtags: string[]
  count: number
  isExceeded: boolean
  isShared: boolean
  threshold: number
}

const initialState: postState = {
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
  isShared: false,
  threshold: 0,
}

export const fetchSearchedMentions = createAsyncThunk(
  'post/searchedMentions',
  async (value: string) => {
    // return await lookupTwitterUsers(value)
    return value
  },
)

// TODO Consider pagination for the case of a lot of mentions
export const fetchMentions = createAsyncThunk(
  'post/mentions',
  async (locale: StrapiLocale) => {
    const mentions = await request<Mention[]>({
      url: 'api/mentions',
      locale,
    })
    return mentions.result
  },
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames.push(`@${action.payload}`)
      updatePostContent(state)
    },
    setDefaultMention: (state, action: PayloadAction<string>) => {
      state.defaultMention = '@' + action.payload
      updatePostContent(state)
    },
    removeDefaultMention: state => {
      state.defaultMention = null
      updatePostContent(state)
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
    removeDefaultHashtag: (state, action: PayloadAction<string>) => {
      state.defaultHashtags = state.defaultHashtags.filter(
        m => m !== action.payload,
      )
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
    setMentions: (state, action: PayloadAction<Mention[]>) => {
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
      action: PayloadAction<TweetUserData>,
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
    setIsShared: (state, action: PayloadAction<boolean>) => {
      state.isShared = action.payload
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchSearchedMentions.fulfilled, (state, action) => {
    //   state.searchedMentions = action.payload
    //   state.isSearchedMentionsLoading = false
    // }),
    //   builder.addCase(fetchSearchedMentions.pending, state => {
    //     state.isSearchedMentionsLoading = true
    //   }),
    //   builder.addCase(fetchSearchedMentions.rejected, state => {
    //     state.isSearchedMentionsLoading = false
    //   }),
    builder.addCase(fetchMentions.fulfilled, (state, action) => {
      state.initialMentions = action.payload || []
      state.mentions = action.payload || []
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
  removeDefaultHashtag,
  setDefaultHashtags,
  setPostText,
  setPostContent,
  clearSearchedMentions,
  setMentions,
  resetMentions,
  updateSavedSearchedMentions,
  setDefaultTab,
  togglePostModal,
  setIsShared,
} = postSlice.actions

export const { reducer: postReducer } = postSlice
