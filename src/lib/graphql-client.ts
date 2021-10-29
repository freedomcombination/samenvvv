import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_ADMIN_URL as string

export const graphQLClient = new GraphQLClient(`${endpoint}/graphql`)
