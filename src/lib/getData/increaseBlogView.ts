import { gql } from 'graphql-request'
import { useMutation, UseMutationOptions } from 'react-query'

import { fetcher } from '../graphql-client'

export type IncreaseBlogViewMutationVariables = {
  id: string
  views: number
}

export type IncreaseBlogViewMutation = {
  __typename?: 'Mutation'
  updateBlog?: {
    __typename?: 'BlogEntityResponse'
    data?: {
      __typename?: 'BlogEntity'
      id?: string | null
      attributes?: { __typename?: 'Blog'; views?: number | null } | null
    } | null
  } | null
}

export const IncreaseBlogViewDocument = gql`
  mutation increaseBlogView($id: ID!, $views: Int!) {
    updateBlog(id: $id, data: { views: $views }) {
      data {
        id
        attributes {
          views
        }
      }
    }
  }
`

export const increaseBlogView = async (
  variables?: IncreaseBlogViewMutationVariables,
) =>
  fetcher<IncreaseBlogViewMutation, IncreaseBlogViewMutationVariables>(
    IncreaseBlogViewDocument,
    variables,
  )

export const useIncreaseBlogViewMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    IncreaseBlogViewMutation,
    TError,
    IncreaseBlogViewMutationVariables,
    TContext
  >,
) =>
  useMutation<
    IncreaseBlogViewMutation,
    TError,
    IncreaseBlogViewMutationVariables,
    TContext
  >(
    ['increaseBlogView'],
    (variables?: IncreaseBlogViewMutationVariables) =>
      increaseBlogView(variables),
    options,
  )
