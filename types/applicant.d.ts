declare type RawApplicant = {
  createdAt: string
  name: string
  publishedAt: string
  updatedAt: string
  user?: StrapiRawEntity<RawUser>
  applications?: StrapiRawCollection<RawApplication>
}

declare type Applicant = {
  id: number
  createdAt: string
  name: string
  publishedAt: string
  updatedAt: string
  user?: StrapiEntity<User>
  applications?: StrapiCollection<Application>
}
