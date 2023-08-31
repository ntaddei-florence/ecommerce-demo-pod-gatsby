import { GetServerData, graphql, HeadProps, PageProps } from "gatsby";
import React, { FC } from "react";
import { AddToCart } from "../components/commerce-layer/add-to-cart";
import { MainLayout } from "../components/layouts/main-layout";
import { getCLToken } from "../components/commerce-layer/cl-token";

export interface ProductPageContext {
  slug: string;
}

interface ServerDataProps { clToken: string };

export interface ProductPageProps
  extends PageProps<Queries.ProductPageQuery, ProductPageContext, {}, ServerDataProps> {}

export const getServerData: GetServerData<ServerDataProps> = async () => {
  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      clToken: (await getCLToken()).accessToken,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  }
}

const ProductPage: FC<ProductPageProps> = ({ data: { contentfulProduct }, serverData: { clToken } }) => {
  const variant = contentfulProduct?.variants?.[0];

  return (
    <MainLayout clToken={clToken}>
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
