// NOTE: This type musth have the same structure as the backend model.
declare interface ApplicationType extends StrapiCommonType {
  contender: UserType
  competition: CompetitionType
  votes: VoteType[]
}

// NOTE: This type musth have the same structure as the backend model.
declare interface CompetitionType extends StrapiCommonType {
  start: string | Date
  end: string | Date
  applications: CompetitionItemType[]
  page: PageType | number
  metadata: MetadataType
  dynamic?: any
}
