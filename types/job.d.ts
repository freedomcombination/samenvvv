declare type RawJob = {
  code: string
  createdAt: string
  description_en: string
  description_nl: string
  description_tr: string
  name_en: string
  name_nl: string
  name_tr: string
  publishedAt: string
  updatedAt: string
  project: StrapiRawEntity<RawProject>
}

declare type Job = {
  id: number
  code: string
  createdAt: string
  description_en: string
  description_nl: string
  description_tr: string
  name_en: string
  name_nl: string
  name_tr: string
  publishedAt: string
  updatedAt: string
  project: StrapiEntity<Project>
}
