declare type RawCommentReport = {
  content?: string
  createdAt?: string
  reason: 'BAD_LANGUAGE' | 'DISCRIMINATION' | 'OTHER'
  related?: StrapiRawEntity<RawStrapiComment>
  resolved?: boolean
  updatedAt?: string
}

declare type CommentReport = {
  id: number
  content?: string
  createdAt?: string
  reason: 'BAD_LANGUAGE' | 'DISCRIMINATION' | 'OTHER'
  related?: StrapiEntity<Comment>
  resolved?: boolean
  updatedAt?: string
}
