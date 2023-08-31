import {
  Errors,
  LineItem,
  LineItemAmount,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  LineItemRemoveLink,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components";
import React from "react";

import { CommerceLayerProvider } from "../../components/commerce-layer";

export const Cart = () => {
  return (
    <CommerceLayerProvider>
      <OrderContainer>
        <LineItemsContainer>
          <p className="your-custom-class">
            Your shopping cart contains <LineItemsCount /> items
          </p>
          <LineItem>
            <LineItemImage width={50} />
            <LineItemName />
            <LineItemQuantity max={10} />
            <Errors resource="line_items" field="quantity" />
            <LineItemAmount />
            <LineItemRemoveLink />
          </LineItem>
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayerProvider>
  );
};
