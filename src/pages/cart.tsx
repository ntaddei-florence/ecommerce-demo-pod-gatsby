import { gql, useQuery } from "@apollo/client";
// import {
//   Errors,
//   LineItem,
//   LineItemAmount,
//   LineItemImage,
//   LineItemName,
//   LineItemQuantity,
//   LineItemRemoveLink,
//   LineItemsContainer,
//   LineItemsCount,
// } from "@commercelayer/react-components";
import { Order } from "@commercelayer/sdk";
import { PageProps } from "gatsby";
import React, { FC, useEffect, useState } from "react";

import { useCommerceLayer } from "../api/use-commerce-layer";
import { CL_PERSIST_KEY } from "../components/commerce-layer";
import { getCLToken } from "../components/commerce-layer/cl-token";
import { MainLayout } from "../components/layouts/main-layout";
import { CategoriesPageContext } from "./categories";

const GET_CART_CF_PRODUCTS = gql`
  query GetCartContentfulProducts {
    productCollection(where: { variants: { sku: "TSHIRTLOGOBLACKL" } }, limit: 1) {
      items {
        name
        slug
        defaultMedia {
          mediaCollection(limit: 1) {
            items {
              url
            }
          }
        }
        category {
          slug
          categoryName
        }
        brand {
          slug
          brandName
        }
        variantsCollection(where: { sku: "TSHIRTLOGOBLACKL" }, limit: 1) {
          items {
            sku
            name
            media {
              mediaCollection(limit: 1) {
                items {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
  const { data: productsCollection, loading: loadingCF } = useQuery(GET_CART_CF_PRODUCTS);

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
  }, [commerceLayer.orders]);

  const product: any = productsCollection?.["productCollection"]["items"][0];
  const variant: any = product["variantsCollection"]["items"][0];

  return (
    <MainLayout clToken={clToken}>
      <h1 className="h1">Cart {cartOrder && <>({cartOrder.line_items?.length} items)</>}</h1>
      <hr />
      {loadingCL || loadingCF ? (
        "Loading..."
      ) : (
        <div className="flex">
          <div>
            <img
              style={{ width: 100 }}
              src={variant["media"]["mediaCollection"]["items"][0]["url"]}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            {cartOrder?.line_items?.map((line_item) => {
              return <div key={line_item.id}>{product.name}</div>;
            })}
          </div>
        </div>
      )}

      {/* <LineItemsContainer>
        <h1 className="h1">
          Cart (<LineItemsCount /> items)
        </h1>
        <hr />
        <p className="your-custom-class">
          Your shopping cart contains <LineItemsCount /> items
        </p>
        <LineItem>
          <div className="flex">
            <LineItemImage width={100} />
            <div className="flex flex-col">
              <LineItemName />
              <LineItemQuantity max={10} />
              <Errors resource="line_items" field="quantity" />
              <LineItemAmount />
              <LineItemRemoveLink />
            </div>
          </div>
        </LineItem>
      </LineItemsContainer> */}
    </MainLayout>
  );
};

export default CartPage;
