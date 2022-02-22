export type LocalizationsType = {
  slug: string
  locale: CommonLocale
}

export const getLocalizedPageSlugs = (item: IPage): CommonLocalizedSlug => {
  return {
    [item.locale as CommonLocale]: [item.slug || null],
    ...item.localizations.reduce<CommonLocalizedSlug>(
      (obj, { locale, slug }) => {
        obj[locale as CommonLocale] = [slug || null]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedSubpageSlugs = (
  item: ISubpage | IHashtag | ICompetition,
): CommonLocalizedSlug => {
  const subpage = item as ISubpage
  return {
    [subpage.locale as CommonLocale]: [
      subpage.page?.slug || null,
      subpage.slug || null,
    ],
    ...subpage.localizations?.reduce<CommonLocalizedSlug>(
      (obj, { locale, slug, page }) => {
        obj[locale as CommonLocale] = [page?.slug || null, slug || null]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedApplicationSlugs = (
  item: IApplication,
): CommonLocalizedSlug => {
  return {
    [item.locale as CommonLocale]: [
      item.competition?.page?.slug || null,
      item.competition?.slug || null,
      item.slug || null,
    ],
    ...item.localizations?.reduce<CommonLocalizedSlug>(
      (obj, { locale, slug, competition }) => {
        obj[locale as CommonLocale] = [
          competition?.slug || null,
          competition?.slug || null,
          slug || null,
        ]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedHashtagPostSlugs = (
  item: IHashtagPost,
): CommonLocalizedSlug => {
  return {
    [item.locale as CommonLocale]: [
      item.hashtag?.page?.slug || null,
      item.hashtag?.slug || null,
      item.slug || null,
    ],
    ...item.localizations?.reduce<CommonLocalizedSlug>(
      (obj, { locale, slug, hashtag }) => {
        obj[locale as CommonLocale] = [
          hashtag?.page?.slug || null,
          hashtag?.slug || null,
          slug || null,
        ]
        return obj
      },
      {},
    ),
  }
}
