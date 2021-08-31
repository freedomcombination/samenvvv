declare interface StrapiCommonType {
  id: number
  title: string
  slug: string
  content: string
  image: ImageResponseType
  published_at: Date
  created_at: Date
  updated_at: Date
  locale?: string
  localizations: [
    {
      id: string | number
      locale: string
      published_at: Date
    },
  ]
}
