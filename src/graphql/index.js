import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()

const httpLink = createHttpLink({ uri: 'http://localhost:8880/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache,
})

export default client
