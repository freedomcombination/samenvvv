declare interface IApplication extends LocalizedSlugs {
  __typename?: 'Application'
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  image?: IUploadFile
  user?: IUsersPermissionsUser
  competition?: ICompetition
  metadata?: IMetadata
  locale?: string
  published_at?: string
  votes?: Array<IVote>
  localizations?: Array<IApplication>
}

declare interface IApplicationInput {
  title: string
  slug: string
  content: string
  image?: string
  user?: string
  competition?: string
  votes?: Array<string>
  metadata: IMetadata
  localizations?: Array<string>
  locale?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
