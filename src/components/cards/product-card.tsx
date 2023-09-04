import { Link, graphql } from "gatsby";
import React, { FC } from "react";
import { BasicCard } from "./basic-card";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { getVariantPath } from "../../utils/paths";

export interface ProductCardProps {
  product: Queries.ProductCardDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const firstVariant = product.variants?.[0];
  const firstVariantWithMedia = product.variants?.filter(v => v?.media?.media)[0];
  const firstVariantImage = firstVariantWithMedia?.media?.media?.[0];
  const firstProductImage = product.defaultMedia?.media?.[0];
  return (
    <BasicCard
      image={firstProductImage ?? firstVariantImage}
      title={product.name}
      body={product.description ? renderRichText(product.description) : undefined}
      actions={
        <>
          <Link to={getVariantPath(product, firstVariant)} className="btn btn-sm btn-outline">
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