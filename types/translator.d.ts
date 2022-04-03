declare type RawTranslator = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  volunteer: StrapiRawEntity<RawVolunteer>
  posts: StrapiRawCollection<RawPost>
  roles: StrapiRawCollection<RawLangRole>
}

declare type Translator = {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  volunteer: StrapiEntity<Volunteer>
  posts: StrapiCollection<Post>
  roles: StrapiCollection<LangRole>
}
