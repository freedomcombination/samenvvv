declare interface ICompetition extends LocalizedSlugs {
  __typename?: 'Competition'
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  image?: IUploadFile
  start: string
  end?: string
  page?: IPage
  metadata?: IMetadata
  locale?: string
  published_at?: string
  applications?: Array<IApplication>
  localizations?: Array<ICompetition>
}

declare interface ICompetitionInput {
  title: string
  slug: string
  content: string
  image?: string
  start: string
  end?: string
  applications?: Array<string>
  page?: string
  metadata: IMetadata
  localizations?: Array<string>
  locale?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
