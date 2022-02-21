import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedSubpageSlugs } from '../getLocalizedSlugs'

export type GetCompetitionQuery = { competitions?: ICompetition[] }

export const GET_COMPETITION = gql`
  query getCompetitions($locale: String!, $slug: String) {
    competitions(locale: $locale, where: { slug: $slug }) {
      id
      slug
      title
      content
      image {
        url
        size
        mime
        width
        height
      }
      start
      end
      locale
      page {
        slug
      }
      applications(limit: 10) {
        title
        slug
        content
        image {
          url
          size
          mime
          width
          height
        }
        user {
          username
        }
      }
      localizations {
        slug
        locale
        page {
          slug
        }
      }
    }
  }
`

export const getCompetition = async (
  locale: CommonLocale,
  slug: string,
): Promise<ICompetition | null> => {
  const data = await graphQLClient.request<GetCompetitionQuery, BaseVariables>(
    GET_COMPETITION,
    {
      locale,
      slug,
    },
  )

  const competition = data.competitions?.[0]

  if (!competition) return null

  const slugs = getLocalizedSubpageSlugs(competition as ISubpage)

  return { ...competition, slugs }
}

export const useCompetitionQuery = (
  locale: CommonLocale,
  slug: string,
): UseQueryResult<GetCompetitionQuery> =>
  useQuery({
    queryKey: ['competitions', [locale, slug]],
    queryFn: () => getCompetition(locale, slug),
  })
