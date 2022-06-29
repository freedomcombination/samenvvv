import { RouteKeys } from '@config'
import { getMainPageLink } from '@utils'

export const getItemLink = (
  item: Hashtag | Post,
  locale: StrapiLocale,
  type: RouteKeys,
  isAbsolute?: boolean,
): string | null => {
  const post = item as Post
  const hashtag = item as Hashtag
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
      itemUrl = `/${locale}/${getMainPageLink('hashtag')}/${
        post.hashtag?.slug
      }/${post.id}`
      break
    case 'hashtag':
      if (!hashtag.slug) {
        console.error('Missing slug for post:', type, hashtag)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink('hashtag')}/${hashtag?.slug}`
      break
    default:
      console.error('Missing slug for item:', type, item)
      itemUrl = null
      break
  }

  return isAbsolute ? siteUrl + itemUrl : itemUrl
}
