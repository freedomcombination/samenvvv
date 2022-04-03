declare type RawHashtag = {
  content: string
  createdAt: string
  date: string
  description: string
  hashtag: string
  hashtag_extra: string
  locale: string
  publishedAt: string
  slug: string
  title: string
  tweets: Tweet[]
  updatedAt: string
  image: StrapiRawEntity<RawUploadFile>
  mentions: StrapiRawCollection<RawMention>
  posts: StrapiRawCollection<RawPost>
  categories: StrapiRawCollection<RawCategory>
  localizations: StrapiRawCollection<RawHashtag>
}

declare type Hashtag = {
  id: number
  content: string
  createdAt: string
  date: string
  description: string
  hashtag: string
  hashtag_extra: string
  locale: string
  publishedAt: string
  slug: string
  title: string
  tweets: Tweet[]
  updatedAt: string
  image: StrapiEntity<UploadFile>
  mentions: StrapiCollection<Mention>
  posts: StrapiCollection<Post>
  categories: StrapiCollection<Category>
  localizations: StrapiCollection<Hashtag>
}
