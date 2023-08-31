import { Link, graphql } from "gatsby";
import React, { FC } from "react";
import { BasicCard } from "./basic-card";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export interface ProductCardProps {
  product: Queries.ProductCardDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const firstVariant = product.variants?.filter(v => v?.media?.media)[0];
  const firstVariantImage = firstVariant?.media?.media?.[0];
  const firstProductImage = product.defaultMedia?.media?.[0];
  const productImage = firstProductImage ?? firstVariantImage;
  return (
    <BasicCard
      image={productImage}
      title={product.name}
      body={product.description ? renderRichText(product.description) : undefined}
      actions={
        <>
          <Link to={`/products/${product.slug}/${firstVariant?.sku}`} className="btn btn-sm btn-outline">
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
    description {
      raw
    }
    defaultMedia {
      media {
        ...BasicCardImageData
      }
    }
    variants {
      sku
      slug
      media {
        media {
          ...BasicCardImageData
        }
      }
    }
  }
`