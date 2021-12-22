declare interface IPost {
  title: string
  slug: string
  locale: 'nl' | 'tr' | 'en'
  image: IUploadFile
  content: string
  published_at: string
}
