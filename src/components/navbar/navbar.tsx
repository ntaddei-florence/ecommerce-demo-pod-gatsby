import React, { FC } from "react";
import { Link } from 'gatsby';

import { ShoppingCartDropdown } from "./shopping-cart-dropdown";
import { UserProfileDropdown } from "./user-profile-dropdown";

export interface NavbarProps {}

export const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          {/* Site name */}
          Ecommerce
        </Link>
      </div>
      <div className="flex-none flex gap-3">
        <ShoppingCartDropdown amountInCents={9900} currency="€" itemsCount={8} />
        <UserProfileDropdown />
      </div>
    </div>
  );
};
