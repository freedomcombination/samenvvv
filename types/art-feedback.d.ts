declare type RawArtFeedback = {
  art: StrapiRawEntity<RawArt>
  createdAt: string
  manager: StrapiRawEntity<RawUser>
  message: string
  point: number
  publishedAt: string
  type: 'approve' | 'reject'
  updatedAt: string
}

declare type ArtFeedback = {
  id: number
  art: StrapiEntity<Art>
  createdAt: string
  manager: StrapiEntity<User>
  message: string
  point: number
  publishedAt: string
  type: 'approve' | 'reject'
  updatedAt: string
}
