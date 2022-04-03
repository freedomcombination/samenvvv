declare type RawProject = {
  code: string
  link: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  content_en: string
  content_nl: string
  content_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiRawEntity<RawUploadFile>
  jobs: StrapiRawCollection<RawJob>
}

declare type Project = {
  id: number
  code: string
  link: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  content_en: string
  content_nl: string
  content_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  jobs: StrapiCollection<Job>
}
