"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import { Link } from 'gatsby';

import { CartCounter } from "./cart-counter";
import { formatAmountWithCurrency } from "../../utils/currency";

export interface ShoppingCartDropdownProps {
  amountInCents: number;
  currency: string;
  itemsCount: number;
}

export const ShoppingCartDropdown: FC<ShoppingCartDropdownProps> = ({
  amountInCents,
  currency,
  itemsCount,
}) => {
  const formattedAmount = formatAmountWithCurrency(amountInCents, currency);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <ShoppingCartIcon className="h-6 w-6 text-secondary" />
          <span className="badge badge-sm bg-neutral-400 text-white indicator-item">
            <CartCounter />
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{itemsCount} items</span>
          <span className="text-info">Subtotal: {formattedAmount}</span>
          <div className="card-actions">
            <Link to={"/cart"}>
              <button className="btn btn-primary btn-block">View cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
