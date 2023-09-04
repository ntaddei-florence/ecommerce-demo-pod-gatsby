import { graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";
import { MainLayout } from "../components/layouts/main-layout";
import { CategoryCard } from "../components/cards/category-card";
import { getCLToken } from "../components/commerce-layer/cl-token";

export interface CategoriesPageContext {
  slug: string;
}

export interface CategoriesPageProps
  extends PageProps<Queries.CategoriesPageQuery, CategoriesPageContext, {}, { clToken: string }> {}

export async function getServerData() {
  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      clToken: (await getCLToken()).accessToken,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  }
}

const CategoriesPage: FC<CategoriesPageProps> = ({ data: { allContentfulCategory }, serverData: { clToken } }) => {
  return (
    <MainLayout clToken={clToken}>
      <div>
        <div className="prose pb-4">
          <h2>Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allContentfulCategory?.nodes.map((category) =>
            category ? <CategoryCard category={category} key={category.slug} /> : null
          )}
          {!allContentfulCategory.nodes?.length && <h2>No categories found</h2>}
        </div>
      </div>
    </MainLayout>
  );
};

export const Head: FC<HeadProps<Queries.CategoriesPageQuery, CategoriesPageContext>> = () => {
  return <title>Categories</title>;
};

export const query = graphql`
  query CategoriesPage {
    allContentfulCategory {
      nodes {
        ...CategoryCardData
      }
    }
  }
`;

export default CategoriesPage;
