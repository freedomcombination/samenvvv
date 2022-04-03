declare type RawActivity = {
  content: string
  date: string
  likes: number
  locale: string
  slug: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  views: number
  image: StrapiRawEntity<UploadFile>
  categories?: StrapiRawCollection<Category>
  tags?: StrapiRawCollection<Tag>
  localizations?: StrapiRawCollection<RawActivity>
}

declare type Activity = {
  id: number
  content: string
  date: string
  likes: number
  locale: string
  slug: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  views: number
  image: StrapiEntity<UploadFile>
  categories: StrapiCollection<Category>
  tags: StrapiCollection<Tag>
  localizations: StrapiCollection<Activity>
}
