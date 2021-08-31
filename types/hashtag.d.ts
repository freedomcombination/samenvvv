declare interface TweetType extends StrapiCommonType {
  tweet: string
  hashtag: HashtagType
}

declare interface HashtagType extends StrapiCommonType {
  hashtag: string
  hashtag_date: string | Date
  tweets: TweetType[]
  page: PageType | number
  metadata: MetadataType
  dynamic: any
}
