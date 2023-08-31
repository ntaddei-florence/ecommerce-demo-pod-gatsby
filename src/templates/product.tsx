import { GetServerData, graphql, HeadProps, PageProps, Link } from "gatsby";
import React, { FC, useEffect } from "react";
import { AddToCart } from "../components/commerce-layer/add-to-cart";
import { MainLayout } from "../components/layouts/main-layout";
import { getCLToken } from "../components/commerce-layer/cl-token";
import { MediaCarousel } from "../components/media-carousel";

export interface ProductPageContext {
  slug: string;
  sku: string;
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

const ProductPage: FC<ProductPageProps> = ({
  data: { contentfulProduct: product },
  pageContext: { sku },
  serverData: { clToken }
}) => {
  const allVariants = product?.variants ?? [];
  const variant = allVariants.find(v => v?.sku === sku);

  const carouselMedia = (variant?.media?.media ?? product?.defaultMedia?.media ?? [])
    .filter(Boolean) as Queries.MediaCarouselImageDataFragment[];

  const availableSizes = Array.from(
    new Set(allVariants.map((v) => v?.size?.label))
  );

  const availableColors = Array.from(
    new Set(allVariants.map((v) => v?.color))
  );

  const getLinkToVariant = (v: Queries.VariantDataFragment) => {
    return `/products/${product?.slug}/${v.sku}`;
  };

  const getLinkToVariantForColor = (color: string) => {
    const variantsForColor = allVariants?.filter((v) => color === v?.color);
    const variantSameSize = variantsForColor?.find((v) => {
      return v?.size?.label === variant?.size?.label;
    });
    const variantForColor = variantSameSize ?? variantsForColor?.[0];
    if (variantForColor) {
      return getLinkToVariant(variantForColor);
    }
  };

  const getLinkToVariantForSize = (size: string) => {
    const variantForSize = allVariants?.find(
      (v) => v?.color === variant?.color && size === v?.size?.label
    );
    if (variantForSize) {
      return getLinkToVariant(variantForSize);
    }
  };

  const isSizeVariantAvailableForColor = (size: string) => {
    return (
      (
        allVariants?.filter((v) => {
          return v?.color === variant?.color && size === v?.size?.label;
        }) ?? []
      ).length > 0
    );
  };

  return (
    <MainLayout clToken={clToken}>
      <div className="flex gap-4 justify-center">
        <MediaCarousel media={carouselMedia} />

        <div className="flex flex-col gap-2">
          <div className="prose pb-4">
            <h3>
              {product?.name}
            </h3>
            {/* {renderRichText(contentfulProduct?.description)} */}
          </div>

          <div className="flex gap-2">
            <h3>Colors:</h3>
            {availableColors.filter(Boolean).map((color) => (
              <Link to={getLinkToVariantForColor(color!) ?? "#"} key={color}>
                <button
                  style={{ backgroundColor: color ?? undefined }}
                  className={`rounded-md border border-4 w-6 h-6 ${
                    variant?.color === color ? "border-accent" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex gap-2">
            <h3>Size:</h3>
            {availableSizes.filter(Boolean).map((size) => {
              const isDisabled = !isSizeVariantAvailableForColor(size!);
              return (
                <Link key={size} to={getLinkToVariantForSize(size!) ?? "#"}>
                  <button
                    disabled={isDisabled}
                    title={isDisabled ? "not available" : `select ${size}`}
                    className={`mx-1 rounded-md border border-4 ${
                      variant?.size?.label === size ? "border-accent" : "border-neutral"
                    } ${isDisabled ? "opacity-40" : ""}`}
                  >
                    {size}
                  </button>
                </Link>
              );
            })}
          </div>
      
          <div>{variant?.sku && <AddToCart sku={variant.sku} />}</div>
        </div>
      </div>
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
      defaultMedia {
        media {
          ...MediaCarouselImageData
        }
      }
      variants {
        ...VariantData
      }
    }
  }

  fragment VariantData on ContentfulVariant {
    sku
    size {
      label
    }
    color
    media {
      media {
        ...MediaCarouselImageData
      }
    }
  }
`;

export default ProductPage;
