import { graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";
import { MainLayout } from "../components/layouts/main-layout";
import { ProductCard } from "../components/cards/product-card";

export interface CategoryPageContext {
  slug: string;
}

export interface CategoryPageProps
  extends PageProps<Queries.CategoryPageQuery, CategoryPageContext> {}

const CategoryPage: FC<CategoryPageProps> = ({ data: { contentfulCategory } }) => {
  return (
    <MainLayout>
      <div className="prose pb-4">
        <h2>{contentfulCategory?.categoryName}</h2>
      </div>
      <div className="not-prose grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contentfulCategory?.product?.map((product) =>
          product ? <ProductCard product={product} key={product.slug} /> : null
        )}
        {!contentfulCategory?.product?.length && <h2>No products found for this category</h2>}
      </div>
    </MainLayout>
  );
};

export const Head: FC<HeadProps<Queries.CategoryPageQuery, CategoryPageContext>> = ({
  data: { contentfulCategory },
  // pageContext: { slug },
}) => {
  return (
    <div>
      {contentfulCategory?.categoryName}
    </div>
  );
};

export const query = graphql`
  query CategoryPage($slug: String) {
    contentfulCategory(slug: { eq: $slug }) {
      categoryName
      description {
        raw
      }
      slug
      product {
        ...ProductCardData
      }
    }
  }
`;

export default CategoryPage;
