declare type RawJuriVote = {
  createdAt: string
  publishedAt: string
  updatedAt: string
  value: number
  application: StrapiRawEntity<RawApplication>
  juri: StrapiRawEntity<RawJuri>
}

declare type JuriVote = {
  id: number
  createdAt: string
  publishedAt: string
  updatedAt: string
  value: number
  application: StrapiEntity<Application>
  juri: StrapiEntity<Juri>
}
