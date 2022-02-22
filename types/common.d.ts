declare interface I18NLocale {
  __typename?: 'I18NLocale'
  id: string
  created_at: string
  updated_at: string
  name?: string
  code?: string
}

declare interface IMutationCreateArgs<T> {
  input?: T
}

declare interface IMutationUpdateArgs<T> {
  input?: {
    where?: { id: string }
    data?: T
  }
}

declare interface IMutationDeleteArgs {
  input?: {
    where?: { id: string }
  }
}

declare type PublicationState = 'LIVE' | 'PREVIEW'

declare interface QueryArgs {
  sort?: string
  limit?: number
  start?: number
  where?: Record<string, unknown>
  publicationState?: PublicationState
  locale?: CommonLocale
}

declare interface IQuery {
  __typename?: 'Query'
  application?: IApplication
  applications?: Array<IApplication>
  competition?: ICompetition
  competitions?: Array<ICompetition>
  hashtagPost?: IHashtagPost
  hashtagPosts?: Array<IHashtagPost>
  hashtag?: IHashtag
  hashtags?: Array<IHashtag>
  mention?: IMention
  mentions?: Array<IMention>
  page?: IPage
  pages?: Array<IPage>
  subpage?: ISubpage
  subpages?: Array<ISubpage>
  vote?: IVote
  votes?: Array<IVote>
  files?: Array<IUploadFile>
  role?: IUsersPermissionsRole
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Array<IUsersPermissionsRole>
  user?: IUsersPermissionsUser
  users?: Array<IUsersPermissionsUser>
  me?: IUsersPermissionsMe
}

declare interface IMutation {
  __typename?: 'Mutation'
  upload: IUploadFile
  multipleUpload: Array<IUploadFile>
  updateFileInfo: IUploadFile
}

declare type CommonLocale = 'en' | 'nl' | 'tr'

declare type CommonLocalizedSlug = {
  en?: (string | null)[]
  nl?: (string | null)[]
  tr?: (string | null)[]
}

declare type LocalizedSlugs = {
  slugs: CommonLocalizedSlug
}

declare interface BaseVariables {
  locale: string
  slug?: string
  type?: string
  sort?: string
  limit?: number
}

declare type Morph =
  | IUsersPermissionsMe
  | IUsersPermissionsMeRole
  | IApplication
  | ICompetition
  | IHashtagPost
  | IHashtag
  | IMention
  | IPage
  | ISubpage
  | IVote
  | I18NLocale
  | IUploadFile
  | IUsersPermissionsPermission
  | IUsersPermissionsRole
  | IUsersPermissionsUser

declare type ICommonPage =
  | IPage
  | ISubpage
  | IHashtag
  | IHashtagPost
  | ICompetition
  | IApplication

declare interface ICommon extends Omit<ICommonPage, 'localizations'> {
  localizations: ICommonPage[]
}
