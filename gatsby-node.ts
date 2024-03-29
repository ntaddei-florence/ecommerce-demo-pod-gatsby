import { GatsbyNode } from "gatsby";
import path from "path";

import { SchemaGenerator } from "./graphql/SchemaGenerator";
import { getVariantPath } from "./src/utils/paths";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({
  actions,
}) => {
  const { createTypes } = actions;

  const baseDir = "graphql";
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master";
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";

  const baseUrl = `https://${process.env.CONTENTFUL_HOST ?? "cdn.contentful.com"}`;
  const queryParams = new URLSearchParams({
    access_token: accessToken,
    limit: "1000",
  });
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environmentId}/content_types?${queryParams}`;

  const generator = new SchemaGenerator({
    url,
    baseDir,
    isVerbose: false,
  });

  const schema = await generator.getSchema();
  createTypes(schema);
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const productPagePath = path.resolve("./src/templates/product.tsx");
  const categoryPagePath = path.resolve("./src/templates/category.tsx");

  const result = await graphql<Queries.PagesQuery>(`
    query Pages {
      allContentfulProduct {
        nodes {
          slug
          variants {
            slug
            sku
          }
        }
      }
      allContentfulCategory {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const productPages = result?.data?.allContentfulProduct.nodes ?? [];
  productPages.forEach((node) => {
    const { slug, variants } = node;
    variants?.forEach(v => {
      const path = getVariantPath(node, v);
      console.info("Creating page for path", path);
      createPage({
        path,
        component: productPagePath,
        context: {
          slug,
          sku: v?.sku,
        },
      });
      createRedirect({
        fromPath: `/products/${slug}`,
        toPath: getVariantPath(node, variants[0]),
      });
    });
  });

   const categoryPages = result?.data?.allContentfulCategory.nodes ?? [];

  categoryPages.forEach((node) => {
    const { slug } = node;
    const path = `/categories/${slug}`;
    console.info("Creating page for path", path);
    createPage({
      path,
      component: categoryPagePath,
      context: {
        slug,
      },
    });
  });
};
