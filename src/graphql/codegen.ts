import type { CodegenConfig } from "@graphql-codegen/cli";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV ?? "development"}`,
});

const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID!;
const environmentId = process.env.GATSBY_CONTENTFUL_ENVIRONMENT_ID ?? "master";
const graphqlUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}`;

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: {
    [graphqlUrl]: {
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/graphql/types/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default codegenConfig;
