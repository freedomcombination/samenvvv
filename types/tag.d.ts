declare type RawTag = {
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiRawCollection<RawActivity>
  announcements?: StrapiRawCollection<RawAnnouncement>
  applications?: StrapiRawCollection<RawApplication>
  arts?: StrapiRawCollection<RawArt>
  blogs?: StrapiRawCollection<RawBlog>
  posts?: StrapiRawCollection<RawPost>
}

declare type Tag = {
  id: number
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiCollection<Activity>
  announcements?: StrapiCollection<Announcement>
  applications?: StrapiCollection<Application>
  arts?: StrapiCollection<Art>
  blogs?: StrapiCollection<Blog>
  posts?: StrapiCollection<Post>
}
