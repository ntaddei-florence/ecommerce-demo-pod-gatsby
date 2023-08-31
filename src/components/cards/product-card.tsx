import { Link, graphql } from "gatsby";
import React, { FC } from "react";
import { BasicCard } from "./basic-card";

export interface ProductCardProps {
  product: Queries.ProductCardDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <BasicCard
      // image={product.image}
      title={product.name}
      // body={renderRichText(product.description?.json)}
      actions={
        <>
          <Link to={`/products/${product.slug}`} className="btn btn-sm btn-outline">
            Vedi varianti
          </Link>
        </>
      }
    />
  );
};

export const query = graphql`
  fragment ProductCardData on ContentfulProduct {
    name
    slug
    # image {
    #   ...ContentfulImageData
    # }
    variants {
      sku
      slug
    }
  }
`