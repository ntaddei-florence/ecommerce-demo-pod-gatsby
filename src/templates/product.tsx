import { graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";

export interface ProductPageContext {
  slug: string;
}

export interface ProductPageProps
  extends PageProps<Queries.ProductPageQuery, ProductPageContext> {}

const ProductPage: FC<ProductPageProps> = ({ data }) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export const Head: FC<HeadProps<Queries.ProductPageQuery, ProductPageContext>> = ({
  data,
  // pageContext: { slug },
}) => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export const query = graphql`
  query ProductPage($slug: String) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      description {
        raw
      }
      slug
      variants {
        sku
        size {
          label
        }
        color
      }
    }
  }
`;

export default ProductPage;
