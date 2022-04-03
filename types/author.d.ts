declare type RawAuthor = {
  blogs: StrapiRawCollection<RawBlog>
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiRawEntity<RawVolunteer>
}

declare type Author = {
  id: number
  blogs: StrapiCollection<Blog>
  createdAt: string
  publishedAt: string
  updatedAt: string
  volunteer: StrapiEntity<Volunteer>
}
