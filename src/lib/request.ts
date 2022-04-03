import { stringify } from 'qs'

import { transformStrapiData } from '@utils'

import { fetcher } from './fetcher'

export type RequestType = {
  url: string
  locale?: StrapiLocale
  publicationState?: 'live' | 'preview'
  sort?: string[]
  populate?: string | string[]
  filters?: Record<string, unknown>
  fields?: string | string[]
  page?: number
  pageSize?: number
}

export const request = async <T>({
  publicationState = 'live',
  locale = 'en',
  url,
  fields,
  filters,
  populate = '*',
  sort,
  page = 1,
  pageSize = 25,
}: RequestType) => {
  const query = stringify(
    {
      publicationState,
      populate,
      filters,
      sort,
      locale,
      fields,
      pagination: {
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  try {
    const response = await fetcher<T>(`/${url}?${query}`)

    const transformedData = transformStrapiData<T>(response.data)

    return transformedData
  } catch (error: any) {
    // TODO Consider a better error handling
    console.error(
      'Request error',
      error.data || error.response || error.message,
    )
    return { result: null, pagination: null }
  }
}
