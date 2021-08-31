declare type PageVariantType =
  | 'event'
  | 'announcement'
  | 'news'
  | 'competition'
  | 'hashtag'

declare interface PageType extends StrapiCommonType {
  type: PageVariantType
  subpages: SubpageType[]
  competitions: CompetitionType[]
  hashtags: HashtagType[]
  metadata: MetadataType
  dynamic: any
}
