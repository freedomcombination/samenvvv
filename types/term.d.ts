declare type RawTerm = {
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawTerm>
}

declare type Term = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Term>
}
