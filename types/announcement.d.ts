declare type RawAnnouncement = {
  content: string
  createdAt: string
  date: string
  dateEnd: string
  description: string
  likes: number
  locale: string
  publishedAt: string
  slug: string
  title: string
  updatedAt: string
  views: number
  image: StrapiRawEntity<UploadFile>
  categories?: StrapiRawCollection<Category>
  tags?: StrapiRawCollection<Tag>
  localizations?: StrapiRawCollection<RawAnnouncement>
}

declare type Announcement = {
  id: number
  content: string
  createdAt: string
  date: string
  dateEnd: string
  description: string
  likes: number
  locale: string
  publishedAt: string
  slug: string
  title: string
  updatedAt: string
  views: number
  image: StrapiEntity<UploadFile>
  categories?: StrapiCollection<Category>
  tags?: StrapiCollection<Tag>
  localizations?: StrapiCollection<Announcement>
}
