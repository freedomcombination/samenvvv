declare type RawPost = {
  text: string
  twitterMedia: string
  slug: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  creator: StrapiRawEntity<RawUser>
  hashtag: StrapiRawEntity<RawHashtag>
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawPost>
  tags: StrapiRawCollection<RawTag>
  translator: StrapiRawEntity<RawTranslator>
}

declare type Post = {
  id: number
  text: string
  twitterMedia: string
  slug: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  creator: StrapiEntity<User>
  hashtag: StrapiEntity<Hashtag>
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Post>
  tags: StrapiCollection<Tag>
  translator: StrapiEntity<Translator>
}
