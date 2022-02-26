declare type Maybe<T> = T | null
declare type InputMaybe<T> = Maybe<T>
declare type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
declare type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

declare type CommonLocale = 'en' | 'tr' | 'nl'

declare type Announcement = {
  __typename?: 'Announcement'
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  date: Scalars['DateTime']
  date_end?: Maybe<Scalars['DateTime']>
  image: UploadFileEntityResponse
  likes?: Maybe<Scalars['Int']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<AnnouncementRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  views?: Maybe<Scalars['Int']>
}

declare type AnnouncementLocalizationsArgs = {
  filters?: InputMaybe<AnnouncementFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type AnnouncementEntity = {
  __typename?: 'AnnouncementEntity'
  attributes?: Maybe<Announcement>
  id?: Maybe<Scalars['ID']>
}

declare type AnnouncementEntityResponse = {
  __typename?: 'AnnouncementEntityResponse'
  data?: Maybe<AnnouncementEntity>
}

declare type AnnouncementEntityResponseCollection = {
  __typename?: 'AnnouncementEntityResponseCollection'
  data: Array<AnnouncementEntity>
  meta: ResponseCollectionMeta
}

declare type AnnouncementFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AnnouncementFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date?: InputMaybe<DateTimeFilterInput>
  date_end?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  likes?: InputMaybe<IntFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<AnnouncementFiltersInput>
  not?: InputMaybe<AnnouncementFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AnnouncementFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  views?: InputMaybe<IntFilterInput>
}

declare type AnnouncementInput = {
  content?: InputMaybe<Scalars['String']>
  date?: InputMaybe<Scalars['DateTime']>
  date_end?: InputMaybe<Scalars['DateTime']>
  image?: InputMaybe<Scalars['ID']>
  likes?: InputMaybe<Scalars['Int']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  views?: InputMaybe<Scalars['Int']>
}

declare type AnnouncementRelationResponseCollection = {
  __typename?: 'AnnouncementRelationResponseCollection'
  data: Array<AnnouncementEntity>
}

declare type Application = {
  __typename?: 'Application'
  applicant?: Maybe<UsersPermissionsUserEntityResponse>
  competition?: Maybe<CompetitionEntityResponse>
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  image: UploadFileEntityResponse
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<ApplicationRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  votes?: Maybe<VoteRelationResponseCollection>
}

declare type ApplicationLocalizationsArgs = {
  filters?: InputMaybe<ApplicationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type ApplicationVotesArgs = {
  filters?: InputMaybe<VoteFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type ApplicationEntity = {
  __typename?: 'ApplicationEntity'
  attributes?: Maybe<Application>
  id?: Maybe<Scalars['ID']>
}

declare type ApplicationEntityResponse = {
  __typename?: 'ApplicationEntityResponse'
  data?: Maybe<ApplicationEntity>
}

declare type ApplicationEntityResponseCollection = {
  __typename?: 'ApplicationEntityResponseCollection'
  data: Array<ApplicationEntity>
  meta: ResponseCollectionMeta
}

declare type ApplicationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ApplicationFiltersInput>>>
  applicant?: InputMaybe<UsersPermissionsUserFiltersInput>
  competition?: InputMaybe<CompetitionFiltersInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<ApplicationFiltersInput>
  not?: InputMaybe<ApplicationFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ApplicationFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  votes?: InputMaybe<VoteFiltersInput>
}

declare type ApplicationInput = {
  applicant?: InputMaybe<Scalars['ID']>
  competition?: InputMaybe<Scalars['ID']>
  content?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  votes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

declare type ApplicationRelationResponseCollection = {
  __typename?: 'ApplicationRelationResponseCollection'
  data: Array<ApplicationEntity>
}

declare type Art = {
  __typename?: 'Art'
  categories: Scalars['String']
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  images: UploadFileRelationResponseCollection
  likes?: Maybe<Scalars['Int']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<ArtRelationResponseCollection>
  owner?: Maybe<UsersPermissionsUserEntityResponse>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type ArtImagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type ArtLocalizationsArgs = {
  filters?: InputMaybe<ArtFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type ArtEntity = {
  __typename?: 'ArtEntity'
  attributes?: Maybe<Art>
  id?: Maybe<Scalars['ID']>
}

declare type ArtEntityResponse = {
  __typename?: 'ArtEntityResponse'
  data?: Maybe<ArtEntity>
}

declare type ArtEntityResponseCollection = {
  __typename?: 'ArtEntityResponseCollection'
  data: Array<ArtEntity>
  meta: ResponseCollectionMeta
}

declare type ArtFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArtFiltersInput>>>
  categories?: InputMaybe<StringFilterInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  likes?: InputMaybe<IntFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<ArtFiltersInput>
  not?: InputMaybe<ArtFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ArtFiltersInput>>>
  owner?: InputMaybe<UsersPermissionsUserFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type ArtInput = {
  categories?: InputMaybe<Scalars['String']>
  content?: InputMaybe<Scalars['String']>
  images?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  likes?: InputMaybe<Scalars['Int']>
  owner?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

declare type ArtRelationResponseCollection = {
  __typename?: 'ArtRelationResponseCollection'
  data: Array<ArtEntity>
}

declare type Blog = {
  __typename?: 'Blog'
  author?: Maybe<UsersPermissionsUserEntityResponse>
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  image: UploadFileEntityResponse
  likes?: Maybe<Scalars['Int']>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<BlogRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  views?: Maybe<Scalars['Int']>
}

declare type BlogLocalizationsArgs = {
  filters?: InputMaybe<BlogFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type BlogEntity = {
  __typename?: 'BlogEntity'
  attributes?: Maybe<Blog>
  id?: Maybe<Scalars['ID']>
}

declare type BlogEntityResponse = {
  __typename?: 'BlogEntityResponse'
  data?: Maybe<BlogEntity>
}

declare type BlogEntityResponseCollection = {
  __typename?: 'BlogEntityResponseCollection'
  data: Array<BlogEntity>
  meta: ResponseCollectionMeta
}

declare type BlogFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BlogFiltersInput>>>
  author?: InputMaybe<UsersPermissionsUserFiltersInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  likes?: InputMaybe<IntFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<BlogFiltersInput>
  not?: InputMaybe<BlogFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BlogFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  views?: InputMaybe<IntFilterInput>
}

declare type BlogInput = {
  author?: InputMaybe<Scalars['ID']>
  content?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['ID']>
  likes?: InputMaybe<Scalars['Int']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  views?: InputMaybe<Scalars['Int']>
}

declare type BlogRelationResponseCollection = {
  __typename?: 'BlogRelationResponseCollection'
  data: Array<BlogEntity>
}

declare type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  contains?: InputMaybe<Scalars['Boolean']>
  containsi?: InputMaybe<Scalars['Boolean']>
  endsWith?: InputMaybe<Scalars['Boolean']>
  eq?: InputMaybe<Scalars['Boolean']>
  gt?: InputMaybe<Scalars['Boolean']>
  gte?: InputMaybe<Scalars['Boolean']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  lt?: InputMaybe<Scalars['Boolean']>
  lte?: InputMaybe<Scalars['Boolean']>
  ne?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<BooleanFilterInput>
  notContains?: InputMaybe<Scalars['Boolean']>
  notContainsi?: InputMaybe<Scalars['Boolean']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>
  startsWith?: InputMaybe<Scalars['Boolean']>
}

declare type CommentsComment = {
  __typename?: 'CommentsComment'
  approvalStatus?: Maybe<Scalars['String']>
  authorAvatar?: Maybe<Scalars['String']>
  authorEmail?: Maybe<Scalars['String']>
  authorId?: Maybe<Scalars['String']>
  authorName?: Maybe<Scalars['String']>
  authorUser?: Maybe<UsersPermissionsUserEntityResponse>
  blockReason?: Maybe<Scalars['String']>
  blocked?: Maybe<Scalars['Boolean']>
  blockedThread?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  related?: Maybe<Scalars['String']>
  removed?: Maybe<Scalars['Boolean']>
  reports?: Maybe<CommentsCommentReportRelationResponseCollection>
  threadOf?: Maybe<CommentsCommentEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type CommentsCommentReportsArgs = {
  filters?: InputMaybe<CommentsCommentReportFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type CommentsCommentEntity = {
  __typename?: 'CommentsCommentEntity'
  attributes?: Maybe<CommentsComment>
  id?: Maybe<Scalars['ID']>
}

declare type CommentsCommentEntityResponse = {
  __typename?: 'CommentsCommentEntityResponse'
  data?: Maybe<CommentsCommentEntity>
}

declare type CommentsCommentEntityResponseCollection = {
  __typename?: 'CommentsCommentEntityResponseCollection'
  data: Array<CommentsCommentEntity>
  meta: ResponseCollectionMeta
}

declare type CommentsCommentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CommentsCommentFiltersInput>>>
  approvalStatus?: InputMaybe<StringFilterInput>
  authorAvatar?: InputMaybe<StringFilterInput>
  authorEmail?: InputMaybe<StringFilterInput>
  authorId?: InputMaybe<StringFilterInput>
  authorName?: InputMaybe<StringFilterInput>
  authorUser?: InputMaybe<UsersPermissionsUserFiltersInput>
  blockReason?: InputMaybe<StringFilterInput>
  blocked?: InputMaybe<BooleanFilterInput>
  blockedThread?: InputMaybe<BooleanFilterInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<CommentsCommentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<CommentsCommentFiltersInput>>>
  related?: InputMaybe<StringFilterInput>
  removed?: InputMaybe<BooleanFilterInput>
  reports?: InputMaybe<CommentsCommentReportFiltersInput>
  threadOf?: InputMaybe<CommentsCommentFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type CommentsCommentInput = {
  approvalStatus?: InputMaybe<Scalars['String']>
  authorAvatar?: InputMaybe<Scalars['String']>
  authorEmail?: InputMaybe<Scalars['String']>
  authorId?: InputMaybe<Scalars['String']>
  authorName?: InputMaybe<Scalars['String']>
  authorUser?: InputMaybe<Scalars['ID']>
  blockReason?: InputMaybe<Scalars['String']>
  blocked?: InputMaybe<Scalars['Boolean']>
  blockedThread?: InputMaybe<Scalars['Boolean']>
  content?: InputMaybe<Scalars['String']>
  related?: InputMaybe<Scalars['String']>
  removed?: InputMaybe<Scalars['Boolean']>
  reports?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  threadOf?: InputMaybe<Scalars['ID']>
}

declare type CommentsCommentReport = {
  __typename?: 'CommentsCommentReport'
  content?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  reason: Enum_Commentscommentreport_Reason
  related?: Maybe<CommentsCommentEntityResponse>
  resolved?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type CommentsCommentReportEntity = {
  __typename?: 'CommentsCommentReportEntity'
  attributes?: Maybe<CommentsCommentReport>
  id?: Maybe<Scalars['ID']>
}

declare type CommentsCommentReportEntityResponse = {
  __typename?: 'CommentsCommentReportEntityResponse'
  data?: Maybe<CommentsCommentReportEntity>
}

declare type CommentsCommentReportEntityResponseCollection = {
  __typename?: 'CommentsCommentReportEntityResponseCollection'
  data: Array<CommentsCommentReportEntity>
  meta: ResponseCollectionMeta
}

declare type CommentsCommentReportFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CommentsCommentReportFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<CommentsCommentReportFiltersInput>
  or?: InputMaybe<Array<InputMaybe<CommentsCommentReportFiltersInput>>>
  reason?: InputMaybe<StringFilterInput>
  related?: InputMaybe<CommentsCommentFiltersInput>
  resolved?: InputMaybe<BooleanFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type CommentsCommentReportInput = {
  content?: InputMaybe<Scalars['String']>
  reason?: InputMaybe<Enum_Commentscommentreport_Reason>
  related?: InputMaybe<Scalars['ID']>
  resolved?: InputMaybe<Scalars['Boolean']>
}

declare type CommentsCommentReportRelationResponseCollection = {
  __typename?: 'CommentsCommentReportRelationResponseCollection'
  data: Array<CommentsCommentReportEntity>
}

declare type Competition = {
  __typename?: 'Competition'
  applications?: Maybe<ApplicationRelationResponseCollection>
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  date: Scalars['DateTime']
  date_end?: Maybe<Scalars['DateTime']>
  image: UploadFileEntityResponse
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<CompetitionRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type CompetitionApplicationsArgs = {
  filters?: InputMaybe<ApplicationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type CompetitionLocalizationsArgs = {
  filters?: InputMaybe<CompetitionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type CompetitionEntity = {
  __typename?: 'CompetitionEntity'
  attributes?: Maybe<Competition>
  id?: Maybe<Scalars['ID']>
}

declare type CompetitionEntityResponse = {
  __typename?: 'CompetitionEntityResponse'
  data?: Maybe<CompetitionEntity>
}

declare type CompetitionEntityResponseCollection = {
  __typename?: 'CompetitionEntityResponseCollection'
  data: Array<CompetitionEntity>
  meta: ResponseCollectionMeta
}

declare type CompetitionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CompetitionFiltersInput>>>
  applications?: InputMaybe<ApplicationFiltersInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date?: InputMaybe<DateTimeFilterInput>
  date_end?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<CompetitionFiltersInput>
  not?: InputMaybe<CompetitionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<CompetitionFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type CompetitionInput = {
  applications?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  content?: InputMaybe<Scalars['String']>
  date?: InputMaybe<Scalars['DateTime']>
  date_end?: InputMaybe<Scalars['DateTime']>
  image?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

declare type CompetitionRelationResponseCollection = {
  __typename?: 'CompetitionRelationResponseCollection'
  data: Array<CompetitionEntity>
}

declare type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  contains?: InputMaybe<Scalars['DateTime']>
  containsi?: InputMaybe<Scalars['DateTime']>
  endsWith?: InputMaybe<Scalars['DateTime']>
  eq?: InputMaybe<Scalars['DateTime']>
  gt?: InputMaybe<Scalars['DateTime']>
  gte?: InputMaybe<Scalars['DateTime']>
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  lt?: InputMaybe<Scalars['DateTime']>
  lte?: InputMaybe<Scalars['DateTime']>
  ne?: InputMaybe<Scalars['DateTime']>
  not?: InputMaybe<DateTimeFilterInput>
  notContains?: InputMaybe<Scalars['DateTime']>
  notContainsi?: InputMaybe<Scalars['DateTime']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>
  startsWith?: InputMaybe<Scalars['DateTime']>
}

declare enum Enum_Commentscommentreport_Reason {
  BadLanguage = 'BAD_LANGUAGE',
  Discrimination = 'DISCRIMINATION',
  Other = 'OTHER',
}

declare enum Enum_Translationpost_Role {
  EnNl = 'en_nl',
  EnTr = 'en_tr',
  NlEn = 'nl_en',
  NlTr = 'nl_tr',
  TrEn = 'tr_en',
  TrNl = 'tr_nl',
}

declare type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>
  caption?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

declare type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  contains?: InputMaybe<Scalars['Float']>
  containsi?: InputMaybe<Scalars['Float']>
  endsWith?: InputMaybe<Scalars['Float']>
  eq?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  ne?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<FloatFilterInput>
  notContains?: InputMaybe<Scalars['Float']>
  notContainsi?: InputMaybe<Scalars['Float']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  startsWith?: InputMaybe<Scalars['Float']>
}

declare type GenericMorph =
  | Announcement
  | Application
  | Art
  | Blog
  | CommentsComment
  | CommentsCommentReport
  | Competition
  | Hashtag
  | HashtagPost
  | I18NLocale
  | Mention
  | Privacy
  | Term
  | TranslationPost
  | Trend
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | Vote

declare type Hashtag = {
  __typename?: 'Hashtag'
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  date: Scalars['DateTime']
  hashtag: Scalars['String']
  hashtag_extra?: Maybe<Scalars['String']>
  image: UploadFileEntityResponse
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<HashtagRelationResponseCollection>
  posts?: Maybe<HashtagPostRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  title: Scalars['String']
  tweets?: Maybe<ITweet[]>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type HashtagLocalizationsArgs = {
  filters?: InputMaybe<HashtagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type HashtagPostsArgs = {
  filters?: InputMaybe<HashtagPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type HashtagEntity = {
  __typename?: 'HashtagEntity'
  attributes?: Maybe<Hashtag>
  id?: Maybe<Scalars['ID']>
}

declare type HashtagEntityResponse = {
  __typename?: 'HashtagEntityResponse'
  data?: Maybe<HashtagEntity>
}

declare type HashtagEntityResponseCollection = {
  __typename?: 'HashtagEntityResponseCollection'
  data: Array<HashtagEntity>
  meta: ResponseCollectionMeta
}

declare type HashtagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HashtagFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date?: InputMaybe<DateTimeFilterInput>
  hashtag?: InputMaybe<StringFilterInput>
  hashtag_extra?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<HashtagFiltersInput>
  not?: InputMaybe<HashtagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<HashtagFiltersInput>>>
  posts?: InputMaybe<HashtagPostFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  tweets?: InputMaybe<JsonFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type HashtagInput = {
  content?: InputMaybe<Scalars['String']>
  date?: InputMaybe<Scalars['DateTime']>
  hashtag?: InputMaybe<Scalars['String']>
  hashtag_extra?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['ID']>
  posts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  tweets?: InputMaybe<ITweet[]>
}

declare type HashtagPost = {
  __typename?: 'HashtagPost'
  createdAt?: Maybe<Scalars['DateTime']>
  hashtag?: Maybe<HashtagEntityResponse>
  image: UploadFileEntityResponse
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<HashtagPostRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug: Scalars['String']
  text: Scalars['String']
  translations?: Maybe<TranslationPostRelationResponseCollection>
  twitter_image?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type HashtagPostLocalizationsArgs = {
  filters?: InputMaybe<HashtagPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type HashtagPostTranslationsArgs = {
  filters?: InputMaybe<TranslationPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type HashtagPostEntity = {
  __typename?: 'HashtagPostEntity'
  attributes?: Maybe<HashtagPost>
  id?: Maybe<Scalars['ID']>
}

declare type HashtagPostEntityResponse = {
  __typename?: 'HashtagPostEntityResponse'
  data?: Maybe<HashtagPostEntity>
}

declare type HashtagPostEntityResponseCollection = {
  __typename?: 'HashtagPostEntityResponseCollection'
  data: Array<HashtagPostEntity>
  meta: ResponseCollectionMeta
}

declare type HashtagPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HashtagPostFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  hashtag?: InputMaybe<HashtagFiltersInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<HashtagPostFiltersInput>
  not?: InputMaybe<HashtagPostFiltersInput>
  or?: InputMaybe<Array<InputMaybe<HashtagPostFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  text?: InputMaybe<StringFilterInput>
  translations?: InputMaybe<TranslationPostFiltersInput>
  twitter_image?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type HashtagPostInput = {
  hashtag?: InputMaybe<Scalars['ID']>
  image?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  text?: InputMaybe<Scalars['String']>
  translations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  twitter_image?: InputMaybe<Scalars['String']>
}

declare type HashtagPostRelationResponseCollection = {
  __typename?: 'HashtagPostRelationResponseCollection'
  data: Array<HashtagPostEntity>
}

declare type HashtagRelationResponseCollection = {
  __typename?: 'HashtagRelationResponseCollection'
  data: Array<HashtagEntity>
}

declare type I18NLocale = {
  __typename?: 'I18NLocale'
  code?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity'
  attributes?: Maybe<I18NLocale>
  id?: Maybe<Scalars['ID']>
}

declare type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse'
  data?: Maybe<I18NLocaleEntity>
}

declare type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection'
  data: Array<I18NLocaleEntity>
  meta: ResponseCollectionMeta
}

declare type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  code?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<I18NLocaleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  contains?: InputMaybe<Scalars['ID']>
  containsi?: InputMaybe<Scalars['ID']>
  endsWith?: InputMaybe<Scalars['ID']>
  eq?: InputMaybe<Scalars['ID']>
  gt?: InputMaybe<Scalars['ID']>
  gte?: InputMaybe<Scalars['ID']>
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  lt?: InputMaybe<Scalars['ID']>
  lte?: InputMaybe<Scalars['ID']>
  ne?: InputMaybe<Scalars['ID']>
  not?: InputMaybe<IdFilterInput>
  notContains?: InputMaybe<Scalars['ID']>
  notContainsi?: InputMaybe<Scalars['ID']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  startsWith?: InputMaybe<Scalars['ID']>
}

declare type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  contains?: InputMaybe<Scalars['Int']>
  containsi?: InputMaybe<Scalars['Int']>
  endsWith?: InputMaybe<Scalars['Int']>
  eq?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  ne?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<IntFilterInput>
  notContains?: InputMaybe<Scalars['Int']>
  notContainsi?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  startsWith?: InputMaybe<Scalars['Int']>
}

declare type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  contains?: InputMaybe<Scalars['JSON']>
  containsi?: InputMaybe<Scalars['JSON']>
  endsWith?: InputMaybe<Scalars['JSON']>
  eq?: InputMaybe<Scalars['JSON']>
  gt?: InputMaybe<Scalars['JSON']>
  gte?: InputMaybe<Scalars['JSON']>
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  lt?: InputMaybe<Scalars['JSON']>
  lte?: InputMaybe<Scalars['JSON']>
  ne?: InputMaybe<Scalars['JSON']>
  not?: InputMaybe<JsonFilterInput>
  notContains?: InputMaybe<Scalars['JSON']>
  notContainsi?: InputMaybe<Scalars['JSON']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>
  startsWith?: InputMaybe<Scalars['JSON']>
}

declare type Mention = {
  __typename?: 'Mention'
  category?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  data?: Maybe<ITweetUserData>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<MentionRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
}

declare type MentionLocalizationsArgs = {
  filters?: InputMaybe<MentionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type MentionEntity = {
  __typename?: 'MentionEntity'
  attributes?: Maybe<Mention>
  id?: Maybe<Scalars['ID']>
}

declare type MentionEntityResponse = {
  __typename?: 'MentionEntityResponse'
  data?: Maybe<MentionEntity>
}

declare type MentionEntityResponseCollection = {
  __typename?: 'MentionEntityResponseCollection'
  data: Array<MentionEntity>
  meta: ResponseCollectionMeta
}

declare type MentionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MentionFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  data?: InputMaybe<JsonFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<MentionFiltersInput>
  not?: InputMaybe<MentionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<MentionFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
}

declare type MentionInput = {
  category?: InputMaybe<Scalars['String']>
  data?: InputMaybe<ITweetUserData>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  username?: InputMaybe<Scalars['String']>
}

declare type MentionRelationResponseCollection = {
  __typename?: 'MentionRelationResponseCollection'
  data: Array<MentionEntity>
}

declare type Mutation = {
  __typename?: 'Mutation'
  createAnnouncement?: Maybe<AnnouncementEntityResponse>
  createAnnouncementLocalization?: Maybe<AnnouncementEntityResponse>
  createApplication?: Maybe<ApplicationEntityResponse>
  createApplicationLocalization?: Maybe<ApplicationEntityResponse>
  createArt?: Maybe<ArtEntityResponse>
  createArtLocalization?: Maybe<ArtEntityResponse>
  createBlog?: Maybe<BlogEntityResponse>
  createBlogLocalization?: Maybe<BlogEntityResponse>
  createCommentsComment?: Maybe<CommentsCommentEntityResponse>
  createCommentsCommentReport?: Maybe<CommentsCommentReportEntityResponse>
  createCompetition?: Maybe<CompetitionEntityResponse>
  createCompetitionLocalization?: Maybe<CompetitionEntityResponse>
  createHashtag?: Maybe<HashtagEntityResponse>
  createHashtagLocalization?: Maybe<HashtagEntityResponse>
  createHashtagPost?: Maybe<HashtagPostEntityResponse>
  createHashtagPostLocalization?: Maybe<HashtagPostEntityResponse>
  createMention?: Maybe<MentionEntityResponse>
  createMentionLocalization?: Maybe<MentionEntityResponse>
  createPrivacyLocalization?: Maybe<PrivacyEntityResponse>
  createTermLocalization?: Maybe<TermEntityResponse>
  createTranslationPost?: Maybe<TranslationPostEntityResponse>
  createUploadFile?: Maybe<UploadFileEntityResponse>
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse
  createVote?: Maybe<VoteEntityResponse>
  deleteAnnouncement?: Maybe<AnnouncementEntityResponse>
  deleteApplication?: Maybe<ApplicationEntityResponse>
  deleteArt?: Maybe<ArtEntityResponse>
  deleteBlog?: Maybe<BlogEntityResponse>
  deleteCommentsComment?: Maybe<CommentsCommentEntityResponse>
  deleteCommentsCommentReport?: Maybe<CommentsCommentReportEntityResponse>
  deleteCompetition?: Maybe<CompetitionEntityResponse>
  deleteHashtag?: Maybe<HashtagEntityResponse>
  deleteHashtagPost?: Maybe<HashtagPostEntityResponse>
  deleteMention?: Maybe<MentionEntityResponse>
  deletePrivacy?: Maybe<PrivacyEntityResponse>
  deleteTerm?: Maybe<TermEntityResponse>
  deleteTranslationPost?: Maybe<TranslationPostEntityResponse>
  deleteTrend?: Maybe<TrendEntityResponse>
  deleteUploadFile?: Maybe<UploadFileEntityResponse>
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
  deleteVote?: Maybe<VoteEntityResponse>
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>
  /** Register a user */
  register: UsersPermissionsLoginPayload
  removeFile?: Maybe<UploadFileEntityResponse>
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateAnnouncement?: Maybe<AnnouncementEntityResponse>
  updateApplication?: Maybe<ApplicationEntityResponse>
  updateArt?: Maybe<ArtEntityResponse>
  updateBlog?: Maybe<BlogEntityResponse>
  updateCommentsComment?: Maybe<CommentsCommentEntityResponse>
  updateCommentsCommentReport?: Maybe<CommentsCommentReportEntityResponse>
  updateCompetition?: Maybe<CompetitionEntityResponse>
  updateFileInfo: UploadFileEntityResponse
  updateHashtag?: Maybe<HashtagEntityResponse>
  updateHashtagPost?: Maybe<HashtagPostEntityResponse>
  updateMention?: Maybe<MentionEntityResponse>
  updatePrivacy?: Maybe<PrivacyEntityResponse>
  updateTerm?: Maybe<TermEntityResponse>
  updateTranslationPost?: Maybe<TranslationPostEntityResponse>
  updateTrend?: Maybe<TrendEntityResponse>
  updateUploadFile?: Maybe<UploadFileEntityResponse>
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
  updateVote?: Maybe<VoteEntityResponse>
  upload: UploadFileEntityResponse
}

declare type MutationCreateAnnouncementArgs = {
  data: AnnouncementInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateAnnouncementLocalizationArgs = {
  data?: InputMaybe<AnnouncementInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateApplicationArgs = {
  data: ApplicationInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateApplicationLocalizationArgs = {
  data?: InputMaybe<ApplicationInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateArtArgs = {
  data: ArtInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateArtLocalizationArgs = {
  data?: InputMaybe<ArtInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateBlogArgs = {
  data: BlogInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateBlogLocalizationArgs = {
  data?: InputMaybe<BlogInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateCommentsCommentArgs = {
  data: CommentsCommentInput
}

declare type MutationCreateCommentsCommentReportArgs = {
  data: CommentsCommentReportInput
}

declare type MutationCreateCompetitionArgs = {
  data: CompetitionInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateCompetitionLocalizationArgs = {
  data?: InputMaybe<CompetitionInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateHashtagArgs = {
  data: HashtagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateHashtagLocalizationArgs = {
  data?: InputMaybe<HashtagInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateHashtagPostArgs = {
  data: HashtagPostInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateHashtagPostLocalizationArgs = {
  data?: InputMaybe<HashtagPostInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateMentionArgs = {
  data: MentionInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateMentionLocalizationArgs = {
  data?: InputMaybe<MentionInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreatePrivacyLocalizationArgs = {
  data?: InputMaybe<PrivacyInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateTermLocalizationArgs = {
  data?: InputMaybe<TermInput>
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationCreateTranslationPostArgs = {
  data: TranslationPostInput
}

declare type MutationCreateUploadFileArgs = {
  data: UploadFileInput
}

declare type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
}

declare type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
}

declare type MutationCreateVoteArgs = {
  data: VoteInput
}

declare type MutationDeleteAnnouncementArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteApplicationArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteArtArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteBlogArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteCommentsCommentArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteCommentsCommentReportArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteCompetitionArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteHashtagArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteHashtagPostArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteMentionArgs = {
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeletePrivacyArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteTermArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationDeleteTranslationPostArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']
}

declare type MutationDeleteVoteArgs = {
  id: Scalars['ID']
}

declare type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
}

declare type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

declare type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

declare type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>
  files: Array<InputMaybe<Scalars['Upload']>>
  ref?: InputMaybe<Scalars['String']>
  refId?: InputMaybe<Scalars['ID']>
}

declare type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

declare type MutationRemoveFileArgs = {
  id: Scalars['ID']
}

declare type MutationResetPasswordArgs = {
  code: Scalars['String']
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
}

declare type MutationUpdateAnnouncementArgs = {
  data: AnnouncementInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateApplicationArgs = {
  data: ApplicationInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateArtArgs = {
  data: ArtInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateBlogArgs = {
  data: BlogInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateCommentsCommentArgs = {
  data: CommentsCommentInput
  id: Scalars['ID']
}

declare type MutationUpdateCommentsCommentReportArgs = {
  data: CommentsCommentReportInput
  id: Scalars['ID']
}

declare type MutationUpdateCompetitionArgs = {
  data: CompetitionInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']
  info?: InputMaybe<FileInfoInput>
}

declare type MutationUpdateHashtagArgs = {
  data: HashtagInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateHashtagPostArgs = {
  data: HashtagPostInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateMentionArgs = {
  data: MentionInput
  id: Scalars['ID']
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdatePrivacyArgs = {
  data: PrivacyInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateTermArgs = {
  data: TermInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type MutationUpdateTranslationPostArgs = {
  data: TranslationPostInput
  id: Scalars['ID']
}

declare type MutationUpdateTrendArgs = {
  data: TrendInput
}

declare type MutationUpdateUploadFileArgs = {
  data: UploadFileInput
  id: Scalars['ID']
}

declare type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
  id: Scalars['ID']
}

declare type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
  id: Scalars['ID']
}

declare type MutationUpdateVoteArgs = {
  data: VoteInput
  id: Scalars['ID']
}

declare type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>
  file: Scalars['Upload']
  info?: InputMaybe<FileInfoInput>
  ref?: InputMaybe<Scalars['String']>
  refId?: InputMaybe<Scalars['ID']>
}

declare type Pagination = {
  __typename?: 'Pagination'
  page: Scalars['Int']
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  total: Scalars['Int']
}

declare type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  pageSize?: InputMaybe<Scalars['Int']>
  start?: InputMaybe<Scalars['Int']>
}

declare type Privacy = {
  __typename?: 'Privacy'
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  image?: Maybe<UploadFileEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<PrivacyRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type PrivacyLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>
}

declare type PrivacyEntity = {
  __typename?: 'PrivacyEntity'
  attributes?: Maybe<Privacy>
  id?: Maybe<Scalars['ID']>
}

declare type PrivacyEntityResponse = {
  __typename?: 'PrivacyEntityResponse'
  data?: Maybe<PrivacyEntity>
}

declare type PrivacyInput = {
  content?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

declare type PrivacyRelationResponseCollection = {
  __typename?: 'PrivacyRelationResponseCollection'
  data: Array<PrivacyEntity>
}

declare enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

declare type Query = {
  __typename?: 'Query'
  announcement?: Maybe<AnnouncementEntityResponse>
  announcements?: Maybe<AnnouncementEntityResponseCollection>
  application?: Maybe<ApplicationEntityResponse>
  applications?: Maybe<ApplicationEntityResponseCollection>
  art?: Maybe<ArtEntityResponse>
  arts?: Maybe<ArtEntityResponseCollection>
  blog?: Maybe<BlogEntityResponse>
  blogs?: Maybe<BlogEntityResponseCollection>
  commentsComment?: Maybe<CommentsCommentEntityResponse>
  commentsCommentReport?: Maybe<CommentsCommentReportEntityResponse>
  commentsCommentReports?: Maybe<CommentsCommentReportEntityResponseCollection>
  commentsComments?: Maybe<CommentsCommentEntityResponseCollection>
  competition?: Maybe<CompetitionEntityResponse>
  competitions?: Maybe<CompetitionEntityResponseCollection>
  hashtag?: Maybe<HashtagEntityResponse>
  hashtagPost?: Maybe<HashtagPostEntityResponse>
  hashtagPosts?: Maybe<HashtagPostEntityResponseCollection>
  hashtags?: Maybe<HashtagEntityResponseCollection>
  i18NLocale?: Maybe<I18NLocaleEntityResponse>
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>
  me?: Maybe<UsersPermissionsMe>
  mention?: Maybe<MentionEntityResponse>
  mentions?: Maybe<MentionEntityResponseCollection>
  privacy?: Maybe<PrivacyEntityResponse>
  term?: Maybe<TermEntityResponse>
  translationPost?: Maybe<TranslationPostEntityResponse>
  translationPosts?: Maybe<TranslationPostEntityResponseCollection>
  trend?: Maybe<TrendEntityResponse>
  uploadFile?: Maybe<UploadFileEntityResponse>
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>
  vote?: Maybe<VoteEntityResponse>
  votes?: Maybe<VoteEntityResponseCollection>
}

declare type QueryAnnouncementArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryAnnouncementsArgs = {
  filters?: InputMaybe<AnnouncementFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryApplicationArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryApplicationsArgs = {
  filters?: InputMaybe<ApplicationFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryArtArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryArtsArgs = {
  filters?: InputMaybe<ArtFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryBlogArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryBlogsArgs = {
  filters?: InputMaybe<BlogFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryCommentsCommentArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryCommentsCommentReportArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryCommentsCommentReportsArgs = {
  filters?: InputMaybe<CommentsCommentReportFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryCommentsCommentsArgs = {
  filters?: InputMaybe<CommentsCommentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryCompetitionArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryCompetitionsArgs = {
  filters?: InputMaybe<CompetitionFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryHashtagArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryHashtagPostArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryHashtagPostsArgs = {
  filters?: InputMaybe<HashtagPostFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryHashtagsArgs = {
  filters?: InputMaybe<HashtagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryMentionArgs = {
  id?: InputMaybe<Scalars['ID']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
}

declare type QueryMentionsArgs = {
  filters?: InputMaybe<MentionFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryPrivacyArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  publicationState?: InputMaybe<PublicationState>
}

declare type QueryTermArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>
  publicationState?: InputMaybe<PublicationState>
}

declare type QueryTranslationPostArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryTranslationPostsArgs = {
  filters?: InputMaybe<TranslationPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type QueryVoteArgs = {
  id?: InputMaybe<Scalars['ID']>
}

declare type QueryVotesArgs = {
  filters?: InputMaybe<VoteFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta'
  pagination: Pagination
}

declare type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  contains?: InputMaybe<Scalars['String']>
  containsi?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  eq?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  ne?: InputMaybe<Scalars['String']>
  not?: InputMaybe<StringFilterInput>
  notContains?: InputMaybe<Scalars['String']>
  notContainsi?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  notNull?: InputMaybe<Scalars['Boolean']>
  null?: InputMaybe<Scalars['Boolean']>
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  startsWith?: InputMaybe<Scalars['String']>
}

declare type Term = {
  __typename?: 'Term'
  content: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  image?: Maybe<UploadFileEntityResponse>
  locale?: Maybe<Scalars['String']>
  localizations?: Maybe<TermRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type TermLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>
}

declare type TermEntity = {
  __typename?: 'TermEntity'
  attributes?: Maybe<Term>
  id?: Maybe<Scalars['ID']>
}

declare type TermEntityResponse = {
  __typename?: 'TermEntityResponse'
  data?: Maybe<TermEntity>
}

declare type TermInput = {
  content?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  slug?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

declare type TermRelationResponseCollection = {
  __typename?: 'TermRelationResponseCollection'
  data: Array<TermEntity>
}

declare type TranslationPost = {
  __typename?: 'TranslationPost'
  createdAt?: Maybe<Scalars['DateTime']>
  has_translated?: Maybe<Scalars['Boolean']>
  post?: Maybe<HashtagPostEntityResponse>
  publishedAt?: Maybe<Scalars['DateTime']>
  role: Enum_Translationpost_Role
  translation?: Maybe<Scalars['String']>
  translator?: Maybe<UsersPermissionsUserEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type TranslationPostEntity = {
  __typename?: 'TranslationPostEntity'
  attributes?: Maybe<TranslationPost>
  id?: Maybe<Scalars['ID']>
}

declare type TranslationPostEntityResponse = {
  __typename?: 'TranslationPostEntityResponse'
  data?: Maybe<TranslationPostEntity>
}

declare type TranslationPostEntityResponseCollection = {
  __typename?: 'TranslationPostEntityResponseCollection'
  data: Array<TranslationPostEntity>
  meta: ResponseCollectionMeta
}

declare type TranslationPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TranslationPostFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  has_translated?: InputMaybe<BooleanFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<TranslationPostFiltersInput>
  or?: InputMaybe<Array<InputMaybe<TranslationPostFiltersInput>>>
  post?: InputMaybe<HashtagPostFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  role?: InputMaybe<StringFilterInput>
  translation?: InputMaybe<StringFilterInput>
  translator?: InputMaybe<UsersPermissionsUserFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type TranslationPostInput = {
  has_translated?: InputMaybe<Scalars['Boolean']>
  post?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  role?: InputMaybe<Enum_Translationpost_Role>
  translation?: InputMaybe<Scalars['String']>
  translator?: InputMaybe<Scalars['ID']>
}

declare type TranslationPostRelationResponseCollection = {
  __typename?: 'TranslationPostRelationResponseCollection'
  data: Array<TranslationPostEntity>
}

declare type Trend = {
  __typename?: 'Trend'
  createdAt?: Maybe<Scalars['DateTime']>
  en?: Maybe<TrendData>
  nl?: Maybe<TrendData>
  tr?: Maybe<TrendData>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type TrendEntity = {
  __typename?: 'TrendEntity'
  attributes?: Maybe<Trend>
  id?: Maybe<Scalars['ID']>
}

declare type TrendEntityResponse = {
  __typename?: 'TrendEntityResponse'
  data?: Maybe<TrendEntity>
}

declare type TrendInput = {
  en?: InputMaybe<TrendData>
  nl?: InputMaybe<TrendData>
  tr?: InputMaybe<TrendData>
}

declare type UploadFile = {
  __typename?: 'UploadFile'
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  ext?: Maybe<Scalars['String']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  height?: Maybe<Scalars['Int']>
  mime: Scalars['String']
  name: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<GenericMorph>>>
  size: Scalars['Float']
  updatedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  width?: Maybe<Scalars['Int']>
}

declare type UploadFileEntity = {
  __typename?: 'UploadFileEntity'
  attributes?: Maybe<UploadFile>
  id?: Maybe<Scalars['ID']>
}

declare type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse'
  data?: Maybe<UploadFileEntity>
}

declare type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection'
  data: Array<UploadFileEntity>
  meta: ResponseCollectionMeta
}

declare type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  caption?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  ext?: InputMaybe<StringFilterInput>
  formats?: InputMaybe<JsonFilterInput>
  hash?: InputMaybe<StringFilterInput>
  height?: InputMaybe<IntFilterInput>
  id?: InputMaybe<IdFilterInput>
  mime?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  previewUrl?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  provider_metadata?: InputMaybe<JsonFilterInput>
  size?: InputMaybe<FloatFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
  width?: InputMaybe<IntFilterInput>
}

declare type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>
  caption?: InputMaybe<Scalars['String']>
  ext?: InputMaybe<Scalars['String']>
  formats?: InputMaybe<Scalars['JSON']>
  hash?: InputMaybe<Scalars['String']>
  height?: InputMaybe<Scalars['Int']>
  mime?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  previewUrl?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<Scalars['String']>
  provider_metadata?: InputMaybe<Scalars['JSON']>
  size?: InputMaybe<Scalars['Float']>
  url?: InputMaybe<Scalars['String']>
  width?: InputMaybe<Scalars['Int']>
}

declare type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection'
  data: Array<UploadFileEntity>
}

declare type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload'
  ok: Scalars['Boolean']
}

declare type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload'
  ok: Scalars['Boolean']
}

declare type UsersPermissionsLoginInput = {
  identifier: Scalars['String']
  password: Scalars['String']
  provider?: Scalars['String']
}

declare type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']>
  user: UsersPermissionsMe
}

declare type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  blocked?: Maybe<Scalars['Boolean']>
  confirmed?: Maybe<Scalars['Boolean']>
  email?: Maybe<Scalars['String']>
  id: Scalars['ID']
  role?: Maybe<UsersPermissionsMeRole>
  username: Scalars['String']
}

declare type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  type?: Maybe<Scalars['String']>
}

declare type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload'
  ok: Scalars['Boolean']
}

declare type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  action: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  role?: Maybe<UsersPermissionsRoleEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']>
}

declare type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity'
  attributes?: Maybe<UsersPermissionsPermission>
  id?: Maybe<Scalars['ID']>
}

declare type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

declare type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection'
  data: Array<UsersPermissionsPermissionEntity>
}

declare type UsersPermissionsRegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

declare type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  createdAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
  type?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

declare type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity'
  attributes?: Maybe<UsersPermissionsRole>
  id?: Maybe<Scalars['ID']>
}

declare type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse'
  data?: Maybe<UsersPermissionsRoleEntity>
}

declare type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection'
  data: Array<UsersPermissionsRoleEntity>
  meta: ResponseCollectionMeta
}

declare type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

declare type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  type?: InputMaybe<Scalars['String']>
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

declare type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload'
  ok: Scalars['Boolean']
}

declare type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  applications?: Maybe<ApplicationRelationResponseCollection>
  arts?: Maybe<ArtRelationResponseCollection>
  avatar?: Maybe<UploadFileEntityResponse>
  blocked?: Maybe<Scalars['Boolean']>
  blogs?: Maybe<BlogRelationResponseCollection>
  confirmed?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  fullname?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRoleEntityResponse>
  translation_posts?: Maybe<TranslationPostRelationResponseCollection>
  updatedAt?: Maybe<Scalars['DateTime']>
  username: Scalars['String']
  votes?: Maybe<VoteRelationResponseCollection>
}

declare type UsersPermissionsUserApplicationsArgs = {
  filters?: InputMaybe<ApplicationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsUserArtsArgs = {
  filters?: InputMaybe<ArtFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsUserBlogsArgs = {
  filters?: InputMaybe<BlogFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsUserTranslation_PostsArgs = {
  filters?: InputMaybe<TranslationPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsUserVotesArgs = {
  filters?: InputMaybe<VoteFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

declare type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity'
  attributes?: Maybe<UsersPermissionsUser>
  id?: Maybe<Scalars['ID']>
}

declare type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse'
  data?: Maybe<UsersPermissionsUserEntity>
}

declare type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection'
  data: Array<UsersPermissionsUserEntity>
  meta: ResponseCollectionMeta
}

declare type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  applications?: InputMaybe<ApplicationFiltersInput>
  arts?: InputMaybe<ArtFiltersInput>
  blocked?: InputMaybe<BooleanFilterInput>
  blogs?: InputMaybe<BlogFiltersInput>
  confirmationToken?: InputMaybe<StringFilterInput>
  confirmed?: InputMaybe<BooleanFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  email?: InputMaybe<StringFilterInput>
  fullname?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsUserFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  password?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  resetPasswordToken?: InputMaybe<StringFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  translation_posts?: InputMaybe<TranslationPostFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
  votes?: InputMaybe<VoteFiltersInput>
}

declare type UsersPermissionsUserInput = {
  applications?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  arts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  avatar?: InputMaybe<Scalars['ID']>
  blocked?: InputMaybe<Scalars['Boolean']>
  blogs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  confirmationToken?: InputMaybe<Scalars['String']>
  confirmed?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  fullname?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<Scalars['String']>
  resetPasswordToken?: InputMaybe<Scalars['String']>
  role?: InputMaybe<Scalars['ID']>
  translation_posts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  username?: InputMaybe<Scalars['String']>
  votes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

declare type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection'
  data: Array<UsersPermissionsUserEntity>
}

declare type Vote = {
  __typename?: 'Vote'
  application?: Maybe<ApplicationEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  value: Scalars['Int']
  voter?: Maybe<UsersPermissionsUserEntityResponse>
}

declare type VoteEntity = {
  __typename?: 'VoteEntity'
  attributes?: Maybe<Vote>
  id?: Maybe<Scalars['ID']>
}

declare type VoteEntityResponse = {
  __typename?: 'VoteEntityResponse'
  data?: Maybe<VoteEntity>
}

declare type VoteEntityResponseCollection = {
  __typename?: 'VoteEntityResponseCollection'
  data: Array<VoteEntity>
  meta: ResponseCollectionMeta
}

declare type VoteFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VoteFiltersInput>>>
  application?: InputMaybe<ApplicationFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<VoteFiltersInput>
  or?: InputMaybe<Array<InputMaybe<VoteFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  value?: InputMaybe<IntFilterInput>
  voter?: InputMaybe<UsersPermissionsUserFiltersInput>
}

declare type VoteInput = {
  application?: InputMaybe<Scalars['ID']>
  publishedAt?: InputMaybe<Scalars['DateTime']>
  value?: InputMaybe<Scalars['Int']>
  voter?: InputMaybe<Scalars['ID']>
}

declare type VoteRelationResponseCollection = {
  __typename?: 'VoteRelationResponseCollection'
  data: Array<VoteEntity>
}
