declare type RawArtist = {
  arts: StrapiRawCollection<RawArt>
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiRawEntity<RawVolunteer>
}

declare type Artist = {
  id: number
  arts: StrapiCollection<Art>
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiEntity<Volunteer>
}
