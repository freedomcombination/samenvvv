import { RouteKeys } from '@config'
import { getMainPageLink } from '@utils'

export const getItemLink = (
  item: Announcement | Competition | Hashtag | Application | Post | Blog,
  locale: StrapiLocale,
  type: RouteKeys,
  isAbsolute?: boolean,
): string | null => {
  const post = item as Post
  const hashtag = item as Hashtag
  const application = item as Application
  const announcement = item as Announcement
  const blog = item as Blog
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  let itemUrl: string | null

  if (!item) {
    console.error('Missing item:', type, item)
    return null
  }

  switch (type) {
    case 'post':
      if (!post.hashtag.slug) {
        console.error('Missing slug for post:', type, post)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink('hashtag', locale)}/${
        post.hashtag?.slug
      }/${post.id}`
      break
    case 'hashtag':
      if (!hashtag.slug) {
        console.error('Missing slug for post:', type, hashtag)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink('hashtag', locale)}/${
        hashtag?.slug
      }`
      break
    case 'competition':
      if (!application.competition.slug) {
        console.error('Missing slug for application:', type, application)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink(type, locale)}/${
        application.competition?.slug
      }/${application.slug}`
      break
    case 'announcement':
      itemUrl = `/${locale}/${getMainPageLink('announcement', locale)}/${
        announcement.slug
      }`
      break
    case 'blog':
      if (!blog.slug) {
        console.error('Missing link for page', type, blog)
        return null
      }
      itemUrl = `/${locale}/blog/${blog.slug}`
      break
    default:
      console.error('Missing slug for item:', type, item)
      itemUrl = null
      break
  }

  return isAbsolute ? siteUrl + itemUrl : itemUrl
}
