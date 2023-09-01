import {
  AddToCartButton,
  AvailabilityContainer,
  AvailabilityTemplate,
  LineItemsContainer,
  LineItemsCount,
  Price,
  PricesContainer,
} from "@commercelayer/react-components";
import React, { FC, useState } from "react";

export interface AddToCartProps {
  sku: string;
}

export const AddToCart: FC<AddToCartProps> = ({ sku }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <AvailabilityContainer skuCode={sku} getQuantity={setQuantity}>
        {quantity > 0 && <AvailabilityTemplate className="badge badge-success" />}
      </AvailabilityContainer>
      <div className="flex gap-2">
        <PricesContainer>
          <Price skuCode={sku} className="text-lg font-bold" compareClassName="line-through" />
        </PricesContainer>
      </div>
      <AddToCartButton
        quantity="1"
        skuCode={sku}
        className="btn btn-primary btn-wide"
        disabled={!quantity}
        label={quantity ? "Add to cart" : "Not available"}
      />
    </div>
  );
};
