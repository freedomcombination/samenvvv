import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PostShareState = {
  postContent: string
  mentions: string[]
  trends: string[]
  isCharacterCountExceeded: boolean
  totalCharCount: number
}

const initialState: PostShareState = {
  postContent: '',
  mentions: ['@samenvvv'],
  trends: [],
  isCharacterCountExceeded: false,
  totalCharCount: 0,
}

export const postShareSlice = createSlice({
  name: 'post-share',
  initialState,
  reducers: {
    addMention: (state, action: PayloadAction<string>) => {
      state.mentions.push(action.payload)
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

      if (totalCharCount > twitterCharLimit)
        state.isCharacterCountExceeded = true
      else state.isCharacterCountExceeded = false
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
} = postShareSlice.actions

export const { reducer: postShareReducer } = postShareSlice
