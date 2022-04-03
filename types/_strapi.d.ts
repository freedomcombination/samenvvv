declare type PublicationState = 'LIVE' | 'PREVIEW'

declare type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

declare type PaginationArg =
  | { limit: number; start: number }
  | { page: number; pageSize: number }

declare type StrapiMeta = {
  pagination: Pagination
}

declare type StrapiRawEntity<T> = {
  id: number
  attributes: T
}

declare type StrpiRawEntityResponse<T> = {
  data: StrapiRawEntity<T>
}

declare type StrapiRawCollection<T> = {
  data: Array<StrapiRawEntity<T>>
}

declare type StrapiRawCollectionResponse<T> = {
  data: Array<StrapiRawEntity<T>>
  meta: StrapiMeta
}

declare type StrapiResponse<T> =
  | StrpiRawEntityResponse<T>
  | StrapiRawCollectionResponse<T>

declare type StrapiEntity<T> = { id: number } & T
declare type StrapiCollection<T> = Array<StrapiEntity<T>>

declare type Query = {
  activities?: ActivityEntityResponseCollection
  activity?: ActivityEntityResponse
  announcement?: AnnouncementEntityResponse
  announcements?: AnnouncementEntityResponseCollection
  applicant?: ApplicantEntityResponse
  applicants?: ApplicantEntityResponseCollection
  application?: ApplicationEntityResponse
  applications?: ApplicationEntityResponseCollection
  art?: ArtEntityResponse
  artFeedback?: ArtFeedbackEntityResponse
  artFeedbacks?: ArtFeedbackEntityResponseCollection
  artist?: ArtistEntityResponse
  artists?: ArtistEntityResponseCollection
  arts?: ArtEntityResponseCollection
  author?: AuthorEntityResponse
  authors?: AuthorEntityResponseCollection
  blog?: BlogEntityResponse
  blogs?: BlogEntityResponseCollection
  categories?: CategoryEntityResponseCollection
  category?: CategoryEntityResponse
  commentsComment?: CommentsCommentEntityResponse
  commentsCommentReport?: CommentsCommentReportEntityResponse
  commentsCommentReports?: CommentsCommentReportEntityResponseCollection
  commentsComments?: CommentsCommentEntityResponseCollection
  competition?: CompetitionEntityResponse
  competitions?: CompetitionEntityResponseCollection
  donate?: DonateEntityResponse
  donates?: DonateEntityResponseCollection
  hashtag?: HashtagEntityResponse
  hashtags?: HashtagEntityResponseCollection
  i18NLocale?: I18NLocaleEntityResponse
  i18NLocales?: I18NLocaleEntityResponseCollection
  job?: JobEntityResponse
  jobs?: JobEntityResponseCollection
  juri?: JuriEntityResponse
  juriVote?: JuriVoteEntityResponse
  juriVotes?: JuriVoteEntityResponseCollection
  juris?: JuriEntityResponseCollection
  langRole?: LangRoleEntityResponse
  langRoles?: LangRoleEntityResponseCollection
  me?: UsersPermissionsMe
  mention?: MentionEntityResponse
  mentions?: MentionEntityResponseCollection
  post?: PostEntityResponse
  posts?: PostEntityResponseCollection
  privacy?: PrivacyEntityResponse
  project?: ProjectEntityResponse
  projects?: ProjectEntityResponseCollection
  tag?: TagEntityResponse
  tags?: TagEntityResponseCollection
  term?: TermEntityResponse
  translator?: TranslatorEntityResponse
  translators?: TranslatorEntityResponseCollection
  trend?: TrendEntityResponse
  uploadFile?: UploadFileEntityResponse
  uploadFiles?: UploadFileEntityResponseCollection
  usersPermissionsRole?: UsersPermissionsRoleEntityResponse
  usersPermissionsRoles?: UsersPermissionsRoleEntityResponseCollection
  usersPermissionsUser?: UsersPermissionsUserEntityResponse
  usersPermissionsUsers?: UsersPermissionsUserEntityResponseCollection
  volunteer?: VolunteerEntityResponse
  volunteers?: VolunteerEntityResponseCollection
  vote?: VoteEntityResponse
  votes?: VoteEntityResponseCollection
}
