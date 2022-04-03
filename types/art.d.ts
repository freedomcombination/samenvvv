declare type RawArt = {
  artist: StrapiRawEntity<RawArtist>
  categories: StrapiRawCollection<RawCategory>
  content: string
  createdAt: string
  description: string
  feedbacks: StrapiRawCollection<RawArtFeedback>
  images: StrapiRawEntity<RawUploadFile>
  likes: number
  locale: string
  localizations: StrapiRawCollection<RawArt>
  publishedAt: string
  slug: string
  status: 'approved' | 'archive' | 'pending' | 'rejected'
  tags: StrapiRawCollection<RawTag>
  title: string
  updatedAt: string
}

declare type Art = {
  id: number
  artist: StrapiEntity<Artist>
  categories: StrapiCollection<Category>
  content: string
  createdAt: string
  description: string
  feedbacks: StrapiCollection<ArtFeedback>
  images: StrapiEntity<UploadFile>
  likes: number
  locale: string
  localizations: StrapiCollection<Art>
  publishedAt: string
  slug: string
  status: 'approved' | 'archive' | 'pending' | 'rejected'
  tags: StrapiCollection<Tag>
  title: string
  updatedAt: string
}
