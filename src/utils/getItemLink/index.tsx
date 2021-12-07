export const getItemLink = (
  item: ISubpage | IApplication | IHashtagPost,
  locale: string,
): string | null => {
  const post = item as IHashtagPost
  const application = item as IApplication
  const subpage = item as ISubpage

  const type = post.hashtag
    ? 'post'
    : application.competition
    ? 'application'
    : null

  switch (type) {
    case 'post':
      return post.hashtag
        ? `/${locale}/${post.hashtag?.page?.slug}/${post.hashtag?.slug}/${post.slug}`
        : null
    case 'application':
      return application.competition
        ? `/${locale}/${application.competition?.page?.slug}/${application.competition?.slug}/${application.slug}`
        : null
    default:
      return `/${locale}/${subpage.page?.slug}/${subpage.slug}`
  }
}
