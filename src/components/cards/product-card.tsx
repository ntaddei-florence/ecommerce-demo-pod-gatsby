import { Link } from "gatsby";
import React, { FC } from "react";

import { BasicCard } from ".";
import { graphql } from "gatsby";

export interface ProductCardProps {
  product: Queries.ProductCardDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  // const defaultMediaImage = product.defaultMedia?.mediaCollection?.items[0];
  // const firstVariant = product.variants?.[0];
  // const firstVariantImage = firstVariant?.media?.mediaCollection?.items[0];
  // const headerImage = firstVariantImage ?? defaultMediaImage ?? undefined;
  return (
    <BasicCard
      // image={headerImage}
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
    variants {
      sku
      slug
    }
  }
`