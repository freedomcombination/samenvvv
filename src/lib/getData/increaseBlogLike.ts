import { gql } from 'graphql-request'
import { useMutation, UseMutationOptions } from 'react-query'

import { fetcher } from '../graphql-client'

export type IncreaseBlogLikeMutationVariables = {
  id: string
  likes: number
}

export type IncreaseBlogLikeMutation = {
  __typename?: 'Mutation'
  updateBlog?: {
    __typename?: 'BlogEntityResponse'
    data?: {
      __typename?: 'BlogEntity'
      id?: string | null
      attributes?: { __typename?: 'Blog'; likes?: number | null } | null
    } | null
  } | null
}

export const IncreaseBlogLikeDocument = gql`
  mutation increaseBlogLike($id: ID!, $likes: Int!) {
    updateBlog(id: $id, data: { likes: $likes }) {
      data {
        id
        attributes {
          likes
        }
      }
    }
  }
`

export const increaseBlogLike = async (
  variables?: IncreaseBlogLikeMutationVariables,
) =>
  fetcher<IncreaseBlogLikeMutation, IncreaseBlogLikeMutationVariables>(
    IncreaseBlogLikeDocument,
    variables,
  )

export const useIncreaseBlogLikeMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    IncreaseBlogLikeMutation,
    TError,
    IncreaseBlogLikeMutationVariables,
    TContext
  >,
) =>
  useMutation<
    IncreaseBlogLikeMutation,
    TError,
    IncreaseBlogLikeMutationVariables,
    TContext
  >(
    ['increaseBlogLike'],
    (variables?: IncreaseBlogLikeMutationVariables) =>
      increaseBlogLike(variables),
    options,
  )
