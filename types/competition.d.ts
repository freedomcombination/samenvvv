declare type RawCompetition = {
  title: string
  slug: string
  content: string
  date: string
  dateEnd: string
  description: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawCompetition>
  applications: StrapiRawCollection<RawApplication>
  categories: StrapiRawCollection<RawCategory>
}

declare type Competition = {
  id: number
  title: string
  slug: string
  content: string
  date: string
  dateEnd: string
  description: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Competition>
  applications: StrapiCollection<Application>
  categories: StrapiCollection<Category>
}
