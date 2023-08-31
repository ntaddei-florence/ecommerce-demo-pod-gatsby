import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, ReactNode } from "react";

export interface BasicCardProps {
  image?: Queries.ContentfulImageDataFragment | null;
  title: ReactNode | string;
  body?: ReactNode | string;
  actions?: ReactNode;
}

export const BasicCard: FC<BasicCardProps> = ({ image, title, body, actions }) => {
  return (
    <div className="card card-compact min-w-32 bg-base-100 shadow-xl">
      {image?.gatsbyImageData && (
        <figure>
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={title?.toString() ?? ""}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {body}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};


export const query = graphql`
  fragment ContentfulImageData on ContentfulAsset {
    gatsbyImageData
    contentful_id
    publicUrl
    url
    mimeType
  }
`