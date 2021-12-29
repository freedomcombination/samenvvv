import { gql } from 'graphql-request'

import { graphQLClient } from '@lib'

const INCREASE_VIEW = gql`
  mutation ($id: ID!, $views: Int!) {
    updateSubpage(input: { where: { id: $id }, data: { views: $views } }) {
      subpage {
        id
        views
      }
    }
  }
`

export const increaseSubpageView = async (
  subpage: ISubpage,
): Promise<Pick<ISubpage, 'id' | 'views'> | undefined> => {
  if (subpage?.views == undefined) return

  return graphQLClient.request(INCREASE_VIEW, {
    id: subpage.id,
    views: subpage.views + 1,
  })
}
