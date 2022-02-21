declare interface IHashtagPost extends LocalizedSlugs {
  __typename?: 'HashtagPost'
  id: string
  created_at: string
  updated_at: string
  text: string
  slug: string
  image?: IUploadFile
  hashtag?: IHashtag
  posts?: IHashtagPost[]
  locale?: CommonLocale
  likes: number
  published_at?: string
  localizations: Array<IHashtagPost>
}

declare interface IHashtagPostInput {
  text: string
  slug: string
  image?: string
  hashtag?: string
  localizations?: Array<string>
  locale?: CommonLocale
  likes: number
  published_at?: string
  created_by?: string
  updated_by?: string
}
