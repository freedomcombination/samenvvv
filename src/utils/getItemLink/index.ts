export const getItemLink = (
  item: IPage | ISubpage | IApplication | IHashtagPost,
  locale: string,
  isAbsolute?: boolean,
): string | null => {
  const post = item as IHashtagPost
  const application = item as IApplication
  const subpage = item as ISubpage
  const page = item as IPage
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string
  let itemUrl: string | null

  const type = post.hashtag
    ? 'post'
    : application.competition
    ? 'application'
    : page.subpages || page.competitions || page.hashtags
    ? 'page'
    : 'subpage'

  if (type === 'post') {
    if (!post.hashtag?.page?.slug || !post.hashtag.slug) {
      console.error('Missing slug for post:', type, post)
      return null
    }
    itemUrl = `/${locale}/${post.hashtag?.page?.slug}/${post.hashtag?.slug}/${post.slug}`
  } else if (type === 'application') {
    if (!application.competition?.page?.slug || !application.competition.slug) {
      console.error('Missing slug for application:', type, application)
      return null
    }
    itemUrl = `/${locale}/${application.competition?.page?.slug}/${application.competition?.slug}/${application.slug}`
  } else if (type === 'subpage') {
    if (!subpage.page?.slug) {
      console.error('Missing slug for subpage:', type, subpage)
      return null
    }
    itemUrl = `/${locale}/${subpage.page?.slug}/${subpage.slug}`
  } else if (type === 'page') {
    if (!page.slug) {
      console.error('Missing link for page', type, page)
      return null
    }
    itemUrl = `/${locale}/${page.slug}`
  } else {
    console.error('Missing slug for item:', type, item)
    return null
  }

  return isAbsolute ? siteUrl + itemUrl : itemUrl
}
