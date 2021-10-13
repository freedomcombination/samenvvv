import { request } from '@lib'

export const getStrapiData = <T>(
  queryKey: CustomQueryKeyType,
  locale: string,
  slug?: string,
) => request<T>({ queryKey, params: { locale, slug } })

export const getAllStrapiData = async <T>(
  queryKey: CustomQueryKeyType,
  locales: string[],
) => {
  return Promise.all(locales.map(locale => getStrapiData<T>(queryKey, locale)))
}

export const getPages = (locale: string): Promise<PageType[]> => {
  return request({ queryKey: 'pages', params: { locale } })
}

export const getPageType = async (
  locale: string,
  slug: string,
): Promise<string> => {
  const page = await request<PageType[]>({
    queryKey: 'pages',
    params: { locale, slug },
  })
  return page[0]?.type
}

export const getPage = (slug: string, locale: string): Promise<PageType> => {
  return request({ queryKey: 'pages', params: { locale, slug } })
}

export const getPageSlugFromId = (id: number, pages: PageType[]) => {
  return pages.find(page => page.id === id)?.slug || ''
}

export const getPageSlug = (id: number) => {
  return request({ queryKey: 'pages', params: { id } })
}

export const getLocalizedMainSlugs = async (ids: number[]) => {
  const pagePromises = ids.map(id =>
    request<PageType>({ queryKey: 'pages', id, params: {} }),
  )
  const pages = (await Promise.all(pagePromises)).flat()

  return pages.reduce<Record<string, string[]>>((obj, page) => {
    obj[page.locale as string] = [page.slug]
    return obj
  }, {})
}

export const getLocalizedSubSlugs = async (
  ids: number[],
  queryKey: 'subpages' | 'competitions' | 'hashtags',
) => {
  const subpagePromises = ids.map(id =>
    request<SubpageType>({ queryKey, id, params: {} }),
  )
  const subpages = (await Promise.all(subpagePromises)).flat()

  return subpages.reduce<Record<string, string[]>>((obj, subpage) => {
    obj[subpage.locale as string] = [subpage.page.slug, subpage.slug]
    return obj
  }, {})
}

export const getSubpages = (locale: string): Promise<SubpageType[]> => {
  return request({ queryKey: 'subpages', params: { locale } })
}

export const getCompetitions = (locale: string): Promise<SubpageType[]> => {
  return request({ queryKey: 'competitions', params: { locale } })
}

export const getHashtags = (locale: string): Promise<SubpageType[]> => {
  return request({ queryKey: 'hashtags', params: { locale } })
}

export const getSubpage = (
  page: string,
  slug: string,
  locale: string,
): Promise<SubpageType[]> => {
  return request({ queryKey: 'subpages', params: { page, slug, locale } })
}

export const getAllPagePaths = async (locales: string[]) => {
  const allPages = await getAllStrapiData<PageType[]>('pages', locales)
  return allPages
    .flat()
    .map(({ slug, locale }) => ({ params: { slug: [slug] }, locale }))
}

export const getAllSubagePaths = async (locales: string[]) => {
  const allSubpages = await getAllStrapiData<SubpageType[]>('subpages', locales)
  return allSubpages.flat().map(({ page, slug, locale }) => ({
    params: { slug: [page.slug, slug] },
    locale,
  }))
}

export const getAllCompetitionPaths = async (locales: string[]) => {
  const allCompetitions = await getAllStrapiData<CompetitionType[]>(
    'competitions',
    locales,
  )
  return allCompetitions.flat().map(({ page, slug, locale }) => ({
    params: { slug: [(page as PageType).slug, slug] },
    locale,
  }))
}

export const getAllHashtagPaths = async (locales: string[]) => {
  const allHashtags = await getAllStrapiData<HashtagType[]>('hashtags', locales)
  return allHashtags.flat().map(({ page, slug, locale }) => ({
    params: { slug: [(page as PageType).slug, slug] },
    locale,
  }))
}

export const getAllApplicationPaths = async (locales: string[]) => {
  const pages = await getAllStrapiData<PageType[]>('pages', locales)
  const allApplications = await getAllStrapiData<ApplicationType[]>(
    'applications',
    locales,
  )

  return allApplications.flat().map(({ competition, slug, locale }) => {
    const pageSlug = getPageSlugFromId(competition.page as number, pages.flat())

    return {
      params: {
        slug: [pageSlug, competition.slug, slug],
      },
      locale,
    }
  })
}

export const getAllHashtagPostPaths = async (locales: string[]) => {
  const pages = await getAllStrapiData<PageType[]>('pages', locales)
  const allHashtagPosts = await getAllStrapiData<HashtagPostType[]>(
    'hashtag-posts',
    locales,
  )

  return allHashtagPosts.flat().map(({ hashtag, slug, locale }) => {
    const pageSlug = getPageSlugFromId(hashtag.page as number, pages.flat())

    return {
      params: {
        slug: [pageSlug, hashtag.slug, slug],
      },
      locale,
    }
  })
}
