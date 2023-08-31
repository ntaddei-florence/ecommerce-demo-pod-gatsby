import { graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";
import { MainLayout } from "../components/layouts/main-layout";
import { CategoryCard } from "../components/cards/category-card";

export interface CategoriesPageContext {
  slug: string;
}

export interface CategoriesPageProps
  extends PageProps<Queries.CategoriesPageQuery, CategoriesPageContext> {}

const CategoriesPage: FC<CategoriesPageProps> = ({ data: { allContentfulCategory } }) => {
  return (
    <MainLayout>
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

export const Head: FC<HeadProps<Queries.CategoriesPageQuery, CategoriesPageContext>> = ({
  // data: { allContentfulCategory },
  // pageContext: { slug },
}) => {
  return (
    <div>
      Categories
    </div>
  );
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
