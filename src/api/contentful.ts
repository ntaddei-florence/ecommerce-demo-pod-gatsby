import contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN ?? "",
  environment: process.env.GATSBY_CONTENTFUL_ENVIRONMENT_ID ?? "master",
  host: process.env.GATSBY_CONTENTFUL_HOST ?? "cdn.contentful.com",
});
