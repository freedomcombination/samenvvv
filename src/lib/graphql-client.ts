import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_API_URL as string

export const graphQLClient = new GraphQLClient(`${endpoint}/graphql`)

export const fetcher = async <TData, TVariables>(
  query: string,
  variables?: TVariables,
  // token?: string,
) => {
  // TODO: Change authentication when user logs in
  return graphQLClient.request<TData, TVariables>(query, variables, {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_READONLY_TOKEN as string}`,
  })
}
