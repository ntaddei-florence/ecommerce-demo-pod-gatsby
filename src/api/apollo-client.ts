import { ApolloClient, InMemoryCache } from "@apollo/client";

const space = process.env.GATSBY_CONTENTFUL_SPACE_ID ?? "";
const environment = process.env.GATSBY_CONTENTFUL_ENVIRONMENT_ID ?? "master";
const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN ?? "";

export const apolloClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`,
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
