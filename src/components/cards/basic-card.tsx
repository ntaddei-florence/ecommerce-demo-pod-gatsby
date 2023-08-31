import React, { FC, ReactNode } from "react";

export interface BasicCardProps {
  image?: Pick<Queries.ContentfulAsset, 'url' | 'title'> | null;
  title: ReactNode | string;
  body?: ReactNode | string;
  actions?: ReactNode;
}

export const BasicCard: FC<BasicCardProps> = ({ image, title, body, actions }) => {
  return (
    <div className="card card-compact min-w-32 bg-base-100 shadow-xl">
      {image?.url && (
        <figure>
          <img
            src={image?.url}
            alt={image.title ?? ""}
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
