declare type Page_Type =
  | 'announcement'
  | 'competition'
  | 'event'
  | 'hashtag'
  | 'news'

declare type IStaticPage = {
  title: string
  content: string
  slug: string
  image?: IUploadFile
}

declare interface IPage extends LocalizedSlugs {
  __typename?: 'Page'
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  image?: IUploadFile
  type: Page_Type
  locale?: string
  published_at?: string
  subpages?: Array<ISubpage>
  popular?: Array<ISubpage>
  competitions?: Array<ICompetition>
  hashtags?: Array<IHashtag>
  localizations?: Array<IPage>
}

declare interface IPageInput {
  title: string
  slug: string
  content: string
  image?: string
  type: Page_Type
  subpages?: Array<string>
  competitions?: Array<string>
  hashtags?: Array<string>
  localizations?: Array<string>
  locale?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
