import { graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";
import { AddToCart } from "../components/commerce-layer/add-to-cart";
import { MainLayout } from "../components/layouts/main-layout";

export interface ProductPageContext {
  slug: string;
}

export interface ProductPageProps
  extends PageProps<Queries.ProductPageQuery, ProductPageContext> {}

const ProductPage: FC<ProductPageProps> = ({ data: { contentfulProduct } }) => {
  const variant = contentfulProduct?.variants?.[0];

  return (
    <MainLayout>
      <div className="prose pb-4">
        <h3>
          {contentfulProduct?.name}
        </h3>
        {/* {renderRichText(contentfulProduct?.description)} */}
      </div>
      {variant?.sku && <AddToCart sku={variant.sku} />}
    </MainLayout>
  );
};

export const Head: FC<HeadProps<Queries.ProductPageQuery, ProductPageContext>> = ({
  data: { contentfulProduct },
  // pageContext: { slug },
}) => {
  return (
    <div>
      {contentfulProduct?.name}
    </div>
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
