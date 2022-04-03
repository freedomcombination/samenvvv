declare type RawUser = {
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
  createdAt: string
  updatedAt: string
  role: StrapiRawEntity<RawRole>
  createdPosts?: StrapiRawCollection<RawPost>
  applicant?: StrapiRawEntity<RawApplicant>
  art_feedbacks?: StrapiRawCollection<RawArtFeedback>
  volunteer?: StrapiRawEntity<RawVolunteer>
  votes?: StrapiRawCollection<RawVote>
}

declare type User = {
  id: number
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
  createdAt: string
  updatedAt: string
  role: StrapiEntity<Role>
  createdPosts?: StrapiCollection<Post>
  applicant?: StrapiEntity<Applicant>
  art_feedbacks?: StrapiCollection<ArtFeedback>
  volunteer?: StrapiEntity<Volunteer>
  votes?: StrapiCollection<Vote>
}
