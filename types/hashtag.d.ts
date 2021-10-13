declare interface HashtagPostType extends StrapiCommonType {
  text: string
  hashtag: HashtagType
}

declare interface HashtagType extends StrapiCommonType {
  hashtag: string
  hashtag_date: string | Date
  posts: HashtagPostType[]
  page: PageType | number
  metadata: MetadataType
  dynamic: any
}
