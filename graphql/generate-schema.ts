const path = require("path");
const { SchemaGenerator } = require("./SchemaGenerator");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV ?? "development"}`,
});

(async () => {
  const isVerbose = process.argv.includes("--verbose");

  const baseDir = "graphql";
  const generatedDir = path.join(baseDir, "generated");

  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID;
  const environmentId = process.env.GATSBY_CONTENTFUL_ENVIRONMENT_ID ?? "master";
  const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN ?? "";

  const baseUrl = process.env.GATSBY_CONTENTFUL_HOST ?? "https://cdn.contentful.com";

  const queryParams = new URLSearchParams({
    access_token: accessToken,
    limit: "1000",
  });
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/content_types?${queryParams}`;

  const generator = new SchemaGenerator({
    url,
    baseDir,
    generatedDir,
    isVerbose,
    saveOnFile: true,
    updateObjectTypes: true,
  });

  await generator.getSchema();
})();
