import { gql } from 'graphql-request'
import { useQuery, UseQueryResult } from 'react-query'

import { graphQLClient } from '@lib'

import { getLocalizedApplicationSlugs } from '../getLocalizedSlugs'

export type GetApplicationQuery = { applications?: IApplication[] }

export const GET_APPLICATION = gql`
  query getApplications($locale: String!, $slug: String) {
    applications(locale: $locale, where: { slug: $slug }) {
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
      locale
      user {
        username
      }
      votes {
        value
      }
      competition {
        slug
        page {
          slug
        }
      }
      localizations {
        slug
        locale
        competition {
          slug
          page {
            slug
          }
        }
      }
    }
  }
`

export const getApplication = async (
  locale: string,
  slug: string,
): Promise<IApplication | null> => {
  const data = await graphQLClient.request<GetApplicationQuery, BaseVariables>(
    GET_APPLICATION,
    {
      locale,
      slug,
    },
  )

  const application = data.applications?.[0]

  if (!application) return null

  const slugs = getLocalizedApplicationSlugs(application)

  return { ...application, slugs }
}

export const useApplicationQuery = (
  locale: string,
  slug: string,
): UseQueryResult<GetApplicationQuery> =>
  useQuery({
    queryKey: ['applications', [locale, slug]],
    queryFn: () => getApplication(locale, slug),
  })
