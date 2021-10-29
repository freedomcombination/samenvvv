declare type Mention_Country = 'turkey' | 'netherlands' | 'germany'

declare interface IMention {
  __typename?: 'Mention'
  id: string
  created_at: string
  updated_at: string
  username: string
  user_data?: Record<string, unknown>
  country?: Mention_Country
  category?: string
  published_at?: string
}

declare interface IMentionInput {
  username: string
  user_data?: Record<string, unknown>
  country?: Mention_Country
  category?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
