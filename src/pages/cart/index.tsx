import { useQuery } from "@apollo/client";
import { Order } from "@commercelayer/sdk";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageProps } from "gatsby";
import React, { FC, useEffect, useMemo, useState } from "react";

import { useCommerceLayer } from "../../api/use-commerce-layer";
import { CL_PERSIST_KEY } from "../../components/commerce-layer";
import { getCLToken } from "../../components/commerce-layer/cl-token";
import { ColorDot } from "../../components/display/color-dot";
import { MainLayout } from "../../components/layouts/main-layout";
import {
  GetCartContentfulProductsDocument,
  GetCartContentfulProductsQuery,
} from "../../graphql/types/graphql";
import { CategoriesPageContext } from "../categories";

export interface CartPageProps
  extends PageProps<undefined, CategoriesPageContext, {}, { clToken: string }> {}

export async function getServerData() {
  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      clToken: (await getCLToken()).accessToken,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  };
}

const CartPage: FC<CartPageProps> = ({ data, serverData: { clToken } }) => {
  const [loadingCL, setLoadingCL] = useState(true);
  const [cartOrder, setCartOrder] = useState<Order>();

  const commerceLayer = useCommerceLayer(clToken);
  const { data: variantsData, loading: loadingCF } = useQuery(GetCartContentfulProductsDocument, {
    variables: {
      sku_list: (cartOrder?.line_items || [])
        .filter((li) => li.sku_code != null)
        .map((li) => li.sku_code!),
    },
    skip: !cartOrder?.line_items?.length,
  });

  useEffect(() => {
    const orderId = window.localStorage.getItem(CL_PERSIST_KEY);

    const getCartProducts = async (orderId: string) => {
      const order = await commerceLayer.orders.retrieve(orderId, { include: ["line_items"] });
      setCartOrder(order);
      setLoadingCL(false);
    };

    if (orderId) {
      getCartProducts(orderId);
    } else {
      setLoadingCL(false);
    }
  }, [commerceLayer]);

  const variantsBySku = useMemo(() => {
    return (variantsData?.variantCollection?.items ?? []).reduce<
      Record<
        string,
        Exclude<
          GetCartContentfulProductsQuery["variantCollection"],
          null | undefined
        >["items"][number]
      >
    >((acc, item) => {
      if (item?.sku) {
        acc[item.sku] = item;
      }
      return acc;
    }, {});
  }, [variantsData?.variantCollection?.items]);

  return (
    <MainLayout clToken={clToken}>
      <h1 className="mb-3 text-2xl font-medium">
        Cart {cartOrder && <>({cartOrder.line_items?.length} items)</>}
      </h1>
      <hr />
      {loadingCL || loadingCF ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-4 mt-5 w-100">
          {cartOrder?.line_items?.map((lineItem) => {
            const variant = lineItem.sku_code ? variantsBySku[lineItem.sku_code] : undefined;
            const product = variant?.linkedFrom?.productCollection?.items?.[0];
            return (
              <div className="flex gap-3" key={lineItem.id}>
                <div className="flex-none">
                  <img
                    style={{ width: 100 }}
                    src={variant?.media?.mediaCollection?.items[0]?.url ?? ""}
                    alt={product?.name ?? ""}
                  />
                </div>
                <div className="flex flex-col flex-auto">
                  <div>
                    <a href={`/brands/${product?.brand?.slug}`} className="underline">
                      {product?.brand?.brandName}
                    </a>
                  </div>
                  <h2 className="text-lg">{product?.name}</h2>
                  <div className="text-sm text-neutral-content">Size: {variant?.size?.label}</div>
                  <div className="flex gap-2 text-sm text-neutral-content">
                    <span>Color:</span>
                    <ColorDot
                      colorCode={variant?.color?.colorCode!}
                      colorName={variant?.color?.colorName ?? undefined}
                    />
                  </div>
                  <div className="flex">
                    <button className="btn btn-link btn-tiny px-0">
                      <TrashIcon width={16} /> Remove
                    </button>
                    <button className="btn btn-link btn-tiny px-0">
                      <HeartIcon width={16} /> Favorite
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between h-100">
                  <select className="select select-bordered w-full max-w-xs">
                    <option>1</option>
                  </select>
                  <div className="font-bold">{lineItem.formatted_unit_amount}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
};

export default CartPage;
