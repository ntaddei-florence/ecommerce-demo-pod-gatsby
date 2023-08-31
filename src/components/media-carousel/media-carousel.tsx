"use client";

import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useState } from "react";

export interface MediaCarouselProps {
  media: Queries.MediaCarouselImageDataFragment[];
}

export const MediaCarousel: FC<MediaCarouselProps> = ({ media }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <div>
      <div className="text-center">
        {media.map((mediaItem, i) =>
          mediaItem?.gatsbyImageData ? (
            <div
              key={mediaItem.contentful_id}
              className={i === selectedImageIndex ? undefined : "hidden"}
            >
              <GatsbyImage
                image={mediaItem.gatsbyImageData}
                alt={""}
                className="border border-2 rounded-lg"
              />
            </div>
          ) : null
        )}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {media.map((mediaItem, i) =>
          mediaItem?.gatsbyImageData ? (
            <div key={mediaItem.contentful_id} onClick={() => setSelectedImageIndex(i)}>
              <GatsbyImage
                alt={""}
                image={mediaItem.gatsbyImageData}
                className={`rounded-lg w-16 h-16 cursor-pointer border border-4  ${
                  i === selectedImageIndex ? "border-accent" : "border-transparent"
                }`}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};


export const query = graphql`
  fragment MediaCarouselImageData on ContentfulAsset {
    gatsbyImageData(height: 256)
    contentful_id
    publicUrl
    url
    mimeType
  }
`