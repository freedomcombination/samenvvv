declare interface IVote {
  __typename?: 'Vote'
  id: string
  created_at: string
  updated_at: string
  value: number
  voter?: IUsersPermissionsUser
  application?: IApplication
  published_at?: string
}

declare interface IVoteInput {
  value: number
  voter?: string
  application?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
