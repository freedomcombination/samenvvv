declare type RawPrivacy = {
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawPrivacy>
}

declare type Privacy = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Privacy>
}
