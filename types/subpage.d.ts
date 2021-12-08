declare interface ISubpage extends LocalizedSlugs {
  __typename?: 'Subpage'
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  type: Page_Type
  start: string
  end?: string
  image?: IUploadFile
  page?: IPage
  locale?: string
  published_at?: string
  localizations?: Array<ISubpage>
}

declare interface ISubpageInput {
  title: string
  slug: string
  content: string
  type: Page_Type
  start: string
  end?: string
  image?: string
  page?: string
  localizations?: Array<string>
  locale?: string
  published_at?: string
  created_by?: string
  updated_by?: string
}
