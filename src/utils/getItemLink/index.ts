export const getItemLink = (
  item: ISubpage | IApplication | IHashtagPost,
  locale: string,
  urlType: 'absolute' | 'relative' = 'relative',
): string | null => {
  const post = item as IHashtagPost
  const application = item as IApplication
  const subpage = item as ISubpage
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  let postUrl: string | null

  const type = post.hashtag
    ? 'post'
    : application.competition
    ? 'application'
    : null

  if (type === 'post') {
    if (!post.hashtag?.page?.slug || !post.hashtag.slug) {
      console.error('Missing links for post:', type, post)
      return null
    }
    postUrl = `/${locale}/${post.hashtag?.page?.slug}/${post.hashtag?.slug}/${post.slug}`
  } else if (type === 'application') {
    if (!application.competition?.page?.slug || !application.competition.slug) {
      console.error('Missing links for application:', type, application)
      return null
    }
    postUrl = `/${locale}/${application.competition?.page?.slug}/${application.competition?.slug}/${application.slug}`
  } else {
    if (!subpage.page?.slug) {
      console.error('Missing links for item:', subpage)
      return null
    }
    postUrl = `/${locale}/${subpage.page?.slug}/${subpage.slug}`
  }

  return urlType === 'absolute' ? siteUrl + postUrl : postUrl
}
