import { getRoute } from '../getRoute'

export const getItemLink = (
  item:
    | AnnouncementEntity
    | CompetitionEntity
    | HashtagEntity
    | ApplicationEntity
    | HashtagPostEntity
    | BlogEntity,
  locale: CommonLocale,
  isAbsolute?: boolean,
): string | null => {
  const post = item as HashtagPostEntity
  const application = item as ApplicationEntity
  const hashtag = item as HashtagEntity
  const announcement = item as AnnouncementEntity
  const blog = item as BlogEntity
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  let itemUrl: string | null

  const type = post?.attributes?.text
    ? 'post'
    : hashtag?.attributes?.posts
    ? 'hashtag'
    : application?.attributes?.competition
    ? 'application'
    : blog?.attributes?.author
    ? 'blog'
    : 'announcement'

  if (type === 'post') {
    if (!post?.attributes?.hashtag?.data?.attributes?.slug) {
      console.error('Missing slug for post:', type, post)
      return null
    }
    itemUrl = `/${locale}/${getRoute('hashtag', locale)}/${
      post?.attributes.hashtag?.data?.attributes?.slug
    }/${post?.attributes?.slug}`
  } else if (type === 'application') {
    if (!application?.attributes?.competition?.data?.attributes?.slug) {
      console.error('Missing slug for application:', type, application)
      return null
    }
    itemUrl = `/${locale}/${getRoute('competition', locale)}/${
      application?.attributes?.slug
    }`
  } else if (type === 'announcement') {
    itemUrl = `/${locale}/${getRoute('announcement', locale)}/${
      announcement?.attributes?.slug
    }`
  } else if (type === 'hashtag') {
    itemUrl = `/${locale}/${getRoute('hashtag', locale)}/${
      hashtag?.attributes?.slug
    }`
  } else if (type === 'blog') {
    if (!blog?.attributes?.slug) {
      console.error('Missing link for page', type, blog)
      return null
    }
    itemUrl = `/${locale}/blog/${blog?.attributes?.slug}`
  } else {
    console.error('Missing slug for item:', type, item)
    return null
  }

  return isAbsolute ? siteUrl + itemUrl : itemUrl
}
