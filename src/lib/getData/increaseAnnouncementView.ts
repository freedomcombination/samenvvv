import { gql } from 'graphql-request'
import { useMutation, UseMutationOptions } from 'react-query'

import { fetcher } from '../graphql-client'

export type IncreaseAnnouncementViewMutationVariables = {
  id: string
  views: number
}

export type IncreaseAnnouncementViewMutation = {
  __typename?: 'Mutation'
  updateAnnouncement?: {
    __typename?: 'AnnouncementEntityResponse'
    data?: {
      __typename?: 'AnnouncementEntity'
      id?: string | null
      attributes?: { __typename?: 'Announcement'; views?: number | null } | null
    } | null
  } | null
}

export const IncreaseAnnouncementViewDocument = gql`
  mutation increaseAnnouncementView($id: ID!, $views: Int!) {
    updateAnnouncement(id: $id, data: { views: $views }) {
      data {
        id
        attributes {
          views
        }
      }
    }
  }
`

export const increaseAnnouncementView = async (
  variables?: IncreaseAnnouncementViewMutationVariables,
) => {
  return fetcher<
    IncreaseAnnouncementViewMutation,
    IncreaseAnnouncementViewMutationVariables
  >(IncreaseAnnouncementViewDocument, variables)
}

export const useIncreaseAnnouncementViewMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    IncreaseAnnouncementViewMutation,
    TError,
    IncreaseAnnouncementViewMutationVariables,
    TContext
  >,
) =>
  useMutation<
    IncreaseAnnouncementViewMutation,
    TError,
    IncreaseAnnouncementViewMutationVariables,
    TContext
  >(
    ['increaseAnnouncementView'],
    (variables?: IncreaseAnnouncementViewMutationVariables) =>
      increaseAnnouncementView(variables),
    options,
  )
