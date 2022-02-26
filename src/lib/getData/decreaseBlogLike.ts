import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

import { fetcher } from '../graphql-client'

export type DecreaseBlogLikeMutationVariables = {
  id: string
  likes: number
}

export type DecreaseBlogLikeMutation = {
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

export const DecreaseBlogLikeDocument = gql`
  mutation decreaseBlogLike($id: ID!, $likes: Int!) {
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

export const decreaseBlogLike = async (
  variables: DecreaseBlogLikeMutationVariables,
) =>
  fetcher<DecreaseBlogLikeMutation, DecreaseBlogLikeMutationVariables>(
    DecreaseBlogLikeDocument,
    variables,
  )

export const useDecreaseBlogLikeMutation = <
  TError = unknown,
  TContext = unknown,
>() =>
  useMutation<
    DecreaseBlogLikeMutation,
    TError,
    DecreaseBlogLikeMutationVariables,
    TContext
  >(['decreaseBlogLike'], (variables: DecreaseBlogLikeMutationVariables) =>
    decreaseBlogLike(variables),
  )
