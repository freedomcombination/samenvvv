declare interface IPost {
  id: string
  title: string
  slug: string
  locale: 'nl' | 'tr' | 'en'
  image: IUploadFile
  content: string
  published_at: string
  author: IUsersPermissionsUser
  likes: number
  views: number
}
