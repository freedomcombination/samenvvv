declare type RawVote = {
  value: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  application: StrapiRawEntity<RawApplication>
  voter: StrapiRawEntity<RawUser>
}

declare type Vote = {
  id: number
  value: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  application: StrapiEntity<Application>
  voter: StrapiEntity<User>
}
