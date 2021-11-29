import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PostShareState = {
  postContent: string
  mentions: string[]
  trends: string[]
  isCharCountExceeded: boolean
  totalCharCount: number
  mentionSearchKey: string
}

const initialState: PostShareState = {
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
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload
    },
    checkCharacterCount: (state, action: PayloadAction<string | undefined>) => {
      const twitterCharLimit = 280
      const linkCharCount = 23
      const textCharCount = (action.payload ?? state.postContent).length
      const mentionsCharCount = state.mentions.join().length
      const trendsCharCount = state.trends?.join().length ?? 0

      const totalCharCount =
        linkCharCount + textCharCount + mentionsCharCount + trendsCharCount

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
  setPostContent,
  setMentionSearchKey,
  clearMentionSearchKey,
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
