import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PostShareState = {
  postText: string
  postContent: string
  mentions: string[]
  trends: string[]
  isCharCountExceeded: boolean
  totalCharCount: number
  mentionSearchKey: string
}

const initialState: PostShareState = {
  postText: '',
  postContent: '',
  mentions: ['@samenvvv'],
  trends: [],
  isCharCountExceeded: false,
  totalCharCount: 0,
  mentionSearchKey: '',
}

export const postShareSlice = createSlice({
  name: 'post-share',
  initialState,
  reducers: {
    addMention: (state, action: PayloadAction<string>) => {
      state.mentions.push(action.payload)
    },
    setMentionSearchKey: (state, action: PayloadAction<string>) => {
      state.mentionSearchKey = action.payload
    },
    clearMentionSearchKey: state => {
      state.mentionSearchKey = 'action.paylod'
    },
    removeMention: (state, action: PayloadAction<string>) => {
      state.mentions = state.mentions.filter(m => m !== action.payload)
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
    checkCharacterCount: (state, action: PayloadAction<string | undefined>) => {
      const twitterCharLimit = 280
      const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link
      const textCharCount = (action.payload ?? state.postContent).length

      const totalCharCount = linkCharCount + textCharCount

      state.totalCharCount = totalCharCount

      if (totalCharCount > twitterCharLimit) state.isCharCountExceeded = true
      else state.isCharCountExceeded = false
    },
  },
})

export const {
  addMention,
  removeMention,
  addTrend,
  removeTrend,
  checkCharacterCount,
  setPostText,
  setPostContent,
  setMentionSearchKey,
  clearMentionSearchKey,
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
