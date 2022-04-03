declare type RawJuri = {
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiRawEntity<RawVolunteer>
  votes: StrapiRawCollection<RawVote>
}

declare type Juri = {
  id: number
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiEntity<Volunteer>
  votes: StrapiCollection<Vote>
}
