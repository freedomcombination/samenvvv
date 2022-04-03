declare type RawStrapiComment = {
  approvalStatus: string
  authorAvatar: string
  authorEmail: string
  authorId: string
  authorName: string
  blockReason: string
  blocked: boolean
  blockedThread: boolean
  content: string
  related: string
  removed: boolean
  createdAt: string
  updatedAt: string
  authorUser: StrapiRawEntity<RawUser>
  reports: StrapiRawCollection<RawCommentReport>
  threadOf: StrapiRawEntity<RawStrapiComment>
}

declare type StrapiComment = {
  id: number
  approvalStatus: string
  authorAvatar: string
  authorEmail: string
  authorId: string
  authorName: string
  blockReason: string
  blocked: boolean
  blockedThread: boolean
  content: string
  related: string
  removed: boolean
  createdAt: string
  updatedAt: string
  authorUser: StrapiEntity<User>
  reports: StrapiCollection<CommentReport>
  threadOf: StrapiEntity<StrapiComment>
}
