declare type RawBlog = {
  author: StrapiRawEntity<RawAuthor>
  categories: StrapiRawCollection<RawCategory>
  content: string
  createdAt: string
  description: string
  image: StrapiEntity<RawUploadFile>
  likes: number
  locale: string
  localizations: StrapiRawCollection<RawBlog>
  publishedAt: string
  slug: string
  tags: StrapiRawCollection<RawTag>
  title: string
  updatedAt: string
  views: number
}

declare type Blog = {
  id: number
  author: StrapiEntity<Author>
  categories: StrapiCollection<Category>
  content: string
  createdAt: string
  description: string
  image: StrapiEntity<UploadFile>
  likes: number
  locale: string
  localizations: StrapiCollection<Blog>
  publishedAt: string
  slug: string
  tags: StrapiCollection<Tag>
  title: string
  updatedAt: string
  views: number
}
