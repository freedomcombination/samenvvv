export type LocalizationsType = {
  slug: string
  locale: string
}

export const getLocalizedPageSlugs = (
  item: IPage,
): { [k: string]: string[] } => {
  return {
    [item.locale as string]: [item.slug],
    ...item.localizations?.reduce<Record<string, string[]>>(
      (obj, { locale, slug }) => {
        obj[locale as string] = [slug]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedSubpageSlugs = (
  item: ISubpage,
): { [k: string]: string[] } => {
  return {
    [item.locale as string]: [item.page?.slug as string, item.slug],
    ...item.localizations?.reduce<Record<string, string[]>>(
      (obj, { locale, slug, page }) => {
        obj[locale as string] = [page?.slug as string, slug]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedApplicationSlugs = (
  item: IApplication,
): { [k: string]: string[] } => {
  return {
    [item.locale as string]: [
      item.competition?.page?.slug as string,
      item.competition?.slug as string,
      item.slug,
    ],
    ...item.localizations?.reduce<Record<string, string[]>>(
      (obj, { locale, slug, competition }) => {
        obj[locale as string] = [
          competition?.slug as string,
          competition?.slug as string,
          slug,
        ]
        return obj
      },
      {},
    ),
  }
}

export const getLocalizedHashtagPostSlugs = (
  item: IHashtagPost,
): { [k: string]: string[] } => {
  return {
    [item.locale as string]: [
      item.hashtag?.page?.slug as string,
      item.hashtag?.slug as string,
      item.slug,
    ],
    ...item.localizations?.reduce<Record<string, string[]>>(
      (obj, { locale, slug, hashtag }) => {
        obj[locale as string] = [
          hashtag?.page?.slug as string,
          hashtag?.slug as string,
          slug,
        ]
        return obj
      },
      {},
    ),
  }
}
