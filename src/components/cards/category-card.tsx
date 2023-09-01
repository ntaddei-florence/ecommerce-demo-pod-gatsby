import { Link, graphql } from "gatsby";
import React, { FC } from "react";

import { BasicCard } from "./basic-card";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export interface CategoryCardProps {
  category: Queries.CategoryCardDataFragment;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <BasicCard
      image={category.image}
      title={category.categoryName}
      body={category.description ? renderRichText(category.description) : undefined}
      actions={
        <>
          <Link to={`/categories/${category.slug}`} className="btn btn-sm btn-outline">
            Vedi tutto
          </Link>
        </>
      }
    />
  );
};

export const query = graphql`
  fragment CategoryCardData on ContentfulCategory {
    slug
    internalName
    categoryName
    description {
      raw
    }
    image {
      ...BasicCardImageData
    }
    # parentCategory {
    #   slug
    # }
  }
`