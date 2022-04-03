declare type RawCategory = {
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiRawCollection<RawActivity>
  announcements?: StrapiRawCollection<RawActivity>
  arts?: StrapiRawCollection<RawArt>
  blogs?: StrapiRawCollection<RawBlog>
  competitions?: StrapiRawCollection<RawCompetition>
  hashtags?: StrapiRawCollection<RawHashtag>
  mentions?: StrapiRawCollection<RawMention>
}

declare type Category = {
  id: number
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiCollection<Activity>
  announcements?: StrapiCollection<Activity>
  arts?: StrapiCollection<Art>
  blogs?: StrapiCollection<Blog>
  competitions?: StrapiCollection<Competition>
  hashtags?: StrapiCollection<Hashtag>
  mentions?: StrapiCollection<Mention>
}
