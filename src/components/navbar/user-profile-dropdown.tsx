import React, { FC } from "react";
import LoginButton from "../auth/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../auth/logout-button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";

export interface UserProfileDropdownProps {}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({}) => {
  const { user } = useAuth0();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
          user?.picture
            ? (
              <img
                src={user.picture}
                width={60}
                height={60}
                alt="profile picture"
              />
            ) 
            : <UserCircleIcon className="h-full w-full text-secondary" />
          }
        </div>
      </label>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {
          user ? <>
            <li>
              <Link to="/account">
                Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li className="pt-2">
                <LogoutButton />
            </li>  
          </> : (
            <div>
              <LoginButton />
            </div>
          )
        }
      </ul> 
    </div>
  );
};
