declare type RawMention = {
  username: string
  data: any
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  categories: StrapiRawCollection<RawCategory>
  hashtags: StrapiRawCollection<RawHashtag>
  localizations: StrapiRawCollection<RawMention>
}

declare type Mention = {
  id: number
  username: string
  data: any
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  categories: StrapiCollection<Category>
  hashtags: StrapiCollection<Hashtag>
  localizations: StrapiCollection<Mention>
}
