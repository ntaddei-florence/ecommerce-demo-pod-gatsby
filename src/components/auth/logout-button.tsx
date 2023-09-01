import React, { useCallback } from "react";
import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";

export function LogoutButton() {
 const {
    isAuthenticated,
    logout,
  } = useAuth0();

  const onClickLogout = useCallback(() => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      },
    });
  }, []);

  return (
    <button className="btn btn-sm w-full" onClick={onClickLogout}>Log out</button>
 );
};
