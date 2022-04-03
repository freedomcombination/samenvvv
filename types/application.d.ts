declare type RawApplication = {
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  publishedAt: string
  updatedAt: string
  applicant: StrapiRawEntity<RawApplicant>
  competition: StrapiRawEntity<RawCompetition>
  image: StrapiRawEntity<UploadFile>
  juriVotes: StrapiRawCollection<RawJuriVotes>
  localizations: StrapiRawCollection<RawApplication>
  tags: StrapiRawCollection<Tag>
  votes: StrapiRawCollection<RawVote>
}

declare type Application = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  publishedAt: string
  updatedAt: string
  applicant: StrapiEntity<Applicant>
  competition: StrapiEntity<Competition>
  image: StrapiEntity<UploadFile>
  juriVotes: StrapiCollection<JuriVotes>
  localizations: StrapiCollection<Application>
  tags: StrapiCollection<Tag>
  votes: StrapiCollection<Vote>
}
